import express from "express";
import { pool } from "../db/conexion.js";

const router = express.Router();

//Obtener todos los servicios
router.get("/", async (_req,res) => {
    try{
        const { rows } = await pool.query(
            `SELECT s.id_servicio, s.fecha_servicio, s.hora_reunion, 
                s.lugar_reunion, s.lugar_destino, s.hora_regreso, 
                e.descripcion AS estado, 
                c.nombre || ' ' || c.apellido AS conductor
            FROM servicios s
            JOIN conductores c ON s.id_conductor = c.id_conductor
            JOIN estado_servicio e ON s.id_estado = e.id_estado
            ORDER BY s.id_servicio ASC;`
        );
        res.json(rows);
    }catch(err){
        console.error("No se pudieron extraer los servicios", err.message);
        res.status(500).json({ error: "Error al obtener servicios" });
    }
});
//obtener servicios de un conductor
router.get("/:id_conductor", async (req,res) => {
    try{
        const { id_conductor } = req.params;
        const{ rows } = await pool.query(
            `SELECT s.id_servicio, s.fecha_servicio, s.hora_reunion, 
                s.lugar_reunion, s.lugar_destino, s.hora_regreso, 
                e.descripcion AS estado
            FROM servicios s
            JOIN estado_servicio e ON s.id_estado = e.id_estado
            WHERE s.id_conductor = $1
            ORDER BY s.fecha_servicio DESC;`,
            [id_conductor]
        );
        if(rows.length === 0)
            return res.status(404).json({ mensaje: "El conductor no tiene servicios asignados " });
        res.json(rows); 
    }catch (err){
        console.error(`No se pudieron extraer los servicios asociados al conductor`);
        res.status(500).json({ error: "Error al obtener servicios" });
    }
});
export default router;
