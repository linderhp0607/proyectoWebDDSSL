# Utilizar una imagen base de Node.js
FROM node:18
# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app
# Copiar package.json y package-lock.json
COPY package*.json ./
# Instalar las dependencias
RUN npm install
# Copiar el resto de la aplicación al contenedor
COPY . .
# Exponer el puerto del servidor
EXPOSE 5000
# Comando para iniciar el servidor
CMD ["npm", "start"]