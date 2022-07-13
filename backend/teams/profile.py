import email
from hashlib import new
from teams.error import InputError, AccessError
from lib2to3.pgen2.pgen import generate_grammar
import sys
import random
from teams.models import UserProfile, Token, ResetCode, Team, Task
from teams.auth import get_user_from_token, get_user_from_email
from teams.task import get_user_and_team_from_token
import re
from teams import db
import jwt



def profile_get(token):

    print(token)
    user=get_user_from_token(token)
    print(user)
    userProfile = UserProfile.query.filter_by(email=user.email).first()
    if userProfile is None:
        userProfile=UserProfile(username=user.username, email=user.email)
    print(userProfile)
    return {
        "username":userProfile.username,
        "email":userProfile.email,
        "description":userProfile.description
    }

def profile_add_description(token,description):

    user=get_user_from_token(token)
    userProfile = UserProfile.query.filter_by(email=user.email).first()
    if userProfile is None:
        userProfile=UserProfile(username=user.username, email=user.email)
        db.session.add(userProfile)
    userProfile.set_description(description)
    db.session.commit()
    return {
        "username":userProfile.username,
        "email":userProfile.email,
        "description":userProfile.description
    }
    

