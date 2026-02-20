import { Router } from "express";

// Importar todos los controladores de historiales clínicos como módulo
import * as hClinicasController from "../controllers/hClinicas.controller";
import {
  createHClinicasValidator,
  updateHClinicasValidator,
} from "../validators/hClinicas.validator";
// Importar middlewares de autenticación y autorización
import { authenticate, authorize } from "../middlewares/auth.middleware";
import validateDto from "../middlewares/dto.middleware";

/**
 * ENRUTADOR: Rutas para gestión de historiales clínicos
 *
 * Base path: /api/historiaClinica
 * Prefijo usado: /api/historiaClinica
 *
 * Los historiales clínicos almacenan la información de consultas veterinarias
 */
const router: Router = Router();

/**
 * RUTA: GET /api/historiaClinica/
 *
 * Obtiene todos los historiales clínicos
 * No requiere autenticación (endpoint público)
 *
 * Respuesta exitosa (200):
 * [
 *   { _id: "...", paciente: "...", dueñoId: 123, edad: 4, raza: "..." },
 *   { _id: "...", paciente: "...", dueñoId: 456, edad: 2, raza: "..." }
 * ]
 */
router.get("/", authenticate, hClinicasController.getAllHClinicas);

/**
 * RUTA: GET /api/historiaClinica/:id
 *
 * Obtiene un historial clínico específico por su ID
 * No requiere autenticación (endpoint público)
 *
 * Parámetros:
 * - id: ID de MongoDB del historial clínico
 *
 * Respuesta exitosa (200):
 * { _id: "...", paciente: "...", dueñoId: 123, edad: 4, raza: "..." }
 */
router.get("/:id", authenticate, hClinicasController.getHClinicaById);

/**
 * RUTA: POST /api/historiaClinica/
 *
 * Crea un nuevo historial clínico
 *
 * Middlewares:
 * - authenticate: Requiere token JWT válido
 * - authorize(["admin"]): Requiere rol admin
 *
 * Body esperado:
 * {
 *   "paciente": "Firulais",
 *   "dueñoId": 123,
 *   "edad": 4,
 *   "raza": "Labrador",
 *   "peso": 22.5,
 *   "motivoConsulta": "Control anual",
 *   "diagnostico": "Saludable",
 *   "tratamiento": "Ninguno",
 *   "fecha": "2024-01-01T00:00:00.000Z"
 * }
 *
 * Respuesta exitosa (201):
 * { _id: "...", paciente: "Firulais", edad: 4, raza: "Labrador" }
 */
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  createHClinicasValidator,
  validateDto,
  hClinicasController.createHClinica,
);

/**
 * RUTA: PUT /api/historiaClinica/:id
 *
 * Actualiza un historial clínico existente
 *
 * Middlewares:
 * - authenticate: Requiere token JWT válido
 * - authorize(["admin"]): Requiere rol admin
 *
 * Parámetros:
 * - id: ID del historial clínico a actualizar
 *
 * Body esperado (parcial):
 * {
 *   "peso": 24,
 *   "tratamiento": "Nueva pauta"
 * }
 *
 * Respuesta exitosa (200):
 * { _id: "...", paciente: "Firulais", peso: 24 }
 */
router.put(
  "/:id",
  authenticate,
  authorize(["admin"]),
  updateHClinicasValidator,
  validateDto,
  hClinicasController.updateHClinica,
);

/**
 * RUTA: DELETE /api/historiaClinica/:id
 *
 * Elimina un historial clínico de la base de datos
 *
 * Middlewares:
 * - authenticate: Requiere token JWT válido
 * - authorize(["admin"]): Requiere rol admin
 *
 * Parámetros:
 * - id: ID del historial clínico a eliminar
 *
 * Respuesta exitosa (200):
 * { message: "Historial clínico eliminado!" }
 */
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  hClinicasController.deleteHClinica,
);

// Exportar router para ser usado en app.use("/api/producto", router)
export default router;
