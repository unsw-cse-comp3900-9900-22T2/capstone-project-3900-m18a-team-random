import sys

from sqlalchemy import false, true
sys.path.append('src/main/dal')

import main_task_board

def add_task(task_name, person_name, task_status, task_priority, task_due_date):
    if (main_task_board.search_task(task_name)):
        print("The task was already inserted in task board")
        return False
    main_task_board.add_task(task_name, person_name, task_status, task_priority, task_due_date)
    return True

def delete_task(task_name):
    if(main_task_board.search_task(task_name) == False):
        print("The task was not found")
        return False
    main_task_board.delete_task(task_name)
    return True

def update_task_name(task_name_old, task_name_new):
    if main_task_board.search_task(task_name_old) is False:
        print("The task does not exist, please enter a valid task name you are trying to replace the name with")
        return False
    main_task_board.update_task_name(task_name_old, task_name_new)
    print('new taskname is updated successfully')
    return True 