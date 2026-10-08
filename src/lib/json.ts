// Strips `undefined` so objects are accepted by Prisma Json columns.
export const toJson = (value: unknown) => JSON.parse(JSON.stringify(value ?? {}));
