// Prisma enums are UPPER_CASE, the UI types are lowercase: PENDING <-> "pending", IN_REVIEW <-> "in_review".
export const lower = <T extends string>(value: T) => value.toLowerCase() as Lowercase<T>;
export const upper = <T extends string>(value: T) => value.toUpperCase() as Uppercase<T>;
