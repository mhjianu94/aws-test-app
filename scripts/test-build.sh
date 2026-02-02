#!/bin/bash

# Local build test script - mimics Amplify build process
set -e

echo "🚀 Starting local build test..."
echo ""

# Test Backend Build
echo "📦 Testing Backend Build..."
echo "  → Installing amplify dependencies..."
cd amplify && npm install && cd ..
echo "  ✅ Backend dependencies installed"
echo "  → Testing ampx command (dry run)..."
if command -v npx &> /dev/null; then
  echo "  → npx is available"
  if [ -f "./amplify/node_modules/.bin/ampx" ]; then
    echo "  ✅ ampx binary found"
    echo "  → Would run: npx ampx pipeline-deploy (skipping in local test)"
  else
    echo "  ⚠️  ampx binary not found in amplify/node_modules/.bin/"
    echo "  → Checking if @aws-amplify/backend-cli is installed..."
    if [ -d "./amplify/node_modules/@aws-amplify/backend-cli" ]; then
      echo "  ✅ @aws-amplify/backend-cli is installed"
    else
      echo "  ❌ @aws-amplify/backend-cli not found"
    fi
  fi
else
  echo "  ❌ npx not available"
fi
echo ""

# Test Frontend Build
echo "🌐 Testing Frontend Build..."
echo "  → Installing web-app dependencies..."
cd web-app && npm install && cd ..
echo "  ✅ Frontend dependencies installed"
echo "  → Building frontend..."
cd web-app && npm run build && cd ..
echo "  ✅ Frontend build complete"
echo ""

# Check build output
echo "📋 Checking build outputs..."
if [ -d "web-app/out" ]; then
  echo "  ✅ web-app/out directory exists"
  FILE_COUNT=$(find web-app/out -type f | wc -l)
  echo "  → Found $FILE_COUNT files in build output"
  if [ -f "web-app/out/index.html" ]; then
    echo "  ✅ index.html found (required for Amplify deployment)"
  else
    echo "  ⚠️  index.html not found in web-app/out/"
  fi
else
  echo "  ❌ web-app/out directory not found"
fi
echo ""

echo "✨ Local build test complete!"
echo ""
echo "Summary:"
echo "  - Backend: Dependencies installed"
echo "  - Frontend: Built successfully"
echo "  - Output: Check web-app/out/ directory"

