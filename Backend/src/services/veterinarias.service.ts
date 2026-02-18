// Importar modelo y tipos de veterinaria
import { Veterinaria, IVeterinaria } from "../models/veterinarias.model";
import {
  CreateVeterinariaDTO,
  UpdateVeterinariaDTO,
  VeterinariaResponseDTO,
} from "../types/veterinarias";

/**
 * FUNCIÓN AUXILIAR: mapToResponseDTO
 *
 * Transforma un documento de Mongoose a un DTO para respuestas
 * Convierte el _id de Mongoose a id para mejor legibilidad en API
 *
 * @param veterinaria - Documento de veterinaria desde MongoDB
 * @returns Objeto VeterinariaResponseDTO formateado para cliente
 */
const mapToResponseDTO = (
  veterinaria: IVeterinaria,
): VeterinariaResponseDTO => {
  return {
    id: veterinaria._id.toString(),
    name: veterinaria.name,
    direccion: veterinaria.direccion,
    telefono: veterinaria.telefono,
    email: veterinaria.email,
    hClinica: veterinaria.hClinica,
    createdAt: veterinaria.createdAt,
    updatedAt: veterinaria.updatedAt,
  };
};

/**
 * SERVICIO: getAllVeterinarias
 *
 * Obtiene todas las veterinarias de la base de datos
 *
 * @returns Array de todas las veterinarias formateadas como DTO
 *
 * Uso:
 * const veterinarias = await getAllVeterinarias();
 */
export const getAllVeterinarias = async (): Promise<
  VeterinariaResponseDTO[]
> => {
  const veterinarias = await Veterinaria.find();
  return veterinarias.map(mapToResponseDTO);
};

/**
 * SERVICIO: getVeterinariaById
 *
 * Obtiene una veterinaria específica por su ID
 *
 * @param id - ID de MongoDB de la veterinaria
 * @returns Veterinaria encontrada como DTO, o null si no existe
 *
 * Uso:
 * const veterinaria = await getVeterinariaById("507f1f77bcf86cd799439011");
 */
export const getVeterinariaById = async (
  id: string,
): Promise<VeterinariaResponseDTO | null> => {
  const veterinaria = await Veterinaria.findById(id);
  return veterinaria ? mapToResponseDTO(veterinaria) : null;
};

/**
 * SERVICIO: createVeterinaria
 *
 * Crea una nueva veterinaria en la base de datos
 *
 * @param data - DTO con datos para crear veterinaria
 * @returns Nueva veterinaria creada formateada como DTO
 *
 * Uso:
 * const newVet = await createVeterinaria({ name: "Vet Center" });
 */
export const createVeterinaria = async (
  data: CreateVeterinariaDTO,
): Promise<VeterinariaResponseDTO> => {
  const newVeterinaria = new Veterinaria(data);
  const savedVeterinaria = await newVeterinaria.save();
  return mapToResponseDTO(savedVeterinaria);
};

/**
 * SERVICIO: updateVeterinaria
 *
 * Actualiza una veterinaria existente
 *
 * @param id - ID de la veterinaria a actualizar
 * @param data - DTO con datos a actualizar (parciales)
 * @returns Veterinaria actualizada como DTO, o null si no existe
 *
 * Uso:
 * const updated = await updateVeterinaria("507f...", { telefono: "123" });
 */
export const updateVeterinaria = async (
  id: string,
  data: UpdateVeterinariaDTO,
): Promise<VeterinariaResponseDTO | null> => {
  const veterinaria = await Veterinaria.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  return veterinaria ? mapToResponseDTO(veterinaria) : null;
};

/**
 * SERVICIO: removeVeterinaria
 *
 * Elimina una veterinaria de la base de datos
 *
 * @param id - ID de la veterinaria a eliminar
 * @returns Veterinaria eliminada como DTO, o null si no existe
 */
export const removeVeterinaria = async (
  id: string,
): Promise<VeterinariaResponseDTO | null> => {
  const veterinaria = await Veterinaria.findByIdAndDelete(id);
  return veterinaria ? mapToResponseDTO(veterinaria) : null;
};
