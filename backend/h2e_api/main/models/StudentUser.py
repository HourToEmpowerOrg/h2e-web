from h2e_api.main.models.user import User


class StudentUser(User):
    display_name = db.Column(db.String(32), nullable=False, default="Student")


    def __repr__(self):
        return '<Student {}>'.format(self.username)
