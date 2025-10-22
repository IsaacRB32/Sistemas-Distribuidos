// routes/eventos.js
import express from "express";
import { pool } from "../db/conexion.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { id_servicio, id_conductor, id_accion } = req.body;
    if (!id_servicio || !id_conductor || !id_accion)
      return res.status(400).json({ mensaje: "Faltan datos en la solicitud" });

    const result = await pool.query(
      `INSERT INTO eventos (id_servicio, id_conductor, id_accion, fecha_hora)
       VALUES ($1, $2, $3, NOW()) RETURNING *;`,
      [id_servicio, id_conductor, id_accion]
    );

    res.status(201).json({
      mensaje: "Evento registrado correctamente",
      evento: result.rows[0],
    });
  } catch (err) {
    console.error("Error al registrar evento:", err.message);
    res.status(500).json({ error: "Error al registrar evento" });
  }
});

export default router;
