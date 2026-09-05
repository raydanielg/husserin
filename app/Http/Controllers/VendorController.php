<?php

namespace App\Http\Controllers;

use App\Models\Vendor;
use App\Models\Enquiry;
use App\Mail\VendorSubmission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class VendorController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'company_name' => ['required', 'string', 'max:255'],
            'country' => ['required', 'string', 'max:255'],
            'contact_person' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:255'],
            'website' => ['nullable', 'string', 'max:255'],
            'address' => ['nullable', 'string'],
            'category' => ['required', 'string', 'max:255'],
            'brands' => ['nullable', 'string'],
            'certifications' => ['nullable', 'string'],
            'message' => ['nullable', 'string'],
        ]);

        $year = now()->year;
        $seq = str_pad((string) (Enquiry::where('type', 'VENDOR')->whereYear('created_at', $year)->count() + 1), 5, '0', STR_PAD_LEFT);
        $enquiryId = "VND-{$year}-{$seq}";

        $vendor = Vendor::create(array_merge($validated, [
            'enquiry_id' => $enquiryId,
            'status' => 'pending',
        ]));

        Enquiry::create([
            'reference_number' => $enquiryId,
            'type' => 'VENDOR',
            'company_name' => $validated['company_name'],
            'contact_person' => $validated['contact_person'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'country' => $validated['country'],
            'status' => 'NEW',
            'priority' => 'NORMAL',
            'description' => $validated['message'] ?? null,
            'metadata' => $validated,
        ]);

        Mail::to(config('mail.from.address', 'contact@hesserininvestement.com'))
            ->send(new VendorSubmission($validated, $enquiryId));

        return response()->json([
            'success' => true,
            'enquiry_id' => $enquiryId,
            'message' => 'Vendor registration submitted successfully.',
        ], 201);
    }
}
