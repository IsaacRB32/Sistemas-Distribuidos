-- Tabla de conductores 
CREATE TABLE conductores (
    id_conductor SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    estado VARCHAR(50) NOT NULL
);

-- Tabla de estados de servicio
CREATE TABLE estado_servicio (
    id_estado SERIAL PRIMARY KEY,
    descripcion VARCHAR(100) NOT NULL
);

-- Tabla de servicios 
CREATE TABLE servicios (
    id_servicio SERIAL PRIMARY KEY,
    id_conductor INT NOT NULL,
    fecha_servicio DATE NOT NULL,
    hora_reunion TIME NOT NULL,
    lugar_reunion VARCHAR(500) NOT NULL,
    lugar_destino VARCHAR(500) NOT NULL,
    hora_regreso TIME NOT NULL,
    id_estado INT,
    FOREIGN KEY (id_conductor) REFERENCES conductores(id_conductor),
    FOREIGN KEY (id_estado) REFERENCES estado_servicio(id_estado)
);

-- Tabla de acciones
CREATE TABLE acciones (
    id_accion SERIAL PRIMARY KEY,
    descripcion VARCHAR(500) NOT NULL
);

-- Tabla de eventos 
CREATE TABLE eventos (
    id_evento SERIAL PRIMARY KEY,
    id_servicio INT NOT NULL,
    id_conductor INT NOT NULL,
    id_accion INT NOT NULL,
    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_servicio) REFERENCES servicios(id_servicio),
    FOREIGN KEY (id_conductor) REFERENCES conductores(id_conductor),
    FOREIGN KEY (id_accion) REFERENCES acciones(id_accion)
);

CREATE TABLE accion_estado (
  id_accion INT PRIMARY KEY REFERENCES acciones(id_accion),
  id_estado INT NOT NULL REFERENCES estado_servicio(id_estado)
);