from h2e_api.main.models.BaseModel import db
from h2e_api.main.models.enums import MailingSubscribeStatus
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import func

import sqlalchemy


class MailingListMember(db.Model):
    __tablename__ = 'mailing_list_member'
    id = db.Column(UUID(as_uuid=True), primary_key=True, server_default=sqlalchemy.text("uuid_generate_v4()"), )
    email = db.Column(db.String(120), index=True, unique=True)
    status = db.Column(db.Enum(MailingSubscribeStatus, name="mailing_status"), default=MailingSubscribeStatus.ACTIVE)
    created_at = db.Column(db.DateTime, nullable=False, default=func.now())
