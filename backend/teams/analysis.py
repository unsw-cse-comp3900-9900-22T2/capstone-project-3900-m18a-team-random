from hashlib import new
import imp
from teams import epic
from teams.error import InputError, AccessError
from teams.models import User, Token, ResetCode, Team, Task, UserTeamRelation, Epic
from teams.auth import get_active_emails, get_active_tokens, get_user_from_token, get_user_from_email
from teams import db
from teams.task import task_get
from teams.team import check_user_is_task_master
import jwt
import datetime
from teams.profile import profile_get_by_email


def task_analysis(token, team_id):
    team = Team.query.filter_by(id=team_id).first()
    user=get_user_from_token(token)
    # check_user_is_task_master(user,team)
    
    epic_result=task_get(token, team_id)['epics']
    today=datetime.date.today()
    all_email=[]
    for task_wrap in epic_result:
        for task in task_wrap['tasks']:
            if task['assignee_email'] not in all_email:
                all_email.append(task['assignee_email'] )

    resp=[]
    
    for email in all_email:
        user_task={
            'username':profile_get_by_email(email)['username'],
            'email':email,
            'score':0
        }
        busy=0
        for task_wrap in epic_result:
            for task in task_wrap['tasks']:
                if task['assignee_email']==email:
                    score=33
                    if task['priority']=='High':
                        score*=1.25
                    elif task['priority']=='Low':
                        score*=0.8
                    if task['status']=='To Do':
                        score*=1.2
                    elif task['status']=='In Progress':
                        score*=1
                    elif task['status']=='Done':
                        score=0
                    
                    if task['due_date'] == '':
                        pass
                    else:
                        due_dt=string2datetime(task['due_date'])
                        # this week due
                        if due_dt.weekday()>=today.weekday() and (due_dt-today).days>=0 and (due_dt-today).days<7:
                            busy+=score
                        # this week not due
                        elif (due_dt-today).days>0:
                            if (due_dt-today).days<7:
                                busy+=score*0.8
                            elif (due_dt-today).days<14:
                                busy+=score*0.6
                            else:
                                busy+=score*0.4
                    
                    pass
        user_task['score']=int(busy)
        resp.append(user_task)
    return resp

    



# help function

def string2datetime(str):
    return datetime.datetime.strptime(str, "%Y-%m-%d").date()
def get_weekday(dt):
    
    pass