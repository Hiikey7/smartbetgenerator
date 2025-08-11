# PHP Backend for SmartBet Generator

This is the PHP/MySQL implementation of the SmartBet Generator backend API.

## File Structure

```
php-backend/
├── config/
│   └── database.php          # Database configuration
├── controllers/
│   └── BettingSlipController.php # API controller
├── models/
│   └── BettingSlip.php       # Betting slip model
├── database/
│   └── hostinger-schema.sql  # Database schema for Hostinger
├── .htaccess                 # URL rewriting rules
├── api.php                   # Main API entry point
└── test.php                  # Test script
```

## API Endpoints

All endpoints are accessed through `api.php` with a `path` parameter:

- `GET /api.php?path=betting-slips` - Get all betting slips
- `POST /api.php?path=betting-slips` - Save a new betting slip
- `GET /api.php?path=betting-slips/{id}` - Get a specific betting slip by ID
- `PUT /api.php?path=betting-slips/{id}` - Update a betting slip
- `DELETE /api.php?path=betting-slips/{id}` - Delete a betting slip
- `GET /api.php?path=betting-slips/analytics` - Get analytics data
- `GET /api.php?path=health` - Health check endpoint

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

## Installation

1. Place all files in your web server directory
2. Update the database configuration in `config/database.php`
3. Ensure your web server has PHP and MySQL support
4. Make sure URL rewriting is enabled (Apache with mod_rewrite)
5. Create a database through your Hostinger hPanel
6. Import the schema from `php-backend/database/hostinger-schema.sql` using phpMyAdmin
7. **Important**: Update the database credentials in `config/database.php` with your actual Hostinger database information

## Testing

Run `test.php` to verify the backend is working correctly.
