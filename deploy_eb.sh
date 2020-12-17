#!/bin/bash

echo '1/2 Building Frontend'
npm run build
cd ./backend

echo '2/2 Deploying to Elastic Beaenstalk'
eb deploy
