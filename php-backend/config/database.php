<?php
// Database configuration
// Check if we're running on Hostinger
if (isset($_SERVER['HTTP_HOST']) && strpos($_SERVER['HTTP_HOST'], 'hostinger') !== false) {
    // Hostinger configuration - UPDATE THESE VALUES WITH YOUR HOSTINGER DATABASE CREDENTIALS
    $host = 'localhost';
    $db_name = 'your_hostinger_db_name';
    $username = 'your_hostinger_db_user';
    $password = 'your_hostinger_db_password';
    
    // Check if we're on Hostinger but credentials haven't been updated
    if ($db_name === 'your_hostinger_db_name' || $username === 'your_hostinger_db_user') {
        die("Connection failed: Please update the database credentials in config/database.php with your Hostinger database information.");
    }
} else {
    // Local development configuration
    $host = 'localhost';
    $db_name = 'smartbets';
    $username = 'smartbets';
    $password = 'SCn)Lx]Q!p]*291A';
}
$port = 3306;

try {
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$db_name;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>