from h2e_api.main.models.BaseModel import db
from sqlalchemy.dialects.postgresql import UUID
import sqlalchemy
from sqlalchemy import ForeignKey
from sqlalchemy import func


class SchoolApplication(db.Model):
    __tablename__ = 'school_application'
    id = db.Column(UUID(as_uuid=True), primary_key=True, server_default=sqlalchemy.text("uuid_generate_v4()"), )
    school_name = db.Column(db.String(120))
    school_city = db.Column(db.String(64))
    school_state = db.Column(db.String(16))

    contact_phone = db.Column(db.String(14))
    contact_email = db.Column(db.String(120))
    contact_name = db.Column(db.String(120))

    status = db.Column(db.String(6))

    created_at = db.Column(db.DateTime, nullable=False, default=func.now())

    def __repr__(self):
        return '<TutorApplication {}>'.format(self.username)
