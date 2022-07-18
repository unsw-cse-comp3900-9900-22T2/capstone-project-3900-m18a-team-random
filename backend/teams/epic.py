from teams.models import Epic, Team, UserTeamRelation
from teams import db
from teams.auth import get_user_from_token
from teams.error import InputError

def epic_create(token, epic, team_name):
    epic_list = []
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
    epic_list.append(epic.id)
    db.session.add(epic)
    db.session.commit()

    return epic_list

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