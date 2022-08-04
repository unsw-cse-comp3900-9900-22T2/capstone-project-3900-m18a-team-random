from teams.error import InputError, AccessError
import random
from teams.models import User, Token, ResetCode, Team, Task
from teams import db
import jwt
import smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from teams.auth import get_user_from_email
import string

PASSWORD_RESET_CODE_LENGTH = 10
SENDER_EMAIL = "comp1531mangoteam2@gmail.com"
PASSWORD = "mangosquad123"
APP_PASSWORD = "xpcuaufjkhdacxdk"
PORT = 465

# Sends user an email with a randomly generated reset code to use to reset their password.
def auth_password_reset_request(email):

    # Check if the input user email is in the database
    # and get user info
    user = get_user_from_email(email)
    if user is None:
        raise InputError("Couldn't find your Teams account - no account exists with this email address.")

    
    # Refresh existing reset codes associated with the user or generate a new reset code.
    existing_reset_code = db.session.query(ResetCode).filter_by(user_id=user.id).first()
    new_reset_code = generate_password_reset_code()
    if existing_reset_code is None:
        password_reset_code = ResetCode(user_id=user.id, reset_code = new_reset_code)
        db.session.add(password_reset_code)
        db.session.commit()
    else:
        existing_reset_code.set_reset_code(new_reset_code)
    
    # Send email to the user containing the reset code
    send_password_reset_email(user, new_reset_code)
    return {}

# Resets a user's password with new_password given the correct password reset code and
# then invalidates the reset code.
def auth_password_reset(password_reset_code, new_password):
    reset_code = db.session.query(ResetCode).filter_by(reset_code=password_reset_code).first()
    user_id = None

    for code in db.session.query(ResetCode).all():
        if code.reset_code == password_reset_code:
            reset_code = code
            user_id = code.user_id
            
    
    if reset_code is not None:
        # Set new encrypted pass
        user = db.session.query(User).filter_by(id=user_id).first()
        print(user)
        user.hash_password(new_password)
        db.session.commit()
        
        # Delete the password reset code as it has now been used
        db.session.query(ResetCode).filter_by(user_id=user_id).delete()
        
    return {}

# Helper functions

# Generates a random alphanumeric 10-character string.
def generate_password_reset_code():
    alphanumeric_chars = string.ascii_letters + string.digits
    password_reset_code = "".join(random.choice(alphanumeric_chars) for i in range(PASSWORD_RESET_CODE_LENGTH))
    return password_reset_code

def send_password_reset_email(user, password_reset_code):
    
    # Establish email parameters
    message = MIMEMultipart("alternative")
    message["Subject"] = "Teams: Request to reset password"
    message["From"] = SENDER_EMAIL
    message["To"] = user.email

    # Construct message
    text = """\
    Hi {name},
    
    Please use the following code to reset your password.
    Code: {password_reset_code}
    
    Regards,
    Teams
    """.format(name=user.username, password_reset_code=password_reset_code)
    
    text = MIMEText(text,"plain")
    message.attach(text)
    
    # Send message
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", PORT, context=context) as server:
        server.login(SENDER_EMAIL, APP_PASSWORD)
        server.sendmail(SENDER_EMAIL, user.email, message.as_string())
    