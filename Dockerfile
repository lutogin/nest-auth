FROM node:12.13.0-alpine

WORKDIR /home/app

COPY ./ /home/app

CMD ["yarn", "start:debug"]
