from h2e_api.main.models.BaseModel import db
import sqlalchemy
from sqlalchemy import func
from sqlalchemy import ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from h2e_api.main.models.enums import UserType, UserStatus
from werkzeug.security import generate_password_hash, check_password_hash


# CREATE EXTENSION IF NOT EXISTS 1"uuid-ossp";
class User(db.Model):
    id = db.Column(UUID(as_uuid=True), primary_key=True, server_default=sqlalchemy.text("uuid_generate_v4()"), )
    name = db.Column(db.String(64))
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    display_name = db.Column(db.String(32), nullable=False, default="Student")

    has_temp_pass = db.Column(db.Boolean, default=False)

    last_login = db.Column(db.DateTime, nullable=True)

    user_type = db.Column(db.Enum(UserType, name='user_type'))

    # Student users will have a reference to their school
    school = db.Column(ForeignKey('school.id'))

    teams_user_id = db.Column(db.String(64))

    user_status = db.Column(db.Enum(UserStatus, name='user_status'))
    timezone = db.Column(db.String(16), nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=func.now())

    def __repr__(self):
        return '<User {}>'.format(self.username)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
