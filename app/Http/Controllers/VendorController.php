<?php

namespace App\Http\Controllers;

use App\Models\Vendor;
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

        $enquiryId = 'VND-' . strtoupper(Str::random(8));

        $vendor = Vendor::create(array_merge($validated, [
            'enquiry_id' => $enquiryId,
            'status' => 'pending',
        ]));

        Mail::to(config('mail.from.address', 'contact@hesserininvestement.com'))
            ->send(new VendorSubmission($validated, $enquiryId));

        return response()->json([
            'success' => true,
            'enquiry_id' => $enquiryId,
            'message' => 'Vendor registration submitted successfully.',
        ], 201);
    }
}
