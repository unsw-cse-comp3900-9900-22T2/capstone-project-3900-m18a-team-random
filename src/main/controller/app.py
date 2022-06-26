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
app = Flask(__name__)

# generated token---should be updated later
not_used_token_list = []
used_token_list = []
c = 0
while(c < 1000):
    found = False
    while(not found):
        token = random.randint(1000,9000)
        if token in not_used_token_list:
            found = False
        else:   
            not_used_token_list.append(token)
            found = True
    c = c + 1

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

    result = user_profile_service.user_register(email=user_email,username=user_name,password=user_password)
    if (result == "email already taken"): return json.dumps('email already taken')

    return json.dumps('successful registe')

# user login shoule be update later
@app.route('/user-login',methods=['POST'])
def user_login():
    data = request.get_json()
    user_email = data['email']
    user_password = data['password']

    result = user_profile_service.user_log_in(user_email,user_password)
    if (result == 'The user has not registed'): return json.dumps('The user has not registed')

    elif (result == 'The password is incorrect'): return json.dumps('The password is incorrect')

    else:
        if (len(not_used_token_list)<1): return json.dumps('The service is full')

        else:
            token = not_used_token_list[0]
            used_token_list.append(token)
            not_used_token_list.remove(token)
            return json.dumps(token)

# user log out shoule be update later
@app.route('/user-logout',methods=['POST'])
def user_logout():
    data = request.get_json()
    user_token = int(data['token'])

    if (user_token in used_token_list):
        used_token_list.remove(int(user_token))
        not_used_token_list.append(user_token)
        return json.dumps('user logs out')
    else:
        return json.dumps('token invalid')


if __name__ == '__main__':
    # set port number to 8080, threaded = True'
    app.run(host='0.0.00', port=8080, threaded = True)
    