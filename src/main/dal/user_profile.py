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
    email = Column(String(20), primary_key=True, nullable=False)
    username = Column(String(20), unique=True)
    password = Column(String(64))
    
session = DBSession.getSession()

# Adds a user to the database
def add_user(user_email, person_name, pass_word):
    new_user = UserProfile(email = user_email, username = person_name, password = pass_word)
    session.add(new_user)
    session.commit()
    
# Deletes a user from the database
def delete_user(user_email):
    user_to_delete = session.query(UserProfile).filter_by(email = user_email).first()
    session.delete(user_to_delete)
    session.commit()

# Check if the email of a user already exists in the database.
def user_email_already_exists(user_email):
    user = session.query(UserProfile).filter_by(email = user_email).first()
    if (user == None): 
        return True
    return False

# Check if the email of a user already exists in the database.
def get_encrypted_password(user_email):
    user = session.query(UserProfile).filter_by(email = user_email).first()
    if (user == None): 
        return None 
    
    return user.password