from teams.models import Epic, Team
from teams import db
from teams.auth import get_user_from_token
from teams.error import InputError

def epic_create(token, epic, team_name):

    # check the user is valid
    get_user_from_token(token)
    #check if the team exists
    if Team.query.filter_by(name=team_name).first() is None:
        raise InputError('Epic creation failed: the team does not exist')
    epic = Epic(epic_name=epic, team_name=team_name)
    db.session.add(epic)
    db.session.commit()

    return {
        "epic_id": epic.id
    }