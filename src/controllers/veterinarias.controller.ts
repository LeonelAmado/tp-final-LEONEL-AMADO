import { Request, Response } from "express";
import * as veterinariasService from "../services/veterinarias.service";
import {
  CreateVeterinariaDTO,
  UpdateVeterinariaDTO,
} from "../types/veterinarias";

/**
 * CONTROLADOR: getAll
 *
 * Maneja solicitudes GET a /api/categoria/
 * Retorna todas las veterinarias de la base de datos
 * Requiere autenticación
 *
 * Respuesta exitosa (200):
 * [
 *   { id: "...", name: "Vet Center", direccion: "...", telefono: "...", email: "..." },
 *   { id: "...", name: "Vet Norte", direccion: "...", telefono: "...", email: "..." }
 * ]
 */
export const getAll = async (_req: Request, res: Response) => {
  try {
    // Llamar servicio para obtener todas las veterinarias
    const veterinarias = await veterinariasService.getAllVeterinarias();
    // Retornar 200 OK con array de veterinarias
    return res.status(200).json(veterinarias);
  } catch (error) {
    // Error interno al obtener veterinarias
    return res
      .status(500)
      .json({ mensaje: "Error al obtener las veterinarias" });
  }
};

/**
 * CONTROLADOR: getById
 *
 * Maneja solicitudes GET a /api/categoria/:id
 * Retorna una veterinaria específica por su ID
 *
 * Parámetros:
 * - id: ID de MongoDB de la veterinaria
 *
 * Respuesta exitosa (200):
 * { id: "...", name: "Vet Center", direccion: "...", telefono: "...", email: "..." }
 *
 * Respuestas de error:
 * - 400: ID inválido
 * - 404: Veterinaria no encontrada
 * - 500: Error interno
 */
export const getById = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  try {
    // Llamar servicio para obtener veterinaria por ID
    const veterinaria = await veterinariasService.getVeterinariaById(id);

    // Si no existe, retornar 404 Not Found
    if (!veterinaria) {
      return res.status(404).json({ mensaje: "Veterinaria no encontrada" });
    }

    // Retornar 200 OK con la veterinaria
    return res.status(200).json(veterinaria);
  } catch (error) {
    return res
      .status(500)
      .json({ mensaje: `Error al obtener la veterinaria ${id}` });
  }
};

/**
 * CONTROLADOR: create
 *
 * Maneja solicitudes POST a /api/categoria/
 * Crea una nueva veterinaria
 * Requiere autenticación y rol admin
 *
 * Body esperado:
 * {
 *   "name": "Vet Center",
 *   "direccion": "Av. Principal 123",
 *   "telefono": "555-1234",
 *   "email": "contacto@vet.com",
 *   "hClinica": { ... }
 * }
 *
 * Respuesta exitosa (201):
 * { id: "...", name: "Vet Center", direccion: "...", telefono: "...", email: "..." }
 */
export const create = async (req: Request, res: Response) => {
  try {
    // Extraer datos del body
    const veterinariaData: CreateVeterinariaDTO = req.body;

    // Llamar servicio para crear la veterinaria
    const newVeterinaria =
      await veterinariasService.createVeterinaria(veterinariaData);

    // Retornar 201 Created con la veterinaria creada
    return res.status(201).json(newVeterinaria);
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al crear la veterinaria" });
  }
};

/**
 * CONTROLADOR: update
 *
 * Maneja solicitudes PUT a /api/categoria/:id
 * Actualiza una veterinaria existente
 * Requiere autenticación y rol admin
 *
 * Parámetros:
 * - id: ID de la veterinaria a actualizar
 *
 * Body esperado (parcial):
 * {
 *   "telefono": "555-9999",
 *   "direccion": "Nueva dirección"
 * }
 *
 * Respuestas:
 * - 200: Veterinaria actualizada exitosamente
 * - 400: ID inválido o nombre duplicado
 * - 404: Veterinaria no encontrada
 * - 500: Error interno
 */
export const update = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  try {
    // Extraer datos a actualizar
    const veterinariaData: UpdateVeterinariaDTO = req.body;

    // Llamar servicio para actualizar veterinaria
    const updatedVeterinaria = await veterinariasService.updateVeterinaria(
      id,
      veterinariaData,
    );

    // Si no existe la veterinaria, retornar 404
    if (!updatedVeterinaria) {
      return res.status(404).json({ mensaje: "Veterinaria no encontrada" });
    }

    // Retornar 200 OK con veterinaria actualizada
    return res.status(200).json(updatedVeterinaria);
  } catch (error: any) {
    // Manejar error de nombre duplicado (código 11000 de MongoDB)
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ mensaje: "El nombre de la veterinaria ya existe" });
    }

    return res
      .status(500)
      .json({ mensaje: "Error al actualizar la veterinaria" });
  }
};

/**
 * CONTROLADOR: remove
 *
 * Maneja solicitudes DELETE a /api/categoria/:id
 * Elimina una veterinaria
 * Requiere autenticación y rol admin
 *
 * Parámetros:
 * - id: ID de la veterinaria a eliminar
 *
 * Respuestas:
 * - 200: Veterinaria eliminada exitosamente
 * - 400: ID inválido
 * - 404: Veterinaria no encontrada
 * - 500: Error interno
 */
export const remove = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  try {
    // Llamar servicio para eliminar veterinaria
    const deletedVeterinaria = await veterinariasService.removeVeterinaria(id);

    // Si no existe la veterinaria, retornar 404
    if (!deletedVeterinaria) {
      return res.status(404).json({ mensaje: "Veterinaria no encontrada" });
    }

    // Retornar 200 OK con mensaje de éxito
    return res
      .status(200)
      .json({ mensaje: `Veterinaria con ID ${id} eliminada exitosamente` });
  } catch (error) {
    return res
      .status(500)
      .json({ mensaje: "Error al eliminar la veterinaria" });
  }
};
