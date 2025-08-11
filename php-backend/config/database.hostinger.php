<?php
// Hostinger Database configuration
$host = 'localhost';
$db_name = 'your_hostinger_db_name';
$username = 'your_hostinger_db_user';
$password = 'your_hostinger_db_password';
$port = 3306;

try {
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$db_name;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>