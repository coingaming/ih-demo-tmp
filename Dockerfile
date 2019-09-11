FROM node:12.2.0-alpine as build
WORKDIR /app
COPY . /app
RUN npm install --silent
RUN npm run build

FROM nginx:1.16.0
WORKDIR /usr/share/nginx/html
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/scripts/env2js.sh /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env2js.sh > config.js && nginx -g \"daemon off;\""]