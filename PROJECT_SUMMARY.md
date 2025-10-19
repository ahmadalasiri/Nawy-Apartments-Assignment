# 📋 Project Summary - Nawy Apartment Listing App

## Overview

This is a **complete full-stack apartment listing application** built for Nawy's Software Engineer Hiring Assignment. The application allows users to browse, search, and filter luxury apartments across various compounds in Egypt.

## 🌐 Live Deployment

**🔗 Frontend (Production): [https://adam.ahmadalasiri.info/](https://adam.ahmadalasiri.info/)**  
**🔗 API (Production): [https://api.adam.ahmadalasiri.info/api/v1](https://api.adam.ahmadalasiri.info/api/v1)**

The application is deployed on a VPS with full production features including automatic database seeding, containerized services, and optimized performance.

## Assignment Requirements ✅

### Backend Application (Node.js + TypeScript)

- ✅ API endpoint for listing apartments (with pagination)
- ✅ API endpoint for getting apartment details
- ✅ API for adding apartments
- ✅ Implemented with **NestJS** framework
- ✅ **PostgreSQL** database with **Drizzle ORM**
- ✅ Full TypeScript implementation

### Frontend Application (Next.js)

- ✅ Apartment listing page with grid layout
- ✅ Apartment details page
- ✅ **Responsive design** (mobile, tablet, desktop)
- ✅ **Modern UI** inspired by Nawy.com
- ✅ Implemented with **Next.js 15 App Router**

### Database

- ✅ **PostgreSQL** relational database
- ✅ Proper schema with indexes for performance
- ✅ Type-safe queries with Drizzle ORM

### Bonus Feature ⭐

- ✅ **Search and Filter Functionality**
  - Search by unit name, unit number, or project
  - Filter by project, price range, bedrooms, bathrooms
  - Real-time updates with debounced search
  - URL-based state for shareable links

### Deployment

- ✅ **Fully containerized** with Docker
- ✅ **docker-compose** setup for all services
- ✅ Single command deployment
- ✅ Health checks for all services

### Documentation

- ✅ Comprehensive **README.md** with setup instructions
- ✅ **QUICKSTART.md** for rapid deployment
- ✅ **API_DOCUMENTATION.md** for API reference
- ✅ Code comments and documentation throughout

---

## Technical Stack

### Backend

- **Framework**: NestJS 11
- **Language**: TypeScript 5.7
- **Database**: PostgreSQL 15
- **ORM**: Drizzle ORM 0.44
- **Validation**: class-validator + class-transformer
- **Security**: Helmet + Throttler (rate limiting)
- **Logging**: Morgan

### Frontend

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.7
- **Styling**: Tailwind CSS 3.4
- **HTTP Client**: Axios
- **Image Optimization**: Next.js Image component

### DevOps

- **Containerization**: Docker + Docker Compose
- **Database Management**: Drizzle Kit for migrations
- **Process Management**: Docker health checks

---

## Key Features Implemented

### Core Features

1. **Browse Apartments**

   - Paginated listing (12 items per page)
   - Beautiful card-based layout
   - Responsive grid (1-3 columns based on screen size)

2. **View Details**

   - Dedicated apartment details page
   - Image gallery
   - Complete property information
   - Back navigation

3. **Responsive Design**
   - Mobile-first approach
   - Works seamlessly on all devices
   - Professional UI inspired by Nawy.com

### Advanced Features

1. **Search Functionality**

   - Search by apartment name
   - Search by unit number
   - Search by project name
   - Debounced input (500ms) for performance

2. **Advanced Filters**

   - Filter by project (dropdown)
   - Filter by price range (min/max)
   - Filter by number of bedrooms
   - Filter by number of bathrooms
   - Clear all filters button

3. **User Experience**
   - URL-based state (shareable links with filters)
   - Real-time results
   - Loading states
   - Error handling
   - Empty state messages
   - Smooth pagination with page numbers

---

## Architecture Highlights

### Backend Architecture

```
├── apartments/              # Feature module
│   ├── apartments.controller.ts  # HTTP endpoints
│   ├── apartments.service.ts     # Business logic
│   ├── apartments.module.ts      # Module definition
│   └── dto/                      # Data Transfer Objects
├── common/                  # Shared utilities
│   ├── dto/                 # Common DTOs (pagination)
│   └── filters/             # Exception filters
├── db/                      # Database layer
│   ├── schema.ts            # Drizzle schema
│   ├── db.module.ts         # Database provider
│   └── seed.ts              # Sample data
└── main.ts                  # Application bootstrap
```

**Design Patterns:**

- **Modular Architecture**: Feature-based modules
- **Dependency Injection**: NestJS DI container
- **Repository Pattern**: Through Drizzle ORM
- **DTO Pattern**: Input validation and transformation
- **Provider Pattern**: Global database connection

### Frontend Architecture

```
├── app/                     # Next.js App Router
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home/listing page
│   ├── apartments/[id]/     # Dynamic route
│   └── globals.css          # Global styles
├── components/              # Reusable components
│   ├── ApartmentCard.tsx    # Single apartment card
│   ├── ApartmentGrid.tsx    # Grid layout
│   ├── SearchFilters.tsx    # Filter panel
│   ├── Pagination.tsx       # Pagination controls
│   └── Navbar.tsx           # Navigation bar
└── lib/                     # Core utilities
    ├── api.ts               # API client
    └── types.ts             # TypeScript types
```

**Design Patterns:**

- **Component Composition**: Reusable, single-responsibility components
- **Server Components**: Default server rendering for SEO
- **Client Components**: Interactive parts with 'use client'
- **Custom Hooks**: useSearchParams for URL state
- **API Abstraction**: Centralized API client

---

## Database Design

### Schema

```sql
CREATE TABLE apartments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_number VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  project VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,
  area DECIMAL(10,2) NOT NULL,
  images JSON NOT NULL DEFAULT '[]',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX project_idx ON apartments(project);
CREATE INDEX unit_number_idx ON apartments(unit_number);
CREATE INDEX project_unit_idx ON apartments(project, unit_number);
```

### Sample Data

- 50 diverse apartments
- 5 different projects (O West, New Giza, Il Bosco, City Gate, Villette)
- Price range: 1.6M - 9.5M EGP
- Various sizes: 1-4 bedrooms
- High-quality images from Unsplash

---

## API Endpoints

### Public Endpoints

1. `GET /api/v1/apartments` - List apartments (with search/filters)
2. `GET /api/v1/apartments/:id` - Get apartment details
3. `GET /api/v1/apartments/projects` - Get unique projects
4. `POST /api/v1/apartments` - Create apartment (admin/seeding)
5. `GET /api/v1/health` - Health check

### Query Parameters (List)

- `page`, `limit` - Pagination
- `search` - Full-text search
- `project` - Filter by project
- `minPrice`, `maxPrice` - Price range
- `bedrooms`, `bathrooms` - Property specs

---

## Code Quality Standards

### Implemented Best Practices

1. **TypeScript Strict Mode** - Full type safety
2. **Input Validation** - class-validator decorators
3. **Error Handling** - Global exception filters
4. **Security** - Helmet, rate limiting, CORS
5. **Performance** - Indexed queries, parallel operations
6. **Clean Code** - Modular, readable, maintainable
7. **Documentation** - Comments and comprehensive docs

### Project Organization

- Separation of concerns (controller/service/module)
- DRY principle (reusable components)
- Single responsibility principle
- Consistent naming conventions
- Proper file structure

---

## Deployment

### Docker Compose Services

1. **postgres**: PostgreSQL database with persistent volume
2. **backend**: NestJS API (port 3001)
3. **frontend**: Next.js app (port 3000)

### Features

- Health checks for all services
- Automatic database migrations
- Volume persistence for data
- Network isolation
- Build caching for faster rebuilds

### Commands

```bash
# Start all services (auto-seeds if database is empty)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

---

## Testing Strategy

### Manual Testing Checklist

- ✅ Browse apartments page loads
- ✅ Search by name works
- ✅ Search by unit number works
- ✅ Search by project works
- ✅ Project filter works
- ✅ Price range filter works
- ✅ Bedrooms filter works
- ✅ Bathrooms filter works
- ✅ Pagination works
- ✅ Apartment details page loads
- ✅ Images display correctly
- ✅ Responsive design on mobile
- ✅ Responsive design on tablet
- ✅ Responsive design on desktop
- ✅ Error handling works
- ✅ Loading states display
- ✅ Back navigation works
- ✅ URL state sync works

### API Testing

- Use curl, Postman, or browser
- All endpoints documented in API_DOCUMENTATION.md
- Sample requests provided

---

## Performance Optimizations

### Backend

- Database indexes on frequently queried columns
- Parallel queries for pagination metadata
- Efficient ORM queries with Drizzle
- Connection pooling with postgres library

### Frontend

- Next.js Image optimization
- Debounced search (500ms)
- Client-side caching
- Server-side rendering for SEO
- Code splitting with dynamic imports

---

## Security Measures

1. **Helmet**: Protection against common vulnerabilities
2. **Rate Limiting**: 100 requests/minute per IP
3. **Input Validation**: All inputs validated with class-validator
4. **SQL Injection Prevention**: Parameterized queries with Drizzle
5. **CORS**: Configured for allowed origins
6. **Type Safety**: TypeScript throughout

---

## Future Enhancements

### Potential Features (Not Implemented)

- User authentication and authorization
- Favorite/save apartments
- Contact agent functionality
- Property comparison
- Map integration
- Advanced search filters (amenities, furnishing)
- Image upload for apartments
- Admin dashboard
- Real-time notifications
- Unit tests and E2E tests

---

## Development Time

Estimated time breakdown:

- Planning & architecture: 1 hour
- Backend implementation: 3 hours
- Frontend implementation: 3 hours
- Docker setup: 1 hour
- Testing & documentation: 2 hours
- **Total**: ~10 hours

---

## Conclusion

This project successfully implements all required features for the Nawy Software Engineer Hiring Assignment, including:

- ✅ Complete backend API with NestJS
- ✅ Modern frontend with Next.js
- ✅ PostgreSQL database with proper schema
- ✅ Docker containerization
- ✅ Bonus search and filter functionality
- ✅ Comprehensive documentation
- ✅ Production-ready code quality

The application is **ready for deployment** and demonstrates:

- Strong full-stack development skills
- Modern best practices
- Clean, maintainable code
- Professional documentation
- Production-ready architecture

---

**Ready to run with a single command!** 🚀

```bash
docker-compose up -d  # Auto-seeds on first run
```
