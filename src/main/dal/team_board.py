import DBSession;
from sqlalchemy import Column, String, BigInteger, create_engine, null
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# create base object:
Base = declarative_base()

# define main task object:
class TeamBoard(Base):
    # table name:
    __tablename__ = 'userprofile'

    # table structure:
    team_id = Column(BigInteger, primary_key=True)
    teamname = Column(String(50))
   
session = DBSession.getSession()