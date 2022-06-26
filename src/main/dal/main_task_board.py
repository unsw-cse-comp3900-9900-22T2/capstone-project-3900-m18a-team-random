import DBSession
from sqlalchemy import Column, String, DateTime, create_engine, null
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base


# create base object:
Base = declarative_base()

# define main task object:
class MainTaskBoard(Base):
    # table name:
    __tablename__ = 'maintaskboard'

    # table structure:
    taskname = Column(String(50), primary_key=True)
    person = Column(String(20))
    status = Column(String(10))
    priority = Column(String(10))
    due_date = Column(String(10))

session = DBSession.getSession()

# test for connection
'''
new_task = MainTaskBoard(taskname = 'task2', person = 'barry', status = 'undo', priority = 'high', due_date = '2022-7-01')
session.add(new_task)
session.commit()

def show_query_result(rest):
    for task in rest:
        print(task.taskname)

rest = session.query(MainTaskBoard).all()
show_query_result(rest)
'''
# search task
def search_task(task_name):
    task_result = session.query(MainTaskBoard).filter_by(taskname = task_name).first()
    if (None != task_result): 
        return True
    return False

# add task
def add_task(task_name, person_name, task_status, task_priority, task_due_date):
    new_task = MainTaskBoard(taskname = task_name, person = person_name, status = task_status, priority = task_priority, due_date = task_due_date)
    session.add(new_task)
    session.commit()

# delete task by task_name
def delete_task(task_name):
    task_willdel = session.query(MainTaskBoard).filter_by(taskname = task_name).all()
    for task in task_willdel:
        session.delete(task)
        session.commit()

# update task's executor by task_name
def update_executor(task_name, person_name):
    task_result = session.query(MainTaskBoard).filter_by(taskname = task_name).first()
    task_result.person = person_name
    session.commit()

# update task's status by task_name
def update_task_status(task_name, task_status):
    task_result = session.query(MainTaskBoard).filter_by(taskname = task_name).first()
    task_result.status = task_status
    session.commit()

# update task's priority by task_name
def update_task_priority(task_name, task_priority):
    task_result = session.query(MainTaskBoard).filter_by(taskname = task_name).first()
    task_result.priority = task_priority
    session.commit()

# update task's due date by task_name
def update_task_due_date(task_name, task_due_date):
    task_result = session.query(MainTaskBoard).filter_by(taskname = task_name).first()
    task_result.due_date= task_due_date
    session.commit()

# update task name
def update_task_name(task_name_old, task_name_new):
    task_result = session.query(MainTaskBoard).filter_by(taskname = task_name_old).all()
    for task in task_result:
        task.taskname = task_name_new
        session.commit()

