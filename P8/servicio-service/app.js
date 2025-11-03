import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import serviciosRouter from "./routes/servicios.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/servicios", serviciosRouter);

app.listen(process.env.PORT, () => {
  console.log(`Servicio service running on port ${process.env.PORT}`);
});
