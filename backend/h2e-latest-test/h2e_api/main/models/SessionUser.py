from h2e_api.main.models.BaseModel import db
import sqlalchemy
from sqlalchemy import ForeignKey
from sqlalchemy.dialects.postgresql import UUID


# CREATE EXTENSION IF NOT EXISTS 1"uuid-ossp";
class SessionUser(db.Model):
    __tablename__ = 'session__user'

    id = db.Column(UUID(as_uuid=True), primary_key=True, server_default=sqlalchemy.text("uuid_generate_v4()"), )
    session_id = db.Column(ForeignKey('session.id', ondelete='CASCADE'))
    user_id = db.Column(ForeignKey('user.id', ondelete='CASCADE'))
