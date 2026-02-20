import mongoose, { Schema, Document } from "mongoose";

export interface IMascotas extends Document {
  name: string;
  dueñoId: number;
  edad: number;
  raza: string;
  fecha: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const mascotasSchema = new Schema<IMascotas>(
  {
    // Campo nombre del paciente
    name: {
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
    // Campo fecha de la consulta
    fecha: {
      type: Date,
      required: true, // Obligatorio
      default: Date.now, // Por defecto la fecha actual
    },
  },
  { timestamps: true }, // Genera automáticamente createdAt y updatedAt
);

// Índice en nombre: acelera búsquedas por nombre
mascotasSchema.index({ name: 1 });

// Índice en dueñoId: acelera búsquedas por dueño
mascotasSchema.index({ dueñoId: 1 });

// Índice en fecha: acelera búsquedas por rango de fechas
mascotasSchema.index({ fecha: 1 });

export const Mascotas = mongoose.model<IMascotas>("Mascotas", mascotasSchema);
