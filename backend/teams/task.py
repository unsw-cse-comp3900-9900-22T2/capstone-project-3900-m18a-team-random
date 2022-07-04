from hashlib import new
from teams.error import InputError, AccessError
from teams.models import User, Token, ResetCode, Team, Task
from teams.auth import get_user_from_token
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
    
    return {}

# Updates the title of a task with new_task_title.
def task_update_name(token, old_task_title, new_task_title):
    team = get_team_from_token(token)
    
    task_to_update = get_task_from_team_and_title(team.name, old_task_title)
    
    # The task cannot be assigned a new name if a task with the new name already exists.
    if Task.query.filter_by(team_id=team.id,title=new_task_title).first() is not None:
        raise InputError('Task name cannot be changed to ' + new_task_title + ' as a task already exists with that name.')
    
    task_to_update.title = new_task_title
    return {
        "task_id": task_to_update.id
    }

# Updates the description of a task.
def task_update_description(token, task_title, description):
    team = get_team_from_token(token)
    task = get_task_from_team_and_title(team.name, task_title)
    task.description = description
    return {
        "task_id": task.id
    }
    
# Updates the priority of a task.
def task_update_priority(token, task_title, priority):
    team = get_team_from_token(token)
    task = get_task_from_team_and_title(team.name, task_title)
    
    task.priority = priority
    return {
        "task_id": task.id
    }

# Updates the status of a task.
def task_update_status(token, task_title,status):
    team = get_team_from_token(token)
    task = get_task_from_team_and_title(team.name, task_title)
    
    task.status = status
    return {
        "task_id": task.id
    }

# Updates the due date of a task.
def task_update_due_date(token, task_title, due_date):
    team = get_team_from_token(token)
    task = get_task_from_team_and_title(team.name, task_title)

    task.due_date = due_date
    return {
        "task_id": task.id
    }
    
# Updates the assignee of a task.
def task_update_assignee(token, task_title, assignee_email):
    team = get_team_from_token(token)
    task = get_task_from_team_and_title(team.name, task_title)

    task.assignee_email = assignee_email
    
    return {
        "task_id": task.id
    }

## HELPER FUNCTIONS

# Helper function to return a task object given its title and the team name from which it belongs.
def get_task_from_team_and_title(team_name, task_title):
    team = get_team_from_team_name(team_name)
    return Task.query.filter_by(team_id=team.id,title=task_title).first()
    
# Helper function to returns a team object given the team name.
def get_team_from_team_name(team_name):
    return Team.query.filter_by(name=team_name).first()
    
# Helper function to return a team object given the team id.
def get_team_from_team_id(team_id):
    return Team.query.filter_by(id=team_id).first()
    
# Helper function to return a team object given a token.
def get_team_from_token(token):
    user = get_user_from_token(token)
    return Team.query.filter_by(id=user.team_id).first()

def get_user_and_team_from_token(token):
    user = get_user_from_token(token)
    return get_user_from_token(token), get_team_from_team_id(user.team_id)