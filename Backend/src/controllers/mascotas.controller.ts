import { Request, Response } from "express";
import * as mascotasService from "../services/mascotas.service";
import { IMascotas } from "../models/mascotas.model";

/**
 * CONTROLADOR: createHClinica
 *
 * Maneja solicitudes POST a /api/producto/
 * Crea un nuevo historial clínico en la base de datos
 * Requiere autenticación y rol admin
 *
 * Body esperado:
 * {
 *   "paciente": "Firulais",
 *   "duenoId": 123,
 *   "edad": 4,
 *   "raza": "Labrador",
 *   "peso": 22.5,
 *   "motivoConsulta": "Control anual",
 *   "diagnostico": "Saludable",
 *   "tratamiento": "Ninguno",
 *   "fecha": "2024-01-01T00:00:00.000Z"
 * }
 *
 * Respuestas:
 * - 201: Historial clínico creado exitosamente
 * - 400: Datos inválidos
 * - 500: Error interno
 */
export const createMascotas = async (req: Request, res: Response) => {
  try {
    const mascotasData: IMascotas = req.body;

    // Llamar servicio para crear historial clínico
    const mascotas = await mascotasService.createMascotas(mascotasData);

    // Retornar 201 Created con el historial creado
    return res.status(201).json(mascotas);
  } catch (error: any) {
    console.error(error); // 👈 importante
    return res.status(500).json({ error: error.message });
  }
};

/**
 * CONTROLADOR: getAllHClinicas
 *
 * Maneja solicitudes GET a /api/producto/
 * Retorna todos los historiales clínicos de la base de datos
 * No requiere autenticación
 *
 * Respuesta exitosa (200):
 * [
 *   { _id: "...", paciente: "...", duenoId: 123, edad: 4, raza: "..." },
 *   { _id: "...", paciente: "...", duenoId: 456, edad: 2, raza: "..." }
 * ]
 */
export const getAllMascotas = async (req: Request, res: Response) => {
  try {
    // Llamar servicio para obtener todos los historiales clínicos
    const mascotas = await mascotasService.getAllMascotas();

    // Retornar 200 OK con array de historiales clínicos
    return res.status(200).json(mascotas);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener mascotas" });
  }
};

/**
 * CONTROLADOR: getHClinicaById
 *
 * Maneja solicitudes GET a /api/producto/:id
 * Retorna un historial clínico específico por su ID
 * No requiere autenticación
 *
 * Parámetros:
 * - id: ID de MongoDB del historial clínico
 *
 * Respuestas:
 * - 200: Historial clínico encontrado
 * - 400: ID inválido
 * - 404: Historial clínico no encontrado
 * - 500: Error interno
 */
export const getMascotasById = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  try {
    // Llamar servicio para obtener historial clínico por ID
    const mascotas = await mascotasService.getMascotasById(id);

    // Si no existe, retornar 404 Not Found
    if (!mascotas) {
      return res.status(404).json({ error: "Mascota no encontrada" });
    }

    // Retornar 200 OK con el historial clínico
    return res.status(200).json(mascotas);
  } catch (error) {
    return res.status(500).json({ error: `Error al obtener mascota ${id}` });
  }
};

/**
 * CONTROLADOR: updateHClinica
 *
 * Maneja solicitudes PUT a /api/producto/:id
 * Actualiza un historial clínico existente
 * Requiere autenticación y rol admin
 *
 * Parámetros:
 * - id: ID del historial clínico a actualizar
 *
 * Body esperado (parcial):
 * {
 *   "peso": 24,
 *   "tratamiento": "Nueva pauta"
 * }
 *
 * Respuestas:
 * - 200: Historial clínico actualizado exitosamente
 * - 400: ID inválido o error al actualizar
 * - 404: Historial clínico no encontrado
 */
export const updateMascotas = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  try {
    // Extraer datos a actualizar del body
    const mascotasData: Partial<IMascotas> = req.body;

    // Llamar servicio para actualizar historial clínico
    const mascotas = await mascotasService.updateMascotas(id, mascotasData);

    // Si no existe, retornar 404 Not Found
    if (!mascotas) {
      return res.status(404).json({ error: "Mascota no encontrada" });
    }

    // Retornar 200 OK con historial clínico actualizado
    return res.status(200).json(mascotas);
  } catch (error) {
    return res.status(400).json({ error: `Error al actualizar mascota ${id}` });
  }
};

/**
 * CONTROLADOR: deleteHClinica
 *
 * Maneja solicitudes DELETE a /api/producto/:id
 * Elimina un historial clínico de la base de datos
 * Requiere autenticación y rol admin
 *
 * Parámetros:
 * - id: ID del historial clínico a eliminar
 *
 * Respuestas:
 * - 200: Historial clínico eliminado exitosamente
 * - 400: ID inválido
 * - 404: Historial clínico no encontrado
 * - 500: Error interno
 */
export const deleteMascotas = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  try {
    // Llamar servicio para eliminar historial clínico
    const mascota = await mascotasService.deleteMascotas(id);

    // Si no existe, retornar 404 Not Found
    if (!mascota) {
      return res.status(404).json({ error: "Mascota no encontrada" });
    }

    // Retornar 200 OK con mensaje de éxito
    return res.status(200).json({ message: "Mascota eliminada!" });
  } catch (error) {
    return res.status(500).json({ error: `Error al eliminar mascota ${id}` });
  }
};
