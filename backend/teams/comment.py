from hashlib import new
from teams.error import InputError, AccessError
from teams.models import User, Token, ResetCode, Team, Task, Comment
from teams.auth import get_user_from_token, get_user_from_email, get_user_from_id
from teams import db
import jwt


## MAIN FUNCTIONS

# Add a comment to a task
def comment_add(token, team_name, task_title, comment_content):

    user = get_user_from_token(token)
    team = Team.query.filter_by(name=team_name)
    task = Task.query.filter_by(team_id=team.id,title=task_title).first()
    if task is None:
        raise InputError('Comment add failed: task could not be found.')
    
    comment = Comment(parent_id=0,task_id=task.id,author_id=user.id,content=comment_content)
    db.session.add(comment)
    db.session.commit()
    
    return {
        "author_email": user.email,
        "comment_id": comment.id,
        "task_id": task.id,
        "team_id": team.id
    }

# Get all comments associated with a task.
def comment_get(team_name, task_title):
    
    team = Team.query.filter_by(name=team_name).first()
    task = Task.query.filter_by(team_id=team.id, title=task_title).first()
    comments = Comment.query.filter_by(task_id=task.id)
    return {
        "comment_list": comments,
        "task_id": task.id,
        "team_id": team.id
    }
    

# Delete a comment and any child comments.
def comment_delete(token, comment_id):
    user = get_user_from_token(token)
    author = get_author_from_comment_id(comment_id)
    
    if (user.id != author.id):
        raise InputError('Comment deletion failed: User must be the author to delete a comment.')
    
    Comment.query.filter_by(id=comment_id).delete()
    return {}
    
# Replace a comment with new content.
def comment_edit(token, team_name, comment_id, task_title, new_content):
    user = get_user_from_token(token)
    author = get_author_from_comment_id(comment_id)
    team = Team.query.filter_by(name=team_name).first()
    
    if (user.id != author.id):
        raise InputError('Comment deletion failed: User must be the author to delete a comment.')
    
    task = Task.query.filter_by(team_id=user.team_id,title=task_title).first()
    if task is None:
        raise InputError('Comment add failed: task could not be found.')
    
    comment = Comment.query.filter_by(id=comment_id)
    comment.content = new_content
    db.session.commit()

    return {
        "author_email": user.email,
        "comment_id": comment.id,
        "task_id": task.id,
        "team_id": team.id
    }

## HELPER FUNCTIONS

def get_task_title_from_comment_id(comment_id):
    comment = Comment.query.filter_by(id=comment_id)
    task = Task.query.filter_by(id=comment.task_id)
    return task.title

# Get the author of a comment, given the comment id.
def get_author_from_comment_id(comment_id):
    comment = Comment.query.filter_by(id=comment_id)
    author = get_user_from_id(comment.author_id)
    return author
    
# Recursively delete all children of a deleted comment. 
### NEEDS TO BE TESTED
def delete_comment_children_recursively(comment_id):
    comment_children = Comment.query.filter_by(parent_id=comment_id)
    for child in comment_children:
        delete_comment_children_recursively(comment_id=child.id)
    
    Comment.query.filter_by(parent_id=comment_id).delete()