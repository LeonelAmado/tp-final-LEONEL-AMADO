import express, { Request, Response } from "express";
import path from "path";
import "dotenv/config";
import authRoutes from "./routes/auth.routes";
import categoriesRoutes from "./routes/categories.routes";
import productsRoutes from "./routes/product.routes";
import { authenticate, authorize } from "./middlewares/auth.middleware";
import { connectDB } from "./config/database";
import { errorHandler } from "./middlewares/error.middleware";
import { AppError } from "./types/appError";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "public")));

app.use("auth", authRoutes);

app.get("/public", (req: Request, res: Response) => {
  res.json({
    message: "Cualquiera puede entrar",
  });
});

app.get("/protected", authenticate, (req, res) => {
  res.json({
    message: "Acceso permitido",
  });
});

app.get("/admin", authenticate, authorize(["admin"]), (req, res) => {
  res.json({
    message: "Acceso de administrador permitido",
  });
});

app.get("/api/saludo", (req: Request, res: Response) => {
  res.json({
    mensaje: "Hola desde la API",
  });
});

app.use("/api/categoria", categoriesRoutes);
app.use("/api/producto", productsRoutes);

app.get("/api/test-error", (req, res, next) => {
  next(new AppError("Este es un error de prueba!", 418));
});

// Middleware de manejo de errores global (debe ser el último)
app.use(errorHandler);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});
