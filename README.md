# SmartBets Betting Slip Generator

A React application for generating and managing betting slips with MySQL database integration.

## Project Structure

This project is organized into two main directories:

- `frontend/` - Contains all frontend code (React application)
- `backend/` - Contains all backend code (Node.js/Express server)
- `php-backend/` - Contains alternative PHP backend implementation

## Features

- Create betting slips with up to 10 matches
- Save betting slips to MySQL database (now with one-click saving)
- Load previously saved betting slips for editing
- Download betting slips as images
- Track match status (won, lost, cancelled) for saved slips
- Edit match status directly from the saved slips page
- Responsive design for mobile and desktop

## Prerequisites

- Node.js (v14 or higher) OR PHP (v7.4 or higher)
- MySQL server (v5.7 or higher)
- npm or yarn

## Setup Options

### Option 1: Node.js/Express Backend (Default)

#### 1. Database Setup

1. Ensure MySQL server is installed and running on your system

   - On Windows: Download MySQL Community Server from the official website
   - On macOS: Use Homebrew (`brew install mysql`) or download from the official website
   - On Linux: Use your package manager (e.g., `sudo apt install mysql-server` for Ubuntu/Debian)

2. Start the MySQL service if it's not already running

   - On Windows: `net start mysql` or start from Services
   - On macOS: `brew services start mysql` or `sudo /usr/local/mysql/support-files/mysql.server start`
   - On Linux: `sudo systemctl start mysql` or `sudo service mysql start`

3. Create a MySQL database named `smartbets`

   ```sql
   CREATE DATABASE smartbets;
   ```

4. Create a MySQL user (or use the default root user) and grant privileges

   ```sql
   CREATE USER 'smartbets_user'@'localhost' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON smartbets.* TO 'smartbets_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

#### 2. Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Update the `.env` file with your MySQL credentials:

   ```env
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=smartbets
   PORT=3001
   ```

4. Test the database connection:

   ```bash
   npm run test:db
   ```

5. Initialize the database schema:

   ```bash
   npm run init:db
   ```

6. Start the server:

   ```bash
   npm start
   ```

#### 3. Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Option 2: PHP/MySQL Backend

#### 1. Database Setup

1. Ensure MySQL server is installed and running on your system

2. Create a MySQL database named `smartbets` (same as above)

3. Create a MySQL user and grant privileges (same as above)

#### 2. PHP Backend Setup

1. Place the contents of the `php-backend/` directory in your web server's document root or a subdirectory

2. Update the database configuration in `php-backend/config/database.php` with your MySQL credentials

3. Ensure your web server has PHP and MySQL support with URL rewriting enabled

#### 3. Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Running Both Frontend and Backend

### For Node.js Backend

To run both the frontend and backend simultaneously:

1. Start the backend server:

   ```bash
   cd backend
   npm start
   ```

2. In a separate terminal, start the frontend:

   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser to http://localhost:5173 to access the application

### For PHP Backend

1. Ensure your PHP backend is accessible through your web server

2. Start the frontend:

   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser to http://localhost:5173 to access the application

## Usage

1. Open the application in your browser (typically http://localhost:5173)
2. Create a betting slip by adding matches
3. Use the "Save Slip" button to save your betting slip (no naming required)
4. Navigate to the "Saved Slips" page to view your saved betting slips
5. Edit match status directly from the saved slips page using the status buttons
6. Use the "Download Image" button to save your betting slip as an image

## Creating a Sample Slip

To create a sample betting slip for testing purposes:

1. Make sure the backend dependencies are installed:

   ```bash
   cd backend
   npm install
   ```

2. Initialize the database schema:

   ```bash
   npm run init:db
   ```

3. Make sure the backend server is running
4. In a new terminal, run:
   ```bash
   npm run create-sample
   ```

This will create a sample betting slip with three matches and different statuses (won, lost, cancelled) that you can view in the "Saved Slips" section of the application.

## Hosting on Hostinger

### Project Structure for Hostinger

Your project is already well-structured for deployment, but we've added some additional files and configurations that will make it easier to deploy on Hostinger:

### 1. Deployment Script

We've created a `deploy.sh` file in the root directory that automates the deployment process.

### 2. Startup Script

We've created a `start.sh` file in the root directory that starts the application with PM2.

### 3. Hostinger Environment Files

We've created environment files for both backend and frontend with Hostinger-specific configurations:

- `backend/.env.hostinger`
- `frontend/.env.hostinger`

### 4. PM2 Ecosystem Configuration

We've created an `ecosystem.config.js` file for PM2 process management.

### 5. Nginx Configuration

We've created an `nginx.conf` file for setting up Nginx as a reverse proxy.

### Hosting on Hostinger - Step-by-Step Guide

#### Prerequisites:

1. Hostinger VPS hosting plan
2. SSH access to your VPS
3. MySQL database access

#### Deployment Steps:

1. **Connect to your VPS via SSH:**

   ```bash
   ssh username@your-vps-ip
   ```

2. **Install Git if not already installed:**

   ```bash
   sudo apt update
   sudo apt install git
   ```

3. **Clone your repository:**

   ```bash
   git clone https://github.com/your-username/smartbetgenerator.git
   cd smartbetgenerator
   ```

4. **Set up environment variables:**

   ```bash
   cp backend/.env.hostinger backend/.env
   cp frontend/.env.hostinger frontend/.env
   ```

5. **Update the .env files with your actual Hostinger database credentials**

6. **Install dependencies and build:**

   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install

   # Build frontend
   npm run build
   ```

7. **Initialize the database:**

   ```bash
   cd ../backend
   npm run hostinger:db:init
   ```

8. **Start the application:**

   ```bash
   # Start backend
   node server.js &

   # Serve frontend (install serve first)
   npm install -g serve
   serve -s ../frontend/dist -l 8080
   ```

### Using PM2 for Process Management (Recommended)

1. **Install PM2:**

   ```bash
   sudo npm install -g pm2
   ```

2. **Start the application with PM2:**
   ```bash
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

### Setting Up Domain and SSL

1. **Point your domain to your VPS IP address**

2. **Install and configure Nginx as a reverse proxy:**

   ```bash
   sudo apt install nginx
   ```

3. **Copy the Nginx configuration:**

   ```bash
   sudo cp nginx.conf /etc/nginx/sites-available/smartbets
   ```

4. **Enable the site:**

   ```bash
   sudo ln -s /etc/nginx/sites-available/smartbets /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

5. **Install SSL certificate with Let's Encrypt:**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

With these configurations, your application will be ready for deployment on Hostinger VPS hosting. The backend will run on port 3001, and the frontend will be served on port 8080, with Nginx proxying requests appropriately.

## Troubleshooting

### Common Issues and Solutions

1. **"Failed to fetch" errors**: This usually means the backend server is not running. Make sure to:

   - Start MySQL server on your system
   - Run `npm start` in the `backend` directory (for Node.js) or ensure PHP backend is accessible (for PHP)
   - Check that the server is running on port 3001 (Node.js) or accessible through web server (PHP)

2. **Database connection errors**:

   - Verify MySQL is installed and running
   - Check that the database credentials in `backend/.env` (Node.js) or `php-backend/config/database.php` (PHP) are correct
   - Ensure the `smartbets` database exists
   - Run `npm run test:db` to test the database connection (Node.js only)

3. **"EADDRINUSE" error when starting the server**:

   - Another process is already using port 3001
   - Change the PORT in `backend/.env` to a different port (e.g., 3002)
   - Or stop the process using port 3001:
     - On Windows: `netstat -ano | findstr :3001` then `taskkill /PID <PID> /F`
     - On macOS/Linux: `lsof -i :3001` then `kill -9 <PID>`

4. **Frontend not connecting to backend**:

   - Ensure both frontend and backend are running
   - Check that the API calls in `frontend/components/SaveLoadSlips.tsx` and `frontend/pages/SavedSlips.tsx` point to the correct backend URL (configured via `VITE_API_BASE_URL` environment variable, defaulting to `http://localhost:3001` for Node.js or appropriate URL for PHP)
   - Check browser console for CORS errors (should be handled by the backend)

5. **Empty saved slips page**:
   - This is normal when no slips have been saved yet
   - Create and save a betting slip first

## API Endpoints

### Node.js Backend

- `GET /api/betting-slips` - Get all betting slips
- `POST /api/betting-slips` - Save a new betting slip
- `GET /api/betting-slips/:id` - Get a specific betting slip
- `PUT /api/betting-slips/:id` - Update a betting slip
- `DELETE /api/betting-slips/:id` - Delete a betting slip

### PHP Backend

All endpoints are accessed through `api.php` with a `path` parameter:

- `GET /api.php?path=betting-slips` - Get all betting slips
- `POST /api.php?path=betting-slips` - Save a new betting slip
- `GET /api.php?path=betting-slips/{id}` - Get a specific betting slip by ID
- `PUT /api.php?path=betting-slips/{id}` - Update a betting slip
- `DELETE /api.php?path=betting-slips/{id}` - Delete a betting slip
- `GET /api.php?path=betting-slips/analytics` - Get analytics data
- `GET /api.php?path=health` - Health check endpoint

## Testing

- `npm run test:db` - Test database connection (Node.js only)
- `npm run test:api` - Test all API endpoints (Node.js only)
- `npm run init:db` - Initialize database schema (Node.js only)

## Technologies Used

- React with TypeScript
- Vite for build tooling
- MySQL for database
- Express.js for Node.js backend OR PHP for PHP backend
- Tailwind CSS for styling
- shadcn/ui components
