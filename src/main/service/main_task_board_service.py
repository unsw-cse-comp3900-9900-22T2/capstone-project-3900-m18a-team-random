import sys
from turtle import update
from error import InputError, AccessError
from sqlalchemy import false, true
sys.path.append('src/main/dal')

import main_task_board

def add_task(task_name, person_name, task_status, task_priority, task_due_date):
    if (main_task_board.search_task(task_name)):
        raise InputError("The task was already inserted in task board")
    main_task_board.add_task(task_name, person_name, task_status, task_priority, task_due_date)
    return {"task_name": task_name}

def delete_task(task_name):
    if(main_task_board.search_task(task_name) == False):
        raise InputError("The task was not found")
    main_task_board.delete_task(task_name)
    return {"task_name": task_name}

def update_task_name(task_name_old, task_name_new):
    if main_task_board.search_task(task_name_old) is False:
        raise InputError("The task does not exist, please enter a valid task name you are trying to replace the name with")
    main_task_board.update_task_name(task_name_old, task_name_new)
    return {"task_name_old":task_name_old, "task_name_new": task_name_new}
