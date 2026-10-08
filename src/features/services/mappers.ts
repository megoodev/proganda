import type { Service } from "./schemas";

type ServiceRow = { id: string; title: string; description: string; published: boolean };

export const toService = (row: ServiceRow): Service => ({
  id: row.id,
  title: row.title,
  description: row.description,
  published: row.published,
});
