# Imagen base de nginx
FROM nginx:alpine

# Copiar archivos del frontend
COPY . /usr/share/nginx/html

# Copiar configuración personalizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto
EXPOSE 8081

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
