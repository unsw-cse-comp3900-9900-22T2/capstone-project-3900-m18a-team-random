from hashlib import new
from lib2to3.pgen2.pgen import generate_grammar
import sys
sys.path.append('src/main/dal')

import random
import user_profile

# user register
def user_register(email, username, password):
    result = user_profile.search_user_password_by_email(email)
    if (result != None): return "email already taken"
    user_profile.add_user(email, username, password)
    return "successful registe"

# user log in
def user_log_in(email, password):
    user_password = user_profile.search_user_password_by_email(email)
    if (user_password == None): return "The user has not registed"
    
    elif (user_password != password): return "The password is incorrect"
   
    else:
        return "success log in"

    


