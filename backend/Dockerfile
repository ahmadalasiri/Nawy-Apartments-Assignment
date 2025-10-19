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

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (includes ts-node for seeding)
RUN npm ci

# Copy built application from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/drizzle ./drizzle
COPY --from=builder /app/drizzle.config.ts ./drizzle.config.ts
COPY --from=builder /app/node_modules/.bin ./node_modules/.bin

# Copy seed source files for seeding (ts-node will compile on-the-fly)
COPY --from=builder /app/src/db ./src/db
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Expose port
EXPOSE 3001

# Start application (run migrations, seed if needed, then start)
CMD ["sh", "-c", "npm run db:migrate || echo 'Migrations skipped' && npm run db:seed || echo 'Seeding skipped' && npm run start:prod"]

