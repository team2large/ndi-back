# SETUP POUR NDI BACK

## LES REQUIS
- vscode (https://code.visualstudio.com/)
- git (https://git-scm.com/downloads) (si vous puez la merde et que vous etes sur windows)
- docker (https://www.docker.com/products/docker-desktop/)
- node 16 (https://nodejs.org/fr/download/)

### EXTENSIONS VSCODE 
- prisma
- eslint
- thunderclient (optionnel mais ça peut être pratique)

## INSTALLATION
- Créer un fichier .env et coller :
```
NODE_ENV=development

#################

API_PORT=3333

STUDIO_PORT=4444

POSTGRES_EXPOSE_PORTS=5432

#################-> API

ACCESS_SECRET_KEY="access_token_bonsoir"

REFRESH_SECRET_KEY="refresh_token_bonsoir"

#################-> POSTGRES

POSTGRES_USER=Michel_La_DB

POSTGRES_PASSWORD=ndi_password

POSTGRES_DB=ndi_database

DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}"
```

- `npm i`
- `npx prisma generate` Crée la bd la première fois depuis le schema

### MIGRATION PRISMA
- `npx prisma migrate dev` Pour crée une migration
- `npx prisma migrate deploy` Pour appliquer une migration

## LANCER EN DEVELOPPEMENT
- `docker-compose up postgres`
- `npm run dev`
- `npx prisma studio` (pour avoir l'interface graphique de la bd)

## LES URLS
- API : https://api.team2large.fr/
- FRONT : https://www.team2large.fr/
- STUDIO (BD) : https://database.team2large.fr/
