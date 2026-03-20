FROM node:24.14

WORKDIR /var/www/nestjs-app

RUN npm i -g @nestjs/cli

ENTRYPOINT ["tail", "-f", "/dev/null"]
