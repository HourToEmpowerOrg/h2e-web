import smtplib
import os
from datetime import datetime, timedelta
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


def _setup_connection(user, password):
    try:
        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        server.ehlo()
        server.login(user, password)
        return server
    except Exception as e:
        print(f'ERROR Could notset up connection')
        print(f'{e}')
        return None


def _send_email(server, sent_from, to, message):
    res = server.sendmail(sent_from, to, message)
    server.close()
    return res


def send_email(subject, message, to_addr):

    # Get email sender info
    send_user = os.getenv('SENDER_USERNAME')
    send_passw = os.getenv('SENDER_PASSWORD')

    server = _setup_connection(send_user, send_passw)
    if not server:
        return 'ERROR: Couldn\'t send email..'

    # Create message container - the correct MIME type is multipart/alternative.
    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = "HourToEmpower Service<dev@hourtoempower.org>"
    msg['To'] = to_addr

    msg.attach(MIMEText(message, 'html'))

    res = send_email(server, send_user, to_addr, msg.as_string())

    return res
