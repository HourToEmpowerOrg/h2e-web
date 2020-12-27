#!/bin/bash

echo '1/2 Building Frontend'
cd ../ui/app
npm run build
exit_status=$?
cd ../../backend

if [ exit_status -ne 0 ]; then
    echo "Error Building UI, will not deploy"
fi
exit $exit_status

echo '2/2 Deploying to Elastic Beaenstalk'
eb deploy h2e-web-prod
