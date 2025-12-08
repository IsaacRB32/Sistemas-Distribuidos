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

# Exponer el puerto del API Gateway (normalmente 8080)
EXPOSE 8080

# Comando de inicio
CMD ["node", "app.js"]
