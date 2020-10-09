dev:
	@docker-compose down && \
		docker-compose build --pull --no-cache && \
		docker-compose \
			-f docker-compose.yml \
			-f docker-compose.dev.yml \
		up -d --remove-orphans && \
		docker-compose exec -T h2e_db \
			psql -U ${USERNAME} -d ${DB_NAME} \
		-c "CREATE EXTENSION \"uuid-ossp\";" && \
		docker-compose exec -T h2e_api \
			bash -c "cd h2e_api && flask db upgrade"

test:
	@docker-compose down && \
		docker-compose build --pull --no-cache && \
		docker-compose \
			-f docker-compose.yml \
			-f docker-compose.ci.yml \
		up -d --remove-orphans
