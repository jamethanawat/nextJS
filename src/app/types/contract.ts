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
  refDocCat: RefDocCat
  remark: string
}

export type ContractCustomer = {
  id: string
  name: string
}

export type ContractShipTo = {
  id: string
  name: string
  customerId: string
}

export type ContractDistrChan = {
  id: string
  name: string
}
