from h2e_api.main.models.School import School
from uuid import UUID


def validate_uuid4(uuid_string):
    try:
        val = UUID(uuid_string, version=4)
    except ValueError:
        return False

    return any([
        val == uuid_string,
        val.hex == uuid_string,
        str(val) == uuid_string
    ])


def get_config(school_id):

    if not validate_uuid4(school_id):
        return None

    school = School.query.filter(School.id == school_id).one_or_none()

    if school is None:
        raise Exception(f'School for id not found: {school_id}')

    return school.config