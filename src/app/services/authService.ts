import { mockAuthenticate } from "@/app/services/mockApi";
import { login } from "./api/authApi";
import type { AuthDomain, AuthResponse, AuthSession, LoginPayload } from "@/app/types/auth";
import { Menu } from "../types/auth";
import { menu } from "@/app/services/mockApi";
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

  return session;
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

export function convertMenuToSidebarItems(menus: Menu[]): MenuItem[] {
  const buildTree = (parentId: number): ChildItem[] => {
    return menus
      .filter((m) => m.PARENT_MENU_ID === parentId)
      .sort((a, b) => a.ROW_ORDER - b.ROW_ORDER)
      .map((m) => {
        const children = buildTree(m.MENU_ID);
        return {
          id: m.MENU_ID,
          name: m.MENU_NAME,
          icon: 'solar:server-linear',//m.MENU_ICON,
          url: m.MENU_URL
            ? m.MENU_URL === "~"
              ? "/"
              : m.ACTIVEMAIN && m.MENU_URL.startsWith('~/')
                ? `/${m.ACTIVEMAIN}${m.MENU_URL.substring(1)}`
                : m.MENU_URL.replace(/^~/, "")
            : undefined,
          children: children.length > 0 ? children : undefined,
        };
      });
  };

  const roots = menus
    .filter((m) => m.MENU_LEVEL === 1 && m.PARENT_MENU_ID === null)
    .sort((a, b) => a.ROW_ORDER - b.ROW_ORDER);

  return roots.map((m) => {
    const hasUrl = m.MENU_URL && m.MENU_URL.trim() !== "";
    const children = buildTree(m.MENU_ID);

    if (hasUrl) {
      return {
        heading: m.MENU_NAME,
        children: [
          {
            id: m.MENU_ID,
            name: m.MENU_NAME,
            icon:'solar:server-linear', //m.MENU_ICON,
            url: m.MENU_URL === "~" ? "/" : (m.MENU_URL?.replace(/^~/, "") || undefined),
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
    const session = await mockAuthenticate(payload);
    storeSession(session);
    return session;
  }

  const data = await login(payload);
  const res= data as AuthResponse;
  console.log(res)

  const session: AuthSession = {
      userId: res.data.userId ??"",
    name: res.data.name ?? "",
    lastName: res.data.lastName ?? res.data.lastname ?? "",
    token: res.data.token,
    expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    menus: menu,
  };

  storeSession(session);
  return session;
}
