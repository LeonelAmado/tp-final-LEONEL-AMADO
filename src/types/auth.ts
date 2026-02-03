export interface JwtPayload {
  id: string;
  username: string;
  role: UserRole;
}

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}
