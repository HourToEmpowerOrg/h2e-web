#!/usr/bin/env bash

gunicorn h2e_api.wsgi:app \
  --bind 127.0.0.1:5000 \
  --log-level debug \
  --timeout 120 \
  --workers 1
