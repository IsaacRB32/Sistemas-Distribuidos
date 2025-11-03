import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// Obtener todas las acciones
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM acciones ORDER BY id_accion ASC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener una acción por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM acciones WHERE id_accion = $1", [id]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
