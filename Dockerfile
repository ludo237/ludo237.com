# set for base and all layer that inherit from it
FROM node:16-alpine as BASE

ARG DATABASE_URL="file:./database.db"
ARG SESSION_SECRET=abcd12345

ENV NODE_ENV production
ENV PATH=/usr/src/app/node_modules/.bin:$PATH
ENV DATABASE_URL ${DATABASE_URL}
ENV SESSION_SECRET ${SESSION_SECRET}

# Add entire dependencies list
FROM BASE as DEPENDENCIES

WORKDIR /usr/src/app

ADD package.json package-lock.json ./

RUN npm install --production=false

# Prune dependencies for production
FROM BASE AS PRODUCTION_DEPENDENCIES

WORKDIR /usr/src/app

COPY --from=DEPENDENCIES /usr/src/app/node_modules /usr/src/app/node_modules

ADD package.json package-lock.json ./

RUN npm prune --production

# Build the application itself
FROM BASE as BUILDER

WORKDIR /usr/src/app

COPY --from=DEPENDENCIES /usr/src/app/node_modules /usr/src/app/node_modules

ADD prisma .
RUN npx prisma generate

ADD . .
RUN npm run postinstall \
    && npm run build

# Last step copy everything for production \
FROM BASE

WORKDIR /usr/src/app

COPY --from=PRODUCTION_DEPENDENCIES /usr/src/app/node_modules /usr/src/app/node_modules
COPY --from=BUILDER /usr/src/app/node_modules/.prisma /usr/src/app/.prisma
COPY --from=BUILDER /usr/src/app/.cache /usr/src/app/.cache
COPY --from=BUILDER /usr/src/app/build /usr/src/app/build
COPY --from=BUILDER /usr/src/app/public /usr/src/app/public
COPY --from=BUILDER /usr/src/app/package* /usr/src/app/
COPY --from=BUILDER /usr/src/app/prisma /usr/src/app/prisma

EXPOSE 3000

CMD ["npm", "run" ,"start"]
