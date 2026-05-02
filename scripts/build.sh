#!/bin/bash
set -e

echo "🔨 Building Quynguyen Application"

echo "📦 Installing root dependencies..."
yarn install --frozen-lockfile

echo "🎨 Building frontend..."
yarn build

echo "✅ Build complete!"
echo ""
echo "To start the server:"
echo "  export DATABASE_URL='mongodb+srv://...'"
echo "  export JWT_SECRET='your-secret-key'"
echo "  yarn start"
echo ""
echo "Or use docker:"
echo "  docker build -t myapp ."
echo "  docker run -p 3000:3000 -e DATABASE_URL='...' -e JWT_SECRET='...' myapp"
