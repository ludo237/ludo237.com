FROM registry.gitlab.com/6go/dx/docker/bun:1 AS bun_install

COPY --link package.json bun.lock ./

RUN bun install --frozen-lockfile --no-cache

FROM registry.gitlab.com/6go/dx/docker/bun:1 AS frontend

COPY --from=bun_install --link /src/application/node_modules /src/application/node_modules
COPY --link resources ./resources
COPY --link public ./public
COPY --link vite.config.ts tsconfig.json package.json bun.lock ./

RUN bun run build

FROM registry.gitlab.com/6go/dx/docker/composer:latest AS composer

ENV COMPOSER_CACHE_DIR=/tmp/cache

COPY --link composer.json composer.lock ./

RUN --mount=type=cache,target=/tmp/cache \
    composer install \
    --ignore-platform-reqs \
    --no-interaction \
    --no-plugins \
    --no-scripts \
    --no-dev \
    --no-autoloader \
    --prefer-dist

# Production stage
FROM registry.gitlab.com/6go/dx/docker/frankenphp:1

ARG UID=1003
ARG PRIMARY_GID=1003
ARG SECONDARY_GID=997
ARG USER=deploy

ENV SERVER_NAME=:80
ENV OPCACHE_ENABLE=1
ENV OPCACHE_JIT_FLAGS=1225

WORKDIR /app

RUN apt-get update && \
    apt-get install -y --no-install-recommends sqlite3 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
    groupadd -g $PRIMARY_GID -o $USER && \
    groupadd -g $SECONDARY_GID -o caddy && \
    useradd -m -u $UID -g $PRIMARY_GID -G $SECONDARY_GID -o -s /bin/bash $USER && \
    mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini" && \
    setcap CAP_NET_BIND_SERVICE=+eip /usr/local/bin/frankenphp && \
    mkdir -p /data/caddy /config/caddy

COPY --from=composer --chown=${USER}:${USER} --link /app/vendor ./vendor
COPY --from=frontend --chown=${USER}:${USER} --link /src/application/public/build ./public/build
COPY --chown=${USER}:${USER} --link artisan composer.json composer.lock ./
COPY --chown=${USER}:${USER} --link bootstrap ./bootstrap
COPY --chown=${USER}:${USER} --link config ./config
COPY --chown=${USER}:${USER} --link database ./database
COPY --chown=${USER}:${USER} --link public ./public
COPY --chown=${USER}:${USER} --link resources ./resources
COPY --chown=${USER}:${USER} --link routes ./routes
COPY --chown=${USER}:${USER} --link src ./src
COPY --chown=${USER}:${USER} --link storage ./storage

RUN chown -R ${USER}:${USER} /data/caddy /config/caddy . && \
    chmod -R g+w ./storage ./bootstrap/cache && \
    composer dump-autoload --optimize --no-dev --classmap-authoritative && \
    php artisan storage:link && \
    php artisan ziggy:generate --types-only && \
    rm -rf /root/.composer /tmp/* /var/tmp/*

USER ${USER}

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/up || exit 1
