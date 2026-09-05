<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Enquiry;
use App\Models\EnquiryNote;
use App\Models\EnquiryStatusHistory;
use App\Models\AuditLog;
use Illuminate\Http\Request;

class EnquiryController extends Controller
{
    public function index(Request $request)
    {
        $query = Enquiry::with('assignedTo:id,name');

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('priority')) {
            $query->where('priority', $request->priority);
        }

        if ($request->filled('assigned_to')) {
            $query->where('assigned_to', $request->assigned_to);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('reference_number', 'like', "%{$search}%")
                  ->orWhere('company_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        $perPage = $request->get('per_page', 15);
        $enquiries = $query->latest()->paginate($perPage);

        return response()->json($enquiries);
    }

    public function show($id)
    {
        $enquiry = Enquiry::with([
            'assignedTo:id,name',
            'notes.user:id,name',
            'statusHistories.user:id,name',
            'tenderDetail',
            'consolidationDetail',
        ])->findOrFail($id);

        return response()->json($enquiry);
    }

    public function updateStatus(Request $request, $id)
    {
        $enquiry = Enquiry::findOrFail($id);

        $validated = $request->validate([
            'status' => ['required', 'string'],
            'comment' => ['nullable', 'string'],
        ]);

        $oldStatus = $enquiry->status;
        $enquiry->update(['status' => $validated['status']]);

        if (in_array($validated['status'], ['CLOSED', 'WON', 'LOST', 'COMPLETED', 'CANCELLED'])) {
            $enquiry->update(['closed_at' => now()]);
        }

        EnquiryStatusHistory::create([
            'enquiry_id' => $enquiry->id,
            'user_id' => auth()->id(),
            'from_status' => $oldStatus,
            'to_status' => $validated['status'],
            'comment' => $validated['comment'] ?? null,
        ]);

        AuditLog::create([
            'user_id' => auth()->id(),
            'action' => 'STATUS_CHANGE',
            'module' => 'Enquiry',
            'reference_number' => $enquiry->reference_number,
            'description' => "Changed status from {$oldStatus} to {$validated['status']}",
            'old_values' => ['status' => $oldStatus],
            'new_values' => ['status' => $validated['status']],
            'ip_address' => $request->ip(),
        ]);

        return response()->json([
            'success' => true,
            'enquiry' => $enquiry->fresh(),
        ]);
    }

    public function assign(Request $request, $id)
    {
        $enquiry = Enquiry::findOrFail($id);

        $validated = $request->validate([
            'assigned_to' => ['required', 'exists:users,id'],
        ]);

        $oldAssigned = $enquiry->assigned_to;
        $enquiry->update(['assigned_to' => $validated['assigned_to']]);

        AuditLog::create([
            'user_id' => auth()->id(),
            'action' => 'ASSIGN',
            'module' => 'Enquiry',
            'reference_number' => $enquiry->reference_number,
            'description' => "Assigned enquiry to user #{$validated['assigned_to']}",
            'old_values' => ['assigned_to' => $oldAssigned],
            'new_values' => ['assigned_to' => $validated['assigned_to']],
            'ip_address' => $request->ip(),
        ]);

        return response()->json([
            'success' => true,
            'enquiry' => $enquiry->fresh(['assignedTo']),
        ]);
    }

    public function updatePriority(Request $request, $id)
    {
        $enquiry = Enquiry::findOrFail($id);

        $validated = $request->validate([
            'priority' => ['required', 'in:LOW,NORMAL,HIGH,URGENT'],
        ]);

        $oldPriority = $enquiry->priority;
        $enquiry->update(['priority' => $validated['priority']]);

        AuditLog::create([
            'user_id' => auth()->id(),
            'action' => 'PRIORITY_CHANGE',
            'module' => 'Enquiry',
            'reference_number' => $enquiry->reference_number,
            'description' => "Changed priority from {$oldPriority} to {$validated['priority']}",
            'ip_address' => $request->ip(),
        ]);

        return response()->json([
            'success' => true,
            'enquiry' => $enquiry->fresh(),
        ]);
    }

    public function addNote(Request $request, $id)
    {
        $enquiry = Enquiry::findOrFail($id);

        $validated = $request->validate([
            'note' => ['required', 'string'],
        ]);

        $note = EnquiryNote::create([
            'enquiry_id' => $enquiry->id,
            'user_id' => auth()->id(),
            'note' => $validated['note'],
        ]);

        return response()->json([
            'success' => true,
            'note' => $note->load('user:id,name'),
        ]);
    }

    public function history($id)
    {
        $enquiry = Enquiry::findOrFail($id);
        $history = $enquiry->statusHistories()->with('user:id,name')->latest()->get();

        return response()->json($history);
    }
}
