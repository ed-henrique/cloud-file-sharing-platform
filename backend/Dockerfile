FROM node:18-alpine
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .
COPY ../gcs.json /backend/gcs

EXPOSE 3000

LABEL maintainer="Kaio Guilherme <https://github.com/Kaioguilherme1>"
LABEL maintainer="Eduardo Henrique <https://github.com/ed-henrique>"

CMD ["npm", "start"]
