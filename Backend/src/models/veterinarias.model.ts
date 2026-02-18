import mongoose, { Schema, Document } from "mongoose";
import { IHClinica, hClinicaSchema } from "./hClinicas.model";
/**
 * INTERFAZ: IVeterinaria
 *
 * Define la estructura de una veterinaria en la base de datos
 * Extiende Document para ser compatible con Mongoose
 *
 * Campos:
 * - name: Nombre de la veterinaria
 * - direccion: Dirección física
 * - telefono: Número telefónico
 * - email: Correo electrónico
 * - createdAt: Timestamp automático de creación
 * - updatedAt: Timestamp automático de actualización
 */

export interface IVeterinaria extends Document {
  name: string;
  direccion?: string;
  telefono?: string;
  email?: string;
  hClinica?: IHClinica;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * ESQUEMA MONGOOSE: veterinariaSchema
 *
 * Define las reglas de validación para documentos de veterinarias en MongoDB
 * Las veterinarias almacenan información de clínicas y sus historiales
 */
const veterinariaSchema = new Schema<IVeterinaria>(
  {
    // Campo nombre de veterinaria
    name: {
      type: String,
      required: true, // Obligatorio
      unique: true, // No pueden existir dos veterinarias con el mismo nombre
      trim: true, // Elimina espacios en blanco al inicio/final
    },
    // Campo dirección (opcional)
    direccion: {
      type: String,
      trim: true, // Elimina espacios en blanco
    },
    telefono: {
      type: String,
      trim: true, // Elimina espacios en blanco
    },
    email: {
      type: String,
      trim: true,
    },
    // Esquema embebido de historial clínico (opcional)
    hClinica: {
      type: hClinicaSchema,
      required: false,
    },
  },
  { timestamps: true }, // Genera automáticamente createdAt y updatedAt
);

/**
 * MODELO MONGOOSE: Veterinaria
 *
 * Representa la colección de veterinarias en MongoDB
 * Se usa para hacer operaciones CRUD (Create, Read, Update, Delete)
 * sobre los documentos de veterinarias
 */
export const Veterinaria = mongoose.model<IVeterinaria>(
  "Veterinaria",
  veterinariaSchema,
);
