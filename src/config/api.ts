export type AppEnv = "development" | "test" | "sit" | "uat" | "production";

const DEFAULT_API_BASE_URLS: Record<AppEnv, string> = {
  development: "http://localhost:3001",
  test: "https://test.example.com",
  sit: "https://sit.example.com",
  uat: "https://uat.example.com",
  production: "https://api.example.com",
};

const rawEnv =
  process.env.NEXT_PUBLIC_APP_ENV ?? process.env.NODE_ENV ?? "development";

export const APP_ENV: AppEnv =
  rawEnv in DEFAULT_API_BASE_URLS ? (rawEnv as AppEnv) : "development";

export const API_BASE_URL =
  (process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URLS[APP_ENV]).replace(
    /\/$/,
    ""
  );
