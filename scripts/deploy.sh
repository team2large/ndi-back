#/bin/sh

WEBHOOK_URL=https://discord.com/api/webhooks/1045295776479326208/kHQuhyZSbNkSuEseu-xQbwwTjzE18WfilgGyjpcVjZPTj0gTanrY1h6juDt6irIUTSvN
AVATAR_URL=https://media.wired.com/photos/5b6df22751297c21002b4536/16:9/w_2400,h_1350,c_limit/HackerBot.jpg
WEBHOOK_NAME="Backend deploy"

function successWebHook {
    ./discord.sh \
      --webhook-url="$WEBHOOK_URL" \
      --username "$WEBHOOK_NAME" \
      --avatar "$AVATAR_URL" \
      --text "Backend auto deploy success !"
}


function errorWebHook {
    ./discord.sh \
      --webhook-url="$WEBHOOK_URL" \
      --username "$WEBHOOK_NAME" \
      --avatar "$AVATAR_URL" \
      --text "Backend auto deploy failed..."
}

git stash
git pull -f origin main

docker-compose up --build && errorWebHook

