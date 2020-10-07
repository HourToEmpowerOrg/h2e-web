dev:
	@docker-compose down && \
		docker-compose build --pull --no-cache && \
		docker-compose \
			-f docker-compose.yml \
			-f docker-compose.dev.yml \
		up -d --remove-orphans

test:
	@docker-compose down && \
		docker-compose build --pull --no-cache && \
		docker-compose \
			-f docker-compose.yml \
			-f docker-compose.ci.yml \
		up -d --remove-orphans