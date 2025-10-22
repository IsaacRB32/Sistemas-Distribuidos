INSERT INTO conductores (nombre, apellido, estado)
VALUES
('Juan', 'Pérez', 'activo'),
('María', 'López', 'activo');

INSERT INTO estado_servicio (descripcion)
VALUES
('Pendiente'),
('En curso'),
('Finalizado');

INSERT INTO acciones (descripcion)
VALUES
('Iniciar servicio'),
('Llegué al punto de reunión'),
('Iniciar viaje al destino'),
('Llegué al destino'),
('Iniciar regreso'),
('Llegué al punto de origen'),
('Regresar a base'),
('Finalizar servicio');

INSERT INTO servicios (id_conductor, fecha_servicio, hora_reunion, lugar_reunion, lugar_destino, hora_regreso, id_estado)
VALUES
(1, '2025-10-19', '06:00', 'Base Central', 'Teotihuacán', '18:00', 1);
