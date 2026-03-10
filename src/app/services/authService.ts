import { mockAuthenticate } from "@/app/services/mockApi";
import { login } from "./api/authApi";
import {
  toNullableNumber,
  toNumber,
  toText,
} from "@/app/helpers/normalizers";
import type {
  AuthApiMenu,
  AuthSession,
  LoginPayload,
  Menu,
  Permissions,
} from "@/app/types/auth";
import type { MenuItem, ChildItem } from "@/app/(Pages)/layout/sidebar/sidebaritems";

const AUTH_STORAGE_KEY = "auth.session";
const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS !== "false";

const isBrowser = typeof window !== "undefined";

function readStoredSession(): AuthSession | null {
  if (!isBrowser) {
    return null;
  }

  const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

function getTokenExpiryMs(token: string): number | null {
  if (!isBrowser) {
    return null;
  }

  const parts = token.split(".");
  if (parts.length < 2) {
    return null;
  }

  const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");

  try {
    const payload = JSON.parse(window.atob(padded)) as { exp?: number };
    return typeof payload.exp === "number" ? payload.exp * 1000 : null;
  } catch {
    return null;
  }
}

function isSessionExpired(session: AuthSession): boolean {
  const expiryMs = session.expiresAt
    ? Date.parse(session.expiresAt)
    : getTokenExpiryMs(session.token);

  if (!expiryMs || Number.isNaN(expiryMs)) {
    return false;
  }

  return Date.now() >= expiryMs;
}

function enrichSessionWithSidebarItems(session: AuthSession): AuthSession {
  if (session.sidebarItems?.length || !session.menus?.length) {
    return session;
  }

  return {
    ...session,
    sidebarItems: convertMenuToSidebarItems(session.menus),
  };
}

export function clearSession(): void {
  if (!isBrowser) {
    return;
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function getValidSession(): AuthSession | null {
  const session = readStoredSession();
  if (!session) {
    return null;
  }

  if (isSessionExpired(session)) {
    clearSession();
    return null;
  }

  const enrichedSession = enrichSessionWithSidebarItems(session);
  if (enrichedSession !== session) {
    storeSession(enrichedSession);
  }

  return enrichedSession;
}

export function getAuthToken(): string | null {
  return getValidSession()?.token ?? null;
}

function storeSession(session: AuthSession): void {
  if (!isBrowser) {
    return;
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}

function normalizeMenu(raw: AuthApiMenu): Menu {
  return {
    TABLENAME: raw.TABLENAME,
    ID: toNumber(raw.ID),
    MENU_NAME: raw.MENU_NAME,
    MENU_URL: toText(raw.MENU_URL),
    MENU_LEVEL: toNumber(raw.MENU_LEVEL),
    PARENT_MENU_ID: toNullableNumber(raw.PARENT_MENU_ID),
    DESCRIPTION: toText(raw.DESCRIPTION),
    ROW_ORDER: toNumber(raw.ROW_ORDER),
    IS_ACTIVE: toNumber(raw.IS_ACTIVE),
    CREATE_BY: toNullableNumber(raw.CREATE_BY),
    CREATE_DATETIME: toText(raw.CREATE_DATETIME),
    UPDATE_BY: toNullableNumber(raw.UPDATE_BY),
    UPDATE_DATETIME: toText(raw.UPDATE_DATETIME),
    ACTIVEMAIN: toText(raw.ACTIVEMAIN),
    ACTIVE: toText(raw.ACTIVE),
    MENU_ICON: toText(raw.MENU_ICON),
    MENU_ID: toNumber(raw.MENU_ID),
  };
}

function normalizePermission(
  raw: AuthApiMenu & { WRITE?: string | number | null }
): Permissions {
  return {
    TABLENAME: raw.TABLENAME,
    ID: toNumber(raw.ID),
    MENU_NAME: raw.MENU_NAME,
    MENU_URL: toText(raw.MENU_URL),
    MENU_LEVEL: toNumber(raw.MENU_LEVEL),
    PARENT_MENU_ID: toNullableNumber(raw.PARENT_MENU_ID),
    DESCRIPTION: toText(raw.DESCRIPTION),
    ROW_ORDER: toNumber(raw.ROW_ORDER),
    IS_ACTIVE: toNumber(raw.IS_ACTIVE),
    CREATE_BY: toNullableNumber(raw.CREATE_BY),
    CREATE_DATETIME: toText(raw.CREATE_DATETIME),
    UPDATE_BY: toNullableNumber(raw.UPDATE_BY),
    UPDATE_DATETIME: toText(raw.UPDATE_DATETIME),
    ACTIVEMAIN: toText(raw.ACTIVEMAIN),
    ACTIVE: toText(raw.ACTIVE),
    MENU_ICON: toText(raw.MENU_ICON),
    WRITE: toNumber(raw.WRITE),
    MENU_ID: toNumber(raw.MENU_ID),
  };
}

export function convertMenuToSidebarItems(menus: Menu[]): MenuItem[] {
  const buildTree = (parentId: number): ChildItem[] => {
    return menus
      .filter((m) => m.PARENT_MENU_ID === parentId)
      .sort((a, b) => a.ROW_ORDER - b.ROW_ORDER)
      .map((m) => {
        const children = buildTree(m.MENU_ID);
        const mappedMenuUrl = m.MENU_URL === "~/SaNo" ? "~/Contract" : m.MENU_URL;

        return {
          id: m.MENU_ID,
          name: m.MENU_NAME,
          icon: 'solar:server-linear',//m.MENU_ICON,
          url: mappedMenuUrl
            ? mappedMenuUrl === "~"
              ? "/"
              : m.ACTIVEMAIN && mappedMenuUrl.startsWith('~/')
                ? `/${m.ACTIVEMAIN}${mappedMenuUrl.substring(1)}`
                : mappedMenuUrl.replace(/^~/, "")
            : undefined,
          children: children.length > 0 ? children : undefined,
        };
      });
  };

  const roots = menus
    .filter((m) => m.MENU_LEVEL === 1 && m.PARENT_MENU_ID === null)
    .sort((a, b) => a.ROW_ORDER - b.ROW_ORDER);

  return roots.map((m) => {
    const mappedMenuUrl = m.MENU_URL === "~/SaNo" ? "~/Contract" : m.MENU_URL;
    const hasUrl = mappedMenuUrl && mappedMenuUrl.trim() !== "";
    const children = buildTree(m.MENU_ID);

    if (hasUrl) {
      return {
        heading: m.MENU_NAME,
        children: [
          {
            id: m.MENU_ID,
            name: m.MENU_NAME,
            icon:'solar:server-linear', //m.MENU_ICON,
            url: mappedMenuUrl === "~" ? "/" : (mappedMenuUrl?.replace(/^~/, "") || undefined),
            children: children.length > 0 ? children : undefined,
          },
        ],
      };
    }

    return {
      heading: m.MENU_NAME,
      children: children,
    };
  });
}

export async function authenticateUser(
  payload: LoginPayload
): Promise<AuthSession> {
  if (USE_MOCKS) {
    const session = enrichSessionWithSidebarItems(await mockAuthenticate(payload));
    storeSession(session);
    return session;
  }

  const res = await login(payload);
  if (!res.data.IsAuth) {
    throw new Error("Authentication failed");
  }

  const apiUser = res.data.Data.Users?.[0];
  const token = res.data.Token ?? "";
  if (!token) {
    throw new Error("Authentication token not found");
  }

  const menus = (res.data.Data.Menus ?? []).map(normalizeMenu);
  const sidebarItems = convertMenuToSidebarItems(menus);
  const tokenExpiryMs = token ? getTokenExpiryMs(token) : null;
  const permissions = (res.data.Data.Permissions ?? []).map(normalizePermission);

  const session: AuthSession = {
    userId: apiUser?.ID ?? "",
    name: apiUser?.FIRSTNAME ?? apiUser?.USERNAME ?? payload.Username,
    lastName: apiUser?.LASTNAME ?? "",
    token,
    expiresAt: tokenExpiryMs
      ? new Date(tokenExpiryMs).toISOString()
      : new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    menus,
    sidebarItems,
    permissions,
  };

  storeSession(session);
  return session;
}
