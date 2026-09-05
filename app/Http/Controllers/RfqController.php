<?php

namespace App\Http\Controllers;

use App\Models\Rfq;
use App\Models\Enquiry;
use App\Mail\RfqSubmission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class RfqController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'company' => ['required', 'string', 'max:255'],
            'contact_person' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:255'],
            'country' => ['nullable', 'string', 'max:255'],
            'item_or_spec' => ['required', 'string'],
            'category' => ['nullable', 'string', 'max:255'],
            'quantity' => ['nullable', 'integer'],
            'unit' => ['nullable', 'string', 'max:255'],
            'destination' => ['nullable', 'string', 'max:255'],
            'required_date' => ['nullable', 'date'],
            'message' => ['nullable', 'string'],
        ]);

        $year = now()->year;
        $seq = str_pad((string) (Enquiry::where('type', 'RFQ')->whereYear('created_at', $year)->count() + 1), 5, '0', STR_PAD_LEFT);
        $enquiryId = "RFQ-{$year}-{$seq}";

        $rfq = Rfq::create(array_merge($validated, [
            'enquiry_id' => $enquiryId,
            'status' => 'pending',
        ]));

        Enquiry::create([
            'reference_number' => $enquiryId,
            'type' => 'RFQ',
            'company_name' => $validated['company'],
            'contact_person' => $validated['contact_person'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'country' => $validated['country'] ?? null,
            'status' => 'NEW',
            'priority' => 'NORMAL',
            'description' => $validated['item_or_spec'],
            'metadata' => $validated,
        ]);

        Mail::to(config('mail.from.address', 'contact@hesserininvestement.com'))
            ->send(new RfqSubmission($validated, $enquiryId));

        return response()->json([
            'success' => true,
            'enquiry_id' => $enquiryId,
            'message' => 'RFQ submitted successfully.',
        ], 201);
    }
}
