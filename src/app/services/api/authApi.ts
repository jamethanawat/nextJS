import { API_BASE_URL } from "@/config/api";
import type { AuthResponse, LoginPayload } from "@/app/types/auth";

const baseUrl = API_BASE_URL.replace(/\/+$/, "");
const AUTH_ENDPOINT = `${baseUrl}/auth/login`;

async function request<T>(url: string, options: RequestInit): Promise<T> {
  const response = await fetch(url, options);

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  return request<AuthResponse>(AUTH_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}
