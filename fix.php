<?php
/**
 * Production fix script — run this ONCE on the server.
 * Access via browser: https://yourdomain.com/fix.php
 * DELETE this file after running!
 */

echo "<h2>Husserin Production Fix</h2><pre>";

// 1. Fix .env file
$envPath = __DIR__ . '/.env';
if (file_exists($envPath)) {
    $env = file_get_contents($envPath);

    // Change session driver to file
    $env = preg_replace('/^SESSION_DRIVER=.*/m', 'SESSION_DRIVER=file', $env);
    // Change cache store to file
    $env = preg_replace('/^CACHE_STORE=.*/m', 'CACHE_STORE=file', $env);
    // Change queue to sync
    $env = preg_replace('/^QUEUE_CONNECTION=.*/m', 'QUEUE_CONNECTION=sync', $env);
    // Turn off debug for production
    $env = preg_replace('/^APP_DEBUG=.*/m', 'APP_DEBUG=false', $env);
    $env = preg_replace('/^APP_ENV=.*/m', 'APP_ENV=production', $env);

    file_put_contents($envPath, $env);
    echo "✓ .env updated (sessions=file, cache=file, queue=sync, debug=false)\n";
} else {
    echo "✗ .env file not found!\n";
}

// 2. Create SQLite database file
$dbPath = __DIR__ . '/database/database.sqlite';
if (!file_exists($dbPath)) {
    touch($dbPath);
    echo "✓ SQLite database file created\n";
} else {
    echo "✓ SQLite database file already exists\n";
}

// 3. Create storage directories
$dirs = [
    'storage/framework/sessions',
    'storage/framework/views',
    'storage/framework/cache',
    'storage/framework/cache/data',
    'storage/logs',
    'bootstrap/cache',
];

foreach ($dirs as $dir) {
    $fullPath = __DIR__ . '/' . $dir;
    if (!is_dir($fullPath)) {
        mkdir($fullPath, 0755, true);
        echo "✓ Created directory: $dir\n";
    }
}

// 4. Set permissions
exec('chmod -R 775 ' . __DIR__ . '/storage 2>&1', $out);
exec('chmod -R 775 ' . __DIR__ . '/bootstrap/cache 2>&1', $out);
echo "✓ Permissions set on storage and bootstrap/cache\n";

// 5. Clear caches
echo "\n--- Clearing Laravel caches ---\n";
echo shell_exec('php artisan config:clear 2>&1');
echo shell_exec('php artisan cache:clear 2>&1');
echo shell_exec('php artisan route:clear 2>&1');
echo shell_exec('php artisan view:clear 2>&1');

// 6. Run migrations
echo "\n--- Running migrations ---\n";
echo shell_exec('php artisan migrate --force 2>&1');

// 7. Generate key if needed
echo "\n--- Generating app key ---\n";
echo shell_exec('php artisan key:generate --force 2>&1');

// 8. Cache config for production
echo "\n--- Caching for production ---\n";
echo shell_exec('php artisan config:cache 2>&1');
echo shell_exec('php artisan route:cache 2>&1');
echo shell_exec('php artisan view:cache 2>&1');

// 9. Storage link
echo "\n--- Storage symlink ---\n";
echo shell_exec('php artisan storage:link 2>&1');

echo "\n\n=== DONE! ===\n";
echo "Now DELETE this file (fix.php) from the server!\n";
echo "Try opening your site again.\n";
echo "</pre>";
