import express from "express";
import { pool } from "../db/conexion.js";

const router = express.Router(); //intancia de router 

console.log("Archivo conductores.js cargado correctamente");

router.get("/", async (_req,res) => {
    try{
        const { rows } = await pool.query(
            "SELECT id_conductor, nombre, apellido, estado FROM conductores ORDER BY id_conductor ASC;"
    );
    res.json(rows);
    }catch(err){
        console.error("Error:",err.message);
        res.status(500).json({error: "Error al obtener conductores"})
    }
});

router.get("/:id", async (req,res) => {
    try{
        const { id } = req.params; 
        const { rows } = await pool.query(
            "SELECT id_conductor, nombre, apellido, estado FROM conductores WHERE id_conductor = $1;",[id]
    );
    if(rows.length === 0)
        return res.status(404).json({ mensaje: "Conductor no encontrado" })
    res.json(rows[0]);
    }catch(err){
        console.error("Error:", err.message);
        res.status(500).json({ error: "Error al obtener conductor" });
    }
})

export default router;
