from hashlib import new
from teams.error import InputError, AccessError
from lib2to3.pgen2.pgen import generate_grammar
import sys
import random
from teams.models import User, Token, ResetCode, Team, Task
from teams.auth import get_user_from_token, get_user_from_email
from teams.task import get_user_and_team_from_token
import re
from teams import db
import jwt

## MAIN FUNCTIONS

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
    
    return {
        "team_id": team.id
    }

# Delete a team from the database.
def team_delete(token):
    user, team = get_user_and_team_from_token(token)
    
    # Only the task master of the team can delete the team.
    check_user_is_task_master(user,team)
    
    # Unassign all members from the team
    team_members = User.query.filter_by(team_id=team.id)
    for team_member in team_members:
        team_member.team_id = None
    
    # Remove all tasks
    tasks = Task.query.filter_by(team_id=team.id)
    for task in tasks:
        db.session.query(Task).filter_by(id=task.id).delete()
        
    # Delete the team
    db.session.query(Team).filter_by(id=team.id).delete()
    return {}

# Update the task master.
def team_update_task_master(token, new_task_master_email):
    user, team = get_user_and_team_from_token(token)
    new_task_master = get_user_from_email(new_task_master_email)

    # Only the task master of the team can choose the task master.
    check_user_is_task_master(user,team)
        
    team.task_master_id = new_task_master.id
    
    return {
        "team_id": team.id
    }
    
# Update the team name.
def team_update_team_name(token, new_team_name):
    user, team = get_user_and_team_from_token(token)

    # Only the task master of the team can update the team name.
    check_user_is_task_master(user,team)
        
    team.name = new_team_name
    
    return {
        "team_id": team.id
    }
    
# Add a team member by email address to your team.
def team_add_team_member(token, member_email_address):
    user, team = get_user_and_team_from_token(token)
    check_user_is_task_master(user,team)
    
    team_member = get_user_from_email(member_email_address)
    
    # NOTE: At the moment, this function will immediately set the team member's team
    # to that of the user, regardless of whether or not the team member is already in a team.
    team_member.team_id = user.team_id
    return {
        "team_id": team.id
    }
    
# Leave a team.
def team_leave(token):
    user = get_user_from_token(token)
    user.team_id = None
    return {
        "user_id": user.id
    }
    
# Remove a team member from your team.
def team_remove_member(token, member_email_address):
    user, team = get_user_and_team_from_token(token)
    check_user_is_task_master(user,team)

    # Task master can't remove themselves.
    if member_email_address == user.email:
        raise InputError('User cannot remove themselves from a team.')
        
    team_member = get_user_from_email(member_email_address)
    team_member.team_id = None
    
    return {}
    

## HELPER FUNCTIONS

# Helper function to check if a user is a task master of a team.
def check_user_is_task_master(user, team):
    if team.task_master_id != user.id:
        raise InputError('User does not have sufficient permissions.')