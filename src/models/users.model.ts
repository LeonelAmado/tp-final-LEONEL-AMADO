import mongoose, { Schema, Document } from "mongoose";
import { UserRole } from "../types/auth";

/**
 * INTERFAZ: IUser
 *
 * Define la estructura de un usuario en la base de datos
 * Extiende Document para que sea compatible con Mongoose
 *
 * Campos:
 * - username: Nombre único del usuario
 * - email: Email único del usuario (formato validado)
 * - password: Contraseña hasheada con bcrypt
 * - role: Rol del usuario (user o admin)
 * - createdAt: Timestamp automático de creación
 * - updateAt: Timestamp automático de actualización
 */
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: UserRole;
  nombre: string;
  apellido: string;
  mascotas: {
    nombres: string[];
  };
  direccion?: string;
  telefono?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * ESQUEMA MONGOOSE: userSchema
 *
 * Define las reglas y validaciones para documentos de usuarios en MongoDB
 * Incluye validaciones de tipos, longitudes, formatos y restricciones
 */
const userSchema = new Schema<IUser>(
  {
    // Campo nombre de usuario
    username: {
      type: String,
      required: true, // Obligatorio
      unique: true, // No pueden haber dos usuarios con el mismo username
      trim: true, // Elimina espacios en blanco al inicio/final
      minlength: 3, // Mínimo 3 caracteres
    },
    // Campo email
    email: {
      type: String,
      required: true, // Obligatorio
      unique: true, // No pueden haber dos usuarios con el mismo email
      lowercase: true, // Convierte a minúsculas automáticamente
      trim: true, // Elimina espacios en blanco
      match: [
        // Valida formato de email
        /^\S+@\S+\.\S+$/,
        "Por favor ingresa un email válido",
      ],
    },
    // Campo contraseña
    password: {
      type: String,
      required: true, // Obligatorio
      minlength: 8, // Mínimo 8 caracteres
    },
    // Campo rol del usuario
    role: {
      type: String,
      enum: Object.values(UserRole), // Solo puede ser "user" o "admin"
      default: "user", // Por defecto los nuevos usuarios son "user"
    } as any,
    // Campo nombre del usuario
    nombre: {
      type: String,
      required: true, // Obligatorio
      trim: true, // Elimina espacios en blanco
    },
    // Campo apellido del usuario
    apellido: {
      type: String,
      required: true, // Obligatorio
      trim: true, // Elimina espacios en blanco
    },
    // Campo mascotas del usuario
    mascotas: {
      nombres: {
        type: [String],
        default: [],
      },
    },
    // Campo dirección del usuario
    direccion: {
      type: String,
      trim: true, // Elimina espacios en blanco
    },
    // Campo teléfono del usuario
    telefono: {
      type: String,
      trim: true, // Elimina espacios en blanco
    },
  },
  { timestamps: true }, // Añade automáticamente createdAt y updatedAt
);

// Crear modelo User a partir del esquema
export const User = mongoose.model<IUser>("User", userSchema);

/**
 * INTERFAZ: UserData
 *
 * Representa los datos de un usuario en el servicio/controlador
 * Similar a IUser pero sin métodos de Mongoose
 */
export interface UserData {
  id: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  nombre: string;
  apellido: string;
  direccion?: string;
  telefono?: string;
  mascotas?: {
    nombres: string[];
  };
}

/**
 * FUNCIÓN: findUser
 *
 * Busca un usuario por email o username en la base de datos
 *
 * @param email - Email del usuario a buscar (opcional)
 * @param username - Username del usuario a buscar (opcional)
 * @returns Datos del usuario encontrado o null si no existe
 *
 * Uso:
 * const user = await findUser("email@example.com");
 * const user = await findUser("", "leonel");
 */
export const findUser = async (
  email: string = "",
  username: string = "",
): Promise<UserData | null> => {
  // Buscar usuario que coincida con email O username
  const user = await User.findOne({ $or: [{ email }, { username }] }).lean();
  if (!user) return null;

  // Transformar documento de Mongoose a objeto UserData
  return {
    id: user._id.toString(),
    username: user.username,
    email: user.email,
    password: user.password,
    role: user.role as UserRole,
    nombre: user.nombre,
    apellido: user.apellido,
    direccion: user.direccion,
    telefono: user.telefono,
    mascotas: user.mascotas,
  };
};

/**
 * FUNCIÓN: createUser
 *
 * Crea un nuevo usuario en la base de datos
 * La contraseña debe ya estar hasheada antes de llamar esta función
 *
 * @param user - Datos del usuario a crear (sin id ni role)
 * @returns ID del usuario creado
 *
 * Uso:
 * const userId = await createUser({
 *   username: "leonel",
 *   email: "leo@example.com",
 *   password: hashedPassword
 * });
 */
export const createUser = async (
  user: Omit<UserData, "id" | "role">,
): Promise<string> => {
  // Crear nuevo documento de usuario
  const newUser = new User({
    username: user.username,
    email: user.email,
    password: user.password,
    nombre: user.nombre,
    apellido: user.apellido,
    direccion: user.direccion,
    telefono: user.telefono,
    mascotas: user.mascotas,
    role: "user", // Los nuevos usuarios siempre comienzan como "user"
  });

  // Guardar en la base de datos
  const saved = await newUser.save();

  // Retornar el ID del usuario creado
  return saved._id.toString();
};
