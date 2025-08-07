import mysql from "mysql2/promise";
import dotenv from "dotenv";
import path from "path";

// Load environment variables from server/.env
dotenv.config({ path: path.resolve(process.cwd(), "server/.env") });

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const pool = mysql.createPool(dbConfig);

// Test the connection
pool
  .getConnection()
  .then((connection) => {
    console.log("Database connected successfully");
    connection.release();
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

export default pool;
