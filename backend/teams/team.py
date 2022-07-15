from hashlib import new
from teams.error import InputError, AccessError
from lib2to3.pgen2.pgen import generate_grammar
import sys
import random
from teams.models import User, Token, ResetCode, Team, Task, UserTeamRelation
from teams.auth import get_user_from_token, get_user_from_email
from teams.task import get_team_from_team_name
import re
from teams import db
import jwt

## MAIN FUNCTIONS

# From user token get team infromation
def get_team_from_user_token(token):
    user = get_user_from_token(token)
    relation_info = UserTeamRelation.query.filter_by(user_id=user.id).all()
    team_list = []
    for relation in relation_info:
        team_info = Team.query.filter_by(id = relation.team_id).first()
        if (team_info is None):
            continue
        else:
            resp = {"team_id": team_info.id, "team_name":team_info.name,"team_task_master_id":team_info.task_master_id}
            team_list.append(resp)
    return {"team_list":team_list}

# Create a team and add to the database.
def team_create(token, team_name):
    user = get_user_from_token(token)
    
    # Check that there are no existing teams with the specified team name.
    if Team.query.filter_by(name=team_name).first() is not None:
        raise InputError('Team creation failed: a team already exists with that name.')
    
    # Create the Team object and add to the database. By default, the task master is the creator of the team.
    team = Team(name=team_name, task_master_id=user.id)
    db.session.add(team)
    db.session.commit()
    #fill team id attribute in user object
    #user.set_team_id(team.id)
    #db.session.commit()
    
    # add relation into user_team relation table
    relation = UserTeamRelation(user_id=user.id,team_id=team.id)
    db.session.add(relation)
    db.session.commit()
    return {
        "team_id": team.id
    }

# Delete a team from the database.
def team_delete(token,team_name):
    user = get_user_from_token(token)
    team = get_team_from_team_name(team_name)
    if team is None:
        raise AccessError('the team does not exist')
    # Only the task master of the team can delete the team.
    check_user_is_task_master(user,team)
    
    # Unassign all members from the team
    #team_members = User.query.filter_by(team_id=team.id).all()
    #for team_member in team_members:
        #team_member.set_team_id(None)
        #db.session.commit()
    
    # Remove all tasks
    tasks = Task.query.filter_by(team_id=team.id)
    for task in tasks:
        db.session.query(Task).filter_by(id=task.id).delete()
        db.session.commit()

    # Delete the relationship
    relationships = db.session.query(UserTeamRelation).filter_by(team_id=team.id).all()
    for relation in relationships:
        db.session.delete(relation)
        db.session.commit()
    
    db.session.commit()
    # Delete the team
    team = db.session.query(Team).filter_by(id=team.id).delete()
    db.session.commit()

    return {}

# Update the task master.
def team_update_task_master(token, new_task_master_email, team_name):
    user = get_user_from_token(token)
    team = get_team_from_team_name(team_name)
    new_task_master = get_user_from_email(new_task_master_email)

    # Only the task master of the team can choose the task master.
    check_user_is_task_master(user,team)
        
    team.set_task_master_id(new_task_master.id)
    db.session.commit()
    #new_task_master.set_team_id(team.id)
    db.session.commit()
    return {
        "team_id": team.id
    }
    
# Update the team name.
def team_update_team_name(token, new_team_name, old_team_name):
    user = get_user_from_token(token)
    team = get_team_from_team_name(old_team_name)

    # Only the task master of the team can update the team name.
    check_user_is_task_master(user,team)
    team.set_name(new_team_name)
    db.session.commit()
    return {
        "team_id": team.id
    }
    
# Add a team member by email address to your team.
def team_add_team_member(token, member_email_address,team_name):
    user = get_user_from_token(token)
    team = get_team_from_team_name(team_name)
    check_user_is_task_master(user,team)
    
    team_member = get_user_from_email(member_email_address)
    
    # NOTE: At the moment, this function will immediately set the team member's team
    # to that of the user, regardless of whether or not the team member is already in a team.
    #team_member.set_team_id(user.team_id)
    #db.session.commit()
    if team_member is None:
        raise InputError('Email is invalid')
    #user can not join same team more than once
    relation = db.session.query(UserTeamRelation).filter_by(user_id=team_member.id,team_id=team.id).first()
    if relation is not None:
        raise AccessError("user can not join same team more than once")
    
    relation = UserTeamRelation(user_id=team_member.id,team_id=team.id)
    db.session.add(relation)
    db.session.commit()

    return {
        "team_id": team.id
    }
    
# Leave a team.
def team_leave(token,team_id):
    user = get_user_from_token(token)
    #team master can not leave team wihout update the team master
    team = db.session.query(Team).filter_by(id=team_id).first()
    if (user.id == team.task_master_id):
        raise AccessError("team master can not leave team wihout update the team master")
    else:
        relation = db.session.query(UserTeamRelation).filter_by(user_id=user.id,team_id=team_id).first()
        db.session.delete(relation)
        db.session.commit()
    return {
        "user_id": user.id
    }
    
# Remove a team member from your team.
def team_remove_member(token, member_email_address, team_name):
    user = get_user_from_token(token)
    team = get_team_from_team_name(team_name)
    check_user_is_task_master(user,team)

    # Task master can't remove themselves.
    if member_email_address == user.email:
        raise InputError('User cannot remove themselves from a team.')
    elif user.id != team.task_master_id:
        raise InputError('User can only be removed by task master.')
    # remove relationship
    relation = db.session.query(UserTeamRelation).filter_by(user_id=user.id,team_id=team.id).first()
    db.session.delete(relation)
    db.session.commit()   
    
    team_member = get_user_from_email(member_email_address)
    team_member.set_team_id(None)
    db.session.commit()
    
    return {}
    

## HELPER FUNCTIONS

# Helper function to check if a user is a task master of a team.
def check_user_is_task_master(user, team):
    if user is None:
        raise InputError('Token failure: ticketmaster does not exist, please enter a correct ticketmaster')
    if team is None:
        raise InputError('The team does not exist.')
    if team.task_master_id != user.id:
        raise InputError('User does not have sufficient permissions.')