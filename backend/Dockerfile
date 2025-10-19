# Backend Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Compile seed script separately (NestJS might not include standalone scripts)
RUN npx tsc src/db/seed.ts --outDir dist --module commonjs --esModuleInterop

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies
RUN npm ci

# Copy built application from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/drizzle ./drizzle
COPY --from=builder /app/drizzle.config.ts ./drizzle.config.ts
COPY --from=builder /app/node_modules/.bin ./node_modules/.bin

# Expose port
EXPOSE 3001

# Start application (run migrations, seed if needed, then start)
CMD ["sh", "-c", "npm run db:migrate || echo 'Migrations skipped' && npm run db:seed:prod || echo 'Seeding skipped' && npm run start:prod"]

