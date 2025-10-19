#!/bin/sh
set -e

echo "🚀 Starting backend application..."

# Run database migrations
echo "📦 Running database migrations..."
npm run db:migrate

# Check if database has data
echo "🔍 Checking if database needs seeding..."

# Use Node.js to check if apartments table has data
node -e "
const { drizzle } = require('drizzle-orm/postgres-js');
const postgres = require('postgres');
const { apartments } = require('./dist/db/schema.js');

async function checkAndSeed() {
  const client = postgres(process.env.DATABASE_URL);
  const db = drizzle(client);
  
  try {
    const result = await db.select().from(apartments).limit(1);
    
    if (result.length === 0) {
      console.log('📊 Database is empty. Running seed with 50 apartments...');
      await client.end();
      
      // Run seed script
      const { execSync } = require('child_process');
      execSync('npm run db:seed', { stdio: 'inherit' });
      
      console.log('✅ Database seeded successfully!');
    } else {
      console.log('✅ Database already contains data. Skipping seed.');
      await client.end();
    }
  } catch (error) {
    console.error('❌ Error checking database:', error.message);
    await client.end();
    process.exit(1);
  }
}

checkAndSeed();
"

# Start the application
echo "🎯 Starting NestJS application..."
npm run start:prod

