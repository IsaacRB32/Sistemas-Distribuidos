import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// Obtener todos los conductores
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM conductores ORDER BY id_conductor ASC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un conductor por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM conductores WHERE id_conductor = $1", [id]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
