import { body, ValidationChain } from "express-validator";

/**
 * VALIDADOR: paciente
 *
 * Validaciones para el campo dirección
 * - Opcional (puede no incluirse en la solicitud)
 * - Si se incluye, debe ser una cadena de texto
 * - Máximo 200 caracteres
 */
const name: ValidationChain[] = [
  body("name")
    .optional()
    .isString()
    .withMessage("El nombre debe ser una cadena de texto")
    .isLength({ max: 50, min: 3 })
    .withMessage("El nombre debe tener entre 3 y 50 caracteres"),
];

/**
 * VALIDADOR: telefono
 *
 * Validaciones para el campo teléfono
 * - Opcional (puede no incluirse en la solicitud)
 * - Si se incluye, debe ser una cadena de texto
 * - Máximo 30 caracteres
 */
// const duenoId: ValidationChain[] = [
//   body("duenoId")
//     .isNumeric()
//     .withMessage("El duenoId debe ser una cadena de números")
//     .isInt({ max: 50 })
//     .withMessage("El duenoId no puede exceder los 30 caracteres"),
// ];

/**
 * VALIDADOR: email
 *
 * Validaciones para el campo email
 * - Opcional (puede no incluirse en la solicitud)
 * - Si se incluye, debe ser un email válido
 */
const edad: ValidationChain[] = [
  body("edad")
    .isNumeric()
    .withMessage("Edad debe ser una cadena de números")
    .isLength({ max: 30 })
    .withMessage("Edad no puede exceder los 30 caracteres"),
];

/**
 * VALIDADOR: name
 *
 * Validaciones para el campo nombre de veterinaria
 * - Obligatorio
 * - Debe ser una cadena de texto
 * - Entre 3 y 50 caracteres
 */
const raza: ValidationChain[] = [
  body("raza")
    .notEmpty() // No puede estar vacío
    .withMessage("La raza es obligatorio")
    .isString()
    .withMessage("La raza debe ser una cadena de texto")
    .isLength({ max: 50, min: 3 })
    .withMessage("La raza debe tener entre 3 y 50 caracteres"),
];

/**
 * VALIDADOR: veterinariaValidator
 *
 * Combina todas las validaciones necesarias para crear una veterinaria
 * - Nombre (obligatorio)
 * - Dirección (opcional)
 * - Teléfono (opcional)
 * - Email (opcional)
 *
 * Uso en rutas:
 * router.post("/", veterinariaValidator, validateDto, controller)
 * router.put("/:id", veterinariaValidator, validateDto, controller)
 */
const mascotasValidation: ValidationChain[] = [
  ...raza,
  ...name,
  // ...duenoId,
  ...edad,
];

/**
 * Exportar el mismo validador para crear y actualizar
 */
export const createMascotasValidator = mascotasValidation;
export const updateMascotasValidator = mascotasValidation;
