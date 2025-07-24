#!/bin/bash

echo "🛠️ Running /terminal-setup for Cypress Automation Project..."

# Step 1: Check for Node.js and npm
if ! command -v node &> /dev/null
then
  echo "❌ Node.js is not installed. Please install it before continuing."
  exit 1
fi

if ! command -v npm &> /dev/null
then
  echo "❌ npm is not installed. Please install it before continuing."
  exit 1
fi

# Step 2: Install dependencies
echo "📦 Installing project dependencies using npm..."
npm install

# Step 3: Set default Cypress base URL (customize as needed)
export CYPRESS_BASE_URL="https://example.com"
echo "🌐 Set CYPRESS_BASE_URL=$CYPRESS_BASE_URL"

# Step 4: Open Cypress Test Runner
echo "🚀 Launching Cypress Test Runner..."
npx cypress open

# Done
echo "✅ Terminal setup complete."
