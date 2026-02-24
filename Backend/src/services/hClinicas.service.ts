// Importar modelo de producto
// Importar modelo de historial clínico
import { IHClinica, HClinica } from "../models/hClinicas.model";

/**
 * SERVICIO: createHClinica
 *
 * Crea un nuevo historial clínico en la base de datos
 *
 * @param data - Datos del historial clínico a crear
 * @returns Documento del historial clínico creado
 *
 * Uso:
 * const newHClinica = await createHClinica({
 *   paciente: "Firulais",
 *   duenoId: 123,
 *   edad: 4,
 *   raza: "Labrador"
 * });
 */
export const createHClinica = async (data: IHClinica) => {
  const hClinica = new HClinica(data);
  return await hClinica.save();
};

/**
 * SERVICIO: getAllHClinicas
 *
 * Obtiene todos los historiales clínicos de la base de datos
 *
 * @returns Array de historiales clínicos
 *
 * Uso:
 * const historiales = await getAllHClinicas();
 */
export const getAllHClinicas = async () => {
  return await HClinica.find().populate({
    path: "mascotaId",
    populate: { path: "duenoId", select: "nombre apellido username" },
  });
};

/**
 * SERVICIO: getHClinicaById
 *
 * Obtiene un historial clínico específico por su ID
 *
 * @param id - ID de MongoDB del historial clínico
 * @returns Documento del historial clínico encontrado, o null si no existe
 *
 * Uso:
 * const hClinica = await getHClinicaById("507f1f77bcf86cd799439011");
 */
export const getHClinicaById = async (id: string) => {
  return await HClinica.findById(id).populate({
    path: "mascotaId",
    populate: { path: "duenoId", select: "nombre apellido username" },
  });
};

/**
 * SERVICIO: updateHClinica
 *
 * Actualiza un historial clínico existente
 *
 * @param id - ID del historial clínico a actualizar
 * @param data - Datos parciales a actualizar
 * @returns Historial clínico actualizado, o null si no existe
 *
 * Uso:
 * const updated = await updateHClinica("507f...", { peso: 24 });
 */
export const updateHClinica = async (id: string, data: Partial<IHClinica>) => {
  return await HClinica.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

/**
 * SERVICIO: deleteHClinica
 *
 * Elimina un historial clínico de la base de datos
 *
 * @param id - ID del historial clínico a eliminar
 * @returns Documento del historial clínico eliminado, o null si no existe
 *
 * Uso:
 * const deleted = await deleteHClinica("507f1f77bcf86cd799439011");
 */
export const deleteHClinica = async (id: string) => {
  return await HClinica.findByIdAndDelete(id);
};
