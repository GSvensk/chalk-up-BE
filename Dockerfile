FROM node:10.16.3

RUN mkdir /srv/chalkup && chown node:node /srv/chalkup

USER node

WORKDIR /srv/chalkup

COPY --chown=node:node package.json package-lock.json ./

RUN npm install --quiet
