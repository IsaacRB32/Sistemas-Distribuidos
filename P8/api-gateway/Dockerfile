# Imagen base de Node.js
FROM node:18

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar dependencias y archivo de entorno
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código
COPY . .

# Exponer el puerto del gateway (8080)
EXPOSE 8080

# Comando de inicio
CMD ["node", "app.js"]
