from h2e_api.factory import db
from h2e_api.main.models.Feedback import Feedback
from h2e_api.main.models.enums import FeedbackStatus

from h2e_api.main.dispatch.events import APP_FEEDBACK
from h2e_api.main import h2e_dispatcher


def submit_feedback(user_id, feedback):
    new_feedback = Feedback(
        feedback_type=feedback['feedback_type'],
        message=feedback['message'],
        status=FeedbackStatus.PENDING,
        submitted_by=user_id
    )

    h2e_dispatcher.emit(APP_FEEDBACK, new_feedback)

    db.session.add(new_feedback)
    db.session.commit()
