from h2e_api.factory import db
from h2e_api.main.models.mailing_list_member import MailingListMember


def create_mailing_follow_record(data):
    new_record = MailingListMember(
        email=data['email']
    )

    db.session.add(new_record)
    db.session.commit()
    return new_record
