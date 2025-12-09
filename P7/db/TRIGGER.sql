-- ============================================
-- FUNCION DEL TRIGGER
-- ============================================

CREATE OR REPLACE FUNCTION actualizar_estado_servicio()
RETURNS trigger AS $$
DECLARE
  v_estado INT;
BEGIN
  -- Buscar el estado correspondiente a la acción
  SELECT id_estado INTO v_estado
  FROM accion_estado
  WHERE id_accion = NEW.id_accion;

  -- Si existe, actualizar el estado del servicio
  IF v_estado IS NOT NULL THEN
    UPDATE servicios
    SET id_estado = v_estado
    WHERE id_servicio = NEW.id_servicio;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- CREACIÓN DEL TRIGGER
-- ============================================

DROP TRIGGER IF EXISTS tr_actualiza_estado_servicio ON eventos;

CREATE TRIGGER tr_actualiza_estado_servicio
AFTER INSERT ON eventos
FOR EACH ROW
EXECUTE FUNCTION actualizar_estado_servicio();
