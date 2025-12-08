import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./db/conexion.js";
import conductoresRouter from "./routes/conductores.js";
import serviciosRouter from "./routes/servicios.js";
import eventosRouter from "./routes/eventos.js";


dotenv.config();

const app = express(); //Vamos a empezar a usar express
app.use(cors()); //relaja la restriccion del serv para peticiones externas
app.use(express.json());//le enseñamos a hablar JSON
app.use(express.static("public"));

// app.get("/", (req,res) => {
//     res.send("Estamos dentro");
// })

app.use((req, res, next) => {
  console.log(`Recurso solicitado: ${req.url}`);
  next();
});


app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "public" });
});


//Colgamos la ruta-todo lo que tenga que ver con conductores que lo antienda conductoresRouter 
app.use("/conductores", conductoresRouter);

//Colgamos la ruta-todo lo que tenga que ver con servicios que lo antienda serviciosRouter 
app.use("/servicios", serviciosRouter);

app.use("/eventos", eventosRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor escuchando en el puerto ${PORT} en todas las interfaces`);
});

//Modelo de maquina cvirtual Servis Workwer 
//Vence la sincronizacion y dependencias del harware 
