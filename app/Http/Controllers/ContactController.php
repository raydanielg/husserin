<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
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

        $enquiryId = 'MSG-' . strtoupper(Str::random(8));

        ContactMessage::create(array_merge($validated, [
            'enquiry_id' => $enquiryId,
            'status' => 'pending',
        ]));

        Mail::to(config('mail.from.address', 'contact@hesserininvestement.com'))
            ->send(new ContactSubmission($validated, $enquiryId));

        return response()->json([
            'success' => true,
            'enquiry_id' => $enquiryId,
            'message' => 'Message sent successfully.',
        ], 201);
    }
}
