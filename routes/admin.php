<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\EnquiryController;
use App\Http\Controllers\Admin\VendorController as AdminVendorController;
use App\Http\Controllers\Admin\AuditLogController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'admin'])->prefix('api/admin')->group(function () {
    // Dashboard
    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
    Route::get('/dashboard/recent', [DashboardController::class, 'recentEnquiries']);
    Route::get('/dashboard/tenders', [DashboardController::class, 'upcomingTenders']);

    // Enquiries
    Route::get('/enquiries', [EnquiryController::class, 'index']);
    Route::get('/enquiries/{id}', [EnquiryController::class, 'show']);
    Route::put('/enquiries/{id}/status', [EnquiryController::class, 'updateStatus']);
    Route::put('/enquiries/{id}/assign', [EnquiryController::class, 'assign']);
    Route::put('/enquiries/{id}/priority', [EnquiryController::class, 'updatePriority']);
    Route::post('/enquiries/{id}/notes', [EnquiryController::class, 'addNote']);
    Route::get('/enquiries/{id}/history', [EnquiryController::class, 'history']);

    // Vendors
    Route::get('/vendors', [AdminVendorController::class, 'index']);
    Route::get('/vendors/{id}', [AdminVendorController::class, 'show']);
    Route::put('/vendors/{id}/status', [AdminVendorController::class, 'updateStatus']);

    // Audit Logs (Super Admin only)
    Route::get('/audit-logs', [AuditLogController::class, 'index'])
        ->middleware('superadmin');
});
