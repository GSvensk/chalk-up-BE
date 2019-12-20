FROM node:10.16.3 AS development

RUN mkdir /srv/chalkup && chown node:node /srv/chalkup

USER node

WORKDIR /srv/chalkup

COPY --chown=node:node package.json package-lock.json ./

RUN npm install --quiet

FROM node:10.16.3-slim AS production

USER node

WORKDIR /srv/chalkup

COPY --from=development --chown=root:root /srv/chalkup/node_modules ./node_modules

COPY . .

CMD ["node", "index.js"]