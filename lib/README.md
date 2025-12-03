# Admin Dashboard Library

This directory contains the core library code for the Admin Dashboard.

## Structure

### `/auth`
Authentication related code including NextAuth configuration, middleware, and session management.

### `/services`
Service layer for business logic. Each service handles operations for a specific domain (jemaat, donasi, etc.).

### `/types`
TypeScript type definitions for all data models used in the application.

### `/utils`
Utility functions including:
- `db.ts` - JSON file database operations
- `format.ts` - Formatting utilities (currency, dates, etc.)
- `validation.ts` - Zod validation schemas

## Data Models

All data models are defined in `/types` and exported through `/types/index.ts`:

- User - Admin user accounts
- Jemaat - Church members
- Pendaftar - New member registrations
- Donasi - Donations
- PermohonanPelayanan - Service requests
- Khotbah - Sermons
- Artikel - Articles
- Media - Gallery media
- Jadwal - Schedules and events
- Komunitas - Communities
- Pengumuman - Announcements
- Settings - Website settings
- Notification - System notifications

## Usage

```typescript
// Import types
import { Jemaat, Donasi } from '@/lib/types'

// Import utilities
import { readData, writeData, formatCurrency, formatDate } from '@/lib/utils'

// Import validation schemas
import { jemaatSchema, donasiSchema } from '@/lib/utils/validation'
```
