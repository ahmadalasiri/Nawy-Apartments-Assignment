# 🏢 Nawy Apartment Listing App

A full-stack web application for browsing and discovering luxury apartments in top compounds across Egypt. Built with modern technologies and best practices.

## 🚀 Tech Stack

### Backend

- **NestJS** - Progressive Node.js framework
- **PostgreSQL** - Relational database
- **Drizzle ORM** - TypeScript ORM for type-safe database queries
- **TypeScript** - Type safety and better developer experience

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client

### DevOps

- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## 📋 Features

### Core Features

- ✅ Browse apartments with beautiful card-based layout
- ✅ View detailed apartment information
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Pagination for better performance
- ✅ Professional UI inspired by Nawy.com

### Bonus Features (Implemented)

- ✅ **Search functionality** - Search by unit name, unit number, or project
- ✅ **Advanced filters** - Filter by project, price range, bedrooms, bathrooms
- ✅ **URL-based state** - Shareable links with filters
- ✅ **Debounced search** - Optimized search performance
- ✅ **Real-time results** - Instant filter updates

## 🏗️ Project Structure

```
nawy-apartment-listing/
├── backend/                    # NestJS backend
│   ├── src/
│   │   ├── apartments/        # Apartments module (controller, service, DTOs)
│   │   ├── common/            # Shared utilities (pagination, filters)
│   │   ├── db/                # Database schema, migrations, seed
│   │   ├── app.module.ts      # Root module
│   │   └── main.ts            # Application entry point
│   ├── drizzle/               # Database migrations
│   ├── Dockerfile             # Backend Docker configuration
│   ├── drizzle.config.ts      # Drizzle ORM configuration
│   └── package.json           # Backend dependencies
│
├── frontend/                  # Next.js frontend
│   ├── app/
│   │   ├── apartments/[id]/   # Apartment details page
│   │   ├── layout.tsx         # Root layout with navbar
│   │   ├── page.tsx           # Home/listing page
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable components
│   │   ├── ApartmentCard.tsx
│   │   ├── ApartmentGrid.tsx
│   │   ├── SearchFilters.tsx
│   │   ├── Pagination.tsx
│   │   └── Navbar.tsx
│   ├── lib/
│   │   ├── api.ts             # API client
│   │   └── types.ts           # TypeScript types
│   ├── Dockerfile             # Frontend Docker configuration
│   └── package.json           # Frontend dependencies
│
├── docker-compose.yml         # Multi-container orchestration
├── example.env                # Environment variables template
└── README.md                  # This file
```

## 🛠️ Setup Instructions

### Prerequisites

- **Node.js** (v20 or higher)
- **PostgreSQL** (v14 or higher)
- **npm** or **yarn**

### Option 1: Local Development (Recommended for Development)

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd nawy-apartment-listing
```

#### 2. Setup Environment Variables

```bash
# Copy example.env to .env
cp example.env .env

# Edit .env if needed (default values work for local development)
```

#### 3. Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE nawy_apartments;
```

#### 4. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Run database migrations
npm run db:push

# Seed the database with sample data
npm run db:seed

# Start the backend server
npm run start:dev
```

The backend will run on `http://localhost:3001`

**API Endpoints:**

- Health check: `GET http://localhost:3001/api/v1/health`
- List apartments: `GET http://localhost:3001/api/v1/apartments`
- Get apartment: `GET http://localhost:3001/api/v1/apartments/:id`
- Get projects: `GET http://localhost:3001/api/v1/apartments/projects`

#### 5. Frontend Setup

Open a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Start the frontend dev server
npm run dev
```

The frontend will run on `http://localhost:3000`

#### 6. Access the Application

Open your browser and navigate to: `http://localhost:3000`

---

### Option 2: Docker Deployment (Recommended for Production)

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd nawy-apartment-listing
```

#### 2. Setup Environment Variables

```bash
# Copy example.env to .env
cp example.env .env

# Edit .env if needed
```

#### 3. Start All Services

```bash
# Build and start all containers (postgres, backend, frontend)
docker-compose up -d

# View logs
docker-compose logs -f
```

#### 4. Seed the Database

```bash
# Wait for services to be healthy, then seed the database
docker-compose exec backend npm run db:seed
```

#### 5. Access the Application

- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:3001/api/v1`
- **Health Check**: `http://localhost:3001/api/v1/health`

#### 6. Stop All Services

```bash
docker-compose down
```

#### 7. Clean Up (Remove Volumes)

```bash
docker-compose down -v
```

---

## 📖 API Documentation

### List Apartments

```http
GET /api/v1/apartments?page=1&limit=12&search=luxury&project=O West&minPrice=2000000&maxPrice=5000000&bedrooms=3&bathrooms=2
```

**Query Parameters:**

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 12)
- `search` (optional): Search by name, unit number, or project
- `project` (optional): Filter by project name
- `minPrice` (optional): Minimum price filter
- `maxPrice` (optional): Maximum price filter
- `bedrooms` (optional): Filter by number of bedrooms
- `bathrooms` (optional): Filter by number of bathrooms

**Response:**

```json
{
  "data": [
    {
      "id": "uuid",
      "unitNumber": "A-101",
      "name": "Luxury Garden Apartment",
      "project": "O West",
      "description": "...",
      "price": "4500000",
      "bedrooms": 3,
      "bathrooms": 2,
      "area": "180",
      "images": ["url1", "url2"],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "meta": {
    "total": 25,
    "page": 1,
    "limit": 12,
    "totalPages": 3
  }
}
```

### Get Apartment by ID

```http
GET /api/v1/apartments/:id
```

**Response:** Single apartment object

### Get Unique Projects

```http
GET /api/v1/apartments/projects
```

**Response:** Array of project names

---

## 🎨 Design Features

### Nawy-Inspired UI

- Clean, modern interface with professional typography
- Primary color: Blue (#2563eb)
- Card-based layout with smooth hover effects
- Responsive grid system (1 col mobile → 2 col tablet → 3 col desktop)
- High-quality images with proper optimization

### User Experience

- Instant search with debouncing (500ms)
- Real-time filter updates
- URL-based state for shareable links
- Smooth page transitions
- Loading states and error handling
- Empty state messages

---

## 🧪 Testing the Application

### Test Search Functionality

1. Go to `http://localhost:3000`
2. Use the search bar to search for "luxury" or "A-101"
3. Results update automatically

### Test Filters

1. Select a project from the dropdown (e.g., "O West")
2. Set price range (e.g., min: 2000000, max: 5000000)
3. Select bedrooms and bathrooms
4. Results update in real-time

### Test Pagination

1. Scroll to the bottom of the page
2. Click "Next" or a page number
3. Page smoothly scrolls to top with new results

### Test Details Page

1. Click any apartment card
2. View full details with image gallery
3. Click "Back to Listings" to return

---

## 📊 Database Schema

### Apartments Table

| Column      | Type          | Description                  |
| ----------- | ------------- | ---------------------------- |
| id          | UUID          | Primary key (auto-generated) |
| unitNumber  | VARCHAR(50)   | Unique unit identifier       |
| name        | VARCHAR(255)  | Apartment name               |
| project     | VARCHAR(255)  | Project/compound name        |
| description | TEXT          | Full description             |
| price       | DECIMAL(12,2) | Price in EGP                 |
| bedrooms    | INTEGER       | Number of bedrooms           |
| bathrooms   | INTEGER       | Number of bathrooms          |
| area        | DECIMAL(10,2) | Area in square meters        |
| images      | JSON          | Array of image URLs          |
| createdAt   | TIMESTAMP     | Creation timestamp           |
| updatedAt   | TIMESTAMP     | Last update timestamp        |

**Indexes:**

- `project_idx` - Index on project column
- `unit_number_idx` - Index on unitNumber column
- `project_unit_idx` - Composite index on (project, unitNumber)

---

## 🔧 Development Scripts

### Backend

```bash
npm run start:dev      # Start development server
npm run build          # Build for production
npm run start:prod     # Start production server
npm run db:push        # Push schema changes to database
npm run db:migrate     # Run migrations
npm run db:seed        # Seed database with sample data
npm run db:studio      # Open Drizzle Studio (database GUI)
```

### Frontend

```bash
npm run dev            # Start development server
npm run build          # Build for production
npm run start          # Start production server
npm run lint           # Run linter
```

---

## 🌟 Key Implementation Highlights

### Backend

- **NestJS architecture** with modular design
- **Drizzle ORM** for type-safe database queries
- **Efficient search** using `ilike` for case-insensitive matching
- **Optimized filtering** with indexed columns
- **Parallel queries** for pagination metadata
- **Global validation** with class-validator
- **Security** with Helmet and rate limiting (Throttler)

### Frontend

- **Next.js App Router** with server components
- **Client-side state management** with URL sync
- **Debounced search** to reduce API calls
- **Responsive images** with Next.js Image optimization
- **SEO-friendly** with proper metadata
- **Error boundaries** for graceful error handling

---

## 📝 Environment Variables

| Variable            | Description               | Default                                                       |
| ------------------- | ------------------------- | ------------------------------------------------------------- |
| DATABASE_URL        | PostgreSQL connection URL | postgresql://postgres:postgres@localhost:5432/nawy_apartments |
| POSTGRES_USER       | Database user             | postgres                                                      |
| POSTGRES_PASSWORD   | Database password         | postgres                                                      |
| POSTGRES_DB         | Database name             | nawy_apartments                                               |
| POSTGRES_PORT       | Database port             | 5432                                                          |
| PORT                | Backend port              | 3001                                                          |
| BACKEND_PORT        | Backend port (Docker)     | 3001                                                          |
| FRONTEND_PORT       | Frontend port (Docker)    | 3000                                                          |
| NEXT_PUBLIC_API_URL | Backend API URL           | http://localhost:3001                                         |
| NODE_ENV            | Environment mode          | development                                                   |

---

## 🚢 Production Deployment

### Using Docker Compose

```bash
# 1. Setup environment
cp example.env .env
# Edit .env with production values

# 2. Build and start
docker-compose up -d

# 3. Seed database
docker-compose exec backend npm run db:seed

# 4. Access logs
docker-compose logs -f
```

### Manual Deployment

**Backend:**

```bash
cd backend
npm ci
npm run build
npm run db:migrate
npm run start:prod
```

**Frontend:**

```bash
cd frontend
npm ci
npm run build
npm run start
```

---

## 📄 License

This project is created as part of a hiring assignment for Nawy.

---

## 👨‍💻 Author

Created with ❤️ for Nawy Software Engineer Hiring Assignment

---

## 📞 Support

For questions or issues, please contact the development team.
