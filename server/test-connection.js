import db from "./config/db.js";

async function testConnection() {
  try {
    const connection = await db.getConnection();
    console.log("Database connection successful!");

    // Test a simple query
    const [rows] = await connection.execute("SELECT 1 + 1 AS solution");
    console.log("Simple query result:", rows[0].solution);

    connection.release();

    console.log("All tests passed!");
    process.exit(0);
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

testConnection();
