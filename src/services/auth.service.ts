// Importar bcrypt para hashear contraseñas de manera segura
import bcrypt from "bcrypt";
import * as userModel from "../models/users.model";
import jwt, { SignOptions } from "jsonwebtoken";
import { JwtPayload, RegisterDTO, UserRole } from "../types/auth";

/**
 * Verificar que la clave secreta JWT esté configurada en variables de entorno
 * Si no existe, la aplicación no puede continuar
 */
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET no definido");
}

// Obtener clave secreta desde variables de entorno
const secretKey: string = process.env.JWT_SECRET;

/**
 * SERVICIO: register
 *
 * Registra un nuevo usuario en el sistema
 *
 * Pasos:
 * 1. Hashear la contraseña con bcrypt (10 rondas)
 * 2. Crear el usuario en la base de datos con contraseña hasheada
 * 3. Retornar el ID del usuario creado
 *
 * @param username - Nombre de usuario
 * @param email - Email del usuario
 * @param password - Contraseña sin hashear (será hasheada aquí)
 * @returns ID del usuario creado
 *
 * Uso:
 * const userId = await register("leonel", "leo@example.com", "Secure123!");
 */
export const register = async (data: RegisterDTO): Promise<string> => {
  // Hashear contraseña: bcrypt.hash(texto, rondas)
  // Más rondas = más seguro pero más lento
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // Crear usuario en base de datos con contraseña hasheada
  const userID = await userModel.createUser({
    username: data.username,
    email: data.email,
    password: hashedPassword, // Guardar contraseña hasheada, nunca el texto plano
    nombre: data.nombre,
    apellido: data.apellido,
    direccion: data.direccion,
    telefono: data.telefono,
    mascotas: data.mascotas ? { nombres: data.mascotas } : undefined,
  });

  return userID;
};

/**
 * SERVICIO: login
 *
 * Autentica un usuario y genera un token JWT
 *
 * Pasos:
 * 1. Buscar el usuario por email
 * 2. Comparar contraseña ingresada con la hasheada en BD
 * 3. Si es correcta, generar token JWT con datos del usuario
 * 4. Retornar el token
 *
 * @param email - Email del usuario
 * @param password - Contraseña sin hashear (será comparada con el hash)
 * @returns Token JWT válido
 * @throws Error si credenciales son inválidas
 *
 * Uso:
 * const token = await login("leo@example.com", "Secure123!");
 */
export const login = async (
  email: string,
  password: string,
): Promise<string> => {
  // Mensaje de error genérico para no revelar si el email existe
  const invalidCredentialsError = new Error("Credenciales Inválidas");

  // Buscar usuario por email
  const user = await userModel.findUser(email);
  if (!user) throw invalidCredentialsError;

  // Comparar contraseña ingresada con la hasheada en la BD
  // bcrypt.compare devuelve true si coinciden, false si no
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw invalidCredentialsError;

  // Crear payload para el token JWT
  // Incluye datos que necesitamos para autorización posterior
  const payload: JwtPayload = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role as UserRole,
    nombre: user.nombre,
    apellido: user.apellido,
  };

  // Configurar opciones del token JWT
  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN as any) || "1h", // Expira en 1 hora
    issuer: "curso-utn-backend", // Quién emitió el token
  };

  // Firmar y generar el token JWT
  // jwt.sign(payload, clave_secreta, opciones)
  return jwt.sign(payload, secretKey, options);
};
