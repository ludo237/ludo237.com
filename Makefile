ROOT_DIR := $(dir $(realpath $(lastword $(MAKEFILE_LIST))))

# Declare all targets as phony (not file targets)
.PHONY: directories sqlite-init laravel-init test-init test-coverage ziggy \
		test test-fast audit phpstan pint pint-dry rector \
		pre-commit-fe pre-commit-be pre-commit-all

directories: ## Setup storage directories and permissions
	@cd $(ROOT_DIR); set -e; \
	rm -f bootstrap/cache/*.php; \
	rm -rf storage/logs/* storage/framework/testing/* storage/app/public/*; \
	chown -R $$(id -u):$$(id -g) storage bootstrap/cache; \
	chmod -R ug+rwX storage bootstrap/cache

sqlite-init: ## Initialize SQLite database
	@cd $(ROOT_DIR); set -e; \
	rm -rf database/database.sqlite; \
	touch database/database.sqlite

laravel-init: directories sqlite-init ## Initialize Laravel application
	@cd $(ROOT_DIR); set -e; \
	cp $(ROOT_DIR)envs/.env.dev .env; \
	php artisan key:generate; \
	php artisan migrate:fresh --seed; \
	php artisan optimize:clear

test-init: directories sqlite-init ## Initialize testing environment
	@cd $(ROOT_DIR); set -e; \
	mkdir -p reports/phpunit/coverage; \
	touch reports/phpunit/coverage/teamcity.txt; \
	yes | cp -rf envs/.env.dev .env; \
	php artisan optimize:clear; \
	php artisan migrate:fresh --env=testing

test-coverage: test-init ## Run tests with coverage report
	@php artisan test \
		--coverage \
		--log-junit ./reports/junit.xml \
		--coverage-cobertura=./reports/cobertura.xml \
		--parallel \
		--processes=6

test: test-init ## Run tests with bail on first failure
	@php artisan test --bail

test-fast: test-init ## Run tests in parallel
	@php artisan test --parallel --processes=6

ziggy: ## Generate Ziggy TypeScript routes
	@php artisan ziggy:generate --types-only

audit: ## Run Composer security audit
	@composer audit

phpstan: ## Run PHPStan static analysis
	@./vendor/bin/phpstan analyse --error-format gitlab --memory-limit=512M

pint: ## Run Laravel Pint code formatter
	@./vendor/bin/pint --parallel

pint-dry: ## Run Pint dry-run (check only)
	@./vendor/bin/pint --format=gitlab --test --parallel --bail

rector: ## Run Rector automated refactoring
	@./vendor/bin/rector --output-format=json

pre-commit-fe: ## Run frontend pre-commit checks
	@bun run prettier
	@bun run eslint
	@bun run types:check

pre-commit-be: ## Run backend pre-commit checks
	@$(MAKE) pint
	@$(MAKE) phpstan
	@$(MAKE) docker-test-fast

pre-commit: pre-commit-be pre-commit-fe
