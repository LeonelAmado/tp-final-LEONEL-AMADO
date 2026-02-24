export const decodeJwtPayload = <TPayload = Record<string, unknown>,>(
  token: string | null,
): TPayload | null => {
  if (!token) return null;

  try {
    const [, payload] = token.split(".");
    if (!payload) return null;

    const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = atob(normalizedPayload);

    return JSON.parse(decoded) as TPayload;
  } catch {
    return null;
  }
};
