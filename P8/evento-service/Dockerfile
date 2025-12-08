# Imagen base ligera de Node.js
FROM node:20-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install --production

# Copiar todo el código
COPY . .

# Exponer el puerto del microservicio
EXPOSE 3003

# Comando de inicio
CMD ["node", "app.js"]
