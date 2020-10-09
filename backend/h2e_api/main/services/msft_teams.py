import os
import pymsteams

url = 'https://outlook.office.com/webhook/fdbcb1e1-56ee-4345-b771-872d38fa6b3e@75d2c88a-90b1-45bc-b1e6-75d44c0e5ec1/IncomingWebhook/c7685a2159ac42ccaf8860bb2194e50b/f3a950fd-7557-461d-93ca-8fa9841318b1'


class TeamsService:
    def __init__(self):
        self.mode = os.getenv('FLASK_ENV')
        self.client_id = os.getenv('MSFT_CLIENT_ID')
        self.client_secret = os.getenv('MSFT_CLIENT_SECRET')
        self.redirect_uri = os.getenv('MSFT_REDIRECT')

    def send_new_signup_message(self, signup_type='tutor', data=None):
        if self.mode.lower() != 'production':
            return

        if signup_type == 'tutor':
            teams_message = pymsteams.connectorcard(url)
            teams_message.title("New Tutor Signup")
            teams_message.text("New Tutor Signup")

            # Add info section
            info_section = pymsteams.cardsection()
            info_section.title("Signup Info")

            # Facts are key value pairs displayed in a list.
            info_section.addFact("Name", data.name)
            info_section.addFact("Email", data.email)
            info_section.addFact("Location", data.zip)
            info_section.addFact("Subjects", ','.join(data.subjects))

            # Section Images
            info_section.addImage("https://i.imgur.com/w0q1bTf.gif", ititle="Yay")
            teams_message.addSection(info_section)

            teams_message.send()
