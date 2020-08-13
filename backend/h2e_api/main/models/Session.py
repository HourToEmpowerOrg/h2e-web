from h2e_api.main.models.BaseModel import db
import sqlalchemy
from sqlalchemy import func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.dialects.postgresql.json import JSONB
from sqlalchemy import TIMESTAMP
from sqlalchemy import Interval
from sqlalchemy import Index


# CREATE EXTENSION IF NOT EXISTS 1"uuid-ossp";
class Session(db.Model):
    id = db.Column(UUID(as_uuid=True), primary_key=True, server_default=sqlalchemy.text("uuid_generate_v4()"), )
    title = db.Column(db.String(64))

    start_time = db.Column(TIMESTAMP(timezone=True))
    end_time = db.Column(TIMESTAMP(timezone=True))
    duration = db.Column(Interval)

    created_at = db.Column(db.DateTime, nullable=False, default=func.now())

    # This may change as we know more about the structure of tutoring sessions
    session_info = db.Column(JSONB)

    __table_args__ = (
        Index('session__start_time__idx', 'start_time'),
    )
