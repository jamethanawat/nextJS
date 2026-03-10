import { API_BASE_URL } from "@/config/api";
import { request } from "@/app/services/api/httpClient";
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
