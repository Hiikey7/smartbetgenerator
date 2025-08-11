<?php
// Hostinger Test Script
// This script helps verify that the PHP backend is correctly configured for Hostinger

echo "<h1>Hostinger PHP Backend Test</h1>\n";

// Test 1: Check if we're running on Hostinger
echo "<h2>1. Hostinger Detection</h2>\n";
if (isset($_SERVER['HTTP_HOST']) && strpos($_SERVER['HTTP_HOST'], 'hostinger') !== false) {
    echo "<p style='color: green;'>✓ Hostinger hosting detected</p>\n";
} else {
    echo "<p style='color: orange;'>⚠ Hostinger hosting not detected (this is normal when testing locally)</p>\n";
}

// Test 2: Check database configuration
echo "<h2>2. Database Configuration</h2>\n";
$config_file = 'config/database.php';
if (file_exists($config_file)) {
    echo "<p style='color: green;'>✓ Database configuration file found</p>\n";
    
    // Try to include and test database connection
    try {
        include $config_file;
        echo "<p style='color: green;'>✓ Database configuration loaded successfully</p>\n";
        
        // Test database connection
        $stmt = $pdo->query("SELECT 1 as test");
        $result = $stmt->fetch();
        if ($result) {
            echo "<p style='color: green;'>✓ Database connection successful</p>\n";
        } else {
            echo "<p style='color: red;'>✗ Database connection failed</p>\n";
        }
    } catch (Exception $e) {
        echo "<p style='color: red;'>✗ Database connection failed: " . $e->getMessage() . "</p>\n";
        echo "<p style='color: orange;'>💡 Tip: Check that you've updated the database credentials in config/database.php with your actual Hostinger database information.</p>\n";
        echo "<p style='color: orange;'>💡 See HOSTINGER_DATABASE_CONFIGURATION.md for detailed instructions.</p>\n";
    }
} else {
    echo "<p style='color: red;'>✗ Database configuration file not found</p>\n";
}

// Test 3: Check required files
echo "<h2>3. Required Files</h2>\n";
$required_files = [
    'api.php',
    'config/database.php',
    'controllers/BettingSlipController.php',
    'models/BettingSlip.php',
    '.htaccess'
];

foreach ($required_files as $file) {
    if (file_exists($file) || file_exists(dirname(__FILE__) . '/' . $file)) {
        echo "<p style='color: green;'>✓ $file</p>\n";
    } else {
        echo "<p style='color: red;'>✗ $file</p>\n";
    }
}

// Test 4: Check .htaccess
echo "<h2>4. URL Rewriting</h2>\n";
$htaccess_file = '.htaccess';
if (file_exists($htaccess_file)) {
    $htaccess_content = file_get_contents($htaccess_file);
    if (strpos($htaccess_content, 'RewriteEngine On') !== false) {
        echo "<p style='color: green;'>✓ .htaccess file with RewriteEngine found</p>\n";
    } else {
        echo "<p style='color: red;'>✗ .htaccess file does not contain RewriteEngine</p>\n";
    }
} else {
    echo "<p style='color: red;'>✗ .htaccess file not found</p>\n";
}

// Test 5: Check PHP version
echo "<h2>5. PHP Version</h2>\n";
$php_version = phpversion();
if (version_compare($php_version, '7.4.0', '>=')) {
    echo "<p style='color: green;'>✓ PHP version $php_version (supported)</p>\n";
} else {
    echo "<p style='color: red;'>✗ PHP version $php_version (minimum required: 7.4.0)</p>\n";
}

// Test 6: Check MySQL extension
echo "<h2>6. MySQL Extension</h2>\n";
if (extension_loaded('pdo_mysql')) {
    echo "<p style='color: green;'>✓ PDO MySQL extension loaded</p>\n";
} else {
    echo "<p style='color: red;'>✗ PDO MySQL extension not loaded</p>\n";
}

echo "<h2>Deployment Instructions</h2>\n";
echo "<ol>\n";
echo "<li>Upload all files from the php-backend/ directory to your Hostinger public_html folder</li>\n";
echo "<li>Create a MySQL database through Hostinger hPanel</li>\n";
echo "<li>Import the database schema from php-backend/database/hostinger-schema.sql using phpMyAdmin</li>\n";
echo "<li>Update the database credentials in config/database.php - see HOSTINGER_DATABASE_CONFIGURATION.md for detailed instructions</li>\n";
echo "<li>Build and upload the frontend files from frontend/dist/ to your public_html folder</li>\n";
echo "<li>Visit your domain to test the application</li>\n";
echo "</ol>\n";

echo "<p>For detailed instructions, see HOSTINGER_DEPLOYMENT.md, HOSTINGER_DATABASE_SETUP.md, and HOSTINGER_DATABASE_CONFIGURATION.md</p>\n";
?>