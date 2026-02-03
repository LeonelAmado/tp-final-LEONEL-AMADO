import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

const validateDto = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  console.log("Validating DTO for request to", errors);

  if (errors.isEmpty()) {
    return next(); // si no hay error, continua al controller
  }

  console.log("Errores de validación:", errors.array());

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export default validateDto;
