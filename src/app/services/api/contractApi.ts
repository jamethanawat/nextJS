import { API_BASE_URL, API_BASIC_AUTH } from "@/config/api";
import { getAuthToken } from "@/app/services/authService";
import type {
  ContractCustomer,
  ContractData,
  ContractDistrChan,
  ContractShipTo,
} from "@/app/types/contract";

const baseUrl = API_BASE_URL.replace(/\/+$/, "");
const CONTRACT_ENDPOINT = `${baseUrl}/master/contract`;

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

export async function getContractList(): Promise<ContractData[]> {
  return request<ContractData[]>(`${CONTRACT_ENDPOINT}/list`);
}

export async function getContractCustomers(): Promise<ContractCustomer[]> {
  return request<ContractCustomer[]>(`${CONTRACT_ENDPOINT}/customers`);
}

export async function getContractShipTo(): Promise<ContractShipTo[]> {
  return request<ContractShipTo[]>(`${CONTRACT_ENDPOINT}/ship-to`);
}

export async function getContractDistrChan(): Promise<ContractDistrChan[]> {
  return request<ContractDistrChan[]>(`${CONTRACT_ENDPOINT}/distribution-channels`);
}
