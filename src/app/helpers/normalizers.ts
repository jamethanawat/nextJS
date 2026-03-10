export function toNumber(value: string | number | null | undefined): number {
  const parsed = typeof value === "number" ? value : Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function toNullableNumber(
  value: string | number | null | undefined
): number | null {
  if (value === null || value === undefined || value === "") {
    return null;
  }
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export function toText(value: string | null | undefined): string {
  return value ?? "";
}
export function toBackendBooleanFlag(value: boolean | null | undefined): string {
  return value ? "1" : "0";
}

export function toBackendId(value: number | string | null | undefined): string {
  return value === null || value === undefined ? "" : String(value);
}
export function toStringValue(
  value: string | number | null | undefined
): string {
  return value === null || value === undefined ? "" : String(value);
}

export function toBooleanValue(
  value: string | number | null | undefined
): boolean {
  if (typeof value === "string") {
    const normalized = value.trim();
    return (
      normalized === "1" ||
      normalized === "1.0" ||
      normalized.toLowerCase() === "true"
    );
  }
  return value === 1;
}

export function toIsoDate(value: string | null | undefined): string {
  if (!value) {
    return "";
  }

  const ddMmYyyy = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = value.match(ddMmYyyy);
  if (!match) {
    return value;
  }

  const [, dd, mm, yyyy] = match;
  return `${yyyy}-${mm}-${dd}`;
}
export const toErrorReason = (error: unknown): string => {
        if (typeof error === 'string' && error.trim()) {
            return error;
        }

        if (error instanceof Error && error.message.trim()) {
            return error.message;
        }

        if (typeof error === 'object' && error !== null) {
            const maybeError = error as { message?: unknown };
            if (typeof maybeError.message === 'string' && maybeError.message.trim()) {
                return maybeError.message;
            }
        }

        return 'Unknown error.';
    };

export type ErrorWithReason = Error & {
  toErrorReason: () => string;
};

export const toErrorWithReason = (error: unknown): ErrorWithReason => {
  if (
    error instanceof Error &&
    typeof (error as ErrorWithReason).toErrorReason === "function"
  ) {
    return error as ErrorWithReason;
  }

  const reason = toErrorReason(error);
  const baseError = error instanceof Error ? error : new Error(reason);
  const normalized = baseError as ErrorWithReason;
  normalized.toErrorReason = () => reason;
  return normalized;
};
