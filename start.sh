#!/bin/bash
docker info > /dev/null 2>&1
if [ $? -ne 0 ]; 
then
  echo "Docker is not installed. Exiting."
  exit 1
fi

echo "Initializing frontend, server and database containers."
docker-compose up -d --build
