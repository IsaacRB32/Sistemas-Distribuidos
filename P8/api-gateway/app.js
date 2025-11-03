import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

// Middleware para ver cada petición
app.use((req, res, next) => {
  console.log(`[Gateway] ${req.method} → ${req.originalUrl}`);
  next();
});

// Ruta de prueba para verificar conexión desde el frontend
app.get("/api/test", (req, res) => {
  res.json({ message: "✅ API Gateway funcionando correctamente" });
});

// 🚍 MICROSERVICIO: CONDUCTORES
app.use(
  "/api/conductores",
  createProxyMiddleware({
    target: "http://conductor-service:3000/conductores",
    changeOrigin: true,
    pathRewrite: { "^/api/conductores": "" },
  })
);

// 🚍 MICROSERVICIO: SERVICIOS
app.use(
  "/api/servicios",
  createProxyMiddleware({
    target: "http://servicio-service:3001/servicios",
    changeOrigin: true,
    pathRewrite: { "^/api/servicios": "" },
  })
);

// 🚍 MICROSERVICIO: ACCIONES
app.use(
  "/api/acciones",
  createProxyMiddleware({
    target: "http://accion-service:3002/acciones",
    changeOrigin: true,
    pathRewrite: { "^/api/acciones": "" },
  })
);

// 🚍 MICROSERVICIO: EVENTOS
app.use(
  "/api/eventos",
  createProxyMiddleware({
    target: "http://evento-service:3003/eventos",
    changeOrigin: true,
    pathRewrite: { "^/api/eventos": "" },
  })
);

app.listen(process.env.PORT || 8080, () => {
  console.log(`✅ API Gateway running on port ${process.env.PORT || 8080}`);
});
