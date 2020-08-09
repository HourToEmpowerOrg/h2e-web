from h2e_api.factory import db
from h2e_api.main.endpoints.applications.constants import ApplicationType
from h2e_api.main.models.TutorApplication import TutorApplication


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
        return tutor_app
    else:
        raise Exception(f'Can not handle application of type {application_type} yet...')