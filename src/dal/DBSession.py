import datetime
from sqlalchemy import Column, String, DateTime, create_engine
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

# connect to database
engine = create_engine('mysql+pymysql://root:5212992@127.0.0.1:3306/test')
# create DBSession
DBSession = sessionmaker(bind=engine)
session = DBSession()

# test for DBSession
'''
new_task = MainTaskBoard(taskname = 'task1', person = 'barry', status = 'undo', priority = 'high', due_date = '2022-7-01')
session.add(new_task)
session.commit()

def show_query_result(rest):
    for task in rest:
        print(task.taskname)

rest = session.query(MainTaskBoard).all()
show_query_result(rest)
'''

    


