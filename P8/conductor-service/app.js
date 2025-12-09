import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import conductoresRouter from "./routers/conductores.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/conductores", conductoresRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Conductor service running on port ${PORT}`);
});

