FROM nginx:1.25.1

COPY . /usr/share/nginx/html/
COPY ./nginx_conf/ /etc/nginx/

WORKDIR /usr/share/nginx/html/

EXPOSE 443

LABEL maintainer="Kaio Guilherme <https://github.com/Kaioguilherme1>"
LABEL maintainer="Eduardo Henrique <https://github.com/ed-henrique>"

CMD ["nginx", "-g", "daemon off;"]