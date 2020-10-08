from h2e_api.main.models.School import School
from uuid import UUID
from flask import g


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


def get_config():

    user = g.user

    if user.school_id:
        school = School.query.filter(School.id == user.school_id).one_or_none()
        return {
            'config': school.config,
            'logo': school.logo_url
        }
    else:
        return None