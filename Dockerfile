FROM node:12.2.0-alpine as build
WORKDIR /app
COPY . /app
RUN npm install --silent
RUN npm run build

FROM nginx:1.16.0
WORKDIR /usr/share/nginx/html
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/scripts/start.sh /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.template.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["/bin/sh", "/usr/share/nginx/html/start.sh"]