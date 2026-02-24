import { Request, Response, NextFunction } from "express";
import { AppError } from "../types/appError";

/**
 * MIDDLEWARE: Maneja errores globales de la aplicación
 *
 * Este middleware debe colocarse al final de todas las rutas para capturar
 * errores no controlados. Detecta diferentes tipos de errores y retorna
 * respuestas HTTP apropiadas.
 *
 * Tipos de errores que maneja:
 * - AppError: Errores personalizados de la aplicación
 * - CastError: ID de MongoDB inválido
 * - ValidationError: Errores de validación de Mongoose
 * - Errores de duplicados (código 11000)
 * - Errores genéricos no controlados
 *
 * @param err - El objeto error capturado
 * @param req - Objeto de solicitud HTTP
 * @param res - Objeto de respuesta HTTP
 * @param next - Función para pasar al siguiente middleware
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Si es un error personalizado de AppError
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  // Errores de Mongoose: ID no válido (formato incorrecto)
  if (err.name === "CastError") {
    return res.status(400).json({
      status: "error",
      message: "ID inválido",
    });
  }

  // Errores de validación de Mongoose (campos requeridos, formatos, etc)
  if (err.name === "ValidationError") {
    return res.status(400).json({
      status: "error",
      message: err.message,
    });
  }

  // Error de duplicado en MongoDB (ej: nombre de categoría único)
  // Código 11000 = violación de restricción UNIQUE
  if ((err as any).code === 11000) {
    return res.status(400).json({
      status: "error",
      message: "Valor duplicado en la base de datos",
    });
  }

  // Errores inesperados no controlados
  console.error("ERROR 💥:", err);
  return res.status(500).json({
    status: "error",
    message: err.message,
  });
};
