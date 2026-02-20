import { Router } from "express";
import * as veterinariasController from "../controllers/veterinarias.controller";
import {
  createVeterinariaValidator,
  updateVeterinariaValidator,
} from "../validators/veterinaria.validator";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import validateDto from "../middlewares/dto.middleware";

/**
 * ENRUTADOR: Rutas para gestión de veterinarias
 *
 * Base path: /api/veterinaria
 * Prefijo usado: /api/veterinaria
 *
 * Las veterinarias almacenan información de clínicas y sus historiales
 */
const router: Router = Router();

/**
 * RUTA: GET /api/veterinaria/
 *
 * Obtiene todas las veterinarias
 *
 * Middlewares:
 * - authenticate: Requiere token JWT válido
 *
 * Respuesta exitosa (200):
 * [
 *   { id: "...", name: "Vet Center", direccion: "...", telefono: "...", email: "..." },
 *   { id: "...", name: "Vet Norte", direccion: "...", telefono: "...", email: "..." }
 * ]
 */
router.get("/", authenticate, veterinariasController.getAll);

/**
 * RUTA: GET /api/veterinaria/:id
 *
 * Obtiene una veterinaria específica por su ID
 * No requiere autenticación
 *
 * Parámetros:
 * - id: ID de MongoDB de la veterinaria
 *
 * Respuesta exitosa (200):
 * { id: "...", name: "Vet Center", direccion: "...", telefono: "...", email: "..." }
 */
router.get("/:id", authenticate, veterinariasController.getById);

/**
 * RUTA: POST /api/veterinaria/
 *
 * Crea una nueva veterinaria
 *
 * Middlewares:
 * - authenticate: Requiere token JWT válido
 * - authorize(["admin"]): Requiere rol admin
 * - createVeterinariaValidator: Valida datos (name, direccion, telefono, email)
 * - validateDto: Verifica errores de validación
 *
 * Body esperado:
 * {
 *   "name": "Vet Center",
 *   "direccion": "Av. Principal 123",
 *   "telefono": "555-1234",
 *   "email": "contacto@vet.com"
 * }
 *
 * Respuesta exitosa (201):
 * { id: "...", name: "Vet Center", direccion: "...", telefono: "...", email: "..." }
 */
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  createVeterinariaValidator,
  validateDto,
  veterinariasController.create,
);

/**
 * RUTA: PUT /api/veterinaria/:id
 *
 * Actualiza una veterinaria existente
 *
 * Middlewares:
 * - authenticate: Requiere token JWT válido
 * - authorize(["admin"]): Requiere rol admin
 * - updateVeterinariaValidator: Valida datos
 * - validateDto: Verifica errores de validación
 *
 * Parámetros:
 * - id: ID de la veterinaria a actualizar
 *
 * Body esperado (parcial):
 * {
 *   "telefono": "555-9999",
 *   "direccion": "Nueva dirección"
 * }
 */
router.put(
  "/:id",
  authenticate,
  authorize(["admin"]),
  updateVeterinariaValidator,
  validateDto,
  veterinariasController.update,
);

// Exportar router para ser usado en app.use("/api/categoria", router)
export default router;
