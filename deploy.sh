#!/bin/bash

# Update system packages
sudo apt update

# Install Node.js and npm if not already installed
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally for process management
sudo npm install -g pm2

# Navigate to backend directory
cd backend

# Install backend dependencies
npm install

# Navigate to frontend directory
cd ../frontend

# Install frontend dependencies
npm install

# Build the frontend
npm run build

echo "Deployment script completed. You can now start the application with:"
echo "pm2 start backend/server.js --name smartbets-backend"
echo "pm2 start frontend/dist --name smartbets-frontend --spa"