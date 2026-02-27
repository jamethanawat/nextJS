import { API_BASE_URL, API_BASIC_AUTH } from "@/config/api";
import { getAuthToken } from "@/app/services/authService";
import type { User, UserPayload } from "@/app/types/user";

const baseUrl = API_BASE_URL.replace(/\/+$/, "");
const USERS_ENDPOINT = `${baseUrl}/users`;

type AuthOptions = { auth?: 'basic' | 'bearer' | 'none' };

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
} & AuthOptions;

async function request<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const { body, headers, auth = 'bearer', ...rest } = options;

  const authHeaders: Record<string, string> = {};
  if (auth === 'basic') {
    authHeaders.Authorization = `Basic ${API_BASIC_AUTH}`;
  } else if (auth === 'bearer') {
    const token = getAuthToken();
    if (token) {
      authHeaders.Authorization = `Bearer ${token}`;
    }
  }

  const response = await fetch(url, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders,
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  }).catch((error) => {
    console.log("Fetch error:", error);
    throw error;
  });

  if (!response.ok) {
    const message = await response.text();
    console.log("API Error:", response.status, message);
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export async function getUsers(): Promise<User[]> {
  return request<User[]>(USERS_ENDPOINT, { auth: 'basic' });
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