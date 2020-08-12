from h2e_api.factory import db
from h2e_api.main.endpoints.applications.constants import ApplicationType
from h2e_api.main.models.TutorApplication import TutorApplication
from h2e_api.main.models.SchoolApplication import SchoolApplication

from h2e_api.main.dispatch.events import TUTOR_SIGNUP
from h2e_api.main import h2e_dispatcher


def submit_application(application_type: ApplicationType, submission_data):
    """
        Create application and save to DB
    """
    subjects = []
    if submission_data.get('subjects'):
        subjects = list(map(lambda x: x['id'], submission_data.get('subjects')))

    if application_type == ApplicationType.Tutor:
        tutor_app = TutorApplication(
            name=submission_data['name'],
            email=submission_data['email'],
            phone=submission_data['phone'],
            zip=submission_data['zip'],
            subjects=subjects,
        )

        db.session.add(tutor_app)
        db.session.commit()

        # TODO: Re-enable this once less secure apps are alloweed:
        # Todo part 2 - should update to use OAuth and gmail API
        # h2e_dispatcher.emit(TUTOR_SIGNUP, tutor_app)
        return tutor_app

    elif application_type == ApplicationType.School:
        school_app = SchoolApplication(
            school_name=submission_data['name'],
            school_state=submission_data['state'],
            school_city=submission_data['city'],
            contact_phone=submission_data['phone'],
            contact_email=submission_data['email'],
            contact_name=submission_data['contact_name'],
        )

        db.session.add(school_app)
        db.session.commit()
        # h2e_dispatcher.emit(SCHOOL_SIGNUP, school_app)

        return school_app

    else:
        raise Exception(f'Can not handle application of type {application_type} yet...')
