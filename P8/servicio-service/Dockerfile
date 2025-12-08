# Imagen base ligera de Node.js
FROM node:20-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias (solo producción)
RUN npm install --production

# Copiar el resto del código
COPY . .

# Exponer el puerto del microservicio
EXPOSE 3001

# Comando para iniciar el servicio
CMD ["node", "app.js"]
