const API_BASE_URL = "http://localhost:3000";

export const getToken = (): string | null => localStorage.getItem("token");

export const apiRequest = async <TResponse = unknown,>(
  path: string,
  options: RequestInit = {},
): Promise<TResponse> => {
  const token = getToken();

  const headers = new Headers(options.headers);

  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const payloadWithErrors = payload as {
      error?: string;
      message?: string;
      errors?: Array<{ msg?: string }>;
    };

    const validationMessage = payloadWithErrors.errors
      ?.map((item) => item.msg)
      .filter(Boolean)
      .join(". ");

    const errorMessage =
      validationMessage ||
      payloadWithErrors.error ||
      payloadWithErrors.message ||
      "Ocurrió un error inesperado";

    throw new Error(errorMessage);
  }

  return payload as TResponse;
};

export default API_BASE_URL;
