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