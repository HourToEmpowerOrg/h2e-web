export FLASK_APP=./h2e_api.py

FLD="$( cd "$(dirname "$0")" ; pwd -P )"
ENV_FILE="$FLD/../.env"
ENV_FILE_EXAMPLE="$FLD/../.env.example"
if [ ! -f ${ENV_FILE} ]; then
   cp "$ENV_FILE_EXAMPLE" "$ENV_FILE"
fi