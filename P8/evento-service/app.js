import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import eventosRouter from "./routes/eventos.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/eventos", eventosRouter);

const PORT = process.env.PORT || 3003;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Accion service running on port ${PORT}`);
});
