from hashlib import new
from teams.error import InputError, AccessError
from teams.models import User, Token, ResetCode, Team, Task
from teams.auth import get_user_from_token, get_user_from_email
from teams import db
import jwt

# Search for all tasks within a user's team task board.
def task_search(token, query_string):
    user = get_user_from_token(token)
    
    matching_tasks = []
    
    # Loop through every task in the user's team task board, add matching task names
    # to the list
    tasks = Task.query.filter_by(team_id=user.team_id)
    team = Team.query.filter_by(id=user.team_id)
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