// import express from "express";
// import { createProxyMiddleware } from "http-proxy-middleware";
// import cors from "cors";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// app.use(cors());

// app.use((req, res, next) => {
//   console.log(`[Gateway] ${req.method} → ${req.originalUrl}`);
//   next();
// });

// // Test
// app.get("/api/test", (req, res) => {
//   res.json({ message: "API Gateway funcionando correctamente" });
// });

// // 🚍 CONDUCTORES
// app.use(
//   "/api/conductores",
//   createProxyMiddleware({
//     target: "http://conductor-service:3000",
//     changeOrigin: true,
//     pathRewrite: {
//       "^/api/conductores": "/conductores"
//     }
//   })
// );




// // 🚍 SERVICIOS
// app.use(
//   "/api/servicios",
//   createProxyMiddleware({
//     target: "http://servicio-service:3001",
//     changeOrigin: true,
//     pathRewrite: { "^/api/servicios": "/servicios" }
//   })
// );



// // 🚍 ACCIONES
// app.use(
//   "/api/acciones",
//   createProxyMiddleware({
//     target: "http://accion-service:3002",
//     changeOrigin: true,
//     pathRewrite: { "^/api/acciones": "/acciones" }
//   })
// );


// // 🚍 EVENTOS
// app.use(
//   "/api/eventos",
//   createProxyMiddleware({
//     target: "http://evento-service:3003",
//     changeOrigin: true,
//     pathRewrite: { "^/api/eventos": "/eventos" }
//   })
// );



// app.listen(process.env.PORT || 8080, () => {
//   console.log(`API Gateway running on port ${process.env.PORT || 8080}`);
// });

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

// Un solo proxy para /api
app.use(
  "/api",
  createProxyMiddleware({
    target: "http://conductor-service:3000",   // valor por defecto (router lo sobreescribe)
    changeOrigin: true,
    xfwd: true,
    logLevel: "debug",
    // /api/... -> /...
    pathRewrite: { "^/api": "" },
    // selecciona el microservicio según el prefijo
    router: {
      "/api/conductores": "http://conductor-service:3000",
      "/api/servicios":   "http://servicio-service:3001",
      "/api/acciones":    "http://accion-service:3002",
      "/api/eventos":     "http://evento-service:3003",
    },
  })
);

app.listen(process.env.PORT || 8080, "0.0.0.0", () => {
  console.log(`API Gateway running on port ${process.env.PORT || 8080}`);
});
