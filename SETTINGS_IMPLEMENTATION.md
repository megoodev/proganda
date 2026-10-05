# Dynamic Settings Implementation

## Overview
The admin settings page has been upgraded to support dynamic social links. Admins can now add, edit, and remove any number of social media links with custom titles, URLs, and icons.

## Database Schema Changes

### New Tables

#### `SiteSettings`
Stores the main site configuration:
- `siteName`: Site name
- `whatsapp`: WhatsApp number
- `email`: Contact email
- `socialLinks`: Relation to SocialLink table

#### `SocialLink`
Stores dynamic social media links:
- `platform`: Platform identifier (e.g., "instagram", "twitter")
- `title`: Display title (e.g., "Instagram", "Follow us on Twitter")
- `url`: Full URL to the social media page
- `icon`: Icon name for UI rendering
- `sortOrder`: Display order
- `siteSettingsId`: Foreign key to SiteSettings

## File Changes

### 1. Prisma Schema (`prisma/schema.prisma`)
Added two new models:
- `SiteSettings` - Main settings table
- `SocialLink` - Dynamic social links with relation to SiteSettings

### 2. Schemas (`src/features/settings/schemas.ts`)
Updated to support dynamic social links:
- Added `socialLinkSchema` for individual link validation
- Updated `siteSettingsSchema` to include `socialLinks` array
- Removed hardcoded social fields (instagram, tiktok, youtube, facebook)

### 3. Mock Data (`src/features/settings/mock-settings.ts`)
Updated to use the new structure with social links array.

### 4. Settings Form (`src/app/[locale]/admin/settings/_components/settings-form.tsx`)
Completely redesigned:
- Uses `useFieldArray` for dynamic form fields
- Add/remove social links with buttons
- Each link has: platform, title, URL, and icon fields
- Integrated with server action for database persistence
- Drag handle icon for future drag-and-drop implementation

### 5. Database Query (`src/features/settings/queries/get-settings-db.ts`)
New file to fetch settings from database:
- Fetches SiteSettings with related SocialLinks
- Orders social links by sortOrder
- Returns default settings if none exist

### 6. Server Action (`src/features/settings/actions/update-settings.ts`)
New server action to save settings:
- Validates input with Zod schema
- Creates or updates SiteSettings record
- Deletes all existing social links and recreates them
- Revalidates affected paths
- Can be called from the form

### 7. Seed File (`prisma/seed.ts`)
New seed file to populate default settings:
- Creates default SiteSettings with sample social links
- Can be run to initialize the database

### 8. Translations (`messages/ar.json` & `messages/en.json`)
Updated translations:
- Removed hardcoded social field labels
- Added `socialFields` section with platform, title, url, icon
- Added `addSocial` and `noSocialLinks` messages

## How to Use

### Setup Database

1. Generate Prisma client:
```bash
npx prisma generate
```

2. Run migrations:
```bash
npx prisma migrate dev --name add-site-settings
```

3. Seed initial data:
```bash
npx prisma db seed
```

### Switch from Mock to Database

In `src/features/settings/queries/get-settings.ts`:

**Current (Mock):**
```typescript
import { mockSettings } from "../mock-settings";

export async function getSettings() {
  return mockSettings;
}
```

**Change to Database:**
```typescript
import { getSettingsFromDb } from "./get-settings-db";

export async function getSettings() {
  return getSettingsFromDb();
}
```

### Using the Settings Form

1. Navigate to `/admin/settings`
2. Edit contact information (site name, WhatsApp, email)
3. Click "Add social link" to add a new social media link
4. Fill in:
   - **Platform**: Platform identifier (e.g., "instagram", "twitter")
   - **Title**: Display name (e.g., "Instagram", "Twitter")
   - **URL**: Full URL (e.g., "https://instagram.com/username")
   - **Icon**: Icon name (optional, for UI rendering)
5. Click the trash icon to remove a link
6. Click "Save" to persist changes

## Frontend Integration

To use the settings in the public site:

```typescript
import { getSettingsFromDb } from "@/features/settings/queries/get-settings-db";

export async function MyComponent() {
  const settings = await getSettingsFromDb();

  return (
    <div>
      <a href={settings.whatsapp}>WhatsApp</a>
      <a href={settings.email}>Email</a>
      {settings.socialLinks.map((link) => (
        <a key={link.id} href={link.url}>
          {link.title}
        </a>
      ))}
    </div>
  );
}
```

## Future Enhancements

1. **Drag-and-Drop Reordering**: Add drag-and-drop to reorder social links
2. **Icon Picker**: Add a visual icon picker instead of text input
3. **Validation**: Add platform-specific URL validation
4. **Preview**: Show live preview of social links in the footer
5. **Multiple Settings Groups**: Support for different settings sections
6. **Audit Log**: Track who changed settings and when

## Security Notes

- The `updateSettings` server action should be protected with role checks (super admin only)
- Add audit log entries when settings are changed
- Consider adding a "restore defaults" button
- Validate URLs to prevent XSS attacks
