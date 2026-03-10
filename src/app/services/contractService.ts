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
  ContractMasterData,
  ContractShipTo,
} from "@/app/types/contract";

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS !== "false";
let contractMasterDataPromise: Promise<ContractMasterData> | null = null;

export async function fetchContractList(): Promise<ContractData[]> {
  if (USE_MOCKS) {
    return mockFetchContractList();
  }
  return contractApi.getContractList();
}

export async function fetchContractById(id: number): Promise<ContractData> {
  if (USE_MOCKS) {
    const list = await mockFetchContractList();
    const item = list.find((contract) => contract.id === id);
    if (!item) {
      throw new Error(`Contract id ${id} not found`);
    }
    return item;
  }

  return contractApi.getContractById(id);
}

export async function saveContractData(
  source: Partial<ContractData>
): Promise<string> {
  if (USE_MOCKS) {
    return "Save successful.";
  }

  return contractApi.saveContract(source);
}

export async function fetchContractMasterData(): Promise<ContractMasterData> {
  if (USE_MOCKS) {
    const [customers, shipToList, distrChanList] = await Promise.all([
      mockFetchContractCustomers(),
      mockFetchContractShipTo(),
      mockFetchContractDistrChan(),
    ]);

    return {
      customers,
      shipToList,
      distrChanList,
    };
  }

  if (!contractMasterDataPromise) {
    contractMasterDataPromise = contractApi.getContractMasterData();
  }

  return contractMasterDataPromise;
}
