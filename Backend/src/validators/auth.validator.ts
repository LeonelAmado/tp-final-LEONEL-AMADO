import { body } from "express-validator";
import { ValidationChain } from "express-validator";

/**
 * VALIDADOR: validatePassword
 *
 * Define las reglas de validación para contraseñas
 * Requiere una contraseña fuerte con múltiples criterios
 *
 * Reglas:
 * - Mínimo 8 caracteres
 * - Al menos un número
 * - Al menos una mayúscula
 * - Al menos un carácter especial (!@#$%^&* etc)
 */
export const validatePassword: ValidationChain[] = [
  body("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/\d/) // Busca al menos un dígito (0-9)
    .withMessage("La contraseña debe contener al menos un número")
    .matches(/[A-Z]/) // Busca al menos una mayúscula
    .withMessage("La contraseña debe contener al menos una mayúscula")
    .matches(/[^A-Za-z0-9]/) // Busca al menos un carácter especial
    .withMessage("La contraseña debe contener al menos un carácter especial"),
];

/**
 * VALIDADOR: validateEmail
 *
 * Define las reglas de validación para emails
 *
 * Reglas:
 * - Debe ser un formato de email válido
 * - Se normaliza automáticamente (espacios eliminados, minúsculas, etc)
 */
export const validateEmail: ValidationChain[] = [
  body("email")
    .isEmail() // Valida formato de email
    .withMessage("Debe ser un email válido")
    .normalizeEmail(), // Normaliza el email
];

/**
 * VALIDADOR: registerValidator
 *
 * Combinación de validadores para el endpoint de registro
 * Valida: email, contraseña y username
 *
 * Uso en rutas:
 * router.post("/register", registerValidator, registerController)
 */
export const registerValidator: ValidationChain[] = [
  ...validateEmail, // Incluir validación de email
  ...validatePassword, // Incluir validación de contraseña
  // Validación adicional para username
  body("username")
    .isLength({ min: 3 })
    .withMessage("Username debe tener al menos 3 caracteres")
    .matches(/^[a-zA-Z0-9_]+$/) // Solo letras, números y guiones bajos
    .withMessage(
      "Username solo puede contener letras, números y guiones bajos",
    ), // Validación para nombre
  body("nombre")
    .isLength({ min: 2 })
    .withMessage("Nombre debe tener al menos 2 caracteres")
    .isString()
    .withMessage("Nombre debe ser una cadena de texto"),
  // Validación para apellido
  body("apellido")
    .isLength({ min: 2 })
    .withMessage("Apellido debe tener al menos 2 caracteres")
    .isString()
    .withMessage("Apellido debe ser una cadena de texto"),
  // Validación opcional para teléfono
  body("telefono")
    .optional()
    .isString()
    .withMessage("Teléfono debe ser una cadena de texto"),
  // Validación opcional para dirección
  body("direccion")
    .optional()
    .isString()
    .withMessage("Dirección debe ser una cadena de texto"),
  // Validación opcional para mascotas
  body("mascotas")
    .optional()
    .isArray()
    .withMessage("Mascotas debe ser un arreglo de nombres"),
];

/**
 * VALIDADOR: loginValidator
 *
 * Validadores para el endpoint de login
 * Valida: email y contraseña (menos estricta que registro)
 *
 * Uso en rutas:
 * router.post("/login", loginValidator, loginController)
 */
export const loginValidator: ValidationChain[] = [
  ...validateEmail, // Incluir validación de email
  body("password")
    .notEmpty() // Verifica que no esté vacío
    .withMessage("La contraseña es requerida"),
];
