import { Request, Response } from "express";
import * as authService from "../services/auth.service";

/**
 * CONTROLADOR: register
 *
 * Maneja las solicitudes POST a /auth/register
 * Procesa el registro de nuevos usuarios
 *
 * Pasos:
 * 1. Validar los datos recibidos (email, contraseña, username)
 * 2. Si hay errores de validación, retornar 400
 * 3. Llamar al servicio de registro
 * 4. Si el usuario ya existe, retornar 409 (Conflict)
 * 5. Si es exitoso, retornar 201 (Created)
 *
 * Body esperado:
 * {
 *   "username": "leonel",
 *   "email": "leo@example.com",
 *   "password": "Secure123!"
 * }
 */
export const register = async (req: Request, res: Response) => {
  try {
    // Extraer datos del body de la solicitud
    const {
      username,
      email,
      password,
      nombre,
      apellido,
      direccion,
      telefono,
      mascotas,
    } = req.body;

    // Llamar al servicio de autenticación para registrar el usuario
    await authService.register({
      username,
      email,
      password,
      nombre,
      apellido,
      direccion,
      telefono,
      mascotas,
    });

    // Retornar 201 Created con mensaje de éxito
    return res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (error: any) {
    // Manejar error de usuario duplicado (email o username ya existe)
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "El usuario o email ya existe" });
    }

    // Retornar 500 Internal Server Error
    return res.status(500).json({ error: "Error al registrar el usuario" });
  }
};

/**
 * CONTROLADOR: login
 *
 * Maneja las solicitudes POST a /auth/login
 * Autentica usuarios y retorna un token JWT
 *
 * Pasos:
 * 1. Validar los datos recibidos (email, contraseña)
 * 2. Si hay errores de validación, retornar 400
 * 3. Llamar al servicio de login
 * 4. Si credenciales son inválidas, retornar 401
 * 5. Si es exitoso, retornar el token JWT
 *
 * Body esperado:
 * {
 *   "email": "leo@example.com",
 *   "password": "Secure123!"
 * }
 *
 * Respuesta exitosa:
 * {
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 * }
 */
export const login = async (req: Request, res: Response) => {
  try {
    // Extraer datos del body de la solicitud
    const { email, password } = req.body;

    // Llamar al servicio de login para generar token JWT
    const token = await authService.login(email, password);

    // Retornar 200 OK con el token
    return res.json({ token });
  } catch (error: any) {
    // Manejar credenciales inválidas
    if (error.message === "Credenciales inválidas") {
      return res.status(401).json({ error: error.message });
    }

    // Manejar otros errores
    return res.status(500).json({ error: "Error al iniciar sesión" });
  }
};
