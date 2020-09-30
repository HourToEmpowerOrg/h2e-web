# Hour To Empower Web application
---

Web application for HourToEmpower: Signup, Registration, and Tutor and Student session scheduling.

### React frontend: `/ui`

To start, cd into ui and run:

`npm install`

`sh run.sh`


### Flask Backend: /backend

Setting up:
- Add a `.env` frile in `backend/h2e_api` directory with contents:
- create postgres db `hrtoempower`
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

### Migrations for Production Database
- TODO: Find a better way to automate this

Currently, set `FLASK_ENV=Production` in your .env file, and re-run `flask db upgrade` from inside `/h2e_api` directory after already generating the migration. 

### Deploying:
Requirements: EB CLI installed and configured, python 3.7

run `sh deploy_eb.sh` to run the deployment script

The steps the script is taking are:
- cd ui/app and run npm build
- cd to backend directory
- run eb deploy


### TODOS: 
- Set up development RDS
    - can use this db for DEV rather than requiring a local DB for dev and testing
- Testing set up
    - frontend jest tests?
    - backend pytest
- CI/CD set up