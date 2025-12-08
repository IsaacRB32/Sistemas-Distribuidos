# Imagen base ligera
FROM node:20-alpine

# Directorio de trabajo
WORKDIR /app

# Copiar dependencias primero (para caching)
COPY package*.json ./

# Instalar dependencias (solo producción)
RUN npm install --production

# Copiar el resto del código
COPY . .

# Exponer el puerto de este microservicio
EXPOSE 3002

# Comando de inicio
CMD ["node", "app.js"]
