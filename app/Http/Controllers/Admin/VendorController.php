<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Vendor;
use App\Models\AuditLog;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class VendorController extends Controller
{
    public function index(Request $request)
    {
        $query = Vendor::query();

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('company_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('contact_person', 'like', "%{$search}%")
                  ->orWhere('enquiry_id', 'like', "%{$search}%");
            });
        }

        $perPage = $request->get('per_page', 15);
        $vendors = $query->latest()->paginate($perPage);

        return response()->json($vendors);
    }

    public function create(Request $request)
    {
        $validated = $request->validate([
            'company_name' => ['required', 'string', 'max:255'],
            'country' => ['required', 'string', 'max:100'],
            'contact_person' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'website' => ['nullable', 'string', 'max:255'],
            'address' => ['nullable', 'string', 'max:500'],
            'category' => ['required', 'string', 'max:255'],
            'brands' => ['nullable', 'string'],
            'certifications' => ['nullable', 'string'],
            'message' => ['nullable', 'string'],
        ]);

        $vendor = Vendor::create([
            'enquiry_id' => 'VND-' . date('Y') . '-' . strtoupper(Str::random(6)),
            'status' => 'pending',
            ...$validated,
        ]);

        AuditLog::create([
            'user_id' => auth()->id(),
            'action' => 'VENDOR_CREATED',
            'module' => 'Vendor',
            'reference_number' => $vendor->enquiry_id,
            'description' => "Created vendor {$vendor->company_name}",
            'new_values' => $validated,
            'ip_address' => $request->ip(),
        ]);

        return response()->json([
            'success' => true,
            'vendor' => $vendor,
        ], 201);
    }

    public function show($id)
    {
        $vendor = Vendor::findOrFail($id);
        return response()->json($vendor);
    }

    public function updateStatus(Request $request, $id)
    {
        $vendor = Vendor::findOrFail($id);

        $validated = $request->validate([
            'status' => ['required', 'in:pending,under_review,approved,rejected,suspended'],
        ]);

        $oldStatus = $vendor->status;
        $vendor->update(['status' => $validated['status']]);

        AuditLog::create([
            'user_id' => auth()->id(),
            'action' => 'VENDOR_STATUS_CHANGE',
            'module' => 'Vendor',
            'reference_number' => $vendor->enquiry_id,
            'description' => "Changed vendor status from {$oldStatus} to {$validated['status']}",
            'old_values' => ['status' => $oldStatus],
            'new_values' => ['status' => $validated['status']],
            'ip_address' => $request->ip(),
        ]);

        return response()->json([
            'success' => true,
            'vendor' => $vendor->fresh(),
        ]);
    }
}
