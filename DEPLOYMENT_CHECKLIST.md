# ✅ Deployment Checklist

Use this checklist to ensure everything is set up correctly before deployment.

## Pre-Deployment Checklist

### 1. Environment Setup

- [ ] `.env` file created from `example.env`
- [ ] Database credentials configured
- [ ] API URL configured correctly
- [ ] Ports are available (3000, 3001, 5432)

### 2. Docker Requirements

- [ ] Docker installed and running
- [ ] Docker Compose installed
- [ ] Sufficient disk space (at least 2GB free)
- [ ] No port conflicts

### 3. Code Quality

- [ ] All TypeScript files compile without errors
- [ ] No critical linting issues
- [ ] Environment variables match across services

---

## Docker Deployment Steps

### Step 1: Initial Setup

```bash
# Navigate to project root
cd nawy-apartment-listing

# Copy environment file
cp example.env .env

# Verify .env file
cat .env
```

**Status**: [ ]

### Step 2: Build and Start Services

```bash
# Start all services
docker-compose up -d

# Verify all containers are running
docker-compose ps
```

**Expected**: All services show "Up" status  
**Status**: [ ]

### Step 3: Check Health

```bash
# Wait 30 seconds for services to initialize
sleep 30

# Check backend health
curl http://localhost:3001/api/v1/health

# Check if database is accessible
docker-compose exec postgres pg_isready -U postgres
```

**Expected**: Health check returns 200, DB is ready  
**Status**: [ ]

### Step 4: Seed Database

```bash
# Seed the database with sample data
docker-compose exec backend npm run db:seed
```

**Expected**: "Successfully seeded 25 apartments!"  
**Status**: [ ]

### Step 5: Verify Frontend

```bash
# Check frontend is accessible
curl http://localhost:3000
```

**Expected**: HTML response (Next.js page)  
**Status**: [ ]

### Step 6: Verify API

```bash
# Test apartments endpoint
curl http://localhost:3001/api/v1/apartments | json_pp

# Test projects endpoint
curl http://localhost:3001/api/v1/apartments/projects
```

**Expected**: JSON response with apartments and projects  
**Status**: [ ]

---

## Local Development Deployment Steps

### Step 1: Database Setup

```bash
# Ensure PostgreSQL is running
psql -U postgres -c "CREATE DATABASE nawy_apartments;"
```

**Status**: [ ]

### Step 2: Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Push schema to database
npm run db:push

# Seed database
npm run db:seed

# Start development server
npm run start:dev
```

**Expected**: Server running on port 3001  
**Status**: [ ]

### Step 3: Frontend Setup (New Terminal)

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Expected**: Server running on port 3000  
**Status**: [ ]

### Step 4: Verify

```bash
# Test backend
curl http://localhost:3001/api/v1/health

# Open frontend in browser
open http://localhost:3000
```

**Status**: [ ]

---

## Smoke Tests

### Test 1: Homepage Loads

- [ ] Navigate to http://localhost:3000
- [ ] Page loads without errors
- [ ] Apartments are displayed
- [ ] Search bar is visible
- [ ] Filters are visible

### Test 2: Search Functionality

- [ ] Type "luxury" in search bar
- [ ] Results update after 500ms
- [ ] Relevant apartments are shown
- [ ] Clear search works

### Test 3: Filter Functionality

- [ ] Select "O West" from project dropdown
- [ ] Results update immediately
- [ ] Only O West apartments shown
- [ ] Clear filters works

### Test 4: Pagination

- [ ] Navigate to page 2
- [ ] URL updates with ?page=2
- [ ] Different apartments shown
- [ ] Page numbers work correctly

### Test 5: Apartment Details

- [ ] Click any apartment card
- [ ] Details page loads
- [ ] All information displayed
- [ ] Images load correctly
- [ ] Back button works

### Test 6: Responsive Design

- [ ] Resize browser to mobile width
- [ ] Layout adapts correctly
- [ ] All features work on mobile
- [ ] Navigation is accessible

---

## Performance Checks

### Backend Performance

```bash
# Check response time
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:3001/api/v1/apartments
```

**Expected**: Response time < 200ms  
**Status**: [ ]

### Database Performance

```bash
# Check database queries
docker-compose exec backend npm run db:studio
```

**Status**: [ ]

---

## Troubleshooting

### Issue: Containers won't start

**Solution**:

```bash
docker-compose down -v
docker-compose up -d --build
```

### Issue: Port already in use

**Solution**: Change ports in `.env` file

### Issue: Database connection error

**Solution**: Verify DATABASE_URL in `.env`

### Issue: Frontend can't reach backend

**Solution**: Check NEXT_PUBLIC_API_URL in `.env`

### Issue: Seed fails

**Solution**:

```bash
docker-compose exec backend npm run db:push
docker-compose exec backend npm run db:seed
```

---

## Post-Deployment Verification

### All Systems Check

- [ ] Postgres container running and healthy
- [ ] Backend container running and healthy
- [ ] Frontend container running
- [ ] Database has 25 apartments
- [ ] All API endpoints responding
- [ ] Frontend loads and displays data
- [ ] Search and filters work
- [ ] Pagination works
- [ ] Details pages work
- [ ] No console errors
- [ ] No 404 errors in network tab

---

## Logs Verification

### Check Logs

```bash
# View all logs
docker-compose logs

# View backend logs
docker-compose logs backend

# View frontend logs
docker-compose logs frontend

# Follow logs in real-time
docker-compose logs -f
```

### Expected Log Messages

- Backend: "🚀 Application running on: http://localhost:3001/api/v1"
- Seed: "✅ Successfully seeded 25 apartments!"
- No error messages
- No connection refused errors

**Status**: [ ]

---

## Final Checklist

- [ ] All services running
- [ ] Database seeded
- [ ] Frontend accessible at http://localhost:3000
- [ ] Backend accessible at http://localhost:3001
- [ ] All smoke tests passed
- [ ] No errors in logs
- [ ] Performance acceptable
- [ ] Documentation reviewed

---

## Success Criteria

✅ **Deployment is successful when:**

1. You can access http://localhost:3000
2. Apartments are displayed in a grid
3. Search and filters work correctly
4. You can view apartment details
5. Pagination works
6. No errors in browser console
7. API responds within 200ms

---

## Clean Up (When Done)

```bash
# Stop all services
docker-compose down

# Remove all data (optional)
docker-compose down -v

# Remove images (optional)
docker system prune -a
```

---

**Need Help?**  
See [README.md](./README.md) or [QUICKSTART.md](./QUICKSTART.md) for detailed instructions.
