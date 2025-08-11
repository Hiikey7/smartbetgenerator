<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config/database.php';
require_once 'controllers/BettingSlipController.php';

$controller = new BettingSlipController($pdo);
$method = $_SERVER['REQUEST_METHOD'];
$path = isset($_GET['path']) ? $_GET['path'] : '';
$path_parts = explode('/', trim($path, '/'));

// Health check endpoint
if ($path === 'health') {
    echo json_encode(['status' => 'OK', 'message' => 'Server is running']);
    exit();
}

// Main routing logic
if ($path_parts[0] === 'betting-slips' || $path === 'betting-slips') {
    switch ($method) {
        case 'POST':
            // Save a new betting slip
            $input = json_decode(file_get_contents('php://input'), true);
            $result = $controller->saveBettingSlip($input);
            http_response_code($result['success'] ? 201 : 500);
            echo json_encode($result);
            break;

        case 'GET':
            if (isset($path_parts[1]) && $path_parts[1] === 'analytics') {
                // Get analytics data
                $result = $controller->getAnalytics();
                http_response_code($result['success'] ? 200 : 500);
                echo json_encode($result);
            } elseif (isset($path_parts[1]) && is_numeric($path_parts[1])) {
                // Get a specific betting slip by ID
                $id = $path_parts[1];
                $result = $controller->getBettingSlipById($id);
                http_response_code($result['success'] ? 200 : ($result['message'] === 'Betting slip not found' ? 404 : 500));
                echo json_encode($result);
            } else {
                // Get all betting slips
                $result = $controller->getAllBettingSlips();
                http_response_code($result['success'] ? 200 : 500);
                echo json_encode($result);
            }
            break;

        case 'PUT':
            if (isset($path_parts[1]) && is_numeric($path_parts[1])) {
                // Update a betting slip
                $id = $path_parts[1];
                $input = json_decode(file_get_contents('php://input'), true);
                $result = $controller->updateBettingSlip($id, $input);
                http_response_code($result['success'] ? 200 : ($result['message'] === 'Betting slip not found' ? 404 : 500));
                echo json_encode($result);
            } else {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Missing ID for update']);
            }
            break;

        case 'DELETE':
            if (isset($path_parts[1]) && is_numeric($path_parts[1])) {
                // Delete a betting slip
                $id = $path_parts[1];
                $result = $controller->deleteBettingSlip($id);
                http_response_code($result['success'] ? 200 : ($result['message'] === 'Betting slip not found' ? 404 : 500));
                echo json_encode($result);
            } else {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Missing ID for delete']);
            }
            break;

        default:
            http_response_code(405);
            echo json_encode(['success' => false, 'message' => 'Method not allowed']);
            break;
    }
} else {
    // 404 handler
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => 'Route not found']);
}

?>