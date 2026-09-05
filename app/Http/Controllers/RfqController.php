<?php

namespace App\Http\Controllers;

use App\Models\Rfq;
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

        $enquiryId = 'RFQ-' . strtoupper(Str::random(8));

        $rfq = Rfq::create(array_merge($validated, [
            'enquiry_id' => $enquiryId,
            'status' => 'pending',
        ]));

        Mail::to(config('mail.from.address', 'contact@hesserininvestement.com'))
            ->send(new RfqSubmission($validated, $enquiryId));

        return response()->json([
            'success' => true,
            'enquiry_id' => $enquiryId,
            'message' => 'RFQ submitted successfully.',
        ], 201);
    }
}
