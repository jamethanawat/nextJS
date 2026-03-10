import {
  toBooleanValue,
  toIsoDate,
  toStringValue,
  toBackendBooleanFlag,
  toBackendId
} from "@/app/helpers/normalizers";
import type {
  ContractData,
  ContractMasterApiData,
  ContractMasterData,
  ContractListApiItem,
  ContractSavePayload,
} from "@/app/types/contract";

function toBackendDate(value: string | null | undefined): string {
  const normalized = toStringValue(value).trim();
  const yyyymmdd = /^(\d{4})-(\d{2})-(\d{2})$/;
  const match = normalized.match(yyyymmdd);
  if (!match) {
    return normalized;
  }
  const [, yyyy, mm, dd] = match;
  return `${dd}/${mm}/${yyyy}`;
}

export function mapContractListItem(item: ContractListApiItem): ContractData {
  const isActive = toBooleanValue(item.IS_ACTIVE);
  return {
    id: item.ID,
    saNo: toStringValue(item.SA_NO),
    customerName: toStringValue(item.CUSTOMER_NAME),
    customerId: toStringValue(item.CUSTOMER_ID),
    shipToId: toStringValue(item.SHIP_TO_ID),
    startDate: toIsoDate(item.START_DATE),
    endDate: toIsoDate(item.END_DATE),
    plant: toStringValue(item.PLANT),
    status: isActive ? "Active" : "Inactive",
    isActive,
    isPriceTransport: toBooleanValue(item.IS_PRICE_TRANSPORT),
    distrChan: toStringValue(item.DISTR_CHAN),
    refDocCat: toStringValue(item.REFDOC_CAT),
    remark: toStringValue(item.REMARK),
    createdDateDisplay: toStringValue(
      item.CREATE_DATE_DISPLAY ?? item.CREATE_DATETIME
    ),
    createdByName: toStringValue(item.CREATE_BY_NAME ?? item.CREATE_BY),
    updatedDateDisplay: toStringValue(
      item.UPDATE_DATE_DISPLAY ?? item.UPDATE_DATETIME
    ),
    updatedByName: toStringValue(item.UPDATE_BY_NAME ?? item.UPDATE_BY),
    createBy: toStringValue(item.CREATE_BY),
    createDatetime: toStringValue(item.CREATE_DATETIME),
    updateBy: toStringValue(item.UPDATE_BY),
    updateDatetime: toStringValue(item.UPDATE_DATETIME),
  };
}

export function mapContractListRows(rows: ContractListApiItem[]): ContractData[] {
  return rows.map(mapContractListItem);
}

export function mapContractMasterData(
  source: ContractMasterApiData | null | undefined
): ContractMasterData {
  const customerRows = source?.Customer ?? source?.M_CUSTOMER ?? [];
  const shipToRows = source?.ShipTo ?? source?.M_CUSTOMER_SHIP_TO ?? [];
  const distrChanRows =
    source?.DistributionChannel ?? source?.M_DISTRIBUTION_CHANNEL ?? [];

  const customers = customerRows.map((item) => ({
    id: toStringValue(item.ID),
    name: toStringValue(item.CUSTOMER_NAME),
  }));

  const shipToList = shipToRows.map((item) => ({
    id: toStringValue(item.ID),
    shipToName: toStringValue(item.SHIP_NAME),
    shipTo: toStringValue(item.SHIP_TO),
    customerId: toStringValue(item.CUSTOMER_ID),
  }));

  const distrChanList = distrChanRows.map((item) => ({
    id: toStringValue(item.DISTR_CHAN_VALUE),
    name: toStringValue(item.DISTR_CHAN_NAME),
  }));

  return {
    customers,
    shipToList,
    distrChanList,
  };
}

export function mapContractToSavePayload(
  source: Partial<ContractData>
): ContractSavePayload {
  return {
    ID: toBackendId(source.id),
    SA_NO: toStringValue(source.saNo),
    REMARK: toStringValue(source.remark),
    IS_ACTIVE: toBackendBooleanFlag(source.isActive),
    CREATE_BY: toStringValue(source.createBy),
    CREATE_DATETIME: toStringValue(source.createDatetime),
    UPDATE_BY: toStringValue(source.updateBy),
    UPDATE_DATETIME: toStringValue(source.updateDatetime),
    CUSTOMER_ID: toStringValue(source.customerId),
    START_DATE: toBackendDate(source.startDate),
    END_DATE: toBackendDate(source.endDate),
    PLANT: toStringValue(source.plant),
    SHIP_TO_ID: toStringValue(source.shipToId),
    IS_PRICE_TRANSPORT: toBackendBooleanFlag(source.isPriceTransport),
    DISTR_CHAN: toStringValue(source.distrChan),
    REFDOC_CAT: toStringValue(source.refDocCat),
  };
}
