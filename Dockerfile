FROM node:18-alpine3.15

USER root

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .
RUN npm i --production

COPY . .

ENV NODE_ENV production
ENV PORT 8080
ENV HOST 0.0.0.0

CMD ["npm", "run", "start"]