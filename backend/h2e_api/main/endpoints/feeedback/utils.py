from h2e_api.factory import db
from h2e_api.main.models.Feedback import Feedback
from h2e_api.main.models.enums import FeedbackStatus


def submit_feedback(user_id, feedback):
    new_feedback = Feedback(
        feedback_type=feedback['feedback_type'],
        message=feedback['message'],
        status=FeedbackStatus.PENDING,
        submitted_by=user_id
    )

    db.session.add(new_feedback)
    db.session.commit()
