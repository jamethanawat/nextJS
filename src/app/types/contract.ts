import type { APIResponse } from "./api";

export type RefDocCat = 'G' | 'B'

export type ContractData = {
  id: number
  saNo: string
  customerName: string
  customerId: string
  shipToId: string
  startDate: string
  endDate: string
  plant: string
  status: string
  isActive: boolean
  isPriceTransport: boolean
  distrChan: string
  refDocCat: string
  remark: string
  createdDateDisplay?: string
  createdByName?: string
  updatedDateDisplay?: string
  updatedByName?: string
  createBy?: string
  createDatetime?: string
  updateBy?: string
  updateDatetime?: string
}

export type ContractCustomer = {
  id: string
  name: string
}

export type ContractShipTo = {
  id: string
  shipToName: string
  shipTo: string
  customerId: string
}

export type ContractDistrChan = {
  id: string
  name: string
}

export type ContractMasterData = {
  customers: ContractCustomer[]
  shipToList: ContractShipTo[]
  distrChanList: ContractDistrChan[]
}

export type ContractListApiItem = {
  ID: number
  SA_NO: string
  REMARK: string | null
  IS_ACTIVE: number | string | null
  CUSTOMER_ID: number | string | null
  PLANT: string | null
  SHIP_TO_ID: number | string | null
  START_DATE: string | null
  END_DATE: string | null
  CUSTOMER_NAME: string | null
  IS_PRICE_TRANSPORT: number | string | null
  DISTR_CHAN?: string | null
  REF_DOC_CAT?: string | null
  REFDOC_CAT?: string | null
  CREATE_DATE_DISPLAY?: string | null
  CREATE_BY_NAME?: string | null
  UPDATE_DATE_DISPLAY?: string | null
  UPDATE_BY_NAME?: string | null
  CREATE_DATETIME?: string | null
  UPDATE_DATETIME?: string | null
  CREATE_BY?: number | string | null
  UPDATE_BY?: number | string | null
}

export type ContractListApiData = {
  Table: ContractListApiItem[]
}

export type ContractListApiResponse = APIResponse<ContractListApiData>

export type ContractByIdApiData = {
  Table?: ContractListApiItem[] | null
}

export type ContractByIdApiResult = {
  M_SA_NO?: ContractListApiItem[] | null
}

export type ContractByIdApiResponse = APIResponse<ContractByIdApiData> & {
  result?: ContractByIdApiResult | null
}

export type ContractMasterCustomerApiItem = {
  ID: number | string | null
  CUSTOMER_NAME: string | null
}

export type ContractMasterShipToApiItem = {
  ID?: number | string | null
  SHIP_TO: number | string | null
  SHIP_NAME: string | null
  CUSTOMER_ID: number | string | null
}

export type ContractMasterDistrChanApiItem = {
  DISTR_CHAN_VALUE: number | string | null
  DISTR_CHAN_NAME: string | null
}

export type ContractMasterApiData = {
  Customer?: ContractMasterCustomerApiItem[] | null
  ShipTo?: ContractMasterShipToApiItem[] | null
  DistributionChannel?: ContractMasterDistrChanApiItem[] | null
  Date?: Array<{ DATENOW?: string | null }> | null
  // Backward-compatible keys in case some environments still return old field names.
  M_CUSTOMER?: ContractMasterCustomerApiItem[] | null
  M_CUSTOMER_SHIP_TO?: ContractMasterShipToApiItem[] | null
  M_DISTRIBUTION_CHANNEL?: ContractMasterDistrChanApiItem[] | null
}

export type ContractMasterApiResponse = APIResponse<ContractMasterApiData> & {
  result?: ContractMasterApiData | null
}

export type ContractSavePayload = {
  ID: string
  SA_NO: string
  REMARK: string
  IS_ACTIVE: string
  CREATE_BY: string
  CREATE_DATETIME: string
  UPDATE_BY: string
  UPDATE_DATETIME: string
  CUSTOMER_ID: string
  START_DATE: string
  END_DATE: string
  PLANT: string
  SHIP_TO_ID: string
  IS_PRICE_TRANSPORT: string
  DISTR_CHAN: string
  REFDOC_CAT: string
}

export type ContractSaveApiResponse = APIResponse<unknown>
