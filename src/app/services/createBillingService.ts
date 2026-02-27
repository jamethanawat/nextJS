import {
  mockFetchCancelSoLogById,
  mockFetchCreateBillingCount,
  mockFetchCreateBillingList,
  mockFetchCreateBillingLogById,
  mockFetchMurCount,
  mockFetchMurList,
} from "@/app/services/mockApi";
import * as createBillingApi from "@/app/services/api/createBillingApi";
import type {
  CancelSoLogItem,
  CreateBillingCount,
  CreateBillingItem,
  CreateBillingLogItem,
  MurCount,
  MurItem,
} from "@/app/types/createBilling";

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS !== "false";

export async function fetchCreateBillingList(): Promise<CreateBillingItem[]> {
  if (USE_MOCKS) {
    return mockFetchCreateBillingList();
  }
  return createBillingApi.getCreateBillingList();
}

export async function fetchMurList(): Promise<MurItem[]> {
  if (USE_MOCKS) {
    return mockFetchMurList();
  }
  return createBillingApi.getMurList();
}

export async function fetchCreateBillingCount(): Promise<CreateBillingCount> {
  if (USE_MOCKS) {
    return mockFetchCreateBillingCount();
  }
  return createBillingApi.getCreateBillingCount();
}

export async function fetchMurCount(): Promise<MurCount> {
  if (USE_MOCKS) {
    return mockFetchMurCount();
  }
  return createBillingApi.getMurCount();
}

export async function fetchCreateBillingLogById(
  createBillingId: number
): Promise<CreateBillingLogItem[]> {
  if (USE_MOCKS) {
    return mockFetchCreateBillingLogById(createBillingId);
  }
  return createBillingApi.getCreateBillingLogById(createBillingId);
}

export async function fetchCancelSoLogById(
  createBillingId: number
): Promise<CancelSoLogItem[]> {
  if (USE_MOCKS) {
    return mockFetchCancelSoLogById(createBillingId);
  }
  return createBillingApi.getCancelSoLogById(createBillingId);
}
