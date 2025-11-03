import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import accionesRouter from "./routers/acciones.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/acciones", accionesRouter);

app.listen(process.env.PORT, () => {
  console.log(`Accion service running on port ${process.env.PORT}`);
});
