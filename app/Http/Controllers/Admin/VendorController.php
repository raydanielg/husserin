<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Vendor;
use App\Models\AuditLog;
use Illuminate\Http\Request;

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
