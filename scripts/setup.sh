#!/bin/bash

echo "🔧 Setting up development environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
  echo "❌ Node.js is not installed. Please install Node.js 18+"
  exit 1
fi

echo "✓ Node.js $(node --version) found"

# Check if Yarn is installed
if ! command -v yarn &> /dev/null; then
  echo "❌ Yarn is not installed. Installing yarn..."
  npm install -g yarn
fi

echo "✓ Yarn $(yarn --version) found"

# Install dependencies
echo "📦 Installing dependencies..."
yarn install

# Setup environment file
if [ ! -f "backend-express/.env" ]; then
  echo "⚙️  Creating .env file from template..."
  cp backend-express/.env.example backend-express/.env
  echo "⚠️  Please edit backend-express/.env with your configuration"
fi

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Configure backend-express/.env"
echo "2. Run 'yarn dev:frontend' in one terminal"
echo "3. Run 'yarn dev:backend' in another terminal"
echo ""
echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:3000"
