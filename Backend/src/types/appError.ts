/**
 * CLASE PERSONALIZADA: AppError
 *
 * Clase que extiende Error para crear errores personalizados de la aplicación
 * Permite incluir un código HTTP apropiado para cada tipo de error
 *
 * Ventajas:
 * - Distinguir errores de aplicación de otros tipos de errores
 * - Incluir código HTTP automáticamente
 * - Facilitar manejo en middleware de errores
 *
 * Ejemplo de uso:
 * throw new AppError("Usuario no encontrado", 404)
 * throw new AppError("Acceso denegado", 403)
 */
export class AppError extends Error {
  // Código HTTP a retornar (200, 400, 401, 404, 500, etc)
  public readonly statusCode: number;

  // Indica si es un error operacional conocido (no un error del programa)
  public readonly isOperational: boolean;

  /**
   * Constructor de AppError
   *
   * @param message - Mensaje de error descriptivo
   * @param statusCode - Código HTTP (404, 400, 403, 500, etc)
   */
  constructor(message: string, statusCode: number) {
    // Llamar al constructor de Error
    super(message);

    // Asignar el código HTTP
    this.statusCode = statusCode;

    // Marcar como error operacional (esperado) vs error de programación
    this.isOperational = true;

    // Capturar el stack trace desde este constructor en adelante
    // Esto mejora la legibilidad del stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}
