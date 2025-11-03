
DECLARE 
  v_estado INT;
BEGIN
  -- Buscar el estado que corresponde a la acción del nuevo evento
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
