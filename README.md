# Features backend (not wired to the dashboard components)

Everything here is server-side. The dashboard still reads the mock `queries/get-*.ts` files,
so nothing in the UI changes until you switch the imports (see "Wiring map").

## Folder pattern (same in every feature)

```
features/<name>/
  schemas.ts     Zod: form/action input + read types (superset of the old schemas, UI keeps compiling)
  mappers.ts     Prisma row -> the UI type (UPPER_CASE enums -> lowercase, Date -> ISO string, BigInt -> number)
  queries/       reads  (list-*, get-*)   -> throw AppError when the role is not allowed
  actions/       writes (create-*, update-*, delete-*, set-*) -> Server Actions, return ActionResult
```

Shared pieces: `lib/actions/create-action.ts` (adminAction / userAction / publicAction),
`features/admin/permissions.ts` (who can do what), `features/admin/auth.ts` (the only file that reads your session).

## Every action returns (never throws)

```ts
type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: "VALIDATION" | "UNAUTHENTICATED" | "FORBIDDEN" | "NOT_FOUND" | "CONFLICT" | "RATE_LIMITED" | "INTERNAL";
      message?: string; fieldErrors?: Record<string, string[] | undefined> };
```

The pipeline is: auth + role -> Zod validation -> handler -> audit log (admin actions) -> revalidatePath.

## Setup

1. Append `prisma/schema.additions.prisma` to your schema, then `npx prisma migrate dev -n admin_features`.
2. Check the three assumptions below.
3. `SEED_ADMIN_EMAIL=you@example.com npx tsx prisma/seed.ts` creates the first super admin
   (linked to your login by email the first time you sign in).

## Assumptions to check (the only things that may need adapting)

| Where | Assumption |
|---|---|
| `@/lib/prisma` | exports `prisma` |
| `@/lib/dal` -> `verifySession()` | returns `{ userId, role, email? } \| null` and admins have `role === "ADMIN"` (adapt the 2 `ADAPT` lines in `features/admin/auth.ts`) |
| `lib/rate-limit.ts` | no-op stub: wire Upstash before launch |

## CRUD per feature

| Feature | Create | Read | Update | Delete |
|---|---|---|---|---|
| admin (staff) | createAdmin | listAdmins, getAdmin, listAssignableAdmins | updateAdmin, setAdminRole, setAdminActive | deleteAdmin (never the last super admin, never yourself) |
| services | createService | listServices, listPublishedServices, getService | updateService | deleteService |
| creators (showcase) | createShowcaseCreator | listShowcaseCreators, listPublishedShowcaseCreators, getPublishedShowcaseCreator | updateShowcaseCreator | deleteShowcaseCreator |
| ads | createAd | listAds, listActiveAds, getAd | updateAd | deleteAd |
| portfolio | createCaseStudy | listCaseStudies, listPublishedCaseStudies, getCaseStudy, getCaseStudyBySlug, getTotalViews | updateCaseStudy, setCaseStudyPublished | deleteCaseStudy |
| bloggers | createBloggerProfile (self) | listBloggers, getBlogger, getOwnBloggerProfile | updateBloggerProfile (self), setBloggerStatus | deleteBlogger (super) |
| brands | createBrandProfile (self) | listBrands, getBrand, getOwnBrandProfile | updateBrandProfile (self), setBrandStatus | deleteBrand |
| contracts | requestContract (self) | listContracts, getContract, listOwnContracts | reviewContract | deleteContract (super) |
| requests | submitRequest (public) | listRequests, getRequest | updateRequestStatus, assignRequest | deleteRequest (super) |
| chat | (conversation is created by contract approval) | listConversations, listMessages, getOwnConversationId | sendAdminMessage, sendBloggerMessage, markAdminRead, markBloggerRead, assignConversationManager | deleteMessage (super) |
| audit | automatic (`logAction`) | listAuditLog | append-only | append-only |
| settings | auto-created | getSiteSettings | updateSiteSettings | n/a |
| dashboard / home | n/a | getOverviewStats, getRecentRequests, getPendingContracts, getSiteStats | n/a | n/a |

## Wiring map (when you connect the UI)

| Dashboard today (mock) | Replace with |
|---|---|
| `getRequests` | `listRequests` |
| `getServices` / `getShowcaseCreators` / `getAds` / `getBloggers` / `getBrands` / `getContracts` / `getAdmins` | `listServices` / `listShowcaseCreators` / `listAds` / `listBloggers` / `listBrands` / `listContracts` / `listAdmins` |
| `getCaseStudies` / `getCaseStudy` | `listCaseStudies` / `getCaseStudy` (new file) |
| `getConversations` | `listConversations` (+ `listMessages` for the thread) |
| `getAuditLog` | `listAuditLog` (returns `{ items, nextCursor }`) |
| `getSettings` | `getSiteSettings` |
| `getHomeStats` | `getSiteStats` |
| `useCrudList.save` | `createX` or `updateX` (by `id`) |
| `useCrudList.confirmDelete` | `deleteX` |
| inline `setRows` in requests/bloggers/brands/admins tables | `updateRequestStatus`, `assignRequest`, `setBloggerStatus`, `setBrandStatus`, `setAdminRole`, `setAdminActive` |

## Rules baked in

- Roles are checked on the server in `permissions.ts`; hiding a sidebar item is never the protection.
- A manager only sees the request types of their role (`requests/role-types.ts`) and the contract side they manage.
- The blogger can read/write chat only in their own conversation and only while `CONTRACTED`.
- Profile writes by the user always use the session user id, never an id sent by the client.
- Contract approval is one transaction: contract + profile status + chat conversation.
- Audit entries are written by `adminAction`; a logging failure never undoes the operation.
- Case study slugs are generated once and never change on update.
