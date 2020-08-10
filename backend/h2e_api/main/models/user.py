from h2e_api.main.models.BaseModel import db
import sqlalchemy
from sqlalchemy import func
from sqlalchemy.dialects.postgresql import UUID
from h2e_api.main.models.enums import UserType


# CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
class User(db.Model):
    id = db.Column(UUID(as_uuid=True), primary_key=True, server_default=sqlalchemy.text("uuid_generate_v4()"), )
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    display_name = db.Column(db.String(32), nullable=False, default="Student")

    user_type = db.Column(db.Enum(UserType, name='user_type'))

    created_at = db.Column(db.DateTime, nullable=False, default=func.now())

    def __repr__(self):
        return '<User {}>'.format(self.username)
