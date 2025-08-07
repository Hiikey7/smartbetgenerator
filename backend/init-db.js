import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

import db from "./config/db.js";

async function initializeDatabase() {
  try {
    console.log("Initializing database...");

    // Create database
    await db.execute("CREATE DATABASE IF NOT EXISTS smartbets");
    console.log('Database "smartbets" created/verified');

    // Use database
    // Note: USE command is not supported in prepared statements, so we need to use query instead
    await db.query("USE smartbets");
    console.log('Using database "smartbets"');

    // Create betting_slips table
    const createTableQuery = `
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
      )
    `;

    await db.execute(createTableQuery);
    console.log('Table "betting_slips" created/verified');

    // Enable event scheduler
    await db.execute("SET GLOBAL event_scheduler = ON");
    console.log("Event scheduler enabled");

    // Create scheduled event to delete slips older than 30 days
    const createEventQuery = `
      CREATE EVENT IF NOT EXISTS delete_old_betting_slips
      ON SCHEDULE EVERY 1 DAY
      STARTS CURRENT_TIMESTAMP
      DO
        DELETE FROM betting_slips
        WHERE created_at < DATE_SUB(NOW(), INTERVAL 30 DAY)
    `;

    await db.query(createEventQuery);
    console.log('Scheduled event "delete_old_betting_slips" created/verified');

    console.log("Database initialization completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Database initialization failed:", error);
    process.exit(1);
  }
}

initializeDatabase();
