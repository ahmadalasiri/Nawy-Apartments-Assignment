# 🚀 Quick Start Guide

Get the Nawy Apartment Listing App running in **3 simple steps**!

## Docker (Easiest Method)

### Prerequisites

- Docker and Docker Compose installed

### Steps

1. **Clone and Navigate**

   ```bash
   git clone <repository-url>
   cd nawy-apartment-listing
   ```

2. **Setup Environment**

   ```bash
   cp example.env .env
   ```

3. **Start Everything**

   ```bash
   docker-compose up -d
   docker-compose exec backend npm run db:seed
   ```

4. **Access the App**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001/api/v1

**That's it!** 🎉

---

## Local Development (For Developers)

### Prerequisites

- Node.js v20+
- PostgreSQL 14+

### Backend

```bash
cd backend
npm install
npm run db:push
npm run db:seed
npm run start:dev
```

### Frontend (New Terminal)

```bash
cd frontend
npm install
npm run dev
```

### Access

- Frontend: http://localhost:3000
- Backend: http://localhost:3001/api/v1

---

## Troubleshooting

### Docker Issues

**Containers won't start:**

```bash
docker-compose down -v
docker-compose up -d --build
```

**Check logs:**

```bash
docker-compose logs -f
```

### Local Development Issues

**Database connection error:**

- Ensure PostgreSQL is running
- Check DATABASE_URL in .env

**Port already in use:**

- Change BACKEND_PORT and FRONTEND_PORT in .env

**Module not found:**

```bash
# Backend
cd backend && npm install

# Frontend
cd frontend && npm install
```

---

## Next Steps

1. Browse apartments at http://localhost:3000
2. Try search: "luxury" or "A-101"
3. Filter by project, price, bedrooms
4. Click any apartment for details
5. Check API at http://localhost:3001/api/v1/apartments

📖 See [README.md](./README.md) for full documentation.
