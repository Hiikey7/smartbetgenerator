#!/bin/bash

# Start backend server
pm2 start backend/server.js --name smartbets-backend

# Serve frontend build
pm2 start http-server --name smartbets-frontend -- -p 8080 -d false frontend/dist

# Save PM2 processes
pm2 save

echo "Application started successfully!"