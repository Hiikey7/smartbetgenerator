# Hostinger Deployment Guide for PHP Backend

This guide explains how to deploy the PHP backend on Hostinger hosting.

## Prerequisites

1. Hostinger web hosting account (not VPS)
2. Access to Hostinger hPanel
3. MySQL database access

## Deployment Steps

### 1. Upload PHP Files

1. Connect to your Hostinger account via FTP or File Manager in hPanel
2. Upload all files from the `php-backend/` directory to your `public_html` folder or a subdirectory
3. Ensure the following files are uploaded:
   - `api.php` (main entry point)
   - `.htaccess` (URL rewriting rules)
   - `config/database.php` (database configuration)
   - `controllers/BettingSlipController.php`
   - `models/BettingSlip.php`

### 2. Database Setup

1. Create a MySQL database:

   - In hPanel, go to "Databases" → "MySQL Databases"
   - Click "Create Database"
   - Note the database name, username, and password

2. Import the database schema:

   - In hPanel, go to "Databases" → "phpMyAdmin"
   - Select your newly created database
   - Click the "Import" tab
   - Upload and execute the SQL file from `php-backend/database/hostinger-schema.sql`
   - This creates the `betting_slips` table
   - **Important**: Do not use `backend/database/schema.sql` as it contains database creation commands that will fail on Hostinger

3. Update database configuration:
   - Edit `config/database.php` with your Hostinger database credentials
   - For detailed instructions, see [HOSTINGER_DATABASE_CONFIGURATION.md](HOSTINGER_DATABASE_CONFIGURATION.md)
   - The file automatically detects Hostinger hosting and uses the appropriate configuration

### 3. Verify Deployment

1. Test the health endpoint:

   - Visit `http://yourdomain.com/api.php?path=health`
   - You should see: `{"status":"OK","message":"Server is running"}`

2. Test database connection:
   - Visit `http://yourdomain.com/test.php` (if you uploaded the test file)
   - Or check your Hostinger error logs for database connection errors

### 4. Frontend Deployment

For detailed instructions on building and deploying the frontend, see [HOSTINGER_FRONTEND_DEPLOYMENT.md](HOSTINGER_FRONTEND_DEPLOYMENT.md).

Brief overview:

1. Build the frontend:

   - In your local `frontend/` directory, run:
     ```
     npm install
     npm run build
     ```
   - This creates a `dist/` folder with production files

2. Upload frontend files:
   - Upload the contents of `frontend/dist/` to your `public_html` directory
   - Ensure the frontend can access the PHP backend API

### 5. Configuration

The frontend is already configured to work with the PHP backend. It uses relative URLs that will work on Hostinger:

- API calls go to `/api.php?path=betting-slips`
- No additional configuration is needed

## Troubleshooting

### Common Issues

1. **404 errors for API endpoints**:

   - Ensure `.htaccess` file is uploaded
   - Check that mod_rewrite is enabled (it is by default on Hostinger)
   - Verify file permissions (should be 644 for files, 755 for directories)

2. **Database connection errors**:

   - Verify database credentials in `config/database.php`
   - Check that the database exists and the user has proper permissions
   - Ensure the database schema has been imported from the correct file (`php-backend/database/hostinger-schema.sql`)
   - For detailed database configuration, see [HOSTINGER_DATABASE_CONFIGURATION.md](HOSTINGER_DATABASE_CONFIGURATION.md)

3. **CORS errors**:

   - The PHP backend already includes CORS headers
   - No additional configuration needed

4. **URL rewriting not working**:
   - Ensure `.htaccess` is in the same directory as `api.php`
   - Check that the file contains the correct rewrite rules

### File Permissions

Hostinger typically requires:

- Files: 644 permission
- Directories: 755 permission
- PHP files will work with these default permissions

## Benefits of PHP on Hostinger

1. **No Process Management**: Unlike Node.js, PHP doesn't require PM2 or similar tools
2. **Built-in Scaling**: Hostinger automatically handles PHP process scaling
3. **No Port Configuration**: PHP runs on standard web server ports
4. **Easy Updates**: Simply upload new files to update the application
5. **Lower Resource Usage**: PHP typically uses less memory than Node.js

The PHP backend is optimized for Hostinger's shared hosting environment and will run efficiently without additional configuration.
