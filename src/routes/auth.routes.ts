import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import {
  registerValidator,
  loginValidator,
} from "../validators/auth.validator";
import rateLimit from "express-rate-limit";

// Crear instancia de router para las rutas de autenticación
const router = Router();

/**
 * RATE LIMITER: Protege contra fuerza bruta
 *
 * Límite de intentos para endpoints de autenticación
 * - Ventana temporal: 15 minutos
 * - Máximo: 5 intentos por IP
 * - Objetivo: Evitar ataques de fuerza bruta en login/registro
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // máximo 5 intentos por IP
  message: "Demasiados intentos, inténtalo de nuevo más tarde",
});

/**
 * RUTA: POST /auth/register
 *
 * Registra un nuevo usuario
 *
 * Middlewares:
 * - authLimiter: Limita intentos para evitar abuso
 * - registerValidator: Valida email, contraseña y username
 * - register: Controlador que procesa el registro
 *
 * Body esperado:
 * {
 *   "username": "leonel",
 *   "email": "leo@example.com",
 *   "password": "Secure123!"
 * }
 *
 * Respuesta exitosa (201):
 * { message: "Usuario creado exitosamente" }
 */
router.post("/register", authLimiter, registerValidator, register);

/**
 * RUTA: POST /auth/login
 *
 * Autentica un usuario y retorna un JWT
 *
 * Middlewares:
 * - authLimiter: Limita intentos para evitar abuso
 * - loginValidator: Valida email y contraseña
 * - login: Controlador que autentica y genera token
 *
 * Body esperado:
 * {
 *   "email": "leo@example.com",
 *   "password": "Secure123!"
 * }
 *
 * Respuesta exitosa (200):
 * {
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Y..."
 * }
 */
router.post("/login", authLimiter, loginValidator, login);

// Exportar router para ser usado en app.use("/auth", authRoutes)
export default router;
