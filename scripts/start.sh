#!/bin/bash

echo ${API_URL}
export NAMESERVERS=$(cat /etc/resolv.conf | grep "nameserver" | awk '{print $2}' | tr '\n' ' ')
echo ${NAMESERVERS}
envsubst '$${API_URL} $${NAMESERVERS}' < /etc/nginx/conf.d/nginx.template.conf > /etc/nginx/nginx.conf

exec nginx -g 'daemon off;'
