FROM nginx

COPY ./html /usr/share/nginx/html/html
COPY ./assets /usr/share/nginx/html/assets
COPY ./nginx_conf/ /etc/nginx/

EXPOSE 80 443

LABEL maintainer="Kaio Guilherme <https://github.com/Kaioguilherme1>"
LABEL maintainer="Eduardo Henrique <https://github.com/ed-henrique>"

CMD ["nginx", "-g", "daemon off;"]




