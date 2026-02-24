// Importar modelo de producto
// Importar modelo de historial clínico
import { IMascotas, Mascotas, mascotasSchema } from "../models/mascotas.model";
import {
  CreateMascotasDTO,
  MascotasResponseDTO,
  UpdateMascotasDTO,
} from "../types/mascotas";

const mapToResponseDTO = (mascota: IMascotas): MascotasResponseDTO => {
  const {
    _id,
    name,
    duenoId,
    edad,
    especie,
    raza,
    fecha,
    createdAt,
    updatedAt,
  } = mascota;

  return {
    id: _id.toString(),
    name,
    duenoId: duenoId.toString(),
    edad,
    especie,
    raza,
    fecha,
    createdAt,
    updatedAt,
  };
};
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
// export const createMascotas = async (data: IMascotas) => {
//   const mascotas = new Mascotas(data);
//   return await mascotas.save();
// };
export const createMascotas = async (
  data: CreateMascotasDTO,
): Promise<MascotasResponseDTO> => {
  const newMascota = new Mascotas(data);
  const savedMascota = await newMascota.save();
  return mapToResponseDTO(savedMascota);
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
export const getAllMascotas = async () => {
  return await Mascotas.find();
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
export const getMascotasById = async (id: string) => {
  return await Mascotas.findById(id);
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
// export const updateMascotas = async (id: string, data: Partial<IMascotas>) => {
//   return await Mascotas.findByIdAndUpdate(id, data, {
//     new: true,
//     runValidators: true,
//   });
// };
export const updateMascotas = async (
  id: string,
  data: UpdateMascotasDTO,
): Promise<MascotasResponseDTO | null> => {
  const mascotas = await Mascotas.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  return mascotas ? mapToResponseDTO(mascotas) : null;
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
export const deleteMascotas = async (id: string) => {
  return await Mascotas.findByIdAndDelete(id);
};
