# Before running, make sure eenv variable DEPLOY_DB_URL is set to our production DB url
export FLASK_APP=./h2e_api.py
export FLASK_ENV=deploy

flask db migrate
flask db upgrade

echo 'Flask db migration compelte.'