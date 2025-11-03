import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import conductoresRouter from "./routers/conductores.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/conductores", conductoresRouter);

app.listen(process.env.PORT, () => {
  console.log(`Conductor service running on port ${process.env.PORT}`);
});
