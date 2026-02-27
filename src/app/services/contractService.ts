import {
  mockFetchContractCustomers,
  mockFetchContractDistrChan,
  mockFetchContractList,
  mockFetchContractShipTo,
} from "@/app/services/mockApi";
import * as contractApi from "@/app/services/api/contractApi";
import type {
  ContractCustomer,
  ContractData,
  ContractDistrChan,
  ContractShipTo,
} from "@/app/types/contract";

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS !== "false";

export async function fetchContractList(): Promise<ContractData[]> {
  if (USE_MOCKS) {
    return mockFetchContractList();
  }
  return contractApi.getContractList();
}

export async function fetchContractCustomers(): Promise<ContractCustomer[]> {
  if (USE_MOCKS) {
    return mockFetchContractCustomers();
  }
  return contractApi.getContractCustomers();
}

export async function fetchContractShipTo(): Promise<ContractShipTo[]> {
  if (USE_MOCKS) {
    return mockFetchContractShipTo();
  }
  return contractApi.getContractShipTo();
}

export async function fetchContractDistrChan(): Promise<ContractDistrChan[]> {
  if (USE_MOCKS) {
    return mockFetchContractDistrChan();
  }
  return contractApi.getContractDistrChan();
}
