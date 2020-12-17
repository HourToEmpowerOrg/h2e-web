from h2e_api.main.models.BaseModel import db
import sqlalchemy
from sqlalchemy import func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Time
from sqlalchemy import Index
from sqlalchemy import ForeignKey
from h2e_api.main.models.enums import ScheduleRepeat


class ScheduleItem(db.Model):
    id = db.Column(UUID(as_uuid=True), primary_key=True, server_default=sqlalchemy.text("uuid_generate_v4()"), )
    user_id = db.Column(ForeignKey('user.id', ondelete='CASCADE'))

    start_time = db.Column(Time(timezone=True))
    end_time = db.Column(Time(timezone=True))
    day = db.Column(db.Integer)  # 0 for Mon, 1 for Tues... 6 for Sun
    repeat_type = db.Column(db.Enum(ScheduleRepeat), default=ScheduleRepeat.WEEKLY)

    created_at = db.Column(db.DateTime, nullable=False, default=func.now())

    __table_args__ = (
        Index('schedule_item__start_time__idx', 'start_time'),
    )
