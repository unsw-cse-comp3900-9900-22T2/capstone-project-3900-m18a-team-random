from ast import Raise
from teams.auth import get_user_from_token, get_user_from_email
from teams.team import team_add_team_member
from teams.error import InputError, AccessError
from teams.models import Invitation
from teams import db

# create invitation
def create_invitation(token, user_email, team_name):
    inviter = get_user_from_token(token)
    if(inviter is None): raise InputError("token is invalid")
    
    invitation_history = Invitation.query.filter_by(email=user_email,team_name = team_name).first()
    if invitation_history is not None: raise AccessError("The invitation already sent")

    invitation = Invitation(email = user_email, team_name = team_name, inviter_id = inviter.id)
    db.session.add(invitation)
    db.session.commit()

    return {"invitation_id": invitation.id}

# get invitation
def get_invitation(token):
    user = get_user_from_token(token)
    invitations = Invitation.query.filter_by(email=user.email).all()
    invitation_list = []
    for invitation in invitations:
        if invitation is None:
            continue
        else:
            resp = {"invitation_id":invitation.id,"email":invitation.email,"team_name":invitation.team_name,"inviter_id":invitation.inviter_id}
            invitation_list.append(resp)
    return invitation_list

# accept invitation
def accept_invitation(invitation_id):
    invitation = Invitation.query.filter_by(id=invitation_id).first()
    if invitation is None:
        raise InputError("invalid invitation_id")
    team_add_team_member(invitation.inviter_id,invitation.email,invitation.team_name)
    db.session.delete(invitation)
    db.session.commit()
    return "success accept invitation"
    
# refuse invitation
def refuse_invitation(invitation_id):
    invitation = Invitation.query.filter_by(id=invitation_id).first()
    if invitation is None:
        raise InputError("invalid invitation_id")
    db.session.delete(invitation)
    db.session.commit()
    
    return "success refuse invitation"