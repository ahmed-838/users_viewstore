#!/bin/bash

echo "Stopping PM2 process: user-interface..."
pm2 stop user-interface || { echo "Failed to stop PM2 process"; exit 1; }

echo "Pulling latest changes from GitHub..."
git fetch --all || { echo "Failed to fetch changes"; exit 1; }
git reset --hard origin/main || { echo "Failed to reset to latest changes"; exit 1; }

if [ -d "node_modules" ]; then
    echo "Deleting node_modules..."
    rm -rf node_modules || { echo "Failed to delete node_modules"; exit 1; }
fi

echo "Installing dependencies..."
npm ci || { echo "Failed to install dependencies"; exit 1; }

if [ -d "dist" ]; then
    echo "Deleting dist folder..."
    rm -rf dist || { echo "Failed to delete dist folder"; exit 1; }
fi

echo "Running npm run build..."
npm run build || { echo "Failed to build project"; exit 1; }

echo "Restarting PM2 process: user-interface..."
pm2 reload user-interface || { echo "Failed to reload PM2 process"; exit 1; }

echo "Deployment completed successfully!"
