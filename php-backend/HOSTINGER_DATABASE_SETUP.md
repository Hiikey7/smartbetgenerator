# Hostinger Database Setup for PHP Backend

This guide explains how to set up the database for the PHP backend on Hostinger.

## Database Schema

For Hostinger deployment, use the schema file specifically designed for Hostinger hosting: `php-backend/database/hostinger-schema.sql`:

```sql
CREATE TABLE IF NOT EXISTS betting_slips (
    id INT AUTO_INCREMENT PRIMARY KEY,
    matches JSON NOT NULL,
    paripesa_code VARCHAR(255) NOT NULL,
    afropari_code VARCHAR(255) NOT NULL,
    secret_bet_code VARCHAR(255) NOT NULL,
    total_odds DECIMAL(10, 2) NOT NULL,
    date DATE,
    name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Enable event scheduler (may not work on all Hostinger plans)
-- SET GLOBAL event_scheduler = ON;
-- Note: This command is commented out because Hostinger users typically
-- don't have the SUPER privilege required to execute it.
-- If you need this functionality, you can enable it through
-- Hostinger's control panel or contact their support.

-- Create a scheduled event to delete slips older than 30 days
-- CREATE EVENT IF NOT EXISTS delete_old_betting_slips
-- ON SCHEDULE EVERY 1 DAY
-- STARTS CURRENT_TIMESTAMP
-- DO
--   DELETE FROM betting_slips
--   WHERE created_at < DATE_SUB(NOW(), INTERVAL 30 DAY);
-- Note: The event creation is also commented out due to privilege restrictions.
-- You can create this event manually through phpMyAdmin if your account has the privilege,
-- or contact Hostinger support for assistance.
```

Note: This schema file is different from the Node.js version because Hostinger database users typically don't have privileges to:

1. Create databases directly through SQL (must be created through hPanel)
2. Set global variables (require SUPER privilege)
3. Create events (may require additional privileges)

## Hostinger Database Setup Steps

1. **Create Database**:

   - Log in to your Hostinger hPanel
   - Go to "Databases" → "MySQL Databases"
   - Click "Create Database"
   - Note the database name, username, and password
   - **Important**: On Hostinger, the database must be created through the control panel, not through SQL commands

2. **Import Schema**:

   - In hPanel, go to "Databases" → "phpMyAdmin"
   - Select your newly created database
   - Click the "Import" tab
   - Upload and execute the SQL file from `php-backend/database/hostinger-schema.sql`
   - **Do not use** the `backend/database/schema.sql` file as it contains database creation commands that will fail on Hostinger

3. **Update Configuration**:
   - Edit `php-backend/config/database.php` with your Hostinger database credentials
   - The file automatically detects Hostinger hosting and uses the appropriate configuration
   - **Important**: You must update the placeholder values with your actual Hostinger database credentials

## Hostinger-Specific Considerations

1. **Database Creation Limitation**:

   - Hostinger database users typically don't have privileges to create databases through SQL
   - Always create the database first through the Hostinger hPanel
   - Then import only the table schema, not the database creation commands

2. **Event Scheduler**:

   - Some Hostinger plans may not allow setting GLOBAL variables
   - The `SET GLOBAL event_scheduler = ON;` command is commented out in the schema file due to privilege restrictions
   - The cleanup event is not critical for the application to function
   - If you need automatic cleanup, contact Hostinger support for assistance

3. **JSON Column Support**:

   - The `matches` column uses JSON data type
   - This requires MySQL 5.7 or higher
   - Most Hostinger plans support this, but you can verify in phpMyAdmin

4. **Character Set**:
   - The schema uses `utf8mb4` character set
   - This is supported by Hostinger and allows full Unicode support

## Testing Database Connection

After setting up the database, you can test the connection by:

1. Uploading the `php-backend/test.php` file to your Hostinger account
2. Visiting the file in your browser
3. You should see connection success messages

If you encounter any database connection errors, verify:

- Database credentials in `config/database.php` have been updated with your actual Hostinger database information
- Database exists and is accessible
- User has proper permissions to the database
