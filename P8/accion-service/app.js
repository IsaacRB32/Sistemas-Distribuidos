import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import accionesRouter from "./routers/acciones.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/acciones", accionesRouter);

const PORT = process.env.PORT || 3002;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Accion service running on port ${PORT}`);
});
