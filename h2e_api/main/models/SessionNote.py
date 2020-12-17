from h2e_api.main.models.BaseModel import db
import sqlalchemy
from sqlalchemy import ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import func


class SessionNote(db.Model):
    __tablename__ = 'session_note'

    id = db.Column(UUID(as_uuid=True), primary_key=True, server_default=sqlalchemy.text("uuid_generate_v4()"), )
    session_id = db.Column(ForeignKey('session.id', ondelete='CASCADE'))
    author_id = db.Column(ForeignKey('user.id', ondelete='CASCADE'))

    text = db.Column(db.Text)

    created_at = db.Column(db.DateTime, nullable=False, default=func.now())
