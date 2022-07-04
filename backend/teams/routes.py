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
    task_add,
    task_delete,
    task_update_name,
    task_update_description,
    task_update_priority,
    task_update_due_date,
    task_update_status,
    task_update_assignee
)
from teams.team import (
    team_create,
    team_delete,
    team_update_task_master,
    team_update_team_name,
    team_add_team_member,
    team_leave,
    team_remove_member
)
import json

# User Authentication Functions

@app.route("/register", methods=['GET','POST'])
def register():
    data = request.get_json()
    return json.dumps(auth_register(data['email'],data['name'],data['password']))


@app.route("/login",methods=['POST'])
def login():
    data = request.get_json()
    return json.dumps(auth_login(data['email'],data['password']))
        
        
@app.route("/logout",methods=['POST'])
def logout():
    data = request.get_json()
    return json.dumps(auth_logout(data["token"]))
    
    
# Password Reset Functions
    
@app.route("/passwordreset/request",methods=['POST'])
def reset_password_request():
    data = request.get_json()
    return json.dumps(auth_password_reset_request(data['email']))

@app.route("/passwordreset/reset",methods=['POST'])
def reset_password():
    data = request.get_json()
    return json.dumps(auth_password_reset(data['password_reset_code'], data['new_password']))
    

# Task Functions

@app.route('/add-task', methods=['POST'])
def add_task():
    data = request.get_json()
    title = data['title']
    status = data['status']
    priority = data['priority']
    
    if 'assignee_email' in data.keys():
        assignee_email = data['assignee_email']
    else:
        # This will set the assignee to the email of the user that created the task.
        assignee_email = 'creator'
    
    due_date = data['due_date']
    token = data['token']
    
    return json.dumps(task_add(token,title,status,priority,assignee_email,due_date))

@app.route('/delete-task', methods=['POST'])
def delete_task():
    data = request.get_json()
    token = data['token']
    team_name = data['team_name']
    task_title = data['task_title']
    
    return json.dumps(task_delete(token, team_name, task_title))

@app.route('/update-task-name',methods=['POST'])
def update_task_name():
    data = request.get_json()
    return json.dumps(task_update_name(data['token'],data['old_task_title'],data['new_task_title']))
    
@app.route('/update-task-description',methods=['POST'])
def update_task_description():
    data = request.get_json()
    return json.dumps(task_update_description(data['token'],data['task_title'],data['description']))
    
@app.route('/update-task-priority',methods=['POST'])
def update_task_priority():
    data = request.get_json()
    return json.dumps(task_update_priority(data['token'],data['task_title'],data['priority']))

@app.route('/update-task-status', methods=['POST'])
def update_task_status():
    data = request.get_json()
    return json.dumps(task_update_status(data['token'],data['task_title'],data['status']))

@app.route('/update-task-duedate',methods=['POST'])
def update_task_due_date():
    data = request.get_json()
    return json.dumps(task_update_due_date(data['token'],data['task_title'],data['due_date']))

@app.route('/update-task-assignee', methods=['POST'])
def update_task_assignee():
    data = request.get_json()
    return json.dumps(task_update_assignee(data['token'],data['task_title'],data['assignee_email']))
    
# Team Functions

@app.route('/create_team', methods=['POST'])
def create_team():
    data = request.get_json()
    return json.dumps(team_create(data['token'],data['team_name']))
    
@app.route('/delete_team', methods=['POST'])
def delete_team():
    data = request.get_json()
    return json.dumps(team_delete(data['token']))

@app.route('/update_task_master', methods=['POST'])
def update_task_master():
    data = request.get_json()
    return json.dumps(team_update_task_master(data['token'],data['new_task_master_email']))
    
@app.route('/update_team_name', methods=['POST'])
def update_team_name():
    data = request.get_json()
    return json.dumps(team_update_team_name(data['token'],data['new_team_name']))

@app.route('/add_team_member', methods=['POST'])
def join_team():
    data = request.get_json()
    return json.dumps(team_add_team_member(data['token'],data['member_email_address']))
    
@app.route('/leave_team',methods=['POST'])
def leave_team():
    data = request.get_json()
    return json.dumps(team_leave(data['token']))
    
@app.route('/remove_team_member', methods=['POST'])
def remove_team_member():
    data = request.get_json()
    return json.dumps(team_remove_member(data['token'],data['member_email_address']))
    