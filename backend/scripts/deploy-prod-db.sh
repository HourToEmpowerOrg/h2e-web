# Before running, make sure eenv variable DEPLOY_DB_URL is set to our production DB url
export FLASK_APP=wsgi.py

flask db upgrade

echo 'Flask db migration compelte.'