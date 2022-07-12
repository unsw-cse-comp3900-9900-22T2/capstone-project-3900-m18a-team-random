from hashlib import new
from teams.error import InputError, AccessError
from teams.models import User, Token, ResetCode, Team, Task, Comment
from teams.auth import get_user_from_token, get_user_from_email, get_user_from_id
from teams import db
import jwt


## MAIN FUNCTIONS

# Add a comment to a task
def comment_add(token, task_title, comment_content):

    user = get_user_from_token(token)
    task = Task.query.filter_by(team_id=user.team_id,title=task_title).first()
    if task is None:
        raise InputError('Comment add failed: task could not be found.')
    
    comment = Comment(parent_id=0,task_id=task.id,author_id=user.id,content=comment_content)
    db.session.add(comment)
    db.session.commit()
    
    return {
        "comment_id": comment.id
    }
    
# Delete a comment and any child comments.
def comment_delete(token, comment_id):
    user = get_user_from_token(token)
    author = get_author_from_comment_id(comment_id)
    
    if (user.id != author.id):
        raise InputError('Comment deletion failed: User must be the author to delete a comment.')
    
    delete_comment_children_recursively(comment_id)
    Comment.query.filter_by(id=comment_id).delete()
    
# Replace a comment with new content.
def comment_edit(token, comment_id, new_content):
    user = get_user_from_token(token)
    author = get_author_from_comment_id(comment_id)
    
    if (user.id != author.id):
        raise InputError('Comment deletion failed: User must be the author to delete a comment.')
    
    comment = Comment.query.filter_by(id=comment_id)
    comment.content = new_content

    return {
        "comment_id": comment.id
    }
    

# Reply to an existing comment.
def comment_reply(token, parent_comment_id, comment_content):
    user = get_user_from_token(token)
    task_title = get_task_title_from_comment_id(parent_comment_id)
    task = Task.query.filter_by(team_id=user.team_id,title=task_title).first()

    comment = Comment(parent_id=parent_comment_id,task_id=task.id,author_id=user.id,content=comment_content)
    db.session.add(comment)
    db.session.commit()
    
    return {
        "comment_id": comment.id
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