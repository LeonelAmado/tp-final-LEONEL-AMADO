import { body, ValidationChain } from "express-validator";

/**
 * VALIDADOR: direccion
 *
 * Validaciones para el campo dirección
 * - Opcional (puede no incluirse en la solicitud)
 * - Si se incluye, debe ser una cadena de texto
 * - Máximo 200 caracteres
 */
const direccion: ValidationChain[] = [
  body("direccion")
    .optional() // No es obligatorio
    .isString()
    .withMessage("La dirección debe ser una cadena de texto")
    .isLength({ max: 200 })
    .withMessage("La dirección no puede exceder los 200 caracteres"),
];

/**
 * VALIDADOR: telefono
 *
 * Validaciones para el campo teléfono
 * - Opcional (puede no incluirse en la solicitud)
 * - Si se incluye, debe ser una cadena de texto
 * - Máximo 30 caracteres
 */
const telefono: ValidationChain[] = [
  body("telefono")
    .optional()
    .isString()
    .withMessage("El teléfono debe ser una cadena de texto")
    .isLength({ max: 30 })
    .withMessage("El teléfono no puede exceder los 30 caracteres"),
];

/**
 * VALIDADOR: email
 *
 * Validaciones para el campo email
 * - Opcional (puede no incluirse en la solicitud)
 * - Si se incluye, debe ser un email válido
 */
const email: ValidationChain[] = [
  body("email")
    .optional()
    .isEmail()
    .withMessage("El email debe ser válido")
    .normalizeEmail(),
];

/**
 * VALIDADOR: name
 *
 * Validaciones para el campo nombre de veterinaria
 * - Obligatorio
 * - Debe ser una cadena de texto
 * - Entre 3 y 50 caracteres
 */
const name: ValidationChain[] = [
  body("name")
    .notEmpty() // No puede estar vacío
    .withMessage("El nombre de la veterinaria es obligatorio")
    .isString()
    .withMessage("El nombre de la veterinaria debe ser una cadena de texto")
    .isLength({ max: 50, min: 3 })
    .withMessage(
      "El nombre de la veterinaria debe tener entre 3 y 50 caracteres",
    ),
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
const veterinariaValidation: ValidationChain[] = [
  ...name,
  ...direccion,
  ...telefono,
  ...email,
];

/**
 * Exportar el mismo validador para crear y actualizar
 */
export const createVeterinariaValidator = veterinariaValidation;
export const updateVeterinariaValidator = veterinariaValidation;
