import { API_BASE_URL } from "@/config/api";
import type { AuthResponse, LoginPayload } from "@/app/types/auth";
import { request } from "@/app/services/api/httpClient";

const baseUrl = API_BASE_URL.replace(/\/+$/, "");

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  return request<AuthResponse>(`${baseUrl}/Login/Login`, {
    auth: "basic",
    method: "POST",
    body: payload,
  });
}
