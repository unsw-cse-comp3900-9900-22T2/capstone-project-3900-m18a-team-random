import sys
sys.path.append('src/main/dal')

import user_profile

# add user
def add_user(username, password):
    user_profile.add_user(username, password)

