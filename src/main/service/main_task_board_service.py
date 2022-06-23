import sys
sys.path.append('src/main/dal')

import main_task_board

def add_task(task_name, person_name, task_status, task_priority, task_due_date):
    if (main_task_board.search_task(task_name)):
        print("The task was already inserted in task board")
        return False
    main_task_board.add_task(task_name, person_name, task_status, task_priority, task_due_date)
    return True
