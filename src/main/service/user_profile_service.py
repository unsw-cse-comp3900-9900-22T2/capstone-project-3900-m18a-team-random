from hashlib import new
from lib2to3.pgen2.pgen import generate_grammar
import sys
import re
import tokens
sys.path.append('src/main/dal')

from hashlib import sha256
import random
import jwt
import user_profile



# Creates a user and adds them to the database.
def user_register(email, username, password):
    if valid_email(email) is False or (user_profile.user_email_already_exists(email)): 
        return False
    
    user_profile.add_user(email, username, encrypt(password))
    return True

# user log in
def user_log_in(email, password):
    if valid_email(email) is False:
        return "Error - Invalid Email."

    encrypted_user_password = user_profile.get_encrypted_password(email)
    if encrypted_user_password is None:
        return "Error - no account matching the provided email address has been found."
    elif encrypted_user_password != encrypt(password):
        return "Error - incorrect password."
    else:
        return "Login Success!"
        
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
    


