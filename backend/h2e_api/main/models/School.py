from h2e_api.main.models.BaseModel import db
import sqlalchemy
from sqlalchemy import func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.dialects.postgresql.json import JSONB


class School(db.Model):
    id = db.Column(UUID(as_uuid=True), primary_key=True, server_default=sqlalchemy.text("uuid_generate_v4()"), )
    display_name = db.Column(db.String(64))

    config = db.Column(JSONB) # Config settings for UI
    logo_url = db.Column(db.String(64)) # Should be url to resource in S3
    meeting_platform = db.Column(db.String(12)) # Platform used for meetings: Zoom or MSFT Teams

    created_at = db.Column(db.DateTime, nullable=False, default=func.now())
