import datetime
from sqlalchemy import Column, String, DateTime, create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# create base object:
Base = declarative_base()

# connect to database
engine = create_engine('mysql+pymysql://root:5212992@127.0.0.1:3306/test')
# create DBSession
# session = DBSession()
DBSession = sessionmaker(bind=engine)


def getSession():
    return DBSession()


    


