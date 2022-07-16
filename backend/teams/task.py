from hashlib import new
from teams import epic
from teams.error import InputError, AccessError
from teams.models import User, Token, ResetCode, Team, Task, UserTeamRelation, Epic
from teams.auth import get_active_emails, get_active_tokens, get_user_from_token, get_user_from_email
from teams import db
import jwt

## MAIN FUNCTIONS

# Create a Task and add it to the database.
def task_add(token, title, status, description, priority, email, due_date, team_name, epic_id):
    if token  == "":
        raise InputError('Task creation failed: you must fill out every field')
    if title  == "":
        raise InputError('Task creation failed: you must enter a title')
    if status  == "":
        raise InputError('Task creation failed: you must enter a status')
    if description  == "":
        raise InputError('Task creation failed: you must enter a description')
    if priority  == "":
        raise InputError('Task creation failed: you must enter a priority')
    if email  == "":
        raise InputError('Task creation failed: you must enter an email')
    if due_date  == "":
        raise InputError('Task creation failed: you must enter a due date')
    if team_name  == "":
        raise InputError('Task creation failed: you must enter a team name')
    if epic_id  == "":
        raise InputError('Task creation failed: you must enter an epic id')
    user = get_user_from_token(token)
    team = get_team_from_team_name(team_name)
    relation = db.session.query(UserTeamRelation).filter_by(user_id=user.id,team_id=team.id).first()
    if relation is None:
        raise InputError(f'Task creation failed: User is not a member of {team_name}')

    # If there is no assignee specified, assign the task to the user
    if email == 'creator':
        email = user.email
    
    # If epic_id is not exist, raise input error
    epic = db.session.query(Epic).filter_by(id=int(epic_id)).first()
    if epic is None:
        raise InputError("epic does not exist")
    if epic.team_name != team.name:
        raise InputError("epic does not belong to this team")
    # Check that the task name is unique within the Team task board that it was created in.
    if Task.query.filter_by(title=title,team_id=team.id).first() is not None:
        raise InputError('Task creation failed: a task with the same title already exists.')
    # Check the assignee_user is in same team as the task creater
    assignee_user = get_user_from_email(email)
    relation = db.session.query(UserTeamRelation).filter_by(user_id=assignee_user.id,team_id=team.id).first()
    if relation is None:
        raise InputError(f'Task creation failed: assignee_user is not a member of {team_name}')

    task = Task(title=title,status=status, description=description, priority=priority,assignee_email=email,due_date=due_date,team_id=team.id,epic_id=epic_id)
    db.session.add(task)
    db.session.commit()
    
    return {
        "task_id": task.id, "title":task.title, "description":task.description, "status":task.status, "priority": task.priority, "assignee_email":task.assignee_email, "due_date":task.due_date, "team_id":task.team_id, "epic_id":task.epic_id
    }

# Given the task's title, delete the task from the database.
def task_delete(token, task_title, team_name):
    team = get_team_from_team_name(team_name)
    
    task = get_task_from_team_and_title(team.name, task_title)
    if task is None:
        raise InputError('Task deletion failed: Task with title ' + task_title + ' does not exist.')

    # Delete the task
    Task.query.filter_by(id=task.id).delete()
    db.session.commit()
    
    return {}

# Updates the title of a task with new_task_title.
def task_update_name(task, new_task_title, team):
    # The task cannot be assigned a new name if a task with the new name already exists.
    #if Task.query.filter_by(team_id=team.id,title=new_task_title).first() is not None:
    #    raise InputError('Task name cannot be changed to ' + new_task_title + ' as a task already exists with that name.')
    task.set_title(new_task_title)
    db.session.commit()
    return {
        "task_id": task.id
    }

# Updates the description of a task.
def task_update_description(task, description):
    task.set_description(description)
    db.session.commit()
    return {
        "task_id": task.id
    }
    
# Updates the priority of a task.
def task_update_priority(task, priority):
    task.set_priority(priority)
    db.session.commit()
    return {
        "task_id": task.id
    }

# Updates the status of a task.
def task_update_status(task,status): 
    task.set_status(status)
    db.session.commit()
    
    return {
        "task_id": task.id
    }

# Updates the due date of a task.
def task_update_due_date(task, due_date):
    task.set_due_date(due_date)
    db.session.commit()
    return {
        "task_id": task.id
    }
    
# Updates the assignee of a task.
def task_update_assignee(task, assignee_email):
    #sanity check
    assignee_user = get_user_from_email(assignee_email)
    relation = db.session.query(UserTeamRelation).filter_by(user_id=assignee_user.id,team_id=task.team_id).first()
    if relation is None:
        raise InputError(f'Task creation failed: assignee_user is not a member of team{task.team_id}')
    task.set_assignee_email(assignee_email)
    db.session.commit()
    return {
        "task_id": task.id
    }

# updates the epic of a task.
def task_update_epic(task, epic_id):
    if int(epic_id) not in get_epic_ids():
        raise InputError('epic does not exist')
    task.set_epic_id(int(epic_id))
    db.session.commit()
    return {
        "task_id": task.id
    }
#update everything
def task_update_all(token, title, new_title, status, priority, email, due_date, epic_id, description):
    if token  == "" or token not in get_active_tokens():
        raise InputError('Task update failed: invalid token')
    if title  == "":
        raise InputError('Task update failed: you must enter a title')
    if status  == "":
        raise InputError('Task update failed: you must enter a status')
    if description  == "":
        raise InputError('Task update failed: you must enter a description')
    if priority  == "":
        raise InputError('Task update failed: you must enter a priority')
    if email == "" or email not in get_active_emails():
        raise InputError('Task update failed: you must enter a correct email')
    if due_date  == "":
        raise InputError('Task update failed: you must enter a due date')
    if epic_id  == "" or int(epic_id) not in get_epic_ids():
        raise InputError('Task update failed: you must enter a correct epic id')
    team = get_team_from_epic_id(int(epic_id))
    if team not in get_team_from_token(token):
        raise AccessError('this user is not in the team to modify this task')
    task = get_task_from_epid_id(epic_id, title)
    if task is None:
        raise AccessError('task update failed: task can not be found')
    task_update_name(task, new_title, team)
    task_update_status(task, status)
    task_update_assignee(task, email)
    task_update_priority(task, priority)
    task_update_description(task, description)
    task_update_due_date(task, due_date)
    task_update_epic(task, int(epic_id))
    return {"task_id": task.id, "title":task.title, "description":task.description, "status":task.status, "priority": task.priority, "assignee_email":task.assignee_email, "due_date":task.due_date, "team_id":task.team_id, "epic_id":task.epic_id}
# Search for all tasks within a user's team task board.
def task_search(token, query_string):
    user = get_user_from_token(token)
    
    matching_tasks = []
    
    # Loop through every task in the user's team task board, add matching task names
    # to the list
    tasks = Task.query.filter_by(team_id=user.team_id).all()
    team = Team.query.filter_by(id=user.team_id).first()
    task_titles = []
    for task in tasks:
        task_titles.append(task.title)
    
    for task_title in task_titles:
        if query_string in task_title:
            task = Task.query.filter_by(team_id=user.team_id,title=task_title).first()
            assignee = get_user_from_email(task.assignee_email)
            matching_tasks.append(
                {
                    "task_id": task.id,
                    "task_title": task.title,
                    "task_description": task.description,
                    "task_status": task.status,
                    "task_priority": task.priority,
                    "task_assignee_username": assignee.username,
                    "task_due_date": task.due_date,
                    "task_team_name": team.name
                }
            )
    
    return {
        "tasks": sorted(
            matching_tasks,key=lambda task: task["task_title"], reverse=False
        ),
    }

## HELPER FUNCTIONS

# Helper function to return a task object given its title and the team name from which it belongs.
def get_task_from_team_and_title(team_name, task_title):
    if team_name not in get_active_teams():
        raise InputError('invalid team name')
    if task_title not in get_active_task_titles():
        raise InputError('invalid task title')
    team = get_team_from_team_name(team_name)
    return Task.query.filter_by(team_id=team.id,title=task_title).first()

def get_team_from_epic_id(epic_id):
    if int(epic_id) not in get_epic_ids():
        raise InputError('invalid epic id')
    epic = Epic.query.filter_by(id=int(epic_id)).first()
    team = get_team_from_team_name(epic.team_name)
    if team is None:
        raise InputError('team is not found with this epic id')
    return team


def get_task_from_epid_id(epic_id, task_title):
    if int(epic_id) not in get_epic_ids():
        raise InputError('invalid epic id')
    if task_title not in get_active_task_titles():
        raise InputError('invalid task title')
    team = get_team_from_epic_id(epic_id)
    task = get_task_from_team_and_title(team.name, task_title)
    if task is None:
        raise AccessError('task can not be found with this epic id')
    return task

# Helper function to returns a team object given the team name.
def get_team_from_team_name(team_name):
    if team_name not in get_active_teams():
        raise InputError('invalid team name')
    return Team.query.filter_by(name=team_name).first()
    
# Helper function to return a team object given the team id.
def get_team_from_team_id(team_id):
    if team_id not in get_active_team_ids():
        raise InputError('invalid team id')
    return Team.query.filter_by(id=team_id).first()
    
# Helper function to return a team object given a token.
def get_team_from_token(token):
    if token not in get_active_tokens():
        raise InputError('Token failure: user could not be found')
    user = get_user_from_token(token)
    relation_info = UserTeamRelation.query.filter_by(user_id=user.id).all()
    team_list = []
    for relation in relation_info:
        team = Team.query.filter_by(id = relation.team_id).first()
        team_list.append(team)
    return team_list

def get_active_teams():
    active_teams = []
    team_list = Team.query.all()
    for team in team_list:
        active_teams.append(team.name)
        
    return active_teams

def get_active_task_titles():
    active_task_titles = []
    task_list = Task.query.all()
    for task in task_list:
        active_task_titles.append(task.title)
        
    return active_task_titles

def get_active_team_ids():
    active_team_ids = []
    team_list = Team.query.all()
    for team in team_list:
        active_team_ids.append(team.id)

    return active_team_ids

def get_epic_ids():
    epic_ids = []
    epic_list = Epic.query.all()
    for epic in epic_list:
        epic_ids.append(epic.id)

    return epic_ids