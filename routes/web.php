<?php

use App\Http\Controllers\VendorController;
use App\Http\Controllers\RfqController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\TrackingController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('landing');
})->name('landing');

Route::get('/login', function () {
    return view('auth.login');
})->name('login');

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

Route::post('/api/vendor-registration', [VendorController::class, 'store']);
Route::post('/api/rfq', [RfqController::class, 'store']);
Route::post('/api/contact', [ContactController::class, 'store']);
Route::post('/api/track', [TrackingController::class, 'lookup']);
