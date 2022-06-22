import DBSession;
from sqlalchemy import Column, String, DateTime, create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# create base object:
Base = declarative_base()

# define main task object:
class UserProfile(Base):
    # table name:
    __tablename__ = 'userprofile'

    # table structure:
    username = Column(String(20), primary_key=True)
    password = Column(String(20))
    
session = DBSession.getSession()

# add task
def add_user(person_name, pass_word):
    newuser = UserProfile(username = person_name, password = pass_word)
    session.add(newuser)
    session.commit()
