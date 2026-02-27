# FM's Power - Solar Business CMS

A full-stack Content Management System for FM's Power, a solar energy solutions company in Karachi, Pakistan. Built with .NET 8 (Clean Architecture) backend and Angular 21 frontend.

---

## Project Structure

```
cms/
├── phase-1-static-website/   ← Static HTML/CSS/JS prototype (approved design)
├── phase-2-backend/          ← .NET 8 REST API (Clean Architecture)
├── phase-3-angular/          ← Angular 21 frontend (public site + admin panel)
└── README.md
```

---

## Quick Start

### Prerequisites

| Tool | Version |
|------|---------|
| .NET SDK | 8.0+ |
| Node.js | 18+ |
| PostgreSQL | 15+ |
| Angular CLI | `npm install -g @angular/cli` |

---

### 1. Start the Backend

```bash
cd phase-2-backend/SolarCMS.API
```

Edit `appsettings.json` — update the connection string:
```json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Port=5432;Database=SolarCMS;Username=postgres;Password=yourpassword"
}
```

```bash
dotnet run
```

The API will:
- Auto-apply EF Core migrations
- Seed the database with FM's Power sample data
- Start at `http://localhost:5000`
- Serve Swagger UI at `http://localhost:5000/swagger`

**Default Admin Credentials:**
- Email: `admin@fmspower.com`
- Password: `Admin@1234`

---

### 2. Start the Frontend

```bash
cd phase-3-angular
npm install
ng serve
```

Open `http://localhost:4200`

The Angular dev server proxies `/api` → `http://localhost:5000` automatically.

---

## Architecture

### Backend — Clean Architecture

```
SolarCMS.Domain/          ← Entities, enums, exceptions (no dependencies)
SolarCMS.Application/     ← Interfaces, DTOs, validators, AutoMapper profiles
SolarCMS.Infrastructure/  ← EF Core, service implementations, JWT, BCrypt
SolarCMS.API/             ← Controllers, middleware, DI, Swagger
SolarCMS.Tests/           ← xUnit unit tests (services + validators)
```

### Frontend — Clean Architecture Angular

```
src/app/
├── core/           ← Models, services, guards, interceptors (singleton layer)
├── shared/         ← Reusable components, directives, pipes
├── features/
│   ├── public/     ← Public site (lazy-loaded module)
│   └── admin/      ← Admin panel (lazy-loaded, AuthGuard protected)
└── layout/         ← Header, footer, admin-layout, public-layout
```

---

## API Overview

| Resource | Public | Admin (JWT) |
|----------|--------|-------------|
| Auth | `POST /login` | `POST /change-password` |
| Products | `GET` all/featured/by-id/slug | Full CRUD + images/specs/reorder |
| Hero | `GET /active` | Full CRUD |
| Features | `GET` all | Full CRUD + reorder |
| Testimonials | `GET` all | Full CRUD + reorder |
| Services | `GET` all | Full CRUD + reorder |
| Contact | `POST` submit | `GET` all/unread, mark-read, delete |
| Navigation | `GET` all | Full CRUD + reorder |
| Settings | `GET` | `PUT` |
| Media | — | Upload, list, delete |
| Dashboard | — | `GET /analytics` |

Full API reference: see `phase-2-backend/README.md` and Swagger UI.

---

## Tech Stack

### Backend
- **.NET 8** with ASP.NET Core
- **PostgreSQL** + EF Core 8 + Npgsql
- **Clean Architecture** (Domain → Application → Infrastructure → API)
- **JWT Bearer** authentication + BCrypt password hashing
- **AutoMapper 13**, **FluentValidation 11**, **MediatR 12**
- **Serilog** (console + rolling file logs in `logs/`)
- **AspNetCoreRateLimit** (20 req/s global, 10/min for login)
- **Response caching** on public GET endpoints (60s)
- Security headers: CSP, X-Frame-Options, X-Content-Type-Options
- **Swagger UI** with Bearer auth support

### Frontend
- **Angular 21** (NgModules, lazy loading)
- **@angular/cdk** DragDropModule for reordering
- **ngx-quill** rich text editor
- **RxJS** observables throughout
- Solar Emerald `#10B981` + Gold `#F59E0B` design system
- Dark/light theme toggle (localStorage)
- SEO: Angular Title/Meta service, OG tags, Twitter Cards, JSON-LD
- Accessibility: skip-to-content, ARIA labels, keyboard navigation
- Loading bar + toast notifications

---

## Running Tests

```bash
# Backend unit tests
cd phase-2-backend
dotnet test SolarCMS.Tests/SolarCMS.Tests.csproj --verbosity normal

# Frontend build check
cd phase-3-angular
ng build
```

---

## Admin Panel

Navigate to `http://localhost:4200/admin`

| Section | Features |
|---------|---------|
| Dashboard | Analytics stats, recent messages, quick actions |
| Products | CRUD, bulk delete, CSV export, drag-reorder, Quill editor, duplicate |
| Hero | Edit hero section with stats |
| Features | CRUD + reorder |
| Testimonials | CRUD + reorder |
| Services | CRUD + reorder |
| Contact Messages | Read, mark-read, delete |
| Navigation | CRUD + reorder |
| Settings | Site info, logo, contact details |
| Media Library | Upload (drag-drop), grid view, copy URL, delete |

---

## Environment Variables

### Backend (`appsettings.json`)

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=...;Port=5432;Database=SolarCMS;Username=...;Password=..."
  },
  "Jwt": {
    "Key": "your-secret-key-min-32-chars",
    "Issuer": "SolarCMS",
    "Audience": "SolarCMSClient",
    "ExpiryHours": 24
  },
  "UploadSettings": {
    "Path": "wwwroot/uploads"
  }
}
```

### Frontend (`src/environments/`)

```typescript
// environment.ts (dev)
export const environment = { production: false, apiUrl: '/api' };

// environment.prod.ts (production)
export const environment = { production: true, apiUrl: 'https://api.fmspower.com/api' };
```

---

## Production Build

```bash
# Backend
cd phase-2-backend/SolarCMS.API
dotnet publish -c Release -o ./publish

# Frontend
cd phase-3-angular
ng build --configuration production
# Output: dist/phase-3-angular/
```
