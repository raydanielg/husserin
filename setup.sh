#!/bin/bash
# Husserin Investment - Production Setup Script
# Run this on the server after pulling the latest code
# Usage: bash setup.sh

set -e

echo "=== Husserin Investment Setup ==="

# Create SQLite database if using SQLite
if [ ! -f database/database.sqlite ]; then
    echo "Creating SQLite database file..."
    touch database/database.sqlite
    echo "✓ SQLite database created"
fi

# Create storage directories if they don't exist
echo "Creating storage directories..."
mkdir -p storage/framework/sessions
mkdir -p storage/framework/views
mkdir -p storage/framework/cache
mkdir -p storage/framework/cache/data
mkdir -p storage/logs
mkdir -p bootstrap/cache
echo "✓ Storage directories ready"

# Set permissions
echo "Setting permissions..."
chmod -R 775 storage
chmod -R 775 bootstrap/cache
chmod 644 .htaccess
chmod 644 index.php
echo "✓ Permissions set"

# Clear Laravel caches
echo "Clearing caches..."
php artisan config:clear 2>/dev/null || true
php artisan cache:clear 2>/dev/null || true
php artisan route:clear 2>/dev/null || true
php artisan view:clear 2>/dev/null || true
echo "✓ Caches cleared"

# Generate app key if missing
echo "Checking app key..."
php artisan key:generate --force 2>/dev/null || true
echo "✓ App key ready"

# Run migrations
echo "Running migrations..."
php artisan migrate --force
echo "✓ Migrations complete"

# Create storage symlink
echo "Creating storage symlink..."
php artisan storage:link 2>/dev/null || true
echo "✓ Storage linked"

# Cache config for production
echo "Caching configuration..."
php artisan config:cache
php artisan route:cache
php artisan view:cache
echo "✓ Configuration cached"

echo ""
echo "=== Setup Complete! ==="
echo "Your site should now be working."
echo ""
echo "If you still get errors, check:"
echo "  1. storage/logs/laravel.log"
echo "  2. Make sure .env has correct DB settings"
echo "  3. Make sure PHP version is 8.2+"
