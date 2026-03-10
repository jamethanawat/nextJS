import { API_BASE_URL } from "@/config/api";
import { request } from "@/app/services/api/httpClient";
import {
  mapContractToSavePayload,
  mapContractListItem,
  mapContractListRows,
  mapContractMasterData,
} from "@/app/services/api/mappers/contractMapper";
import type {
  ContractByIdApiResponse,
  ContractData,
  ContractSaveApiResponse,
  ContractMasterApiResponse,
  ContractMasterData,
  ContractListApiResponse,
} from "@/app/types/contract";

const baseUrl = API_BASE_URL.replace(/\/+$/, "");
const CONTRACT_ENDPOINT = `${baseUrl}/SaNo`;
const MASTER_ENDPOINT = `${baseUrl}/Master`;

function ensureStatus200(
  status: number,
  defaultMessage: string,
  data?: unknown
): void {
  if (status === 200) {
    return;
  }

  const detail = extractErrorDetail(data);
  throw new Error(
    detail
      ? `${defaultMessage}. API status: ${status}. Reason: ${detail}`
      : `${defaultMessage}. API status: ${status}`
  );
}

function extractErrorDetail(data: unknown): string | undefined {
  if (typeof data === "string" && data.trim()) {
    return data.trim();
  }

  if (typeof data !== "object" || data === null) {
    return undefined;
  }

  const payload = data as Record<string, unknown>;
  const directMessage = payload.message ?? payload.massage;

  if (typeof directMessage === "string" && directMessage.trim()) {
    return directMessage.trim();
  }

  return undefined;
}

export async function getContractList(): Promise<ContractData[]> {
  const res = await request<ContractListApiResponse>(`${CONTRACT_ENDPOINT}/GetByWhere`);
  ensureStatus200(res.status, "Failed to fetch contract list");
  const rows = res.data.Table ?? [];
  return mapContractListRows(rows);
}

export async function getContractById(id: number): Promise<ContractData> {
  const res = await request<ContractByIdApiResponse>(
    `${CONTRACT_ENDPOINT}/GetById?id=${id}`
  );
  ensureStatus200(res.status, "Failed to fetch contract detail");
  const rows = res.data?.Table ??[];
  const item = rows[0];

  if (!item) {
    throw new Error(`Contract id ${id} not found`);
  }

  return mapContractListItem(item);
}

export async function saveContract(
  source: Partial<ContractData>
): Promise<string> {
  const payload = mapContractToSavePayload(source);
  const res = await request<ContractSaveApiResponse>(`${CONTRACT_ENDPOINT}/Save`, {
    method: "POST",
    body: payload,
  });
  ensureStatus200(res.status, "Failed to save contract", res.data);

  const message = extractErrorDetail(res.data);
  return message || "Save successful.";
}

export async function getContractMasterData(): Promise<ContractMasterData> {
  const res = await request<ContractMasterApiResponse>(`${MASTER_ENDPOINT}/MasterSaNo`);
  ensureStatus200(res.status, "Failed to fetch contract master data");
  return mapContractMasterData(res.data ?? res.result);
}
