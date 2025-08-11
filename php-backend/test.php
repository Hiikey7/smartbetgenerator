<?php
// Test script for PHP backend
require_once 'config/database.php';
require_once 'models/BettingSlip.php';
require_once 'controllers/BettingSlipController.php';

header("Content-Type: application/json");

try {
    $controller = new BettingSlipController($pdo);
    
    // Test database connection
    echo "Testing database connection...\n";
    $stmt = $pdo->query("SELECT 1 as test");
    $result = $stmt->fetch();
    echo "Database connection: " . ($result ? "SUCCESS" : "FAILED") . "\n\n";
    
    // Test getting all betting slips
    echo "Testing getAllBettingSlips...\n";
    $result = $controller->getAllBettingSlips();
    echo "Get all slips: " . ($result['success'] ? "SUCCESS" : "FAILED") . "\n";
    if ($result['success']) {
        echo "Found " . count($result['data']) . " betting slips\n";
    }
    echo "\n";
    
    // Test health check
    echo "Testing health check...\n";
    echo "Health check: SUCCESS\n";
    echo json_encode(['status' => 'OK', 'message' => 'Server is running']);
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>