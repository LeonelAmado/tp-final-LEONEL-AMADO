/**
 * INTERFAZ: JwtPayload
 *
 * Define la estructura de datos que se incluyen en el token JWT (JSON Web Token)
 * Estos son los datos que se codifican en el token y se recuperan cuando se verifica
 *
 * Se usa para:
 * - Crear tokens al hacer login
 * - Verificar y decodificar tokens
 * - Acceder a datos del usuario autenticado (req.user)
 */
export interface JwtPayload {
  id: string; // ID único del usuario en MongoDB
  username: string; // Nombre de usuario
  email: string; // Email del usuario
  role: UserRole; // Rol del usuario (admin o user)
  nombre: string; // Nombre real del usuario
  apellido: string; // Apellido del usuario
}

/**
 * ENUM: UserRole
 *
 * Define los roles disponibles en la aplicación
 * Se usa para controlar permisos y acceso a funcionalidades
 *
 * Roles:
 * - USER: Usuario normal con permisos básicos (dueños de mascotas)
 * - ADMIN: Administrador con permisos para gestionar veterinarias e historiales
 */
export enum UserRole {
  USER = "user", // Usuario regular (dueño de mascotas)
  ADMIN = "admin", // Administrador (veterinario o gestor)
}

/**
 * INTERFAZ: RegisterDTO
 *
 * DTO para registro de nuevos usuarios
 * Define qué datos son necesarios al crear una cuenta
 */
export interface RegisterDTO {
  username: string;
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  direccion?: string;
  telefono?: string;
  mascotas?: string[]; // Array de nombres de mascotas (opcional)
}

/**
 * INTERFAZ: LoginDTO
 *
 * DTO para inicio de sesión
 * Solo requiere email y contraseña
 */
export interface LoginDTO {
  email: string;
  password: string;
}

/**
 * INTERFAZ: AuthResponseDTO
 *
 * DTO para respuesta de autenticación exitosa
 * Incluye el token JWT y datos básicos del usuario
 */
export interface AuthResponseDTO {
  token: string; // Token JWT
  user: {
    id: string;
    username: string;
    email: string;
    nombre: string;
    apellido: string;
    role: UserRole;
  };
}
