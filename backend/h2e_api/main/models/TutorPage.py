from h2e_api.main.models.BaseModel import db
from sqlalchemy.dialects.postgresql import UUID
import sqlalchemy
from sqlalchemy import ForeignKey
from sqlalchemy import func


class TutorPage(db.Model):
    __tablename__ = 'tutor_page'
    id = db.Column(UUID(as_uuid=True), primary_key=True, server_default=sqlalchemy.text("uuid_generate_v4()"), )
    page_id = db.Column(db.String(32), unique=True, index=True)
    title = db.Column(db.String(32))
    subjects = db.Column(db.ARRAY(db.String))
    status = db.Column(db.String(6), default='ACTIVE')
    user = db.Column(ForeignKey('user.id'), index=True, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=func.now())

    def __repr__(self):
        return '<TutorApplication {}>'.format(self.email)
