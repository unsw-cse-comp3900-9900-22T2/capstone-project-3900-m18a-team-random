import DBSession;
from sqlalchemy import Column, String, DateTime, create_engine, null
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# create base object:
Base = declarative_base()

# define main task object:
class UserProfile(Base):
    # table name:
    __tablename__ = 'userprofile'

    # table structure:
    email = Column(String(20), primary_key=True)
    username = Column(String(20))
    password = Column(String(50))
    
session = DBSession.getSession()

# add user
def add_user(user_email, person_name, pass_word):
    newuser = UserProfile(email = user_email, username = person_name, password = pass_word)
    session.add(newuser)
    session.commit()
    
# delete user
def delete_user(user_email):
    user_willdel = session.query(UserProfile).filter_by(email = user_email).first()
    session.delete(user_willdel)
    session.commit()

# search user by email
def search_user_password_by_email(user_email):
    search_result = session.query(UserProfile).filter_by(email = user_email).first()
    if (None == search_result): 
        return None
    return search_result.password