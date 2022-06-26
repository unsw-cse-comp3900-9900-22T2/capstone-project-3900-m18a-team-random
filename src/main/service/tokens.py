import jwt

TOKEN_SECRET_KEY = 'COMP3900_TEAM_RANDOM'

active_tokens = []

def jwt_encode(user_info):
    return jwt.encode(user_info, TOKEN_SECRET_KEY, algorithm="HS256").decode("utf-8")

def generate_token(email):
    
    token = jwt_encode(email)
    active_tokens.append(token)
    
    return token