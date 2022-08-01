from hashlib import new, sha256
from teams.error import InputError, AccessError
from lib2to3.pgen2.pgen import generate_grammar
import sys
import random
from teams.models import User, Token, ResetCode, Team, Task, UserProfile
import re
from teams import db
import jwt

TOKEN_SECRET_KEY = "COMP3900_TEAM_RANDOM_MONDAY"
ONLINE = 'Online'
OFFLINE = 'Offline'
AWAY = 'Away'

### MAIN FUNCTIONS ###

# Creates a user instance and adds them to the database.
def auth_register(email, username, password):

    if valid_email(email) is False:
        raise InputError("Email is invalid.")
    elif user_email_already_exists(email): 
        raise InputError("A user with that email already exists.")
    elif user_name_already_exists(username):
        raise InputError("A user with that username already exists.")
    
    # Create new instance of a User and add to the database
    user = User(username=username,email=email)
    
    # User password must be encrypted before being saved to database
    user.hash_password(password)
    db.session.add(user)
    db.session.commit()

    #set the status to offline
    user.set_status(OFFLINE)
    db.session.commit()

    # create profile
    userProfile = UserProfile.query.filter_by(email=email).first()
    if userProfile is None:
        user_profile=UserProfile(username=user.username, email=user.email)
        db.session.add(user_profile)
        db.session.commit()

    # Generate a JWT token for the newly added user
    token = generate_token(email)
    db.session.add(token)
    db.session.commit()
        
    user = get_user_from_email(email)
    response = {
        "u_id": user.id,
        "token": token.jwt_token
    }
    return response

# Logs out a user and removes their token from the database.
def auth_logout(jwt_token):
    print(jwt_token)
    # Get the token object associated with the user
    token_to_remove = db.session.query(Token).filter_by(jwt_token=jwt_token).first()
    is_success = False
    
    # Set status to offline
    user_id = get_user_id_from_token(jwt_token)
    user = db.session.query(User).filter_by(id=user_id).first()
    user.set_status(OFFLINE)
    db.session.commit()
    
    
    # Remove token from database
    if token_to_remove is not None:
        is_success = True
        db.session.query(Token).filter_by(jwt_token=jwt_token).delete()
        db.session.commit()
        
    return {
        "is_success": is_success
    }

# Logs in a user given their email and password. Generates a new token if necessary.
def auth_login(email, password):
    if login_details_are_correct(email, password):
        user = get_user_from_email(email)
        user.set_status(ONLINE)
        db.session.commit()
        user_id = user.id
        
        # Return the same active token if the user has been logged in.
        # If not, generate a new token.
        active_token = next(
            (
                existing_token
                for existing_token in get_active_tokens()
                if get_user_id_from_token(existing_token) == user_id
            ),
            None,
        )
        
        if active_token is None:
            token = generate_token(email)
            active_token = token.jwt_token
            db.session.add(token)
            db.session.commit()
        response = {
            "u_id": user_id,
            "token": active_token
        }
        return response

## HELPER FUNCTIONS

# Helper function decode the JWT.
def jwt_decode(token):
    try:        return jwt.decode(token.encode("utf-8"), TOKEN_SECRET_KEY,algorithms=["HS256"])
    except jwt.exceptions.InvalidTokenError:
        raise AccessError("Decoding token failure.")

# Helper function to get the User ID from a token.
def get_user_id_from_token(token):
    if token not in get_active_tokens():
        raise AccessError("Invalid token.")
    
    return jwt_decode(token)["id"]

# Helper function to verify login details. Returns True if email and password match,
# and raises Input Error if user does not exist or password is incorrect.
def login_details_are_correct(email,password):
    user = User.query.filter_by(email=email).first()
    if user is None:
        raise InputError("Couldn't find your Teams account - no account exists with this email address.")
        
    if user.verify_password(password):
        return True
    else:
        raise InputError("Wrong password.")

# Helper function encode a dictionary containing user information.
def jwt_encode(user_info):
    return jwt.encode(user_info, TOKEN_SECRET_KEY,algorithm="HS256").decode('utf-8')

# Helper function to return a dictionary containing the user id, email and username.
def get_user_info(user):
    return {
        "id": user.id,
        "email": user.email,
        "username": user.username
    }

# Helper function to generate a JWT given an existing email.
def generate_token(email):
    if email not in get_active_emails():
        raise InputError('email not found')
    user = get_user_from_email(email)
    user_info = get_user_info(user)
    return Token(jwt_token=jwt_encode(user_info))
    
# Helper function to return a dictionary containing all jwt tokens from the database.
def get_active_tokens():
    active_tokens = []
    token_list = Token.query.all()
    for token in token_list:
        active_tokens.append(token.jwt_token)
        
    return active_tokens

# Helper function to return a user object, given that the provided email exists in the database.
def get_user_from_email(email):
    if email not in get_active_emails():
        raise InputError('email not found')
    return User.query.filter_by(email=email).first()
    
# Helper function to return a user object, given their user id
def get_user_from_id(id):
    if id not in get_active_user_ids():
         raise InputError('user not found')
    return User.query.filter_by(id=id).first()

# Helper function to return a user object from a token
def get_user_from_token(token):
    if token not in get_active_tokens():
        raise InputError('Token failure: user could not be found')
    token = jwt_decode(token)
    user_id = token["id"]
    #user_token = db.session.query(User).filter_by(jwt_token=token).first()
    
    user = User.query.filter_by(id=user_id).first()
    return user
# Helper function to check if a User with the specified username already exists in the database.
def user_email_already_exists(email):
    if User.query.filter_by(email=email).first() is None:
        return False
    return True

# Helper function to check if a User with the specified email already exists in the database.
def user_name_already_exists(username):
    if User.query.filter_by(username=username).first() is None:
        return False
    return True
    


# Helper function to encrypt password and return the hex representation.
# The length of the encrypted password is 64 characters.
def encrypt(password):
    return sha256(password.encode()).hexdigest()

# Helper function for validating an email.
def valid_email(email):
    regex = r"^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$"
    if re.search(regex, email):
        return True
    
    return False

def get_active_emails():
    active_emails = []
    user_list = User.query.all()
    for user in user_list:
        active_emails.append(user.email)

    return active_emails

def get_active_user_ids():
    active_user_ids = []
    user_list = User.query.all()
    for user in user_list:
        active_user_ids.append(user.id)

    return active_user_ids