// Cargar variables de entorno desde archivo .env
import "dotenv/config";
import express, { Request, Response } from "express";
import path from "path";

// Importar rutas específicas de cada módulo
import authRoutes from "./routes/auth.routes";
import categoriesRoutes from "./routes/veterinarias.routes";
import hClinicasRoutes from "./routes/hClinicas.routes";
import mascotasRoutes from "./routes/mascotas.routes";

// Importar middlewares de autenticación y control de acceso
import { authenticate, authorize } from "./middlewares/auth.middleware";

// Importar configuración de base de datos
import { connectDB } from "./config/database";

// Importar middleware de manejo de errores global
import { errorHandler } from "./middlewares/error.middleware";

// Importar clase personalizada para errores de aplicación
import { AppError } from "./types/appError";

// Crear instancia de aplicación Express
const app = express();
// Puerto en el que correrá el servidor (por defecto 3000)
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON en las solicitudes
app.use(express.json());

const allowedOrigins = (
  process.env.CORS_ORIGINS || "http://localhost:5173,http://localhost:4173"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use((req, res, next) => {
  const requestOrigin = req.headers.origin;

  if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
    res.header("Access-Control-Allow-Origin", requestOrigin);
  }

  res.header("Vary", "Origin");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS",
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, "..", "public")));

// ========== RUTAS PÚBLICAS ==========

// Ruta de autenticación (registro y login)
app.use("/auth", authRoutes);

// Endpoint público sin autenticación
app.get("/public", (req: Request, res: Response) => {
  res.json({
    message: "Cualquiera puede entrar",
  });
});

// ========== RUTAS PROTEGIDAS ==========

// Endpoint protegido: requiere autenticación con token JWT
app.get("/protected", authenticate, (req, res) => {
  res.json({
    message: "Acceso permitido",
  });
});

// Endpoint solo para administradores: requiere autenticación y rol admin
app.get("/admin", authenticate, authorize(["admin"]), (req, res) => {
  res.json({
    message: "Acceso de administrador permitido",
  });
});

// Endpoint de prueba que devuelve un saludo
app.get("/api/saludo", (req: Request, res: Response) => {
  res.json({
    mensaje: "Hola desde la API",
  });
});

// ========== RUTAS DE API PRINCIPAL ==========

// Rutas para gestionar veterinarias
app.use("/api/veterinaria", categoriesRoutes);

// Rutas para gestionar historiales clínicos
app.use("/api/historiaClinica", hClinicasRoutes);

// Rutas para gestionar mascotas
app.use("/api/mascotas", mascotasRoutes);

// Endpoint de prueba que genera un error personalizado
app.get("/api/test-error", (req, res, next) => {
  next(new AppError("Este es un error de prueba!", 418));
});

// ========== MIDDLEWARE DE MANEJO DE ERRORES ==========
// IMPORTANTE: Debe estar al final para capturar todos los errores
app.use(errorHandler);

// ========== INICIALIZACIÓN DEL SERVIDOR ==========
// Conectar a MongoDB y luego iniciar el servidor HTTP
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});
