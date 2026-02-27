import type { APIResponse } from "./api";

export type AuthDomain = "admin" | "sale" | "ไม่ผ่าน AD";

export type AuthSession = {
  userId: string;
  name: string;
  lastName: string;
  token: string;
  expiresAt ? : string;
  menus?: Menu[];
};

export type Menu = {
  TABLENAME: string,
  ID: number,
  MENU_NAME: string,
  MENU_URL: string,
  MENU_LEVEL: number,
  PARENT_MENU_ID: number | null,
  DESCRIPTION: string,
  ROW_ORDER: number,
  IS_ACTIVE: number,
  CREATE_BY: number | null,
  CREATE_DATETIME: string,
  UPDATE_BY: number | null,
  UPDATE_DATETIME: string,
  ACTIVEMAIN: string,
  ACTIVE: string,
  MENU_ICON: string,
  MENU_ID: number
};
export type AuthData = {
  userId: string;
  name: string;
  lastName ? : string;
  lastname ? : string;
  token: string;
  expiresAt ? : string;
  Menu:Menu[];
};

export type AuthResponse = APIResponse<AuthData>;

export type LoginPayload = {
  Username: string;
  Password: string;
  Domain: AuthDomain;
};