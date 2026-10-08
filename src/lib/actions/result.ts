export type ActionErrorCode =
  | "VALIDATION" | "UNAUTHENTICATED" | "FORBIDDEN" | "NOT_FOUND" | "CONFLICT" | "RATE_LIMITED" | "INTERNAL";

export type FieldErrors = Record<string, string[] | undefined>;

export type ActionResult<T = void> =
  | { ok: true; data: T }
  | { ok: false; error: ActionErrorCode; message?: string; fieldErrors?: FieldErrors };

export class AppError extends Error {
  constructor(
    public code: ActionErrorCode,
    message?: string,
    public fieldErrors?: FieldErrors,
  ) {
    super(message ?? code);
  }
}
