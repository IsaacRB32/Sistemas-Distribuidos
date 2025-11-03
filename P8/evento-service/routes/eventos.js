import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// Obtener todos los eventos
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT e.id_evento, e.fecha_hora, a.descripcion AS accion,
             c.nombre || ' ' || c.apellido AS conductor,
             s.id_servicio
      FROM eventos e
      JOIN acciones a ON e.id_accion = a.id_accion
      JOIN conductores c ON e.id_conductor = c.id_conductor
      JOIN servicios s ON e.id_servicio = s.id_servicio
      ORDER BY e.id_evento ASC;
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Registrar un nuevo evento (acción del conductor)
router.post("/", async (req, res) => {
  const { id_servicio, id_conductor, id_accion } = req.body;

  if (!id_servicio || !id_conductor || !id_accion)
    return res.status(400).json({ error: "Faltan campos requeridos." });

  try {
    // Inserta el evento
    await pool.query(
      `INSERT INTO eventos (id_servicio, id_conductor, id_accion)
       VALUES ($1, $2, $3);`,
      [id_servicio, id_conductor, id_accion]
    );

    // Consulta el nuevo estado del servicio (actualizado por el trigger)
    const estado = await pool.query(`
      SELECT es.descripcion
      FROM servicios s
      JOIN estado_servicio es ON s.id_estado = es.id_estado
      WHERE s.id_servicio = $1;
    `, [id_servicio]);

    res.json({
      mensaje: "Evento registrado correctamente",
      nuevo_estado: estado.rows[0].descripcion
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
