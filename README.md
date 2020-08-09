# Hour To Empower Web application
---

Web application for HourToEmpower: Signup, Registration, and Tutor and Student session scheduling.

### React frontend: /ui

To start, cd into ui and run:

`npm install`

`sh run.sh`


### Flask Backend: /backend

Setting up:
- Add a `.env` frile in `backend/h2e_api` directory with contents:
```.env
FLASK_ENV=Development
DEV_DATABASE_URL=postgresql://localhost:5432/hrtoempower

USERNAME=<db_username>
ENDPOINT=<db_endpoint>
DB_PWD=<db_password>
DB_NAME=<db_name>


SENDER_USERNAME=<email-sender>
SENDER_PASS=<emal-app-password>
```

Make sure your database is up to date if running locally:
`flask db migrate; flask db upgrade;`




Requirements: EB CLI installed and configured, python 3.7

Deploying:
- build the ui
- cd to backend directory
- run eb deploy