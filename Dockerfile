FROM node:16-alpine as BUILDER

ENV PATH=/build_app/node_modules/.bin:$PATH

WORKDIR /build_app

COPY ./ .

RUN npm install -E \
    && npm run build

FROM node:16-alpine

ENV NODE_ENV=production
ENV PATH=/usr/src/app/node_modules/.bin:$PATH

WORKDIR /usr/src/app

COPY --from=BUILDER /build_app/package* /usr/src/app/
COPY --from=BUILDER /build_app/node_modules /usr/src/app/node_modules
COPY --from=BUILDER /build_app/.cache /usr/src/app/.cache
COPY --from=BUILDER /build_app/build /usr/src/app/build
COPY --from=BUILDER /build_app/public /usr/src/app/public

EXPOSE 3000

CMD ["npm", "run" ,"start"]
