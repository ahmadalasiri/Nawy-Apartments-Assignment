# 🚀 Get Started with Nawy Apartment Listing App

Welcome! This guide will help you get the application up and running in minutes.

---

## ⚡ Quick Start (Docker - Recommended)

Perfect for testing and production deployment.

### Step 1: Prerequisites

- Docker Desktop installed and running
- Git installed

### Step 2: Clone & Setup

```bash
# Clone the repository
git clone https://github.com/ahmadalasiri/Nawy-Apartments-Assignment.git
cd Nawy-Apartments-Assignment

# Create environment file
cp example.env .env
```

### Step 3: Launch Everything

```bash
# Start all services (postgres, backend, frontend)
docker-compose up -d

# Wait 30-60 seconds for services to initialize
# The database will automatically seed with 50 sample apartments if empty!
```

### Step 4: Access the Application

- **Frontend**: http://localhost:3000 (Main app)
- **Backend API**: http://localhost:3001/api/v1 (API endpoints)
- **Health Check**: http://localhost:3001/api/v1/health

That's it! 🎉

---

## 💻 Local Development Setup

Perfect for development and debugging.

### Prerequisites

- Node.js v20 or higher
- PostgreSQL 14 or higher
- npm or yarn

### Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create database (in PostgreSQL)
# psql -U postgres -c "CREATE DATABASE nawy_apartments;"

# Push schema to database
npm run db:push

# Seed with sample data
npm run db:seed

# Start development server
npm run start:dev
```

Backend will run on http://localhost:3001

### Frontend Setup (Open New Terminal)

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on http://localhost:3000

---

## 📖 What You Can Do

### 1. Browse Apartments

Visit http://localhost:3000 to see all apartments in a beautiful grid layout.

### 2. Search

Try searching for:

- "luxury" - finds apartments with "luxury" in the name
- "A-101" - finds specific unit number
- "O West" - finds all apartments in O West project

### 3. Filter

Use the filter panel to:

- Select a specific project
- Set price range (e.g., 2,000,000 - 5,000,000 EGP)
- Choose number of bedrooms (1-6)
- Choose number of bathrooms (1-6)

### 4. View Details

Click any apartment card to see:

- Full property details
- **Interactive image gallery** - Click thumbnails to change main image
- Complete description with highlighted features
- Property specifications (bedrooms, bathrooms, area)
- Property information section

### 5. Pagination

Browse through pages using the pagination controls at the bottom.

---

## 🔍 API Testing

### Using Browser

- List apartments: http://localhost:3001/api/v1/apartments
- Get projects: http://localhost:3001/api/v1/apartments/projects
- Health check: http://localhost:3001/api/v1/health

### Using cURL

```bash
# List all apartments
curl http://localhost:3001/api/v1/apartments

# Search for luxury apartments
curl "http://localhost:3001/api/v1/apartments?search=luxury"

# Filter by project
curl "http://localhost:3001/api/v1/apartments?project=O%20West"

# Filter by price and bedrooms
curl "http://localhost:3001/api/v1/apartments?minPrice=2000000&maxPrice=5000000&bedrooms=3"

# Get projects
curl http://localhost:3001/api/v1/apartments/projects
```

---

## 🎨 Features to Explore

### Search & Filter (Bonus Feature)

1. **Real-time Search** - Type in the search box, results update automatically
2. **Multiple Filters** - Combine project, price, bedrooms (1-6), bathrooms (1-6)
3. **Clear Filters** - One-click to reset all filters
4. **URL State** - Share links with filters applied
5. **Smart Matching** - Exact bedroom/bathroom matching for precise results

### Responsive Design

- Resize your browser to see the responsive layout
- Try on mobile, tablet, and desktop sizes
- Everything adapts beautifully

### User Experience

- **Interactive Image Gallery** - Click any thumbnail to view in main display
- Smooth animations and transitions with visual feedback
- Loading states and skeleton screens
- Comprehensive error handling with user-friendly messages
- Professional UI inspired by Nawy.com
- Optimized images with blur placeholders

---

## 📊 Sample Data

The database includes **50 apartments** across **5 projects**:

| Project   | Apartments | Price Range      |
| --------- | ---------- | ---------------- |
| O West    | 12         | 3.6M - 6.5M EGP  |
| New Giza  | 10         | 4.7M - 11.5M EGP |
| Il Bosco  | 10         | 1.85M - 7.5M EGP |
| City Gate | 10         | 1.65M - 4.1M EGP |
| Villette  | 8          | 1.75M - 2.9M EGP |

---

## 🛠️ Development Commands

### Backend

```bash
npm run start:dev      # Start dev server with hot reload
npm run build          # Build for production
npm run start:prod     # Start production server
npm run db:push        # Push schema changes
npm run db:seed        # Seed database
npm run db:studio      # Open Drizzle Studio (DB GUI)
```

### Frontend

```bash
npm run dev            # Start dev server
npm run build          # Build for production
npm run start          # Start production server
npm run lint           # Run linter
```

### Docker

```bash
docker-compose up -d              # Start all services
docker-compose down               # Stop all services
docker-compose logs -f            # View logs
docker-compose exec backend bash  # Access backend container
```

---

## 📚 Documentation

- **[README.md](./README.md)** - Complete project documentation

---

## ✅ Verify Everything Works

### Checklist

- [ ] Frontend loads at http://localhost:3000
- [ ] Apartments are displayed in a responsive grid
- [ ] Search bar accepts input and results update
- [ ] All filters work (project, price, bedrooms 1-6, bathrooms 1-6)
- [ ] Results update when filtering
- [ ] Clicking an apartment shows full details
- [ ] Image gallery thumbnails change main image on click
- [ ] Pagination works and scrolls to top
- [ ] "Back to Listings" button works
- [ ] No errors in browser console

---

## 🎯 Project Structure Overview

```
Nawy-Apartments-Assignment/
├── backend/            # NestJS API
├── frontend/           # Next.js App
├── docker-compose.yml  # Docker orchestration
├── README.md           # Main docs
└── GET_STARTED.md      # This file
```

---

## 🌟 Key Features

1. ✅ Browse 50 apartments across 5 premium projects
2. ✅ Real-time search by name, unit, or project
3. ✅ Advanced filters: project, price range, beds (1-6), baths (1-6)
4. ✅ Interactive image gallery with thumbnail selection
5. ✅ Detailed apartment information with complete specs
6. ✅ Fully responsive design (mobile, tablet, desktop)
7. ✅ Professional UI inspired by Nawy.com
8. ✅ RESTful API with efficient pagination
9. ✅ URL-based state for shareable links
10. ✅ **Auto-seeding** - Database automatically populates on first Docker run
11. ✅ Docker deployment ready with docker-compose

---

## 🚢 Next Steps

1. **Explore the app** at http://localhost:3000
2. **Try the search** with "luxury" or "O West"
3. **Test filters** - set price range and bedrooms
4. **View details** - click any apartment card
5. **Check the API** at http://localhost:3001/api/v1/apartments
6. **Review the code** - see clean, documented code
7. **Read the docs** - comprehensive documentation

---

## 💡 Tips

- **Search is debounced** - Wait 500ms after typing
- **Filters update instantly** - No need to click apply
- **URLs are shareable** - Filters are saved in URL
- **Images are optimized** - Using Next.js Image component
- **API is rate-limited** - 100 requests per minute

---

## 🙋 Need Help?

1. Check [README.md](./README.md) for detailed documentation
2. See [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) for troubleshooting
3. Review [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for API details

---

## 🎉 You're All Set!

The application is ready to use. Enjoy exploring!

**Access the app**: http://localhost:3000

---

**Built with ❤️ for Nawy Software Engineer Hiring Assignment**
