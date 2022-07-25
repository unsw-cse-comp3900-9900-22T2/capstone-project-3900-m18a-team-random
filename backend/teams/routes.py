from flask import request
from teams import app, db
from teams.models import User, Token, ResetCode, Task, Team
from teams.auth import (
    auth_register,
    auth_login,
    auth_logout
)
from teams.auth_passwordreset import (
    auth_password_reset_request,
    auth_password_reset
)
from teams.task import (
    get_team_from_token,
    get_assigned_task,
    task_get,
    task_add,
    task_delete,
    task_search,
    task_update_all
)
from teams.team import (
    get_team_from_user_token,
    get_team_member_from_user_token,
    team_create,
    team_delete,
    team_update_task_master,
    team_update_team_name,
    team_add_team_member,
    team_leave,
    team_remove_member
)
from teams.comment import (
    comment_add,
    comment_delete,
    comment_edit,
    comment_reply
)
from teams.profile import(
    profile_get,
    profile_add_description
)
from teams.epic import(
    epic_create
)
from teams.invitation import(
    create_invitation,
    get_invitation,
    accept_invitation,
    refuse_invitation
)

from teams.analysis import(
    task_analysis
)
import json
from teams.MyEncoder import MyEncoder

# User Authentication Functions

@app.route("/register", methods=['GET','POST'])
def register():
    data = request.get_json()
    return json.dumps(auth_register(data['email'],data['name'],data['password']), cls=MyEncoder, indent=4)


@app.route("/login",methods=['POST'])
def login():
    data = request.get_json()
    return json.dumps(auth_login(data['email'],data['password']))
        
        
@app.route("/logout",methods=['POST'])
def logout():
    data = request.get_json()
    return json.dumps(auth_logout(data["token"]))
    
# Profile Functions

@app.route("/get_profile",methods=['POST'])
def get_profile():
    # token=request.args.get('token')
    data = request.get_json()
    return json.dumps(profile_get(data['token']))

@app.route("/profile_add_description",methods=['POST'])
def profile_description():
    data = request.get_json()
    return json.dumps(profile_add_description(data['token'],data['description']))

# Password Reset Functions
    
@app.route("/passwordreset/request",methods=['POST'])
def reset_password_request():
    data = request.get_json()
    return json.dumps(auth_password_reset_request(data['email']))

@app.route("/passwordreset/reset",methods=['POST'])
def reset_password():
    data = request.get_json()
    return json.dumps(auth_password_reset(data['password_reset_code'], data['new_password']))
    
# Epic Functions
@app.route("/create-epic",methods=['POST'])
def create_epic():
    data = request.get_json()
    return json.dumps(epic_create(data['token'],data['epic'], data['team_name']))
# Task Functions

@app.route('/add-task', methods=['POST'])
def add_task():
    data = request.get_json()
    title = data['title']
    status = data['status']
    priority = data['priority']
    team_name = data['team_name']
    epic_id = data['epic_id']
    description = data['description']
    assignee_email = data['assignee_email']
    if assignee_email == "":
        # This will set the assignee to the email of the user that created the task, act as a flag for later use
        assignee_email = 'creator'
        
    due_date = data['due_date']
    token = data['token']
    
    return json.dumps(task_add(token,title,status,description, priority,assignee_email,due_date,team_name,epic_id))

@app.route('/delete-task', methods=['POST'])
def delete_task():
    data = request.get_json()
    token = data['token']
    task_title = data['task_title']
    team_name = data['team_name']
    
    return json.dumps(task_delete(token, task_title, team_name))

@app.route('/get-assigned-task', methods=['POST'])
def get_assign_task():
    data = request.get_json()
    token = data['token']
    
    return json.dumps(get_assigned_task(token))

@app.route('/update-task',methods=['POST'])
def update_task():
    data = request.get_json()
    return json.dumps(task_update_all(data['token'], data['title'], data['new_title'],data['status'], data['priority'], data['email'], data['due_date'], data['epic_id'], data['description']))
      
@app.route('/search_task', methods=['GET'])
def search_task():
    data = request.get_json()
    return json.dumps(task_search(data['token'],data['query_string']))

@app.route('/get_task', methods=['POST'])
def get_task():
    data = request.get_json()
    return json.dumps(task_get(data['token'], data['team_id']))

# Invitation Functions
@app.route('/create-invitation', methods=['POST'])
def invitation_create():
    data = request.get_json()
    token = data['token']
    user_email = data['user_email']
    team_name = data['team_name']
    return json.dumps(create_invitation(token, user_email, team_name))

@app.route('/get-invitation', methods=['POST'])
def invitation_get():
    data = request.get_json()
    return json.dumps(get_invitation(data['token']))

@app.route('/accept-invitation', methods=['POST'])
def invitation_accept():
    data = request.get_json()
    return json.dumps(accept_invitation(data['invitation_id']))

@app.route('/refuse-invitation', methods=['POST'])
def invitation_refuse():
    data = request.get_json()
    return json.dumps(refuse_invitation(data['invitation_id']))

# Team Functions
@app.route('/create_team', methods=['POST'])
def create_team():
    data = request.get_json()
    return json.dumps(team_create(data['token'],data['team_name']))

@app.route('/get-team-member', methods=['POST'])
def get_team_member():
    data = request.get_json()
    return json.dumps(get_team_member_from_user_token(data['token'],data['team_name']))
        
@app.route('/get_team', methods=['GET','POST'])
def get_team():
    data = request.get_json()
    return json.dumps(get_team_from_user_token(data['token']))

@app.route('/delete_team', methods=['POST'])
def delete_team():
    data = request.get_json()
    return json.dumps(team_delete(data['token'],data['team_name']))

@app.route('/update_task_master', methods=['POST'])
def update_task_master():
    data = request.get_json()
    return json.dumps(team_update_task_master(data['token'],data['new_task_master_email'],data['team_name']))
    
@app.route('/update_team_name', methods=['POST'])
def update_team_name():
    data = request.get_json()
    return json.dumps(team_update_team_name(data['token'],data['new_team_name'],data['old_team_name']))
    
@app.route('/leave_team',methods=['POST'])
def leave_team():
    data = request.get_json()
    return json.dumps(team_leave(data['token'], data['team_id']))
    
@app.route('/remove_team_member', methods=['POST'])
def remove_team_member():
    data = request.get_json()
    return json.dumps(team_remove_member(data['token'],data['member_email_address']))

# Comment Functions

@app.route('/add_comment', methods=['POST'])
def add_comment():
    data = request.get_json()
    return json.dumps(comment_add(data['token'],data['task_title'],data['comment_content']))
    
@app.route('/delete_comment', methods=['POST'])
def delete_comment():
    data = request.get_json()
    return json.dumps(comment_delete(data['token'],data['comment_id']))
    
@app.route('/edit_comment', methods=['POST'])
def edit_comment():
    data = request.get_json()
    return json.dumps(comment_edit(data['token'],data['comment_id'],data['new_content']))

@app.route('/reply_comment', methods=['POST'])
def reply_comment():
    data = request.get_json()
    return json.dumps(comment_reply(data['token'],data['parent_comment_id'],data['comment_content']))


# Analysis Fuctions

@app.route('/analysis_get', methods=['POST'])
def analysis_get():
    data = request.get_json()
    return json.dumps(task_analysis(data['token'],data['team_id']))