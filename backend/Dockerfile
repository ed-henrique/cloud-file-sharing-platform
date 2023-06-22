FROM node:20-alpine
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install pm2 -g && npm install

COPY . .
COPY ../gcs.json /backend/gcs

EXPOSE 3000

LABEL maintainer="Kaio Guilherme <https://github.com/Kaioguilherme1>"
LABEL maintainer="Eduardo Henrique <https://github.com/ed-henrique>"

CMD ["pm2-runtime", "start", "/app/app.js"]