# 1. BASE STAGE: Usa una imagen oficial de Python como base
FROM python:3.11-slim

# 2. CONFIGURACIÓN: Define variables de entorno para Flask
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV FLASK_APP app.py
ENV FLASK_RUN_HOST 0.0.0.0
ENV PORT 8080

# 3. DIRECTORIO DE TRABAJO: Crea el directorio de la app en el contenedor
WORKDIR /usr/src/app

# 4. DEPENDENCIAS: Copia el archivo de requisitos e instala
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 5. CÓDIGO: Copia todo el código de la aplicación (incluyendo 'templates' y 'static')
COPY . .

# 6. EXPOSICIÓN: Indica el puerto que la aplicación usará (8080 es común en AWS/Docker)
EXPOSE 8080

# 7. COMANDO DE INICIO: Usa Gunicorn (un servidor robusto) en lugar de app.run(debug=True)
# Se ejecuta el módulo 'app' (la instancia de Flask) dentro del archivo 'app.py'
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "app:app"]