#!/bin/bash
# Fasting Tracker — Project Bootstrap Script

set -e

echo "=== Fasting Tracker — Init ==="

# Install dependencies
echo "Installing dependencies..."
npm install

# Verify build
echo "Building project..."
npm run build

# Start dev server
echo "Starting dev server..."
npm run dev &

echo "=== Init complete. Dev server running at http://localhost:3000 ==="
