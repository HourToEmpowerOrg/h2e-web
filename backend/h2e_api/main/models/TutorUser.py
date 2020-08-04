from h2e_api.main.models.user import User


class TutorUser(User):
    display_name = db.Column(db.String(32), nullable=False, default="Tutor")


    def __repr__(self):
        return '<Tutor {}>'.format(self.username)
