import mongoose, { Schema, Document } from "mongoose";

/**
 * INTERFAZ: IProduct
 *
 * Define la estructura de un producto (historial clínico) en la base de datos
 * Extiende Document para ser compatible con Mongoose
 *
 * Campos:
 * - name: Nombre único del producto
 * - description: Descripción opcional del producto
 * - price: Precio del producto (mínimo 0)
 * - stock: Cantidad disponible en stock (mínimo 0)
 * - categoryId: Referencia a la categoría a la que pertenece
 * - createdAt: Timestamp automático de creación
 * - updatedAt: Timestamp automático de actualización
 */
export interface IHClinica extends Document {
  paciente: string;
  dueñoId: number;
  edad: number;
  raza: string;
  peso: number;
  motivoConsulta: string;
  diagnostico: string;
  tratamiento: string;
  fecha: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * ESQUEMA MONGOOSE: productSchema
 *
 * Define las reglas de validación para documentos de productos en MongoDB
 * Los productos son historiales clínicos o servicios veterinarios
 */
export const hClinicaSchema = new Schema<IHClinica>(
  {
    // Campo nombre del paciente
    paciente: {
      type: String,
      required: true, // Obligatorio
      trim: true, // Elimina espacios en blanco
    },
    // Campo ID del dueño
    dueñoId: {
      type: Number,
      required: true, // Obligatorio
    },
    // Campo edad del paciente
    edad: {
      type: Number,
      required: true, // Obligatorio
      min: 0, // No puede ser negativo
    },
    // Campo raza del paciente
    raza: {
      type: String,
      required: true, // Obligatorio
      trim: true,
    },
    // Campo peso del paciente
    peso: {
      type: Number,
      required: true, // Obligatorio
      min: 0, // No puede ser negativo
    },
    // Campo motivo de la consulta
    motivoConsulta: {
      type: String,
      required: true, // Obligatorio
      trim: true,
    },
    // Campo diagnóstico
    diagnostico: {
      type: String,
      required: true, // Obligatorio
      trim: true,
    },
    // Campo tratamiento
    tratamiento: {
      type: String,
      required: true, // Obligatorio
      trim: true,
    },
    // Campo fecha de la consulta
    fecha: {
      type: Date,
      required: true, // Obligatorio
      default: Date.now, // Por defecto la fecha actual
    },
  },
  { timestamps: true }, // Genera automáticamente createdAt y updatedAt
);

/**
 * ÍNDICES: Mejoran velocidad de búsquedas frecuentes
 *
 * Un índice es una estructura que acelera las búsquedas
 * Trade-off: más rápido para leer, más lento para escribir
 */
// Índice en nombre: acelera búsquedas por nombre
hClinicaSchema.index({ paciente: 1 });

// Índice en dueñoId: acelera búsquedas por dueño
hClinicaSchema.index({ dueñoId: 1 });

// Índice en fecha: acelera búsquedas por rango de fechas
hClinicaSchema.index({ fecha: 1 });

/**
 * MODELO MONGOOSE: Product
 *
 * Representa la colección de productos en MongoDB
 * Se usa para hacer operaciones CRUD sobre documentos de productos
 */
export const HClinica = mongoose.model<IHClinica>(
  "historiaClinica",
  hClinicaSchema,
);
