import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

/**
 * MIDDLEWARE: Valida los datos recibidos (DTO - Data Transfer Object)
 *
 * Este middleware debe usarse DESPUÉS de los validadores de express-validator
 * en las rutas. Verifica si hay errores de validación y retorna una respuesta
 * de error si los hay.
 *
 * Ejemplo de uso en rutas:
 * router.post("/", createValidator, validateDto, controller)
 *
 * @param req - Objeto de solicitud HTTP
 * @param res - Objeto de respuesta HTTP
 * @param next - Función para continuar al siguiente middleware/controlador
 */
const validateDto = (req: Request, res: Response, next: NextFunction) => {
  // Obtener los resultados de validación de express-validator
  const errors = validationResult(req);
  console.log("Validating DTO for request to", errors);

  // Si no hay errores, continuar al siguiente middleware/controlador
  if (errors.isEmpty()) {
    return next();
  }

  // Registrar los errores en la consola para debugging
  console.log("Errores de validación:", errors.array());

  // Si hay errores, retornar respuesta 400 con detalles del error
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Esta línea generalmente no se ejecuta debido al return anterior
  next();
};

export default validateDto;
