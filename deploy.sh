#/bin/sh

git stash
git pull -f origin main

docker-compose up --build

