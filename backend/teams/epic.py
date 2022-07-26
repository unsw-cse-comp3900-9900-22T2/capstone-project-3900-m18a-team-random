from teams.models import Epic, Team, UserTeamRelation, Task
from teams import db
from teams.auth import get_user_from_token
from teams.error import InputError

def epic_create(token, epic, team_name):
    #check if user is in the team
    user = get_user_from_token(token)
    team = get_team_from_team_name(team_name)
    relation = db.session.query(UserTeamRelation).filter_by(user_id=user.id,team_id=team.id).first()
    if relation is None:
        raise InputError(f'Epic creation failed: User is not a member of {team_name}')
    #check if the team exists
    if Team.query.filter_by(name=team_name).first() is None:
        raise InputError('Epic creation failed: the team does not exist')
    if Epic.query.filter_by(epic_name=epic, team_name=team_name).first() is not None:
        raise InputError('Epic creation failed: this epic already exists in this team')
    epic = Epic(epic_name=epic, team_name=team_name)
    db.session.add(epic)
    db.session.commit()

    return {"epic_id":epic.id, "epic_name": epic.epic_name}

def epic_delete(token, epic):
    #check if user is in the team
    epic = Epic.query.filter_by(epic_name=epic).first()
    if epic is None:
         raise InputError('Epic deletion failed: epic name is invalid, this epic can not be found')
    user = get_user_from_token(token)
    team = get_team_from_epic_id(epic.id)
    if team is None:
        raise InputError('Epic deletion failed: the team does not exist')
    relation = db.session.query(UserTeamRelation).filter_by(user_id=user.id,team_id=team.id).first()
    if relation is None:
        raise InputError(f'Epic deletion failed: User is not a member of {team.name}')
    #delete all the tasks under this epic
    Task.query.filter_by(epic_id=epic.id).delete()
    db.session.commit()
    #delete this epic
    Epic.query.filter_by(id=epic.id).delete()
    db.session.commit()
    

    return {}

def get_team_from_team_name(team_name):
    if team_name not in get_active_teams():
        raise InputError('invalid team name')
    return Team.query.filter_by(name=team_name).first()


def get_active_teams():
    active_teams = []
    team_list = Team.query.all()
    for team in team_list:
        active_teams.append(team.name)
        
    return active_teams
def get_team_from_epic_id(epic_id):
    if int(epic_id) not in get_epic_ids():
        raise InputError('invalid epic id')
    epic = Epic.query.filter_by(id=int(epic_id)).first()
    team = get_team_from_team_name(epic.team_name)
    if team is None:
        raise InputError('team is not found with this epic id')
    return team

def get_epic_ids():
    epic_ids = []
    epic_list = Epic.query.all()
    for epic in epic_list:
        epic_ids.append(epic.id)

    return epic_ids