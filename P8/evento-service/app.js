import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import eventosRouter from "./routes/eventos.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/eventos", eventosRouter);

app.listen(process.env.PORT, () => {
  console.log(`Evento service running on port ${process.env.PORT}`);
});
