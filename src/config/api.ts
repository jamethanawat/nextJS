const DEFAULT_API_BASE_URLS = "http://localhost:44388"
export const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URLS).replace(/\/$/,"");
export const API_BASIC_AUTH = typeof window === "undefined"
    ? Buffer.from(`${process.env.NEXT_PUBLIC_API_BASIC_AUTH_USER}:${process.env.NEXT_PUBLIC_API_BASIC_AUTH_PASS}`).toString("base64")
   : btoa(`${process.env.NEXT_PUBLIC_API_BASIC_AUTH_USER}:${process.env.NEXT_PUBLIC_API_BASIC_AUTH_PASS}`);