ARG USER=deploy

# Frontend build stage - Build Inertia.js assets
FROM registry.gitlab.com/6go/dx/docker/bun:1 AS frontend

WORKDIR /app

# Copy package files for better layer caching
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy frontend source files
COPY resources ./resources
COPY public ./public
COPY vite.config.ts tsconfig.json ./

# Build frontend assets
RUN bun run build

# Backend dependencies stage
FROM registry.gitlab.com/6go/dx/docker/composer:latest AS backend-deps

WORKDIR /app

# Copy composer files for better layer caching
COPY composer.json composer.lock ./
RUN composer install \
    --ignore-platform-reqs \
    --no-interaction \
    --no-plugins \
    --no-scripts \
    --no-dev \
    --prefer-dist

# Production stage
FROM registry.gitlab.com/6go/dx/docker/frankenphp:1

ARG USER

ENV SERVER_NAME=:80
ENV OPCACHE_ENABLE=1

WORKDIR /app

# Install system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        zip unzip sqlite3 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Create user and set PHP configuration
RUN useradd ${USER} && \
    mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

# Copy application files
COPY --chown=${USER}:${USER} . .

# Copy built assets and dependencies
COPY --from=frontend --chown=${USER}:${USER} /app/public/build ./public/build
COPY --from=backend-deps --chown=${USER}:${USER} /app/vendor ./vendor

# Set up Laravel application
RUN mkdir -p storage/logs storage/framework/{cache,sessions,views} bootstrap/cache && \
    chown -R ${USER}:${USER} storage bootstrap/cache && \
    chmod -R 775 storage bootstrap/cache

# Configure FrankenPHP
RUN setcap CAP_NET_BIND_SERVICE=+eip /usr/local/bin/frankenphp && \
    mkdir -p /data/caddy /config/caddy && \
    chown -R ${USER}:${USER} /data/caddy /config/caddy

USER ${USER}

# Laravel optimizations
RUN php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache && \
    php artisan storage:link

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/up || exit 1
