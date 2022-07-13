from hashlib import new
from teams.error import InputError, AccessError
from teams.models import User, Token, ResetCode, Team, Task
from teams.auth import get_active_tokens, get_user_from_token, get_user_from_email
from teams import db
import jwt

## MAIN FUNCTIONS

# Create a Task and add it to the database.
def task_add(token, title, status, priority, email, due_date):
    user = get_user_from_token(token)

    if user.team_id is None:
        raise InputError('Task creation failed: User must be in a team in order to create a task.')

    # If there is no assignee specified, assign the task to the user
    if email == 'creator':
        email = user.email
    
    # Check that the task name is unique within the Team task board that it was created in.
    if Task.query.filter_by(title=title,team_id=user.team_id).first() is not None:
        raise InputError('Task creation failed: a task with the same title already exists.')
    
    task = Task(title=title,status=status,priority=priority,assignee_email=email,due_date=due_date,team_id=user.team_id)
    db.session.add(task)
    db.session.commit()
    
    return {
        "task_id": task.id
    }

# Given the task's title, delete the task from the database.
def task_delete(token, task_title):
    user = get_user_from_token(token)
    team = get_team_from_team_id(user.team_id)
    
    task = get_task_from_team_and_title(team.name, task_title)
    if task is None:
        raise InputError('Task deletion failed: Task with title ' + task_title + ' does not exist.')

    # Delete the task
    Task.query.filter_by(id=task.id).delete()
    db.session.commit()
    
    return {}

# Updates the title of a task with new_task_title.
def task_update_name(token, old_task_title, new_task_title):
    team = get_team_from_token(token)
    
    task_to_update = get_task_from_team_and_title(team.name, old_task_title)
    
    # The task cannot be assigned a new name if a task with the new name already exists.
    if Task.query.filter_by(team_id=team.id,title=new_task_title).first() is not None:
        raise InputError('Task name cannot be changed to ' + new_task_title + ' as a task already exists with that name.')
    
    task_to_update.set_title(new_task_title)
    db.session.commit()
    return {
        "task_id": task_to_update.id
    }

# Updates the description of a task.
def task_update_description(token, task_title, description):
    team = get_team_from_token(token)
    task = get_task_from_team_and_title(team.name, task_title)
    task.set_description(description)
    db.session.commit()
    return {
        "task_id": task.id
    }
    
# Updates the priority of a task.
def task_update_priority(token, task_title, priority):
    team = get_team_from_token(token)
    task = get_task_from_team_and_title(team.name, task_title)
    
    task.set_priority(priority)
    db.session.commit()
    return {
        "task_id": task.id
    }

# Updates the status of a task.
def task_update_status(token, task_title,status):
    team = get_team_from_token(token)
    task = get_task_from_team_and_title(team.name, task_title)
    
    task.set_status(status)
    db.session.commit()
    
    return {
        "task_id": task.id
    }

# Updates the due date of a task.
def task_update_due_date(token, task_title, due_date):
    team = get_team_from_token(token)
    task = get_task_from_team_and_title(team.name, task_title)

    task.set_due_date(due_date)
    db.session.commit()
    return {
        "task_id": task.id
    }
    
# Updates the assignee of a task.
def task_update_assignee(token, task_title, assignee_email):
    team = get_team_from_token(token)
    task = get_task_from_team_and_title(team.name, task_title)

    task.set_assignee_email(assignee_email)
    db.session.commit()
    return {
        "task_id": task.id
    }
    
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
            print(query_string + '\\\\\\\\')
            print(task_title)
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
        print(task_title)
        print(get_active_task_titles())
        raise InputError('invalid task title')
    team = get_team_from_team_name(team_name)
    return Task.query.filter_by(team_id=team.id,title=task_title).first()
    
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
    return Team.query.filter_by(id=user.team_id).first()

def get_user_and_team_from_token(token):
    if token not in get_active_tokens():
        raise InputError('Token failure: user could not be found')
    user = get_user_from_token(token)
    return get_user_from_token(token), get_team_from_team_id(user.team_id)

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