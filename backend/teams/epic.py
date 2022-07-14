from teams.models import Epic, User
from teams import db
from teams.auth import get_user_from_token
from teams.error import InputError

def epic_create(token, epic):

    # check the user is valid
    user = get_user_from_token(token)
    if user is None:
        raise InputError('user is not exist')
    
    epic = Epic(epic_name=epic)
    db.session.add(epic)
    db.session.commit()

    return {
        "epic_id": epic.id
    }