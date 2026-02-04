// Importar interfaz de payload JWT
import { JwtPayload } from "./auth";
import * as express from "express";

/**
 * DECLARACIÓN DE TIPOS: Extiende interfaz Request de Express
 *
 * Este archivo extiende los tipos de Express para añadir una propiedad personalizada
 * a la interfaz Request. Permite usar req.user en los controladores después de
 * pasar por el middleware de autenticación.
 *
 * Sin esto, TypeScript no reconocería req.user como una propiedad válida
 *
 * Uso en controladores:
 * const userId = req.user?.id;
 * const userRole = req.user?.role;
 */
declare global {
  namespace Express {
    interface Request {
      // Propiedad opcional que contiene los datos del usuario autenticado
      // Solo está disponible después de pasar por authenticate middleware
      user?: JwtPayload;
    }
  }
}
