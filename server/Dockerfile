FROM node:12.2.0-alpine as build
WORKDIR /app
COPY . /app
RUN npm install --silent

EXPOSE 4000
CMD [ "npm", "start" ]