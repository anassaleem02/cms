# Solar CMS Backend - Phase 2

.NET 8 backend with Clean Architecture for FM's Power Solar Business CMS.

## Quick Start

### Prerequisites
- .NET 8 SDK
- PostgreSQL (running on localhost:5432)

### 1. Configure Database
Edit `SolarCMS.API/appsettings.json`:
```json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Port=5432;Database=SolarCMS;Username=postgres;Password=yourpassword"
}
```

### 2. Run the API
```bash
cd SolarCMS.API
dotnet run
```

The API will:
- Auto-apply migrations on startup
- Seed the database with FM's Power data

### 3. Access Swagger UI
Open: http://localhost:5000/swagger

### Default Admin Credentials
- Email: `admin@fmspower.com`
- Password: `Admin@1234`

---

## Architecture

```
SolarCMS.Domain/         ← Business entities (no dependencies)
SolarCMS.Application/    ← Interfaces, DTOs, validators
SolarCMS.Infrastructure/ ← EF Core, services, JWT
SolarCMS.API/            ← Controllers, middleware, Swagger
```

## API Endpoints Summary

| Resource     | Public                    | Admin (JWT required)           |
|-------------|---------------------------|-------------------------------|
| Auth        | POST /login               | POST /refresh, /change-password |
| Products    | GET all/featured/by-id/slug | POST/PUT/DELETE + images/specs |
| Hero        | GET /active               | POST/PUT/DELETE                |
| Features    | GET all                   | POST/PUT/DELETE + reorder      |
| Testimonials| GET all                   | POST/PUT/DELETE + reorder      |
| Services    | GET all                   | POST/PUT/DELETE + reorder      |
| Contact     | POST (submit)             | GET all/unread, mark-read, DELETE |
| Navigation  | GET all                   | POST/PUT/DELETE + reorder      |
| Settings    | GET                       | PUT                            |
| Media       | -                         | GET/upload/DELETE              |
| Dashboard   | -                         | GET /analytics                 |

## Testing

Import `SolarCMS_Postman_Collection.json` into Postman.

1. Run **Login** request first (auto-saves token)
2. All authenticated requests use `{{token}}` variable automatically
