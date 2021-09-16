FROM node:14.17-alpine3.14

RUN apk update

RUN apk add --no-cache bash

## config bash
RUN touch /home/node/.bashrc | echo "PS1='\w \$ '" >> /home/node/.bashrc

USER node

WORKDIR /home/node/app
