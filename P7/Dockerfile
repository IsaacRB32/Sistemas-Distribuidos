# Imagen base oficial de Node
FROM node:20-alpine

# Crear directorio dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json para aprovechar cache
COPY package*.json ./

# Instalar dependencias (solo producción)
RUN npm install --production

# Copiar el resto del proyecto
COPY . .

# Copiar archivo .env si existe
# (Solo para casos donde prefieras meterlo dentro del contenedor)
# Si NO quieres meterlo aquí, lo pasarás con --env-file
# COPY .env .env

# Exponer el puerto que usa Express
EXPOSE 3000

# Iniciar la aplicación
CMD ["node", "server.js"]
