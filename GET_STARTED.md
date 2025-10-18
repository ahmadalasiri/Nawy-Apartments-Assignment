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
git clone <your-repo-url>
cd nawy-apartment-listing

# Create environment file
cp example.env .env
```

### Step 3: Launch Everything

```bash
# Start all services (postgres, backend, frontend)
docker-compose up -d

# Wait 30 seconds for services to initialize
# Then seed the database with 25 sample apartments
docker-compose exec backend npm run db:seed
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
- Choose number of bedrooms
- Choose number of bathrooms

### 4. View Details

Click any apartment card to see:

- Full property details
- Image gallery
- Complete description
- Property specifications

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
2. **Multiple Filters** - Combine project, price, bedrooms, bathrooms
3. **Clear Filters** - One-click to reset all filters
4. **URL State** - Share links with filters applied

### Responsive Design

- Resize your browser to see the responsive layout
- Try on mobile, tablet, and desktop sizes
- Everything adapts beautifully

### User Experience

- Smooth animations and transitions
- Loading states
- Error handling
- Professional UI inspired by Nawy.com

---

## 📊 Sample Data

The database includes **25 apartments** across **5 projects**:

| Project   | Apartments | Price Range      |
| --------- | ---------- | ---------------- |
| O West    | 6          | 3.6M - 6.5M EGP  |
| New Giza  | 5          | 4.7M - 9.5M EGP  |
| Il Bosco  | 5          | 1.85M - 6.8M EGP |
| City Gate | 5          | 1.65M - 3.8M EGP |
| Villette  | 4          | 2.1M - 2.85M EGP |

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

## 🐛 Troubleshooting

### Problem: Docker containers won't start

**Solution:**

```bash
docker-compose down -v
docker-compose up -d --build
```

### Problem: Port 3000 or 3001 already in use

**Solution:** Edit `.env` file and change `FRONTEND_PORT` and `BACKEND_PORT`

### Problem: Database connection error

**Solution:** Check `DATABASE_URL` in `.env` file

### Problem: Frontend can't reach backend

**Solution:**

- For Docker: Use `http://localhost:3001`
- Check `NEXT_PUBLIC_API_URL` in `.env`

### Problem: Apartments not showing

**Solution:** Run the seed command:

```bash
docker-compose exec backend npm run db:seed
```

---

## 📚 Documentation

- **[README.md](./README.md)** - Complete project documentation
- **[QUICKSTART.md](./QUICKSTART.md)** - Rapid setup guide
- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - API reference
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Project overview
- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Deployment guide
- **[IMPLEMENTATION_COMPLETE.md](./IMPLEMENTATION_COMPLETE.md)** - Implementation summary

---

## ✅ Verify Everything Works

### Checklist

- [ ] Frontend loads at http://localhost:3000
- [ ] Apartments are displayed in a grid
- [ ] Search bar accepts input
- [ ] Filters can be changed
- [ ] Results update when filtering
- [ ] Clicking an apartment shows details
- [ ] Pagination works
- [ ] No errors in browser console

---

## 🎯 Project Structure Overview

```
nawy-apartment-listing/
├── backend/            # NestJS API
├── frontend/           # Next.js App
├── docker-compose.yml  # Docker orchestration
├── README.md           # Main docs
└── GET_STARTED.md      # This file
```

---

## 🌟 Key Features

1. ✅ Browse 25 apartments
2. ✅ Search by name, unit, or project
3. ✅ Filter by project, price, beds, baths
4. ✅ View detailed apartment information
5. ✅ Responsive design (mobile, tablet, desktop)
6. ✅ Professional UI inspired by Nawy.com
7. ✅ RESTful API with pagination
8. ✅ Docker deployment ready

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
