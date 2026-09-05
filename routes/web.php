<?php

use App\Http\Controllers\VendorController;
use App\Http\Controllers\RfqController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\TrackingController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('landing');
})->name('landing');

Route::get('/login', function () {
    return view('auth.login');
})->name('login');

Route::get('/forgot-password', function () {
    return view('auth.forgot-password');
})->name('forgot-password');

Route::get('/set-password', function () {
    return view('auth.set-password');
})->name('set-password');

Route::get('/register', function () {
    return view('auth.register');
})->name('register');

Route::get('/about', function () {
    return view('about');
})->name('about');

Route::get('/trading', function () {
    return view('trading');
})->name('trading');

Route::get('/tender', function () {
    return view('tender');
})->name('tender');

Route::get('/consolidation', function () {
    return view('consolidation');
})->name('consolidation');

Route::get('/industries', function () {
    return view('industries-page');
})->name('industries');

Route::get('/contact', function () {
    return view('contact');
})->name('contact');

Route::get('/track', function () {
    return view('track');
})->name('track');

Route::get('/dashboard', function () {
    return view('dashboard');
})->name('dashboard');

Route::get('/admin/{any?}', function () {
    return view('admin');
})->where('any', '.*')->name('admin')->middleware('auth');

Route::get('/vendor-registration', function () {
    return view('vendor-registration');
})->name('vendor-registration');

Route::get('/rfq', function () {
    return view('rfq');
})->name('rfq');

Route::get('/terms', function () {
    return view('terms');
})->name('terms');

Route::get('/privacy', function () {
    return view('privacy');
})->name('privacy');

// SEO: Sitemap (dynamic with absolute URLs)
Route::get('/sitemap.xml', function () {
    $base = rtrim(config('app.url'), '/');
    $pages = [
        ['loc' => '/', 'priority' => '1.0', 'changefreq' => 'weekly'],
        ['loc' => '/about', 'priority' => '0.8', 'changefreq' => 'monthly'],
        ['loc' => '/trading', 'priority' => '0.9', 'changefreq' => 'monthly'],
        ['loc' => '/tender', 'priority' => '0.9', 'changefreq' => 'monthly'],
        ['loc' => '/consolidation', 'priority' => '0.9', 'changefreq' => 'monthly'],
        ['loc' => '/industries', 'priority' => '0.8', 'changefreq' => 'monthly'],
        ['loc' => '/vendor-registration', 'priority' => '0.7', 'changefreq' => 'monthly'],
        ['loc' => '/rfq', 'priority' => '0.7', 'changefreq' => 'monthly'],
        ['loc' => '/contact', 'priority' => '0.8', 'changefreq' => 'monthly'],
        ['loc' => '/track', 'priority' => '0.6', 'changefreq' => 'monthly'],
        ['loc' => '/terms', 'priority' => '0.3', 'changefreq' => 'yearly'],
        ['loc' => '/privacy', 'priority' => '0.3', 'changefreq' => 'yearly'],
    ];

    $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
    $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"' . "\n";
    $xml .= '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">' . "\n";

    foreach ($pages as $page) {
        $xml .= "  <url>\n";
        $xml .= "    <loc>{$base}{$page['loc']}</loc>\n";
        $xml .= "    <changefreq>{$page['changefreq']}</changefreq>\n";
        $xml .= "    <priority>{$page['priority']}</priority>\n";
        if ($page['loc'] === '/') {
            $xml .= "    <image:image>\n";
            $xml .= "      <image:loc>{$base}/assets/images/Hesserin Logo-01.png</image:loc>\n";
            $xml .= "      <image:title>Husserin Investment Company Limited</image:title>\n";
            $xml .= "    </image:image>\n";
        }
        $xml .= "  </url>\n";
    }

    $xml .= "</urlset>\n";

    return response($xml, 200, ['Content-Type' => 'application/xml']);
});

Route::post('/api/vendor-registration', [VendorController::class, 'store']);
Route::post('/api/rfq', [RfqController::class, 'store']);
Route::post('/api/contact', [ContactController::class, 'store']);
Route::post('/api/track', [TrackingController::class, 'lookup']);

Route::post('/api/login', [AuthController::class, 'login']);
Route::post('/api/logout', [AuthController::class, 'logout']);
Route::get('/api/me', [AuthController::class, 'me']);
Route::post('/api/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/api/set-password', [AuthController::class, 'setPassword']);
