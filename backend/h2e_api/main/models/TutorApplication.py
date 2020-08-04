from h2e_api.main.models.BaseModel import db


class TutorApplication(db.Model):
    __tablename__ = 'tutor_application'
    id = db.Column(UUID(as_uuid=True), primary_key=True, server_default=sqlalchemy.text("uuid_generate_v4()"), )
    email = db.Column(db.String(120), index=True, unique=True)
    status = db.Column(db.String(6))

    def __repr__(self):
        return '<TutorApplication {}>'.format(self.username)
