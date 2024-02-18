#!/bin/sh

docker stop pulsopus_api pulsopus_postgres pulsopus_pgadmin

docker-compose up -d --build
