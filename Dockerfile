FROM node:12.13.0-alpine
EXPOSE 3000

WORKDIR /home/app

COPY ./ /home/app

RUN yarn install

CMD ["yarn", "start:dev"]
