import bcrypt from "bcrypt";
import * as userModel from "../models/users.model";
import jwt, { SignOptions } from "jsonwebtoken";
import { JwtPayload, UserRole } from "../types/auth";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET no definido");
}

const secretKey: string = process.env.JWT_SECRET;

export const register = async (
  username: string,
  email: string,
  password: string,
): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const userID = await userModel.createUser({
    username,
    email,
    password: hashedPassword,
  });

  return userID;
};

export const login = async (
  email: string,
  password: string,
): Promise<string> => {
  const invalidCredentialsError = new Error("Credenciales Inválidas");

  const user = await userModel.findUser(email);
  if (!user) throw invalidCredentialsError;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw invalidCredentialsError;

  const payload: JwtPayload = {
    id: user.id,
    username: user.username,
    role: user.role as UserRole,
  };

  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN as any) || "1h",
    issuer: "curso-utn-backend",
  };

  return jwt.sign(payload, secretKey, options);
};
