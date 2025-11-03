# Imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el código al contenedor
COPY . .

# Expone el puerto en el que corre el servicio
EXPOSE 3002

# Comando que se ejecutará al iniciar el contenedor
CMD ["node", "app.js"]
