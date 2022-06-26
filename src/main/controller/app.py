from ast import Not
from concurrent.futures import thread
from crypt import methods
import sys
sys.path.append('src/main/service')

from flask import Flask, abort
from flask import request
import json
import random
import main_task_board_service
import user_profile_service
import tokens

app = Flask(__name__)

# generated token---should be updated later


@app.route('/add-task',methods=['POST'])
def add_task():
    
    data = request.get_json()

    task_name = data['taskname']
    person_name = data['person']
    task_status = data['status']
    task_priority = data['priority']
    task_due_date = data['due_date']

    result = main_task_board_service.add_task(task_name, person_name, task_status, task_priority, task_due_date)

    if(result == False):
        return json.dumps('Fail to add task in task management')
    
    return json.dumps('Success to add task in task management')

@app.route('/delete-task',methods=['POST'])
def delete_task():
    data = request.get_json()

    task_name = data['taskname']

    result = main_task_board_service.delete_task(task_name)

    if(result == False):
        return json.dumps('Fail to delete task in task management')
    
    return json.dumps('Success to delete task in task management')

@app.route('/user-register',methods=['POST'])
def user_register():
    data = request.get_json()
    user_email = data['email']
    user_name = data['name']
    user_password = data['password']

    registration_passed = user_profile_service.user_register(email=user_email,username=user_name,password=user_password)
    if registration_passed:
        token = tokens.generate_token(user_email)
        tokens.active_tokens.append(token)
        return json.dumps(token)
    else:
        return json.dumps('Registration Unsuccessful - an account linked to this email address already exists.')

# Login a user, given their email and password.
@app.route('/user-login',methods=['POST'])
def user_login():
    data = request.get_json()
    user_email = data['email']
    user_password = data['password']

    result = user_profile_service.user_log_in(user_email,user_password)
    if 'Error' in result:
        return json.dumps(result)
    else:
        token = tokens.generate_token(user_email)
        tokens.active_tokens.append(token)
        return json.dumps(token)

# Logout a user.
@app.route('/user-logout',methods=['POST'])
def user_logout():
    data = request.get_json()
    token = data['token']
    
    if token in tokens.active_tokens:
        tokens.active_tokens.remove(token)
        return json.dumps('User logged out successfully.')
    else:
        return json.dumps('Error - Invalid Token.')


if __name__ == '__main__':
    # set port number to 8080, threaded = True'
    app.run(host='0.0.00', port=8080, threaded = True)
    