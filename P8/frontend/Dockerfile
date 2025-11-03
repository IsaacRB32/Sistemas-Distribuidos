FROM nginx:alpine

# Copiamos los archivos del frontend
COPY . /usr/share/nginx/html

# Copiamos la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8081
