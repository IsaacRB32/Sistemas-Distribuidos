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


-- Mapeo de cada acción al estado correspondiente
INSERT INTO accion_estado (id_accion, id_estado) VALUES
(1, 2),  -- Iniciar servicio → En curso
(2, 2),  -- Llegó al punto → En curso
(3, 2),  -- Inicia viaje → En curso
(4, 2),  -- Llega destino → En curso
(5, 2),  -- Regreso → En curso
(6, 2),  -- Llega al punto de origen → En curso
(7, 2),  -- Regresa a base → En curso
(8, 3)   -- Finalizar servicio → Finalizado
ON CONFLICT (id_accion) DO NOTHING;