from h2e_api.main.models.BaseModel import db
from sqlalchemy.dialects.postgresql import UUID
import sqlalchemy
from sqlalchemy import ForeignKey


class TutorApplication(db.Model):
    __tablename__ = 'tutor_application'
    id = db.Column(UUID(as_uuid=True), primary_key=True, server_default=sqlalchemy.text("uuid_generate_v4()"), )
    email = db.Column(db.String(120), index=True, unique=True)
    status = db.Column(db.String(6))

    user = db.Column(ForeignKey('user.id'), index=True)

    def __repr__(self):
        return '<TutorApplication {}>'.format(self.username)