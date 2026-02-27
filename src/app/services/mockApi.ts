import type { User, UserPayload } from "@/app/types/user";
import type {AuthDomain, AuthSession} from "@/app/types/auth";
import { Menu } from "../types/auth";
import type {
  CancelSoLogItem,
  CreateBillingCount,
  CreateBillingItem,
  CreateBillingLogItem,
  MurCount,
  MurItem,
} from "@/app/types/createBilling";
import type {
  ContractCustomer,
  ContractData,
  ContractDistrChan,
  ContractShipTo,
} from "@/app/types/contract";

type AuthPayload = {
  Username: string;
  Password: string;
  Domain: AuthDomain;
};

const now = () => new Date().toISOString();

let users: User[] = [
  {
    id: "U-1001",
    firstName: "Ava",
    lastName: "Nguyen",
    email: "ava.nguyen@example.com",
    phone: "+66 81 234 5678",
    role: "admin",
    status: "active",
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "U-1002",
    firstName: "Somchai",
    lastName: "Prasert",
    email: "somchai.prasert@example.com",
    phone: "+66 89 555 2121",
    role: "sale",
    status: "inactive",
    createdAt: now(),
    updatedAt: now(),
  },
];
export let menu: Menu[] = [
 {
   "TABLENAME": "M_MENU",
   "ID": 1,
   "MENU_NAME": "ราคา LNG",
   "MENU_URL": "~",
   "MENU_LEVEL": 1,
   "PARENT_MENU_ID": null,
   "DESCRIPTION": "",
   "ROW_ORDER": 1,
   "IS_ACTIVE": 1,
   "CREATE_BY": 1,
   "CREATE_DATETIME": "6/28/2018 1:53:01 PM",
   "UPDATE_BY": 1,
   "UPDATE_DATETIME": "6/28/2018 1:53:03 PM",
   "ACTIVEMAIN": "LNG",
   "ACTIVE": "",
   "MENU_ICON": "fa fa-dashboard",
   "MENU_ID": 1
 },
 {
   "TABLENAME": "M_MENU",
   "ID": 6,
   "MENU_NAME": "ราคา LNG ย้อนหลัง",
   "MENU_URL": "~/PriceHistory",
   "MENU_LEVEL": 1,
   "PARENT_MENU_ID": null,
   "DESCRIPTION": "",
   "ROW_ORDER": 2,
   "IS_ACTIVE": 1,
   "CREATE_BY": 1,
   "CREATE_DATETIME": "6/28/2018 2:21:22 PM",
   "UPDATE_BY": 1,
   "UPDATE_DATETIME": "6/28/2018 2:21:24 PM",
   "ACTIVEMAIN": "PriceHistory",
   "ACTIVE": "",
   "MENU_ICON": "fa fa-area-chart",
   "MENU_ID": 6
 },
 {
   "TABLENAME": "M_MENU",
   "ID": 41,
   "MENU_NAME": "Sale Report",
   "MENU_URL": "~/SaleReport",
   "MENU_LEVEL": 1,
   "PARENT_MENU_ID": null,
   "DESCRIPTION": "",
   "ROW_ORDER": 3,
   "IS_ACTIVE": 1,
   "CREATE_BY": 1,
   "CREATE_DATETIME": "6/15/2021 4:22:51 PM",
   "UPDATE_BY": null,
   "UPDATE_DATETIME": "",
   "ACTIVEMAIN": "SaleReport",
   "ACTIVE": "",
   "MENU_ICON": "fa fa-bar-chart",
   "MENU_ID": 41
 },
 {
   "TABLENAME": "M_MENU",
   "ID": 42,
   "MENU_NAME": "Plan Volume",
   "MENU_URL": "~/PlanVolume",
   "MENU_LEVEL": 1,
   "PARENT_MENU_ID": null,
   "DESCRIPTION": "",
   "ROW_ORDER": 4,
   "IS_ACTIVE": 1,
   "CREATE_BY": 1,
   "CREATE_DATETIME": "6/15/2021 4:22:51 PM",
   "UPDATE_BY": 1,
   "UPDATE_DATETIME": "",
   "ACTIVEMAIN": "PlanVolume",
   "ACTIVE": "",
   "MENU_ICON": "fa fa-tint",
   "MENU_ID": 42
 },
 {
   "TABLENAME": "M_MENU",
   "ID": 43,
   "MENU_NAME": "Document",
   "MENU_URL": "~/Document",
   "MENU_LEVEL": 1,
   "PARENT_MENU_ID": null,
   "DESCRIPTION": "",
   "ROW_ORDER": 5,
   "IS_ACTIVE": 1,
   "CREATE_BY": 1,
   "CREATE_DATETIME": "6/15/2021 4:22:51 PM",
   "UPDATE_BY": 1,
   "UPDATE_DATETIME": "",
   "ACTIVEMAIN": "Document",
   "ACTIVE": "",
   "MENU_ICON": "fa fa-file-o",
   "MENU_ID": 43
 },
 {
   "TABLENAME": "M_MENU",
   "ID": 2,
   "MENU_NAME": "Transaction",
   "MENU_URL": "",
   "MENU_LEVEL": 1,
   "PARENT_MENU_ID": null,
   "DESCRIPTION": "",
   "ROW_ORDER": 12,
   "IS_ACTIVE": 1,
   "CREATE_BY": 1,
   "CREATE_DATETIME": "6/28/2018 1:54:43 PM",
   "UPDATE_BY": 1,
   "UPDATE_DATETIME": "6/28/2018 1:54:45 PM",
   "ACTIVEMAIN": "Transaction",
   "ACTIVE": "",
   "MENU_ICON": "fa fa-desktop",
   "MENU_ID": 2
 },
 {
   "TABLENAME": "M_MENU",
   "ID": 11,
   "MENU_NAME": "System",
   "MENU_URL": "",
   "MENU_LEVEL": 1,
   "PARENT_MENU_ID": null,
   "DESCRIPTION": "",
   "ROW_ORDER": 13,
   "IS_ACTIVE": 1,
   "CREATE_BY": 1,
   "CREATE_DATETIME": "11/4/2019 3:52:24 PM",
   "UPDATE_BY": 1,
   "UPDATE_DATETIME": "11/4/2019 3:52:24 PM",
   "ACTIVEMAIN": "System",
   "ACTIVE": "",
   "MENU_ICON": "fa   fa-cogs",
   "MENU_ID": 11
 },
 {
   "TABLENAME": "M_MENU",
   "ID": 3,
   "MENU_NAME": "Master",
   "MENU_URL": "",
   "MENU_LEVEL": 1,
   "PARENT_MENU_ID": null,
   "DESCRIPTION": "",
   "ROW_ORDER": 13,
   "IS_ACTIVE": 1,
   "CREATE_BY": 1,
   "CREATE_DATETIME": "6/28/2018 1:55:31 PM",
   "UPDATE_BY": 1,
   "UPDATE_DATETIME": "6/28/2018 1:55:32 PM",
   "ACTIVEMAIN": "Master",
   "ACTIVE": "",
   "MENU_ICON": "fa fa-cogs",
   "MENU_ID": 3
 },
 {
   "TABLENAME": "M_MENU",
   "ID": 48,
   "MENU_NAME": "บันทึกราคา CT",
   "MENU_URL": "~/PriceCT",
   "MENU_LEVEL": 2,
   "PARENT_MENU_ID": 2,
   "DESCRIPTION": "",
   "ROW_ORDER": 1,
   "IS_ACTIVE": 1,
   "CREATE_BY": 1,
   "CREATE_DATETIME": "11/28/2022 2:29:39 PM",
   "UPDATE_BY": 1,
   "UPDATE_DATETIME": "11/28/2022 2:29:39 PM",
   "ACTIVEMAIN": "Transaction",
   "ACTIVE": "PriceCT",
   "MENU_ICON": "",
   "MENU_ID": 48
 },
 {
   "TABLENAME": "M_MENU",
   "ID": 4,
   "MENU_NAME": "Upload ราคา LNG",
   "MENU_URL": "~/UploadPrice",
   "MENU_LEVEL": 2,
   "PARENT_MENU_ID": 2,
   "DESCRIPTION": "",
   "ROW_ORDER": 1,
   "IS_ACTIVE": 1,
   "CREATE_BY": 1,
   "CREATE_DATETIME": "6/28/2018 2:19:41 PM",
   "UPDATE_BY": 1,
   "UPDATE_DATETIME": "6/28/2018 2:19:42 PM",
   "ACTIVEMAIN": "Transaction",
   "ACTIVE": "UploadPrice",
   "MENU_ICON": "",
   "MENU_ID": 4
 },
 {
   "TABLENAME": "M_MENU",
   "ID": 5,
   "MENU_NAME": "อนุมัติราคา LNG",
   "MENU_URL": "~/PriceApprove",
   "MENU_LEVEL": 2,
   "PARENT_MENU_ID": 2,
   "DESCRIPTION": "",
   "ROW_ORDER": 2,
   "IS_ACTIVE": 1,
   "CREATE_BY": 1,
   "CREATE_DATETIME": "6/28/2018 2:20:15 PM",
   "UPDATE_BY": 1,
   "UPDATE_DATETIME": "6/28/2018 2:20:17 PM",
   "ACTIVEMAIN": "Transaction",
   "ACTIVE": "PriceApprove",
   "MENU_ICON": "",
   "MENU_ID": 5
 },
 {
   "TABLENAME": "M_MENU",
   "ID": 25,
   "MENU_NAME": "Create Billing From PTT LNG",
   "MENU_URL": "~/CreateBillingFromPTTLNG",
   "MENU_LEVEL": 2,
   "PARENT_MENU_ID": 2,
   "DESCRIPTION": "",
   "ROW_ORDER": 12,
   "IS_ACTIVE": 1,
   "CREATE_BY": 1,
   "CREATE_DATETIME": "3/23/2020 2:41:51 PM",
   "UPDATE_BY": 1,
   "UPDATE_DATETIME": "3/23/2020 2:41:51 PM",
   "ACTIVEMAIN": "Transaction",
   "ACTIVE": "CreateBillingPTTLNG",
   "MENU_ICON": "",
   "MENU_ID": 25
 },
 {
   "TABLENAME": "M_MENU",
   "ID": 13,
   "MENU_NAME": "Create Billing",
   "MENU_URL": "~/CreateBilling",
   "MENU_LEVEL": 2,
   "PARENT_MENU_ID": 2,
   "DESCRIPTION": "",
   "ROW_ORDER": 13,
   "IS_ACTIVE": 1,
   "CREATE_BY": 1,
   "CREATE_DATETIME": "9/23/2018 4:30:56 PM",
   "UPDATE_BY": 1,
   "UPDATE_DATETIME": "9/24/2018 4:29:19 PM",
   "ACTIVEMAIN": "Transaction",
   "ACTIVE": "CreateBilling",
   "MENU_ICON": "",
   "MENU_ID": 13
 },
 {
   "TABLENAME": "M_MENU",
   "ID": 47,
   "MENU_NAME": "Approve Order",
   "MENU_URL": "~/ApproveOrder",
   "MENU_LEVEL": 2,
   "PARENT_MENU_ID": 2,
   "DESCRIPTION": "",
   "ROW_ORDER": 13,
   "IS_ACTIVE": 1,
   "CREATE_BY": 1,
   "CREATE_DATETIME": "11/27/2018 11:56:17 AM",
   "UPDATE_BY": 1,
   "UPDATE_DATETIME": "11/27/2018 11:56:17 AM",
   "ACTIVEMAIN": "Transaction",
   "ACTIVE": "ApproveOrder",
   "MENU_ICON": "",
   "MENU_ID": 47
 },
 {
   "TABLENAME": "M_MENU",
   "ID": 17,
   "MENU_NAME": "อนุมัติ Invoice",
   "MENU_URL": "~/InvoiceApprove",
   "MENU_LEVEL": 2,
   "PARENT_MENU_ID": 2,
   "DESCRIPTION": "",
   "ROW_ORDER": 14,
   "IS_ACTIVE": 1,
   "CREATE_BY": 1,
   "CREATE_DATETIME": "11/27/2018 11:56:17 AM",
   "UPDATE_BY": 1,
   "UPDATE_DATETIME": "11/27/2018 11:56:17 AM",
   "ACTIVEMAIN": "Transaction",
   "ACTIVE": "InvoiceApprove",
   "MENU_ICON": "",
   "MENU_ID": 17
 },
 {
   "TABLENAME": "M_MENU",
   "ID": 22,
   "MENU_NAME": "Upload ราคา เชื้อเพลิงชนิดอื่น",
   "MENU_URL": "~/UploadFuel",
   "MENU_LEVEL": 2,
   "PARENT_MENU_ID": 2,
   "DESCRIPTION": "",
   "ROW_ORDER": 15,
   "IS_ACTIVE": 1,
   "CREATE_BY": 1,
   "CREATE_DATETIME": "11/4/2019 3:52:24 PM",
   "UPDATE_BY": 1,
   "UPDATE_DATETIME": "11/4/2019 3:52:24 PM",
   "ACTIVEMAIN": "Transaction",
   "ACTIVE": "UploadFuel",
   "MENU_ICON": "",
   "MENU_ID": 22
 },
 {
   "TABLENAME": "M_MENU",
   "ID": 34,
   "MENU_NAME": "Maintain Rebilling ",
   "MENU_URL": "~/MaintainRebilling",
   "MENU_LEVEL": 2,
   "PARENT_MENU_ID": 2,
   "DESCRIPTION": "",
   "ROW_ORDER": 16,
   "IS_ACTIVE": 1,
   "CREATE_BY": 0,
   "CREATE_DATETIME": "11/4/2019 3:52:25 PM",
   "UPDATE_BY": 0,
   "UPDATE_DATETIME": "11/4/2019 3:52:25 PM",
   "ACTIVEMAIN": "Transaction",
   "ACTIVE": "MaintainRebilling",
   "MENU_ICON": "",
   "MENU_ID": 34
 },
 {
   "TABLENAME": "M_MENU",
   "ID": 37,
   "MENU_NAME": "Download Price Sheet",
   "MENU_URL": "~/DownloadPriceSheet",
   "MENU_LEVEL": 2,
   "PARENT_MENU_ID": 2,
   "DESCRIPTION": "",
   "ROW_ORDER": 27,
   "IS_ACTIVE": 1,
   "CREATE_BY": 1,
   "CREATE_DATETIME": "6/25/2020 10:20:10 PM",
   "UPDATE_BY": null,
   "UPDATE_DATETIME": "",
   "ACTIVEMAIN": "Transaction",
   "ACTIVE": "DownloadPriceSheet",
   "MENU_ICON": "",
   "MENU_ID": 37
 },
 {
   "TABLENAME": "M_MENU",
   "ID": 40,
   "MENU_NAME": "ประวัติการอนุมัติราคา LNG",
   "MENU_URL": "~/ViewPriceApprove",
   "MENU_LEVEL": 2,
   "PARENT_MENU_ID": 2,
   "DESCRIPTION": "",
   "ROW_ORDER": 28,
   "IS_ACTIVE": 1,
   "CREATE_BY": 1,
   "CREATE_DATETIME": "6/28/2018 2:20:15 PM",
   "UPDATE_BY": 1,
   "UPDATE_DATETIME": "6/28/2018 2:20:17 PM",
   "ACTIVEMAIN": "Transaction",
   "ACTIVE": "ViewPriceApprove",
   "MENU_ICON": "",
   "MENU_ID": 40
 },
 {
   "TABLENAME": "M_MENU",
   "ID": 38,
   "MENU_NAME": "อนุมัติราคา LNG(ใหม่)",
   "MENU_URL": "~/PriceApproveNew",
   "MENU_LEVEL": 2,
   "PARENT_MENU_ID": 2,
   "DESCRIPTION": "",
   "ROW_ORDER": 28,
   "IS_ACTIVE": 1,
   "CREATE_BY": 1,
   "CREATE_DATETIME": "6/25/2020 10:20:13 PM",
   "UPDATE_BY": 1,
   "UPDATE_DATETIME": "6/25/2020 10:20:13 PM",
   "ACTIVEMAIN": "Transaction",
   "ACTIVE": "PriceApproveNew",
   "MENU_ICON": "",
   "MENU_ID": 38
 },
 {
   "TABLENAME": "M_MENU",
   "ID": 45,
   "MENU_NAME": "TOP / MUR Calculation",
   "MENU_URL": "~/SimulateTopCalculationLog",
   "MENU_LEVEL": 2,
   "PARENT_MENU_ID": 2,
   "DESCRIPTION": "",
   "ROW_ORDER": 29,
   "IS_ACTIVE": 1,
   "CREATE_BY": 1,
   "CREATE_DATETIME": "7/25/2021 12:36:47 PM",
   "UPDATE_BY": null,
   "UPDATE_DATETIME": "",
   "ACTIVEMAIN": "Transaction",
   "ACTIVE": "TopCalculation",
   "MENU_ICON": "",
   "MENU_ID": 45
 },
 {
   "TABLENAME": "M_MENU",
   "ID": 46,
   "MENU_NAME": "Re Billing",
   "MENU_URL": "~/ReBilling",
   "MENU_LEVEL": 2,
   "PARENT_MENU_ID": 2,
   "DESCRIPTION": "",
   "ROW_ORDER": 30,
   "IS_ACTIVE": 1,
   "CREATE_BY": 1,
   "CREATE_DATETIME": "10/30/2021 5:26:44 PM",
   "UPDATE_BY": 1,
   "UPDATE_DATETIME": "",
   "ACTIVEMAIN": "Transaction",
   "ACTIVE": "ReBilling",
   "MENU_ICON": "",
   "MENU_ID": 46
 },
 {
   "TABLENAME": "M_MENU",
   "ID": 49,
   "MENU_NAME": "Supplier",
   "MENU_URL": "~/Supplier",
   "MENU_LEVEL": 2,
   "PARENT_MENU_ID": 3,
   "DESCRIPTION": "",
   "ROW_ORDER": 12,
   "IS_ACTIVE": 1,
   "CREATE_BY": 0,
   "CREATE_DATETIME": "9/24/2018 4:29:19 PM",
   "UPDATE_BY": 0,
   "UPDATE_DATETIME": "9/24/2018 4:29:19 PM",
   "ACTIVEMAIN": "Master",
   "ACTIVE": "Supplier",
   "MENU_ICON": "",
   "MENU_ID": 49
 },
 {
   "TABLENAME": "M_MENU",
   "ID": 14,
   "MENU_NAME": "ลูกค้า",
   "MENU_URL": "~/Customer",
   "MENU_LEVEL": 2,
   "PARENT_MENU_ID": 3,
   "DESCRIPTION": "",
   "ROW_ORDER": 12,
   "IS_ACTIVE": 1,
   "CREATE_BY": 0,
   "CREATE_DATETIME": "9/24/2018 4:29:19 PM",
   "UPDATE_BY": 0,
   "UPDATE_DATETIME": "9/24/2018 4:29:19 PM",
   "ACTIVEMAIN": "Master",
   "ACTIVE": "Customer",
   "MENU_ICON": "",
   "MENU_ID": 14
 },
 {
   "TABLENAME": "M_MENU",
   "ID": 15,
   "MENU_NAME": "Contract/Quotation No",
   "MENU_URL": "~/Contract",
   "MENU_LEVEL": 2,
   "PARENT_MENU_ID": 3,
   "DESCRIPTION": "",
   "ROW_ORDER": 13,
   "IS_ACTIVE": 1,
   "CREATE_BY": 1,
   "CREATE_DATETIME": "9/28/2018 3:11:35 PM",
   "UPDATE_BY": 1,
   "UPDATE_DATETIME": "9/28/2018 3:11:37 PM",
   "ACTIVEMAIN": "Master",
   "ACTIVE": "SaNo",
   "MENU_ICON": "",
   "MENU_ID": 15
 },
 {
   "TABLENAME": "M_MENU",
   "ID": 33,
   "MENU_NAME": "Bank Guarantee",
   "MENU_URL": "~/BankGuarantee",
   "MENU_LEVEL": 2,
   "PARENT_MENU_ID": 3,
   "DESCRIPTION": "",
   "ROW_ORDER": 20,
   "IS_ACTIVE": 1,
   "CREATE_BY": 0,
   "CREATE_DATETIME": "11/4/2019 3:52:24 PM",
   "UPDATE_BY": 0,
   "UPDATE_DATETIME": "11/4/2019 3:52:24 PM",
   "ACTIVEMAIN": "Master",
   "ACTIVE": "BankGuarantee",
   "MENU_ICON": "",
   "MENU_ID": 33
 },
 {
   "TABLENAME": "M_MENU",
   "ID": 21,
   "MENU_NAME": "เชื้อเพลิงชนิดอื่น",
   "MENU_URL": "~/Fuel",
   "MENU_LEVEL": 2,
   "PARENT_MENU_ID": 3,
   "DESCRIPTION": "",
   "ROW_ORDER": 21,
   "IS_ACTIVE": 1,
   "CREATE_BY": 1,
   "CREATE_DATETIME": "11/4/2019 3:52:24 PM",
   "UPDATE_BY": 1,
   "UPDATE_DATETIME": "",
   "ACTIVEMAIN": "Master",
   "ACTIVE": "Fuel",
   "MENU_ICON": "",
   "MENU_ID": 21
 },
 {
   "TABLENAME": "M_MENU",
   "ID": 24,
   "MENU_NAME": "สกุลเงิน",
   "MENU_URL": "~/Currency",
   "MENU_LEVEL": 2,
   "PARENT_MENU_ID": 3,
   "DESCRIPTION": "",
   "ROW_ORDER": 21,
   "IS_ACTIVE": 1,
   "CREATE_BY": 1,
   "CREATE_DATETIME": "11/4/2019 3:52:24 PM",
   "UPDATE_BY": 1,
   "UPDATE_DATETIME": "11/4/2019 3:52:24 PM",
   "ACTIVEMAIN": "Master",
   "ACTIVE": "Currency",
   "MENU_ICON": "",
   "MENU_ID": 24
 },
 {
   "TABLENAME": "M_MENU",
   "ID": 23,
   "MENU_NAME": "DCQ",
   "MENU_URL": "~/DCQ",
   "MENU_LEVEL": 2,
   "PARENT_MENU_ID": 3,
   "DESCRIPTION": "",
   "ROW_ORDER": 22,
   "IS_ACTIVE": 1,
   "CREATE_BY": 1,
   "CREATE_DATETIME": "11/4/2019 3:52:24 PM",
   "UPDATE_BY": 1,
   "UPDATE_DATETIME": "11/4/2019 3:52:24 PM",
   "ACTIVEMAIN": "Master",
   "ACTIVE": "DCQ",
   "MENU_ICON": "",
   "MENU_ID": 23
 },
 {
   "TABLENAME": "M_MENU",
   "ID": 35,
   "MENU_NAME": "Average FX",
   "MENU_URL": "~/FxRate",
   "MENU_LEVEL": 2,
   "PARENT_MENU_ID": 3,
   "DESCRIPTION": "",
   "ROW_ORDER": 25,
   "IS_ACTIVE": 1,
   "CREATE_BY": 1,
   "CREATE_DATETIME": "6/25/2020 10:20:00 PM",
   "UPDATE_BY": null,
   "UPDATE_DATETIME": "",
   "ACTIVEMAIN": "Master",
   "ACTIVE": "FxRate",
   "MENU_ICON": "",
   "MENU_ID": 35
 },
 {
   "TABLENAME": "M_MENU",
   "ID": 26,
   "MENU_NAME": "Dubai Price",
   "MENU_URL": "~/ExchangeRate",
   "MENU_LEVEL": 2,
   "PARENT_MENU_ID": 3,
   "DESCRIPTION": "",
   "ROW_ORDER": 26,
   "IS_ACTIVE": 1,
   "CREATE_BY": 1,
   "CREATE_DATETIME": "8/21/2019 3:33:53 PM",
   "UPDATE_BY": 1,
   "UPDATE_DATETIME": "8/21/2019 3:33:53 PM",
   "ACTIVEMAIN": "Master",
   "ACTIVE": "ExchangeRate",
   "MENU_ICON": "",
   "MENU_ID": 26
 },
 {
   "TABLENAME": "M_MENU",
   "ID": 36,
   "MENU_NAME": "LNG Price",
   "MENU_URL": "~/LNGPrice",
   "MENU_LEVEL": 2,
   "PARENT_MENU_ID": 3,
   "DESCRIPTION": "",
   "ROW_ORDER": 26,
   "IS_ACTIVE": 1,
   "CREATE_BY": 1,
   "CREATE_DATETIME": "6/25/2020 10:20:04 PM",
   "UPDATE_BY": null,
   "UPDATE_DATETIME": "",
   "ACTIVEMAIN": "Transaction",
   "ACTIVE": "LNGPrice",
   "MENU_ICON": "",
   "MENU_ID": 36
 },
 {
   "TABLENAME": "M_MENU",
   "ID": 7,
   "MENU_NAME": "ผู้ใช้งาน",
   "MENU_URL": "~/User",
   "MENU_LEVEL": 2,
   "PARENT_MENU_ID": 11,
   "DESCRIPTION": "",
   "ROW_ORDER": 1,
   "IS_ACTIVE": 1,
   "CREATE_BY": 1,
   "CREATE_DATETIME": "11/4/2019 3:52:24 PM",
   "UPDATE_BY": 1,
   "UPDATE_DATETIME": "11/4/2019 3:52:24 PM",
   "ACTIVEMAIN": "System",
   "ACTIVE": "User",
   "MENU_ICON": "",
   "MENU_ID": 7
 },
 {
   "TABLENAME": "M_MENU",
   "ID": 44,
   "MENU_NAME": "อนุมัติคำขอเข้าใช้งานระบบ",
   "MENU_URL": "~/RegisterUser",
   "MENU_LEVEL": 2,
   "PARENT_MENU_ID": 11,
   "DESCRIPTION": "",
   "ROW_ORDER": 2,
   "IS_ACTIVE": 1,
   "CREATE_BY": 1,
   "CREATE_DATETIME": "6/18/2021 12:04:47 AM",
   "UPDATE_BY": 1,
   "UPDATE_DATETIME": "",
   "ACTIVEMAIN": "RegisterUser",
   "ACTIVE": "",
   "MENU_ICON": "",
   "MENU_ID": 44
 },
 {
   "TABLENAME": "M_MENU",
   "ID": 8,
   "MENU_NAME": "กลุ่มผู้ใช้งาน",
   "MENU_URL": "~/UserGroup",
   "MENU_LEVEL": 2,
   "PARENT_MENU_ID": 11,
   "DESCRIPTION": "",
   "ROW_ORDER": 3,
   "IS_ACTIVE": 1,
   "CREATE_BY": 1,
   "CREATE_DATETIME": "11/4/2019 3:52:24 PM",
   "UPDATE_BY": 1,
   "UPDATE_DATETIME": "11/4/2019 3:52:24 PM",
   "ACTIVEMAIN": "System",
   "ACTIVE": "UserGroup",
   "MENU_ICON": "",
   "MENU_ID": 8
 },
 {
   "TABLENAME": "M_MENU",
   "ID": 9,
   "MENU_NAME": "กำหนดสิทธิ์การใช้งาน",
   "MENU_URL": "~/Permissions",
   "MENU_LEVEL": 2,
   "PARENT_MENU_ID": 11,
   "DESCRIPTION": "",
   "ROW_ORDER": 15,
   "IS_ACTIVE": 1,
   "CREATE_BY": 1,
   "CREATE_DATETIME": "11/4/2019 3:52:25 PM",
   "UPDATE_BY": 1,
   "UPDATE_DATETIME": "11/4/2019 3:52:25 PM",
   "ACTIVEMAIN": "System",
   "ACTIVE": "Permissions",
   "MENU_ICON": "",
   "MENU_ID": 9
 },
 {
   "TABLENAME": "M_MENU",
   "ID": 10,
   "MENU_NAME": "Interface  SAP  Log",
   "MENU_URL": "~/Log",
   "MENU_LEVEL": 2,
   "PARENT_MENU_ID": 11,
   "DESCRIPTION": "",
   "ROW_ORDER": 16,
   "IS_ACTIVE": 1,
   "CREATE_BY": 1,
   "CREATE_DATETIME": "11/4/2019 3:52:25 PM",
   "UPDATE_BY": 1,
   "UPDATE_DATETIME": "11/4/2019 3:52:25 PM",
   "ACTIVEMAIN": "System",
   "ACTIVE": "Log",
   "MENU_ICON": "",
   "MENU_ID": 10
 },
 {
   "TABLENAME": "M_MENU",
   "ID": 12,
   "MENU_NAME": "ตั้งค่า Interface SAP",
   "MENU_URL": "~/InterfaceSAPSetting",
   "MENU_LEVEL": 2,
   "PARENT_MENU_ID": 11,
   "DESCRIPTION": "",
   "ROW_ORDER": 17,
   "IS_ACTIVE": 1,
   "CREATE_BY": 1,
   "CREATE_DATETIME": "11/4/2019 3:52:25 PM",
   "UPDATE_BY": 1,
   "UPDATE_DATETIME": "11/4/2019 3:52:25 PM",
   "ACTIVEMAIN": "System",
   "ACTIVE": "InterfaceSAPSetting",
   "MENU_ICON": "",
   "MENU_ID": 12
 },
 {
   "TABLENAME": "M_MENU",
   "ID": 16,
   "MENU_NAME": "Job",
   "MENU_URL": "~/Job",
   "MENU_LEVEL": 2,
   "PARENT_MENU_ID": 11,
   "DESCRIPTION": "",
   "ROW_ORDER": 18,
   "IS_ACTIVE": 1,
   "CREATE_BY": 1,
   "CREATE_DATETIME": "11/4/2019 3:52:25 PM",
   "UPDATE_BY": 1,
   "UPDATE_DATETIME": "11/4/2019 3:52:25 PM",
   "ACTIVEMAIN": "System",
   "ACTIVE": "Job",
   "MENU_ICON": "",
   "MENU_ID": 16
 },
 {
   "TABLENAME": "M_MENU",
   "ID": 18,
   "MENU_NAME": "Email Template",
   "MENU_URL": "~/EmailTemplate",
   "MENU_LEVEL": 2,
   "PARENT_MENU_ID": 11,
   "DESCRIPTION": "",
   "ROW_ORDER": 19,
   "IS_ACTIVE": 1,
   "CREATE_BY": 1,
   "CREATE_DATETIME": "11/4/2019 3:52:25 PM",
   "UPDATE_BY": 1,
   "UPDATE_DATETIME": "11/4/2019 3:52:25 PM",
   "ACTIVEMAIN": "System",
   "ACTIVE": "EmailTemplate",
   "MENU_ICON": "",
   "MENU_ID": 18
 },
 {
   "TABLENAME": "M_MENU",
   "ID": 19,
   "MENU_NAME": "Email List",
   "MENU_URL": "~/EmailList",
   "MENU_LEVEL": 2,
   "PARENT_MENU_ID": 11,
   "DESCRIPTION": "",
   "ROW_ORDER": 20,
   "IS_ACTIVE": 1,
   "CREATE_BY": 1,
   "CREATE_DATETIME": "11/4/2019 3:52:25 PM",
   "UPDATE_BY": 1,
   "UPDATE_DATETIME": "11/4/2019 3:52:25 PM",
   "ACTIVEMAIN": "System",
   "ACTIVE": "EmailList",
   "MENU_ICON": "",
   "MENU_ID": 19
 },
 {
   "TABLENAME": "M_MENU",
   "ID": 50,
   "MENU_NAME": "Auto Approve Config",
   "MENU_URL": "~/AutoApproveConfig",
   "MENU_LEVEL": 2,
   "PARENT_MENU_ID": 11,
   "DESCRIPTION": "",
   "ROW_ORDER": 21,
   "IS_ACTIVE": 1,
   "CREATE_BY": 1,
   "CREATE_DATETIME": "11/4/2019 3:52:25 PM",
   "UPDATE_BY": 1,
   "UPDATE_DATETIME": "11/4/2019 3:52:25 PM",
   "ACTIVEMAIN": "System",
   "ACTIVE": "AutoApproveConfig",
   "MENU_ICON": "",
   "MENU_ID": 50
 }
];
let nextId = 1003;

function createMockToken(expiresAt: string) {
  const header = { alg: "none", typ: "JWT" };
  const payload = { exp: Math.floor(Date.parse(expiresAt) / 1000) };

  const encode = (value: object) =>
    btoa(JSON.stringify(value))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

  return `${encode(header)}.${encode(payload)}.mock`;
}

export async function mockAuthenticate(
  payload: AuthPayload
): Promise<AuthSession> {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();//60 minutes
  //const expiresAt = new Date(Date.now() + 1 * 60 * 1000).toISOString();//1 minutes
  const [firstName, lastName = "User"] = payload.Username.split(".");
  const menus = menu

  return {
    userId: `user-${payload.Domain}-${payload.Username}`,
    name: firstName || payload.Username || "User",
    lastName,
    token: createMockToken(expiresAt),
    expiresAt,
    menus,
  };
}

export async function mockFetchUsers(): Promise<User[]> {
  return [...users];
}

export async function mockFetchUserById(id: string): Promise<User> {
  const user = users.find((item) => item.id === id);
  if (!user) {
    throw new Error("User not found");
  }
  return { ...user };
}

export async function mockCreateUser(payload: UserPayload): Promise<User> {
  const createdAt = now();
  const user: User = {
    id: `U-${nextId++}`,
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    phone: payload.phone,
    role: payload.role,
    status: payload.status ?? "active",
    createdAt,
    updatedAt: createdAt,
  };

  users = [user, ...users];
  return { ...user };
}

export async function mockUpdateUser(
  id: string,
  payload: UserPayload
): Promise<User> {
  const index = users.findIndex((item) => item.id === id);
  if (index === -1) {
    throw new Error("User not found");
  }

  const updated: User = {
    ...users[index],
    ...payload,
    updatedAt: now(),
  };

  users = users.map((item, idx) => (idx === index ? updated : item));
  return { ...updated };
}

export async function mockDeleteUser(id: string): Promise<void> {
  const index = users.findIndex((item) => item.id === id);
  if (index === -1) {
    throw new Error("User not found");
  }
  users = users.filter((item) => item.id !== id);
}

const MOCK_API_DELAY_MS = 250;

const sleep = async (ms = MOCK_API_DELAY_MS) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

const cloneList = <T>(list: T[]): T[] => list.map((item) => ({ ...item }));

const createBillingCountMock: CreateBillingCount = {
  SAVE_DRAFT: 0,
  PTT_APPROVE: 0,
  PTT_REJECT: 10,
  WAIT_CREATE_SO: 6,
  CREATE_SO_ERROR: 0,
  CANCEL_SO_ERROR: 7,
  WAIT_FOR_CREATE_BILLING: 0,
  WAIT_FOR_SAP_RESULT: 14,
  BILLING_WITH_ERROR: 5,
  BILLING_WITH_SUCCESS: 23,
  WAIT_FOR_SAP_RESULT_CANCEL: 0,
  BILLING_WITH_ERROR_CANCEL: 0,
};

const murCountMock: MurCount = {
  WAIT_SAP_CAL_MUR: 5,
  CAL_MUR_ERROR: 2,
  CAL_MUR_SUCCESS: 15,
  WAIT_GENERATE_MUR: 3,
  GENERATE_MUR_ERROR: 1,
  GENERATE_MUR_SUCCESS: 12,
  WAIT_CREATE_MUR: 4,
  CREATE_MUR_ERROR: 0,
  CREATE_MUR_SUCCESS: 20,
  WAIT_CANCEL_MUR: 1,
  CANCEL_MUR_ERROR: 0,
};

const createBillingItemsMock: CreateBillingItem[] = Array.from(
  { length: 20 },
  (_, i) => {
    const n = i + 1;
    return {
      id: n,
      date: `2023-10-${n.toString().padStart(2, "0")}`,
      customer: `Customer ${n} Co., Ltd.`,
      supplier: `Supplier ${String.fromCharCode(65 + (i % 5))}`,
      plant: `${1000 + i}`,
      sloc: `SLOC ${2000 + i}`,
      contractNo: `CON-${2023000 + i}`,
      qtyKg: (((n * 731) % 10000) + 0.11).toFixed(2),
      qtyTon: (((n * 37) % 10) + 0.11).toFixed(2),
      qtyMmb: (((n * 53) % 100) + 0.11).toFixed(2),
      grPostingDate: `2023-10-${(n + 1).toString().padStart(2, "0")}`,
      grQtyMmb: (((n * 61) % 100) + 0.22).toFixed(2),
      additionalGrQtyTon: "0.00",
      gainLossQtyMmb: "0.00",
      price: (((n * 1703) % 50000) + 0.23).toFixed(2),
      transportCost: (((n * 131) % 1000) + 0.31).toFixed(2),
      invoiceStatus:
        i % 3 === 0 ? "Completed" : i % 3 === 1 ? "Pending" : "Failed",
      soDocNo: `SO-${3000 + i}`,
      doNo: `DO-${4000 + i}`,
      giDoc: `GI-${5000 + i}`,
      billNo: `BILL-${6000 + i}`,
      fiDocNo: `FI-${7000 + i}`,
      gainLossDocNo: `GL-${8000 + i}`,
      gainLossDocYear: "2023",
      blNo: `BL-2025${9000 + i}`,
      ocrStatus: i % 2 === 0 ? "Pass" : "Fail",
      poSaNo: `PO-${10000 + i}`,
      grDoc: `GR-${11000 + i}`,
      year: "2023",
      dailyNo: `DN-${12000 + i}`,
    };
  }
);

const murItemsMock: MurItem[] = Array.from({ length: 20 }, (_, i) => {
  const n = i + 1;
  return {
    id: n,
    finalFlag: i % 2 === 0 ? "Y" : "N",
    date: `2023-10-${n.toString().padStart(2, "0")}`,
    customer: `Customer ${n} Co., Ltd.`,
    supplier: `Supplier ${String.fromCharCode(65 + (i % 5))}`,
    plant: `${1000 + i}`,
    sloc: `SLOC ${2000 + i}`,
    contractNo: `CON-${2023000 + i}`,
    qtyKg: (((n * 769) % 10000) + 0.15).toFixed(2),
    qtyTon: (((n * 47) % 10) + 0.12).toFixed(2),
    qtyMmb: (((n * 59) % 100) + 0.13).toFixed(2),
    price: (((n * 1663) % 50000) + 0.25).toFixed(2),
    transportCost: (((n * 101) % 1000) + 0.16).toFixed(2),
    billingStatus: i % 3 === 0 ? "Completed" : "Pending",
    invoiceStatus:
      i % 3 === 0 ? "Completed" : i % 3 === 1 ? "Pending" : "Failed",
    actualQty: (((n * 43) % 100) + 0.17).toFixed(2),
    murCapInYear: (((n * 89) % 1000) + 0.19).toFixed(2),
    accumMur: (((n * 67) % 500) + 0.21).toFixed(2),
    outstandingMur: (((n * 71) % 200) + 0.22).toFixed(2),
    outstandingTopAmt: (((n * 97) % 5000) + 0.24).toFixed(2),
    currentMurQty: (((n * 53) % 100) + 0.18).toFixed(2),
    murAmount: (((n * 139) % 10000) + 0.3).toFixed(2),
    excessQty: (((n * 29) % 50) + 0.31).toFixed(2),
    excessAmount: (((n * 41) % 2000) + 0.32).toFixed(2),
    soDocNo: `SO-${3000 + i}`,
    blNo: `BL-2025${9000 + i}`,
    poSaNo: `PO-${10000 + i}`,
    grDoc: `GR-${11000 + i}`,
    year: "2023",
  };
});

function resolveCreateBillingItemOrThrow(id: number): CreateBillingItem {
  const item = createBillingItemsMock.find((x) => x.id === id);
  if (!item) {
    throw new Error("Create Billing row not found");
  }
  return item;
}

function buildCreateBillingLogs(createBillingId: number): CreateBillingLogItem[] {
  const item = resolveCreateBillingItemOrThrow(createBillingId);
  return Array.from({ length: 5 }, (_, i) => {
    const n = i + 1;
    const prefix = createBillingId * 100 + n;
    return {
      id: prefix,
      postingDate: `2023-11-${(n + createBillingId)
        .toString()
        .padStart(2, "0")}`,
      contract: item.contractNo,
      lgort: `L${((createBillingId + i) % 9) + 1}01`,
      qtyMmb: (((createBillingId * 17 + n * 11) % 100) + 0.11).toFixed(2),
      addQtyTon: (((createBillingId * 7 + n * 3) % 5) + 0.05).toFixed(2),
      blNo: item.blNo,
      revision: `R${(i % 3) + 1}`,
      process: i % 2 === 0 ? "CREATE BILL" : "REPROCESS",
      doNo: item.doNo,
      giDoc: item.giDoc,
      billNo: item.billNo,
      postingStatus:
        i % 3 === 0 ? "SUCCESS" : i % 3 === 1 ? "PENDING" : "ERROR",
      fiDoc: item.fiDocNo,
      dueDate: `2023-12-${(n + createBillingId).toString().padStart(2, "0")}`,
      result:
        i % 3 === 2
          ? "Posting failed: pricing condition not found."
          : "Posting completed successfully.",
      prntStatus: i % 2 === 0 ? "PRINTED" : "WAIT",
      spoolNo: `SP-${8000 + prefix}`,
      printDate:
        i % 2 === 0
          ? `2023-12-${(n + createBillingId).toString().padStart(2, "0")}`
          : "-",
      printTime: i % 2 === 0 ? `10:${(i % 6)}${(createBillingId % 10)}:00` : "-",
    };
  });
}

function buildCancelSoLogs(createBillingId: number): CancelSoLogItem[] {
  const item = resolveCreateBillingItemOrThrow(createBillingId);
  return Array.from({ length: 3 }, (_, i) => {
    const n = i + 1;
    return {
      id: createBillingId * 10 + n,
      createBillingId,
      dailyNo: item.dailyNo,
      soDocNo: item.soDocNo,
      xmlFile: `CANCEL_SO_${createBillingId}_${n.toString().padStart(2, "0")}.xml`,
      zresult: i % 3 === 0 ? "S" : i % 3 === 1 ? "W" : "E",
      message:
        i % 3 === 0
          ? "Cancel SO completed successfully."
          : i % 3 === 1
            ? "Cancel SO request queued for SAP processing."
            : "Cancel SO failed: document already reversed.",
      createDatetime: `2026-02-${(createBillingId + n)
        .toString()
        .padStart(2, "0")} 10:${(i % 6)}${(createBillingId % 10)}:00`,
    };
  });
}

export async function mockFetchCreateBillingList(): Promise<CreateBillingItem[]> {
  await sleep();
  return cloneList(createBillingItemsMock);
}

export async function mockFetchMurList(): Promise<MurItem[]> {
  await sleep();
  return cloneList(murItemsMock);
}

export async function mockFetchCreateBillingCount(): Promise<CreateBillingCount> {
  await sleep();
  return { ...createBillingCountMock };
}

export async function mockFetchMurCount(): Promise<MurCount> {
  await sleep();
  return { ...murCountMock };
}

export async function mockFetchCreateBillingLogById(
  id: number
): Promise<CreateBillingLogItem[]> {
  await sleep();
  return cloneList(buildCreateBillingLogs(id));
}

export async function mockFetchCancelSoLogById(
  id: number
): Promise<CancelSoLogItem[]> {
  await sleep();
  return cloneList(buildCancelSoLogs(id));
}

const contractListMock: ContractData[] = [
  {
    id: 1,
    saNo: "C001",
    customerName: "Customer A",
    customerId: "1",
    shipToId: "101",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    plant: "Plant 1",
    status: "Active",
    isActive: true,
    isPriceTransport: true,
    distrChan: "01",
    refDocCat: "G",
    remark: "Test Contract 1",
  },
  {
    id: 2,
    saNo: "Q002",
    customerName: "Customer B",
    customerId: "2",
    shipToId: "102",
    startDate: "2024-02-01",
    endDate: "2024-11-30",
    plant: "Plant 2",
    status: "Inactive",
    isActive: false,
    isPriceTransport: false,
    distrChan: "02",
    refDocCat: "B",
    remark: "Test Quotation 2",
  },
  {
    id: 3,
    saNo: "C003",
    customerName: "Customer C",
    customerId: "3",
    shipToId: "103",
    startDate: "2024-03-01",
    endDate: "2024-10-31",
    plant: "Plant 1",
    status: "Active",
    isActive: true,
    isPriceTransport: true,
    distrChan: "01",
    refDocCat: "G",
    remark: "",
  },
];

const contractCustomersMock: ContractCustomer[] = [
  { id: "1", name: "Customer A" },
  { id: "2", name: "Customer B" },
  { id: "3", name: "Customer C" },
];

const contractShipToMock: ContractShipTo[] = [
  { id: "101", name: "Ship To A", customerId: "1" },
  { id: "102", name: "Ship To B", customerId: "2" },
  { id: "103", name: "Ship To C", customerId: "3" },
];

const contractDistrChanMock: ContractDistrChan[] = [
  { id: "01", name: "Direct Sales" },
  { id: "02", name: "Wholesale" },
];

export async function mockFetchContractList(): Promise<ContractData[]> {
  await sleep();
  return cloneList(contractListMock);
}

export async function mockFetchContractCustomers(): Promise<ContractCustomer[]> {
  await sleep();
  return cloneList(contractCustomersMock);
}

export async function mockFetchContractShipTo(): Promise<ContractShipTo[]> {
  await sleep();
  return cloneList(contractShipToMock);
}

export async function mockFetchContractDistrChan(): Promise<ContractDistrChan[]> {
  await sleep();
  return cloneList(contractDistrChanMock);
}
