<?php

namespace App\Http\Controllers;

use App\Models\Vendor;
use App\Models\Rfq;
use App\Models\ContactMessage;
use Illuminate\Http\Request;

class TrackingController extends Controller
{
    public function lookup(Request $request)
    {
        $validated = $request->validate([
            'enquiry_id' => ['required', 'string', 'max:255'],
        ]);

        $id = strtoupper(trim($validated['enquiry_id']));

        $vendor = Vendor::where('enquiry_id', $id)->first();
        if ($vendor) {
            return response()->json([
                'success' => true,
                'type' => 'Vendor Registration',
                'enquiry_id' => $vendor->enquiry_id,
                'status' => ucfirst($vendor->status),
                'submitted_at' => $vendor->created_at->format('M d, Y H:i'),
                'details' => [
                    'Company' => $vendor->company_name,
                    'Contact Person' => $vendor->contact_person,
                    'Email' => $vendor->email,
                    'Category' => $vendor->category,
                ],
            ]);
        }

        $rfq = Rfq::where('enquiry_id', $id)->first();
        if ($rfq) {
            return response()->json([
                'success' => true,
                'type' => 'RFQ',
                'enquiry_id' => $rfq->enquiry_id,
                'status' => ucfirst($rfq->status),
                'submitted_at' => $rfq->created_at->format('M d, Y H:i'),
                'details' => [
                    'Company' => $rfq->company,
                    'Contact Person' => $rfq->contact_person,
                    'Email' => $rfq->email,
                    'Item / Specification' => $rfq->item_or_spec,
                    'Category' => $rfq->category ?? '—',
                    'Quantity' => $rfq->quantity ? $rfq->quantity . ' ' . ($rfq->unit ?? '') : '—',
                    'Destination' => $rfq->destination ?? '—',
                ],
            ]);
        }

        $message = ContactMessage::where('enquiry_id', $id)->first();
        if ($message) {
            return response()->json([
                'success' => true,
                'type' => 'Contact Message',
                'enquiry_id' => $message->enquiry_id,
                'status' => ucfirst($message->status),
                'submitted_at' => $message->created_at->format('M d, Y H:i'),
                'details' => [
                    'Name' => $message->name,
                    'Email' => $message->email,
                    'Subject' => $message->subject,
                ],
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'No enquiry found with that reference ID. Please check and try again.',
        ], 404);
    }
}
