FROM node:12.19.0-alpine AS development
LABEL izzy <jtad009@gmail.com>

# Update and install packages
RUN apk update
RUN apk add --update --no-cache make nodejs npm git zip vim wget unzip curl nginx python3 py3-pip yarn bash

# prepare a user which runs everything locally!
RUN adduser --disabled-password -s /bin/bash test

# Install nodemon globally
RUN yarn global add nodemon --prefix /usr/local
# Create nginx pid directory
RUN mkdir -p /run/nginx

WORKDIR /var/www/pangaea_subscriber

#Copy scripts
COPY ./arch/scripts/entrypoint.sh /usr/local/bin/entrypoint.sh
COPY ./arch/scripts/repo.sh /usr/local/bin/repo.sh

RUN chmod +x /usr/local/bin/repo.sh && chmod +x /usr/local/bin/entrypoint.sh

#set the terminal to xterm
RUN export TERM=xterm



CMD ["entrypoint.sh"]
