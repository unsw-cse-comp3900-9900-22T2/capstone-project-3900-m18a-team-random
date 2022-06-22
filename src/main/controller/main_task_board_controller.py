from concurrent.futures import thread
from crypt import methods
import sys
sys.path.append('src/main/service')

from flask import Flask
from flask import request
import json
import main_task_board_service

app = Flask(__name__)


@app.route('/add-task',methods=['POST'])
def add_task():
    '''
    data = request.get_json()

    task_name = data['taskname']
    person_name = data['person']
    task_status = data['status']
    task_priority = data['priority']
    task_due_date = data['due_date']
    '''

    return json.dumps(main_task_board_service.add_task('task12', 'barry', 'finish', 'high', '2022-07-01'))


if __name__ == '__main__':
    # set port number to 8080, threaded = True'
    app.run(host='0.0.00', port=8080, threaded = True)
    