<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use App\Models\Enquiry;
use App\Mail\ContactSubmission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:255'],
            'company' => ['nullable', 'string', 'max:255'],
            'subject' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string'],
        ]);

        $year = now()->year;
        $seq = str_pad((string) (Enquiry::where('type', 'RFQ')->whereYear('created_at', $year)->count() + 1), 5, '0', STR_PAD_LEFT);
        $enquiryId = "MSG-{$year}-{$seq}";

        ContactMessage::create(array_merge($validated, [
            'enquiry_id' => $enquiryId,
            'status' => 'pending',
        ]));

        Enquiry::create([
            'reference_number' => $enquiryId,
            'type' => 'RFQ',
            'company_name' => $validated['company'] ?? $validated['name'],
            'contact_person' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'status' => 'NEW',
            'priority' => 'NORMAL',
            'description' => $validated['subject'] . ': ' . $validated['message'],
            'metadata' => $validated,
        ]);

        Mail::to(config('mail.from.address', 'contact@hesserininvestement.com'))
            ->send(new ContactSubmission($validated, $enquiryId));

        return response()->json([
            'success' => true,
            'enquiry_id' => $enquiryId,
            'message' => 'Message sent successfully.',
        ], 201);
    }
}
