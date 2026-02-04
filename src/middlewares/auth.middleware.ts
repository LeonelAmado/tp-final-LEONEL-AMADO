import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/auth";

/**
 * Extiende la interfaz Request de Express para incluir datos del usuario autenticado
 * Esto permite acceder a req.user en los controladores después de autenticación
 */
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

// Obtener la clave secreta de JWT desde variables de entorno
const JWT_SECRET = process.env.JWT_SECRET as string;

/**
 * MIDDLEWARE: Verifica que el token JWT sea válido
 * - Extrae el token del header 'Authorization' (formato: Bearer <token>)
 * - Verifica la firma y validez del token
 * - Almacena los datos decodificados en req.user
 * - Si es inválido o no existe, retorna error 401 o 403
 *
 * @param req - Objeto de solicitud HTTP
 * @param res - Objeto de respuesta HTTP
 * @param next - Función para continuar al siguiente middleware
 */
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Extraer token del header Authorization (después de "Bearer ")
  const token = req.headers.authorization?.split(" ")[1]; // Bearer<token>
  console.log("Token recibido en authenticate:", token);

  // Si no hay token, retornar error 401 (No autorizado)
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Verificar la validez del token usando la clave secreta
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      // Si el token es inválido o expirado, retornar error 403 (Prohibido)
      return res.status(403).json({ message: "Invalid token or expired" });
    }
    // Si es válido, almacenar los datos decodificados en req.user
    req.user = decoded as JwtPayload;
    // Continuar al siguiente middleware o controlador
    next();
  });
};

/**
 * MIDDLEWARE: Verifica que el usuario autenticado tenga un rol permitido
 * - Se usa después de authenticate() para verificar permisos de rol
 * - Solo permite continuar si el usuario tiene uno de los roles especificados
 *
 * @param roles - Array con los roles permitidos (ej: ["admin", "user"])
 * @returns Función middleware que verifica el rol
 *
 * Ejemplo de uso:
 * router.post("/admin", authenticate, authorize(["admin"]), controller)
 */
export const authorize = (roles: Array<"user" | "admin">) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Verificar que el usuario exista y tenga uno de los roles permitidos
    if (!req.user || !roles.includes(req.user.role)) {
      // Si no cumple, retornar error 403 (Acceso denegado)
      return res.status(403).json({ message: "Acceso denegado" });
    }
    // Si tiene el rol correcto, continuar
    next();
  };
};
