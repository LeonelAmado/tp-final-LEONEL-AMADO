import { body, ValidationChain } from "express-validator";

const hClinicasValidation: ValidationChain[] = [
  body("mascotaId")
    .optional()
    .isMongoId()
    .withMessage("El mascotaId debe ser un ID válido"),

  body("peso")
    .optional()
    .isNumeric()
    .withMessage("El peso debe ser un número")
    .custom((value) => value >= 0)
    .withMessage("El peso no puede ser negativo"),

  body("motivoConsulta")
    .optional()
    .isString()
    .withMessage("El motivoConsulta debe ser texto")
    .isLength({ min: 3, max: 100 })
    .withMessage("El motivoConsulta debe tener entre 3 y 100 caracteres"),

  body("diagnostico")
    .optional()
    .isString()
    .withMessage("El diagnóstico debe ser texto"),

  body("tratamiento")
    .optional()
    .isString()
    .withMessage("El tratamiento debe ser texto"),

  body("notas").optional().isString().withMessage("Las notas deben ser texto"),

  body("fecha")
    .optional()
    .isISO8601()
    .withMessage("La fecha debe tener formato válido"),
];

/**
 * Exportar el mismo validador para crear y actualizar
 */
export const createHClinicasValidator = hClinicasValidation;
export const updateHClinicasValidator = hClinicasValidation;
