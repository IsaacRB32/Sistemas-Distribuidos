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

// Prueba rápida
app.get("/api/test", (_req, res) => {
  res.json({ message: "API Gateway funcionando correctamente" });
});

//
// 1) CONDUCTORES
//
app.use(
  "/api/conductores",
  createProxyMiddleware({
    target: "http://conductor-service:3000",
    changeOrigin: true,
    pathRewrite: {
      "^/api/conductores": "/conductores", // /api/conductores -> /conductores
    },
  })
);

//
// 2) SERVICIOS
//
app.use(
  "/api/servicios",
  createProxyMiddleware({
    target: "http://servicio-service:3001",
    changeOrigin: true,
    pathRewrite: {
      "^/api/servicios": "/servicios", // /api/servicios -> /servicios
    },
  })
);

//
// 3) ACCIONES
//
app.use(
  "/api/acciones",
  createProxyMiddleware({
    target: "http://accion-service:3002",
    changeOrigin: true,
    pathRewrite: {
      "^/api/acciones": "/acciones",
    },
  })
);

//
// 4) EVENTOS
//
app.use(
  "/api/eventos",
  createProxyMiddleware({
    target: "http://evento-service:3003",
    changeOrigin: true,
    pathRewrite: {
      "^/api/eventos": "/eventos",
    },
  })
);

app.listen(process.env.PORT || 8080, "0.0.0.0", () => {
  console.log(`API Gateway running on port ${process.env.PORT || 8080}`);
});
