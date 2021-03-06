from .email_service import send_email

login_link = 'https://hourtoempower.org/login'


def send_new_user_created_by_admin_email(user):
    subject = 'Welcome to Hour to Empower'
    message = '<h3>Welcome to Hour to Empower</h3>'
    message += '<p>Your Hour To Empower account has been created. You have been given ' \
               'a temporary password that you\'ll need to change after logging in.'
    message += f' You can log in using this link: <a href="{login_link}"> hourtoempower.org/login </a> </p>'

    message += '<p>If you have any questions or run into any issues,' \
               ' please reach out to the admin who created your account! </p>'

    message += '<p> We\'re very excited to have you on this journey with us!</p>'

    message += '<br/>- The Hour to Empower team'

    to_addr = user.email
    send_email(subject, message, to_addr)


def send_new_user_email(user):
    subject = 'Welcome to Hour to Empower'
    message = '<p>Your Hour To Empower account has been created.' \
              ' We\'re very excited to have you on this journey with us!</p>'
    message += f'You can log in using this link: {login_link}'

    message += 'If you have any questions or run into any issues,' \
               ' please reach out to contact@hourtoempower.org'

    message += '<br/>- The Hour to Empower team'

    to_addr = user.email
    res = send_email(subject, message, to_addr)
    return res


def send_pass_update_email(user):
    subject = 'Hour to Empower password updated'
    message = '<p>Your Hour To Empower password has been updated.'
    message += ' If you did not request this update, please contact support immediately' \
               ' at contact@hourtoempower.org </p>'
    message += '<br/>- The Hour to Empower team'

    to_addr = user.email
    send_email(subject, message, to_addr)

