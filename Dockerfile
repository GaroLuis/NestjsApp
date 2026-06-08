FROM node:24.14

WORKDIR /var/www/nestjs-app

RUN npm i -g @nestjs/cli
RUN npm i -g opencode-ai@latest

ENTRYPOINT ["tail", "-f", "/dev/null"]
