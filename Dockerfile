# Ubuntu Container
FROM ubuntu:latest

# Copies your code file from your actions repository to the root filesystem path of the container
COPY entrypoint.sh /entrypoint.sh
RUN ["chmod", "+x", "/entrypoint.sh"]

# Code file to execute when the docker container starts up
ENTRYPOINT ["/entrypoint.sh"]