import { Request, Response } from "express";
import * as hClinicasService from "../services/hClinicas.service";
import { IHClinica } from "../models/hClinicas.model";

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
export const createHClinica = async (req: Request, res: Response) => {
  try {
    const hClinicaData: IHClinica = req.body;

    // Llamar servicio para crear historial clínico
    const hClinica = await hClinicasService.createHClinica(hClinicaData);

    // Retornar 201 Created con el historial creado
    return res.status(201).json(hClinica);
  } catch (error: any) {
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
 *   { _id: "...", paciente: "...","duenoId: 123, edad: 4, raza: "..." },
 *   { _id: "...", paciente: "...","duenoId: 456, edad: 2, raza: "..." }
 * ]
 */
export const getAllHClinicas = async (req: Request, res: Response) => {
  try {
    // Llamar servicio para obtener todos los historiales clínicos
    const hClinicas = await hClinicasService.getAllHClinicas();

    // Retornar 200 OK con array de historiales clínicos
    return res.status(200).json(hClinicas);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al obtener historiales clínicos" });
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
export const getHClinicaById = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  try {
    // Llamar servicio para obtener historial clínico por ID
    const hClinica = await hClinicasService.getHClinicaById(id);

    // Si no existe, retornar 404 Not Found
    if (!hClinica) {
      return res.status(404).json({ error: "Historial clínico no encontrado" });
    }

    // Retornar 200 OK con el historial clínico
    return res.status(200).json(hClinica);
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error al obtener el historial clínico ${id}` });
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
export const updateHClinica = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  try {
    // Extraer datos a actualizar del body
    const hClinicaData: Partial<IHClinica> = req.body;

    // Llamar servicio para actualizar historial clínico
    const hClinica = await hClinicasService.updateHClinica(id, hClinicaData);

    // Si no existe, retornar 404 Not Found
    if (!hClinica) {
      return res.status(404).json({ error: "Historial clínico no encontrado" });
    }

    // Retornar 200 OK con historial clínico actualizado
    return res.status(200).json(hClinica);
  } catch (error) {
    return res
      .status(400)
      .json({ error: `Error al actualizar el historial clínico ${id}` });
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
export const deleteHClinica = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  try {
    // Llamar servicio para eliminar historial clínico
    const hClinica = await hClinicasService.deleteHClinica(id);

    // Si no existe, retornar 404 Not Found
    if (!hClinica) {
      return res.status(404).json({ error: "Historial clínico no encontrado" });
    }

    // Retornar 200 OK con mensaje de éxito
    return res.status(200).json({ message: "Historial clínico eliminado!" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error al eliminar el historial clínico ${id}` });
  }
};
