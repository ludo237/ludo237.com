FROM node:16-alpine as BUILDER

ARG DATABASE_URL="file:./database.db"
ARG SESSION_SECRET=abcd12345

ENV PATH=/build_app/node_modules/.bin:$PATH
ENV DATABASE_URL ${DATABASE_URL}
ENV SESSION_SECRET ${SESSION_SECRET}

WORKDIR /build_app

COPY ./ .

RUN npm install -E \
    && npm run build

FROM node:16-alpine

ARG DATABASE_URL="file:./database.db"
ARG SESSION_SECRET=abcd12345

ENV NODE_ENV=production
ENV PATH=/build_app/node_modules/.bin:$PATH
ENV DATABASE_URL ${DATABASE_URL}
ENV SESSION_SECRET ${SESSION_SECRET}

WORKDIR /usr/src/app

COPY --from=BUILDER /build_app/package* /usr/src/app/
COPY --from=BUILDER /build_app/node_modules /usr/src/app/node_modules
COPY --from=BUILDER /build_app/.cache /usr/src/app/.cache
COPY --from=BUILDER /build_app/build /usr/src/app/build
COPY --from=BUILDER /build_app/public /usr/src/app/public
COPY --from=BUILDER /build_app/prisma /usr/src/app/prisma

EXPOSE 3000

CMD ["npm", "run" ,"start"]
