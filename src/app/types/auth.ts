import type { APIResponse } from "./api";
import type { MenuItem } from "@/app/(Pages)/layout/sidebar/sidebaritems";

export type AuthDomain = "admin" | "sale" | "ไม่ผ่าน AD";

export type AuthSession = {
  userId: string;
  name: string;
  lastName: string;
  token: string;
  expiresAt?: string;
  menus?: Menu[];
  sidebarItems?: MenuItem[];
  permissions?: Permissions[];
};

export type Menu = {
  TABLENAME: string;
  ID: number;
  MENU_NAME: string;
  MENU_URL: string;
  MENU_LEVEL: number;
  PARENT_MENU_ID: number | null;
  DESCRIPTION: string;
  ROW_ORDER: number;
  IS_ACTIVE: number;
  CREATE_BY: number | null;
  CREATE_DATETIME: string;
  UPDATE_BY: number | null;
  UPDATE_DATETIME: string;
  ACTIVEMAIN: string;
  ACTIVE: string;
  MENU_ICON: string;
  MENU_ID: number;
};
export type Permissions = {
  TABLENAME: string;
  ID: number;
  MENU_NAME: string;
  MENU_URL: string;
  MENU_LEVEL: number;
  PARENT_MENU_ID: number | null;
  DESCRIPTION: string;
  ROW_ORDER: number;
  IS_ACTIVE: number;
  CREATE_BY: number | null;
  CREATE_DATETIME: string;
  UPDATE_BY: number | null;
  UPDATE_DATETIME: string;
  ACTIVEMAIN: string;
  ACTIVE: string;
  MENU_ICON: string;
  WRITE: number;
  MENU_ID: number;
};


type NumericLike = string | number;

export type AuthApiUser = {
  ID: string;
  FIRSTNAME: string;
  LASTNAME: string;
  USERNAME: string;
};

export type AuthApiMenu = {
  TABLENAME: string;
  ID: NumericLike;
  MENU_NAME: string;
  MENU_URL: string | null;
  MENU_LEVEL: NumericLike;
  PARENT_MENU_ID: NumericLike | null;
  DESCRIPTION: string | null;
  ROW_ORDER: NumericLike;
  IS_ACTIVE: NumericLike;
  CREATE_BY: NumericLike | null;
  CREATE_DATETIME: string | null;
  UPDATE_BY: NumericLike | null;
  UPDATE_DATETIME: string | null;
  ACTIVEMAIN: string | null;
  ACTIVE: string | null;
  MENU_ICON: string | null;
  MENU_ID: NumericLike;
};

export type AuthData = {
  IsAuth: boolean;
  InActive: string | null;
  Data: {
    Users: AuthApiUser[];
    Menus: AuthApiMenu[];
    Permissions: Array<AuthApiMenu & { WRITE?: NumericLike | null }>;
    UserGroups: Array<Record<string, string | null>>;
  };
  Token: string;
  RefreshToken: string;
};

export type AuthResponse = APIResponse<AuthData>;

export type LoginPayload = {
  Username: string;
  Password: string;
  Domain: AuthDomain;
};
