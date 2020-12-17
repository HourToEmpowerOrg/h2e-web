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

    if user.school:
        school = School.query.filter(School.id == user.school).one_or_none()
        return {
            **school.config,
            'logo_url': school.logo_url
        }
    else:
        return None