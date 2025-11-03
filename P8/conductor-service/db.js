import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

export const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

pool.connect() //devuelve una promesa 

    .then(client =>{
        client.release();
        console.log("Base de datos conectada");
    })
    .catch(err => {
        console.log("No se pudo conectar a la base de datos:", err.message);
    });