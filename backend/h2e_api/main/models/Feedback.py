from h2e_api.main.models.BaseModel import db
from sqlalchemy.dialects.postgresql import UUID
import sqlalchemy
from sqlalchemy import ForeignKey
from sqlalchemy import func

from h2e_api.main.models.enums import FeedbackType, FeedbackStatus


class Feedback(db.Model):
    __tablename__ = 'feedback'
    id = db.Column(UUID(as_uuid=True), primary_key=True, server_default=sqlalchemy.text("uuid_generate_v4()"), )

    feedback_type = db.Column(db.Enum(FeedbackType, name='feedback_type'))
    message = db.Column(db.Text)
    status = db.Column(db.Enum(FeedbackStatus, name='feedback_status'), default=FeedbackStatus.PENDING)

    submitted_by = db.Column(ForeignKey('user.id'), index=True, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=func.now())

    def __repr__(self):
        return '<TutorApplication {}>'.format(self.email)
