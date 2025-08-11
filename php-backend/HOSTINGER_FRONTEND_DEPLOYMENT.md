# Hostinger Frontend Deployment Guide

This guide explains how to build and deploy the frontend React application on Hostinger hosting.

## Prerequisites

1. Node.js installed on your local machine (v14 or higher)
2. Access to Hostinger hPanel
3. FTP client or Hostinger File Manager access

## Building the Frontend

### 1. Install Dependencies

From the `frontend/` directory, run:

```bash
npm install
```

This will install all required dependencies listed in `package.json`.

### 2. Build for Production

Run the build command:

```bash
npm run build
```

This will:

- Create an optimized production build
- Generate all necessary files in the `frontend/dist/` directory
- Bundle JavaScript, CSS, and other assets
- Minify code for better performance

### 3. Verify Build Output

After building, check the `frontend/dist/` directory which should contain:

- `index.html` (main HTML file)
- `assets/` directory with bundled JavaScript and CSS files
- Other static assets

## Uploading Frontend Files to Hostinger

### Option 1: Using Hostinger File Manager

1. Log in to your Hostinger hPanel
2. Go to "File Manager"
3. Navigate to your `public_html` directory
4. Upload all contents from `frontend/dist/` to `public_html/`
   - You can zip the contents of `dist/` first and upload the zip file
   - Then extract it in the File Manager

### Option 2: Using FTP Client

1. Use an FTP client like FileZilla
2. Connect to your Hostinger account:
   - Host: Your Hostinger server address
   - Username: Your Hostinger username
   - Password: Your Hostinger password
   - Port: 21 (FTP) or 22 (SFTP if enabled)
3. Upload all contents from `frontend/dist/` to your `public_html/` directory

## File Structure After Upload

Your `public_html/` directory should contain:

```
public_html/
├── index.html
├── assets/
│   ├── index-*.js
│   ├── index-*.css
│   └── ...
├── favicon.ico
└── ... (other static assets)
```

And your PHP backend files:

```
public_html/
├── api.php
├── .htaccess
├── config/
│   └── database.php
├── controllers/
│   └── BettingSlipController.php
├── models/
│   └── BettingSlip.php
├── database/
│   └── hostinger-schema.sql
├── test.php
└── hostinger-test.php
```

## Configuration

The frontend is already configured to work with the PHP backend:

- API calls use relative URLs (`/api.php?path=betting-slips`)
- No additional configuration is needed
- All API endpoints will work correctly with the PHP backend

## Testing the Deployment

1. Visit your domain in a web browser
2. The frontend should load correctly
3. Test saving and loading betting slips
4. Check that all features work as expected

## Troubleshooting

### Common Issues

1. **Blank page or files not found**:

   - Ensure all files from `dist/` were uploaded
   - Check that `index.html` is in the root of `public_html/`
   - Verify file permissions (644 for files, 755 for directories)

2. **API calls not working**:

   - Ensure PHP backend files are uploaded
   - Check that `.htaccess` is in the same directory as `api.php`
   - Verify database credentials in `config/database.php`

3. **Slow loading**:

   - Hostinger shared hosting may have resource limitations
   - The application should still function correctly

4. **File permission errors**:
   - Hostinger typically requires:
     - Files: 644 permission
     - Directories: 755 permission
   - Set these permissions through File Manager or FTP client

### Updating the Frontend

To update the frontend after making changes:

1. Rebuild the frontend:

   ```bash
   npm run build
   ```

2. Upload the new contents of `frontend/dist/` to `public_html/`
3. Overwrite existing files
