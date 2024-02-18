install:
	sudo apt install docker-compose \
	&& sudo usermod -aG docker $$USER \
	&& sudo service docker restart

rm:
	docker-compose stop \
	&& docker-compose rm \
	&& rm -rf pgdata/

up:
	#docker-compose -f docker-compose.yml up --force-recreate
	docker-compose up -d --build

stop:
	docker stop pulsopus_api \
    && docker stop pulsopus_postgres \
    && docker stop pulsopus_pgadmin \

prune:
	docker system prune \
	&& docker system prune -a

end:
	make stop \
	&& make prune \

restart:
	make end \
	&& make up
