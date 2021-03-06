import smtplib
# using SendGrid's Python Library
# https://github.com/sendgrid/sendgrid-python
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


def _setup_connection(user, password):
    try:
        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        server.ehlo()
        server.login(user, password)
        return server
    except Exception as e:
        print(f'EMAIL ERROR: Could not set up connection')
        print(f'{e}')
        return None


def _send_email(server, sent_from, to, message):
    res = server.sendmail(sent_from, to, message)
    server.close()
    return res


def send_email(subject, message, to_addr):
    message = Mail(
        from_email='dev@hourtoempower.org',
        to_emails=to_addr,
        subject=subject,
        html_content=message)
    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(f'Sent email: {response.status_code}')
        return response
    except Exception as e:
        print(e.message)
