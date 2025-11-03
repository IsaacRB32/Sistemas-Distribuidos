import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// Obtener todos los servicios
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT s.id_servicio, s.fecha_servicio, s.hora_reunion, 
             s.lugar_reunion, s.lugar_destino, s.hora_regreso, 
             e.descripcion AS estado, 
             c.nombre || ' ' || c.apellido AS conductor
      FROM servicios s
      JOIN conductores c ON s.id_conductor = c.id_conductor
      JOIN estado_servicio e ON s.id_estado = e.id_estado
      ORDER BY s.id_servicio ASC;
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener servicios por conductor
router.get("/conductor/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT s.id_servicio, s.fecha_servicio, s.hora_reunion, 
             s.lugar_reunion, s.lugar_destino, s.hora_regreso, 
             e.descripcion AS estado
      FROM servicios s
      JOIN estado_servicio e ON s.id_estado = e.id_estado
      WHERE s.id_conductor = $1
      ORDER BY s.fecha_servicio DESC;
    `, [id]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
