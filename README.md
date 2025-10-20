# 🏢 Nawy Apartment Listing App

A full-stack web application for browsing and discovering luxury apartments in top compounds across Egypt. Built with modern technologies and best practices.

## 🌐 Live Demo

**🔗 Frontend: [https://adam.ahmadalasiri.info/](https://adam.ahmadalasiri.info/)**  
**🔗 API: [https://api.adam.ahmadalasiri.info/api/v1](https://api.adam.ahmadalasiri.info/api/v1)**

Experience the live application deployed on a VPS with full functionality including search, filters, and interactive image galleries.

### Quick Start with Docker

```bash
docker-compose up --build
```

This will build and start all services (PostgreSQL, Backend, Frontend) with automatic database seeding.

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
- ✅ **Advanced filters** - Filter by project, price range, bedrooms (1-6), bathrooms (1-6)
- ✅ **Interactive image gallery** - Click thumbnails to view different images
- ✅ **URL-based state** - Shareable links with filters
- ✅ **Debounced search** - Optimized search performance (500ms)
- ✅ **Real-time results** - Instant filter updates
- ✅ **Visual feedback** - Selected image highlights, hover effects

## 🏗️ Project Structure

```
Nawy-Apartments-Assignment/
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
│   │   ├── ApartmentCard.tsx  # Card with image and details
│   │   ├── ApartmentGrid.tsx  # Responsive grid layout
│   │   ├── SearchFilters.tsx  # Advanced search filters
│   │   ├── ImageGallery.tsx   # Interactive image gallery
│   │   ├── Pagination.tsx     # Page navigation
│   │   ├── BackButton.tsx     # Navigation helper
│   │   └── Navbar.tsx         # App header
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
git clone https://github.com/ahmadalasiri/Nawy-Apartments-Assignment.git
cd Nawy-Apartments-Assignment
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
git clone https://github.com/ahmadalasiri/Nawy-Apartments-Assignment.git
cd Nawy-Apartments-Assignment
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

#### 4. Access the Application

> 💡 **Note**: The database automatically seeds with sample data on first run if empty!

- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:3001/api/v1`
- **Health Check**: `http://localhost:3001/api/v1/health`

#### 5. Stop All Services

```bash
docker-compose down
```

#### 6. Clean Up (Remove Volumes)

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
- `search` (optional): Search by name, unit number, or project (case-insensitive)
- `project` (optional): Filter by project name (case-insensitive)
- `minPrice` (optional): Minimum price filter (inclusive)
- `maxPrice` (optional): Maximum price filter (inclusive)
- `bedrooms` (optional): Exact number of bedrooms (1-6)
- `bathrooms` (optional): Exact number of bathrooms (1-6)

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
    "total": 50,
    "page": 1,
    "limit": 12,
    "totalPages": 5
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
- Card-based layout with smooth hover effects and transitions
- Responsive grid system (1 col mobile → 2 col tablet → 3 col desktop)
- High-quality images with Next.js Image optimization
- Interactive image gallery with thumbnail selection
- Visual feedback on selected images (ring highlight, scale)

### User Experience

- **Interactive image gallery** - Click any thumbnail to view in main display
- Instant search with debouncing (500ms)
- Real-time filter updates without page reload
- URL-based state for shareable links
- Smooth page transitions with scroll-to-top
- Loading states and skeleton screens
- Comprehensive error handling with user-friendly messages
- Empty state messages for no results

---

## 🧪 Testing the Application

### Test Search Functionality

1. Go to `http://localhost:3000`
2. Use the search bar to search for "luxury" or "A-101"
3. Results update automatically

### Test Filters

1. Select a project from the dropdown (e.g., "O West")
2. Set price range (e.g., min: 2000000, max: 5000000)
3. Select bedrooms (1-6) and bathrooms (1-6)
4. Results update in real-time as you change filters
5. Try "Clear All" to reset filters

### Test Pagination

1. Scroll to the bottom of the page
2. Click "Next" or a page number
3. Page smoothly scrolls to top with new results
4. Notice URL updates with current page

### Test Details Page

1. Click any apartment card
2. View full details with **interactive image gallery**
3. **Click different thumbnail images** to change the main display
4. Notice the selected thumbnail is highlighted with a blue ring
5. Click "Back to Listings" to return with filters preserved

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

- **NestJS architecture** with modular design and dependency injection
- **Drizzle ORM** for type-safe database queries with prepared statements
- **Efficient search** using `ilike` for case-insensitive matching (SQL injection safe)
- **Optimized filtering** with indexed columns (project, unitNumber)
- **Parallel queries** for pagination metadata to reduce response time
- **Global validation** with class-validator and DTOs
- **Security** with Helmet, CORS, and proper error handling
- **Type casting** for decimal comparisons in price filtering
- **Unique constraints** with proper conflict handling
- **Auto-seeding** - Database automatically seeds on first Docker run if empty

### Frontend

- **Next.js 15 App Router** with server and client components
- **Interactive UI** with client-side state (ImageGallery, SearchFilters)
- **Client-side state management** with URL sync for shareable links
- **Debounced search** (500ms) to reduce API calls
- **Responsive images** with Next.js Image optimization and blur placeholders
- **SEO-friendly** with proper metadata and dynamic page titles
- **Error boundaries** for graceful error handling
- **Smooth transitions** with hover effects and visual feedback
- **Reusable components** following React best practices

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

# 2. Build and start (auto-seeds if database is empty)
docker-compose up -d

# 3. Access logs
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
