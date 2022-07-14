from teams import db
from hashlib import sha256


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(60), nullable=False)
    status = db.Column(db.String(20), default='Online')
    team_id = db.Column(db.Integer) 
    
    def __repr__(self):
        return f"User('{self.id}', '{self.username}', '{self.email}', '{self.team_id}')"
    
    def hash_password(self, password):
        self.password_hash = sha256(password.encode()).hexdigest()
    
    def verify_password(self,password):
        return self.password_hash == sha256(password.encode()).hexdigest()
    
    def set_status(self,status):
        self.status = status

    def set_team_id(self,team_id):
        self.team_id = team_id

    def set_password(self,password):
        self.password = password
class UserProfile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.String(200), nullable=True)

    
    def __repr__(self):
        return f"UserProfile('{self.id}', '{self.username}', '{self.email}', '{self.description}')"

    def set_description(self,description):
        self.description = description

class Token(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jwt_token = db.Column(db.String(120),unique=True,nullable=False)
    
    def __repr__(self):
        return f"Token('{self.jwt_token}')"

class ResetCode(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey(User.id))
    reset_code = db.Column(db.String(10),nullable=False)
    
    def __repr__(self):
        return f"ResetCode('{self.reset_code}','{self.user_id}')"
        
class Team(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30),unique=True,nullable=False)
    task_master_id = db.Column(db.Integer,db.ForeignKey(User.id))
    
    def __repr__(self):
        return f"Team('{self.name}')"
    
    def set_name(self,name):
        self.name = name
    
    def set_task_master_id(self, task_master_id):
        self.task_master_id = task_master_id

class UserTeamRelation(db.Model):
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    team_id = db.Column(nullable=False)

    def __repr__(self):
        return f"User_Team_Relation('{self.id}', '{self.user_id}', '{self.team_id}'')"

    def set_user_id(self, user_id):
        self.user_id = user_id
    
    def set_team_id(self,team_id):
        self.team_id = team_id
    
class Epic(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    epic_name = db.Column(db.String(120), nullable=False)   

    def __repr__(self):
        return f"Task('{self.id}','{self.epic_name}'"

class Task(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(200))
    status = db.Column(db.String(10),default='To Do',nullable=False)
    priority = db.Column(db.String(10),default='Medium',nullable=False)
    assignee_email = db.Column(db.String(120),db.ForeignKey(User.email))
    due_date = db.Column(db.String(120))
    team_id = db.Column(db.Integer,db.ForeignKey(Team.id))
    epic_id = db.Column(db.Integer,db.ForeignKey(Epic.id))
    
    def __repr__(self):
        return f"Task('{self.title}','{self.status}','{self.priority}'"
    
    def set_title(self, title):
        self.title = title
        
    def set_description(self, description):
        self.description = description

    def set_status(self, status):
        self.status = status
    
    def set_priority(self, priority):
        self.priority = priority

    def set_assignee_email(self, assignee_email):
        self.assignee_email = assignee_email

    def set_due_date(self, due_date):
        self.due_date = due_date
    
    def set_epic_id(self, epic_id):
        self.epic_id = epic_id
    
class Comment(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    parent_id = db.Column(db.Integer)
    task_id = db.Column(db.Integer, db.ForeignKey(Task.id))
    author_id = db.Column(db.Integer,db.ForeignKey(User.id))
    content = db.Column(db.String(300))
    
    def __repr__(self):
        return f"Comment('{self.content}'"
    