import { API_BASE_URL } from "@/config/api";
import { getAuthToken } from "@/app/services/authService";
import type { User, UserPayload } from "@/app/types/user";

const baseUrl = API_BASE_URL.replace(/\/+$/, "");
const USERS_ENDPOINT = `${baseUrl}/users`;

type RequestOptions = Omit<RequestInit, "body" | "method"> & {
  body?: unknown;
  method?: "GET" | "POST" | "PUT" | "DELETE";
};

async function request<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const { body, headers, method, ...rest } = options;
  const token = getAuthToken();

  const response = await fetch(url, {
    method: method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    ...rest,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export async function getUsers(): Promise<User[]> {
  return request<User[]>(USERS_ENDPOINT);
}

export async function getUserById(id: string): Promise<User> {
  return request<User>(`${USERS_ENDPOINT}/${id}`);
}

export async function createUser(payload: UserPayload): Promise<User> {
  return request<User>(USERS_ENDPOINT, { method: "POST", body: payload });
}

export async function updateUser(id: string, payload: UserPayload): Promise<User> {
  return request<User>(`${USERS_ENDPOINT}/${id}`, { method: "PUT", body: payload });
}

export async function deleteUser(id: string): Promise<void> {
  return request<void>(`${USERS_ENDPOINT}/${id}`, { method: "DELETE" });
}