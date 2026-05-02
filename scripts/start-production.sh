#!/bin/bash
set -e

echo "🚀 Starting Quynguyen Application Deployment"

# Check required environment variables
if [ -z "$DATABASE_URL" ]; then
  echo "❌ Error: DATABASE_URL environment variable not set"
  exit 1
fi

if [ -z "$JWT_SECRET" ]; then
  echo "❌ Error: JWT_SECRET environment variable not set"
  exit 1
fi

# Set defaults
export NODE_ENV=${NODE_ENV:-production}
export PORT=${PORT:-3000}

echo "✓ Environment variables configured"
echo "  - Node Environment: $NODE_ENV"
echo "  - Server Port: $PORT"

# Verify build exists
if [ ! -d "backend-express/dist" ]; then
  echo "❌ Error: Backend build not found. Run 'yarn build' first"
  exit 1
fi

if [ ! -d "frontend/dist" ]; then
  echo "❌ Error: Frontend build not found. Run 'yarn build' first"
  exit 1
fi

echo "✓ Frontend and backend builds verified"

# Install production dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  yarn install --frozen-lockfile --production=false
fi

echo "✓ Dependencies ready"

# Start the server
echo "✅ Starting server on port $PORT..."
exec yarn start
