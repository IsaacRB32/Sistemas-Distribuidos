// api-gateway/app.js
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

app.use((req, _res, next) => {
  console.log(`[Gateway] ${req.method} -> ${req.originalUrl}`);
  next();
});

app.get("/api/test", (_req, res) => {
  res.json({ message: "API Gateway funcionando correctamente" });
});

// =========================
//  PROXIES POR MICROSERVICIO
// =========================

// /api/conductores  ->  conductor-service:3000/condutores
app.use(
  "/api/conductores",
  createProxyMiddleware({
    target: "http://conductor-service:3000",
    changeOrigin: true,
    // Express deja req.url = "/" o "/123"
    // Los convertimos en "/conductores/" y "/conductores/123"
    pathRewrite: { "^/": "/conductores/" },
  })
);

// /api/servicios  ->  servicio-service:3001/servicios
app.use(
  "/api/servicios",
  createProxyMiddleware({
    target: "http://servicio-service:3001",
    changeOrigin: true,
    pathRewrite: { "^/": "/servicios/" },
  })
);

// /api/acciones  ->  accion-service:3002/acciones
app.use(
  "/api/acciones",
  createProxyMiddleware({
    target: "http://accion-service:3002",
    changeOrigin: true,
    pathRewrite: { "^/": "/acciones/" },
  })
);

// /api/eventos  ->  evento-service:3003/eventos
app.use(
  "/api/eventos",
  createProxyMiddleware({
    target: "http://evento-service:3003",
    changeOrigin: true,
    pathRewrite: { "^/": "/eventos/" },
  })
);

const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`API Gateway running on port ${PORT}`);
});
