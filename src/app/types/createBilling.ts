export type InvoiceStatus = 'Completed' | 'Pending' | 'Failed'
export type BillingStatus = 'Completed' | 'Pending'

export type CreateBillingItem = {
  id: number
  date: string
  customer: string
  supplier: string
  plant: string
  sloc: string
  contractNo: string
  qtyKg: string
  qtyTon: string
  qtyMmb: string
  grPostingDate: string
  grQtyMmb: string
  additionalGrQtyTon: string
  gainLossQtyMmb: string
  price: string
  transportCost: string
  invoiceStatus: InvoiceStatus
  soDocNo: string
  doNo: string
  giDoc: string
  billNo: string
  fiDocNo: string
  gainLossDocNo: string
  gainLossDocYear: string
  blNo: string
  ocrStatus: 'Pass' | 'Fail'
  poSaNo: string
  grDoc: string
  year: string
  dailyNo: string
}

export type CreateBillingLogItem = {
  id: number
  postingDate: string
  contract: string
  lgort: string
  qtyMmb: string
  addQtyTon: string
  blNo: string
  revision: string
  process: string
  doNo: string
  giDoc: string
  billNo: string
  postingStatus: 'SUCCESS' | 'PENDING' | 'ERROR'
  fiDoc: string
  dueDate: string
  result: string
  prntStatus: 'PRINTED' | 'WAIT'
  spoolNo: string
  printDate: string
  printTime: string
}

export type CancelSoLogItem = {
  id: number
  createBillingId: number
  dailyNo: string
  soDocNo: string
  xmlFile: string
  zresult: 'S' | 'W' | 'E'
  message: string
  createDatetime: string
}

export type MurItem = {
  id: number
  finalFlag: 'Y' | 'N'
  date: string
  customer: string
  supplier: string
  plant: string
  sloc: string
  contractNo: string
  qtyKg: string
  qtyTon: string
  qtyMmb: string
  price: string
  transportCost: string
  billingStatus: BillingStatus
  invoiceStatus: InvoiceStatus
  actualQty: string
  murCapInYear: string
  accumMur: string
  outstandingMur: string
  outstandingTopAmt: string
  currentMurQty: string
  murAmount: string
  excessQty: string
  excessAmount: string
  soDocNo: string
  blNo: string
  poSaNo: string
  grDoc: string
  year: string
}

export type CreateBillingCount = {
  SAVE_DRAFT: number
  PTT_APPROVE: number
  PTT_REJECT: number
  WAIT_CREATE_SO: number
  CREATE_SO_ERROR: number
  CANCEL_SO_ERROR: number
  WAIT_FOR_CREATE_BILLING: number
  WAIT_FOR_SAP_RESULT: number
  BILLING_WITH_ERROR: number
  BILLING_WITH_SUCCESS: number
  WAIT_FOR_SAP_RESULT_CANCEL: number
  BILLING_WITH_ERROR_CANCEL: number
}

export type MurCount = {
  WAIT_SAP_CAL_MUR: number
  CAL_MUR_ERROR: number
  CAL_MUR_SUCCESS: number
  WAIT_GENERATE_MUR: number
  GENERATE_MUR_ERROR: number
  GENERATE_MUR_SUCCESS: number
  WAIT_CREATE_MUR: number
  CREATE_MUR_ERROR: number
  CREATE_MUR_SUCCESS: number
  WAIT_CANCEL_MUR: number
  CANCEL_MUR_ERROR: number
}
