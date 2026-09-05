<?php

/**
 * Husserin Investment Company Limited
 * Root entry point — routes all requests to the Laravel public directory.
 * This allows the app to run without configuring the web server's
 * document root to /public.
 */

define('LARAVEL_START', microtime(true));

// Maintenance mode check
if (file_exists(__DIR__.'/storage/framework/maintenance.php')) {
    require __DIR__.'/storage/framework/maintenance.php';
}

// Load Composer autoloader
require __DIR__.'/vendor/autoload.php';

// Bootstrap Laravel and handle the request
$app = require_once __DIR__.'/bootstrap/app.php';

$app->handleRequest(
    Illuminate\Http\Request::capture()
);
