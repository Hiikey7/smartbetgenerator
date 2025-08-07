# SmartBets Betting Slip Generator

A React application for generating and managing betting slips with MySQL database integration.

## Features

- Create betting slips with up to 10 matches
- Save betting slips to MySQL database (now with one-click saving)
- Load previously saved betting slips for editing
- Download betting slips as images
- Track match status (won, lost, cancelled) for saved slips
- Edit match status directly from the saved slips page
- Responsive design for mobile and desktop

## Prerequisites

- Node.js (v14 or higher)
- MySQL server (v5.7 or higher)
- npm or yarn

## Setup

### 1. Database Setup

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

5. Update the `.env` file in the `server` directory with your MySQL credentials:
   ```env
   DB_HOST=localhost
   DB_USER=smartbets_user  # or root
   DB_PASSWORD=your_password  # or empty if using root without password
   DB_NAME=smartbets
   PORT=3001
   ```

### 2. Backend Setup

1. Navigate to the server directory:

   ```bash
   cd server
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

### 3. Frontend Setup

1. From the root directory, install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## Running Both Frontend and Backend

To run both the frontend and backend simultaneously:

1. Start the backend server:

   ```bash
   cd server
   npm start
   ```

2. In a separate terminal, start the frontend:

   ```bash
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
   cd server
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

## Troubleshooting

### Common Issues and Solutions

1. **"Failed to fetch" errors**: This usually means the backend server is not running. Make sure to:

   - Start MySQL server on your system
   - Run `npm start` in the `server` directory
   - Check that the server is running on port 3001

2. **Database connection errors**:

   - Verify MySQL is installed and running
   - Check that the database credentials in `server/.env` are correct
   - Ensure the `smartbets` database exists
   - Run `npm run test:db` to test the database connection

3. **"EADDRINUSE" error when starting the server**:

   - Another process is already using port 3001
   - Change the PORT in `server/.env` to a different port (e.g., 3002)
   - Or stop the process using port 3001:
     - On Windows: `netstat -ano | findstr :3001` then `taskkill /PID <PID> /F`
     - On macOS/Linux: `lsof -i :3001` then `kill -9 <PID>`

4. **Frontend not connecting to backend**:

   - Ensure both frontend and backend are running
   - Check that the API calls in `src/components/SaveLoadSlips.tsx` and `src/pages/SavedSlips.tsx` point to the correct backend URL (configured via `VITE_API_BASE_URL` environment variable, defaulting to `http://localhost:3001`)
   - Check browser console for CORS errors (should be handled by the backend)

5. **Empty saved slips page**:
   - This is normal when no slips have been saved yet
   - Create and save a betting slip first

## API Endpoints

- `GET /api/betting-slips` - Get all betting slips
- `POST /api/betting-slips` - Save a new betting slip
- `GET /api/betting-slips/:id` - Get a specific betting slip
- `PUT /api/betting-slips/:id` - Update a betting slip
- `DELETE /api/betting-slips/:id` - Delete a betting slip

## Testing

- `npm run test:db` - Test database connection
- `npm run test:api` - Test all API endpoints
- `npm run init:db` - Initialize database schema

## Project Structure

```
smartbetgenerator/
├── server/                 # Backend server
│   ├── config/             # Database configuration
│   ├── controllers/        # API controllers
│   ├── database/           # Database schema
│   ├── models/             # Data models
│   ├── routes/             # API routes
│   ├── .env                # Environment variables
│   └── server.js           # Server entry point
├── src/                    # Frontend source
│   ├── components/         # React components
│   ├── types/              # TypeScript types
│   └── pages/              # Page components
└── public/                 # Static assets
```

## Technologies Used

- React with TypeScript
- Vite for build tooling
- MySQL for database
- Express.js for backend
- Tailwind CSS for styling
- shadcn/ui components

## Deployment

### Frontend Deployment (Vercel)

1. Push all changes to GitHub
2. Create a new project on Vercel
3. Connect your GitHub repository
4. Vercel will automatically detect the Vite project and configure the build settings
5. Set the build command to `npm run build`
6. Set the output directory to `dist`
7. Deploy the project

### Backend Deployment (Heroku/Railway)

1. Create a separate repository for the backend or use a subdirectory
2. Deploy the backend to a service that supports Node.js servers:
   - For Heroku:
     - Create a new app on Heroku
     - Connect your GitHub repository or use the Heroku CLI
     - Set the environment variables in the Heroku dashboard:
       - DB_HOST
       - DB_USER
       - DB_PASSWORD
       - DB_NAME
       - PORT (Heroku will set this automatically)
     - Add a Procfile with the content: `web: node server.js`
   - For Railway:
     - Create a new project on Railway
     - Connect your GitHub repository
     - Railway will automatically detect the Node.js project
     - Set the environment variables in the Railway dashboard:
       - DB_HOST
       - DB_USER
       - DB_PASSWORD
       - DB_NAME
       - PORT (Railway will set this automatically)
3. Update the frontend environment variable `VITE_API_BASE_URL` to point to your deployed backend URL
