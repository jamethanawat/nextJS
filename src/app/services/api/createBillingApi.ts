import { API_BASE_URL, API_BASIC_AUTH } from "@/config/api";
import { getAuthToken } from "@/app/services/authService";
import type {
  CancelSoLogItem,
  CreateBillingCount,
  CreateBillingItem,
  CreateBillingLogItem,
  MurCount,
  MurItem,
} from "@/app/types/createBilling";

const baseUrl = API_BASE_URL.replace(/\/+$/, "");
const CREATE_BILLING_ENDPOINT = `${baseUrl}/create-billing`;

type AuthOptions = { auth?: "basic" | "bearer" | "none" };

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
} & AuthOptions;

async function request<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const { body, headers, auth = "bearer", ...rest } = options;

  const authHeaders: Record<string, string> = {};
  if (auth === "basic") {
    authHeaders.Authorization = `Basic ${API_BASIC_AUTH}`;
  } else if (auth === "bearer") {
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

export async function getCreateBillingList(): Promise<CreateBillingItem[]> {
  return request<CreateBillingItem[]>(`${CREATE_BILLING_ENDPOINT}/list`);
}

export async function getMurList(): Promise<MurItem[]> {
  return request<MurItem[]>(`${CREATE_BILLING_ENDPOINT}/mur/list`);
}

export async function getCreateBillingCount(): Promise<CreateBillingCount> {
  return request<CreateBillingCount>(`${CREATE_BILLING_ENDPOINT}/count`);
}

export async function getMurCount(): Promise<MurCount> {
  return request<MurCount>(`${CREATE_BILLING_ENDPOINT}/mur/count`);
}

export async function getCreateBillingLogById(
  createBillingId: number
): Promise<CreateBillingLogItem[]> {
  return request<CreateBillingLogItem[]>(
    `${CREATE_BILLING_ENDPOINT}/${createBillingId}/log`
  );
}

export async function getCancelSoLogById(
  createBillingId: number
): Promise<CancelSoLogItem[]> {
  return request<CancelSoLogItem[]>(
    `${CREATE_BILLING_ENDPOINT}/${createBillingId}/cancel-so-log`
  );
}
