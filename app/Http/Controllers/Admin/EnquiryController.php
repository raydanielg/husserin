<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Enquiry;
use App\Models\EnquiryNote;
use App\Models\EnquiryStatusHistory;
use App\Models\TenderDetail;
use App\Models\ConsolidationDetail;
use App\Models\AuditLog;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

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

    public function create(Request $request)
    {
        $validated = $request->validate([
            'type' => ['required', 'in:RFQ,TENDER,CONSOLIDATION,VENDOR'],
            'company_name' => ['required', 'string', 'max:255'],
            'contact_person' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'country' => ['nullable', 'string', 'max:100'],
            'priority' => ['sometimes', 'in:LOW,NORMAL,HIGH,URGENT'],
            'description' => ['nullable', 'string'],
            'metadata' => ['nullable', 'array'],
            'tender_reference' => ['nullable', 'string', 'max:255'],
            'tender_organization' => ['nullable', 'string', 'max:255'],
            'tender_scope' => ['nullable', 'string'],
            'tender_closing_date' => ['nullable', 'date'],
            'tender_category' => ['nullable', 'string', 'max:255'],
            'tender_destination' => ['nullable', 'string', 'max:255'],
            'cargo_details' => ['nullable', 'string'],
            'supplier_info' => ['nullable', 'string'],
            'origin' => ['nullable', 'string', 'max:255'],
            'destination' => ['nullable', 'string', 'max:255'],
        ]);

        $type = $validated['type'];
        $refPrefix = match ($type) {
            'RFQ' => 'RFQ',
            'TENDER' => 'TND',
            'CONSOLIDATION' => 'CSM',
            'VENDOR' => 'VND',
        };
        $referenceNumber = $refPrefix . '-' . date('Y') . '-' . strtoupper(Str::random(6));

        $enquiry = Enquiry::create([
            'reference_number' => $referenceNumber,
            'type' => $type,
            'company_name' => $validated['company_name'],
            'contact_person' => $validated['contact_person'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'country' => $validated['country'] ?? null,
            'status' => 'NEW',
            'priority' => $validated['priority'] ?? 'NORMAL',
            'description' => $validated['description'] ?? null,
            'metadata' => $validated['metadata'] ?? null,
        ]);

        if ($type === 'TENDER') {
            TenderDetail::create([
                'enquiry_id' => $enquiry->id,
                'tender_reference' => $validated['tender_reference'] ?? null,
                'organization' => $validated['tender_organization'] ?? null,
                'scope' => $validated['tender_scope'] ?? null,
                'closing_date' => $validated['tender_closing_date'] ?? null,
                'category' => $validated['tender_category'] ?? null,
                'destination' => $validated['tender_destination'] ?? null,
            ]);
        }

        if ($type === 'CONSOLIDATION') {
            ConsolidationDetail::create([
                'enquiry_id' => $enquiry->id,
                'cargo_details' => $validated['cargo_details'] ?? null,
                'supplier_info' => $validated['supplier_info'] ?? null,
                'origin' => $validated['origin'] ?? null,
                'destination' => $validated['destination'] ?? null,
            ]);
        }

        EnquiryStatusHistory::create([
            'enquiry_id' => $enquiry->id,
            'user_id' => auth()->id(),
            'from_status' => '—',
            'to_status' => 'NEW',
            'comment' => 'Enquiry created by admin',
        ]);

        AuditLog::create([
            'user_id' => auth()->id(),
            'action' => 'ENQUIRY_CREATED',
            'module' => 'Enquiry',
            'reference_number' => $enquiry->reference_number,
            'description' => "Created {$type} enquiry for {$enquiry->company_name}",
            'new_values' => $validated,
            'ip_address' => $request->ip(),
        ]);

        return response()->json([
            'success' => true,
            'enquiry' => $enquiry->load(['assignedTo:id,name', 'tenderDetail', 'consolidationDetail']),
        ], 201);
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

    public function update(Request $request, $id)
    {
        $enquiry = Enquiry::findOrFail($id);

        $validated = $request->validate([
            'company_name' => ['sometimes', 'string', 'max:255'],
            'contact_person' => ['sometimes', 'string', 'max:255'],
            'email' => ['sometimes', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'country' => ['nullable', 'string', 'max:100'],
            'priority' => ['sometimes', 'in:LOW,NORMAL,HIGH,URGENT'],
            'description' => ['nullable', 'string'],
            'tender_reference' => ['nullable', 'string', 'max:255'],
            'tender_organization' => ['nullable', 'string', 'max:255'],
            'tender_scope' => ['nullable', 'string'],
            'tender_closing_date' => ['nullable', 'date'],
            'tender_category' => ['nullable', 'string', 'max:255'],
            'tender_destination' => ['nullable', 'string', 'max:255'],
            'cargo_details' => ['nullable', 'string'],
            'supplier_info' => ['nullable', 'string'],
            'origin' => ['nullable', 'string', 'max:255'],
            'destination' => ['nullable', 'string', 'max:255'],
        ]);

        $oldValues = $enquiry->toArray();

        $enquiry->update(collect($validated)->only([
            'company_name', 'contact_person', 'email', 'phone', 'country', 'priority', 'description',
        ])->toArray());

        if ($enquiry->type === 'TENDER' && $enquiry->tenderDetail) {
            $tenderData = [];
            if (isset($validated['tender_reference'])) $tenderData['tender_reference'] = $validated['tender_reference'];
            if (isset($validated['tender_organization'])) $tenderData['organization'] = $validated['tender_organization'];
            if (isset($validated['tender_scope'])) $tenderData['scope'] = $validated['tender_scope'];
            if (isset($validated['tender_closing_date'])) $tenderData['closing_date'] = $validated['tender_closing_date'];
            if (isset($validated['tender_category'])) $tenderData['category'] = $validated['tender_category'];
            if (isset($validated['tender_destination'])) $tenderData['destination'] = $validated['tender_destination'];
            if (!empty($tenderData)) $enquiry->tenderDetail->update($tenderData);
        }

        if ($enquiry->type === 'CONSOLIDATION' && $enquiry->consolidationDetail) {
            $consolData = [];
            if (isset($validated['cargo_details'])) $consolData['cargo_details'] = $validated['cargo_details'];
            if (isset($validated['supplier_info'])) $consolData['supplier_info'] = $validated['supplier_info'];
            if (isset($validated['origin'])) $consolData['origin'] = $validated['origin'];
            if (isset($validated['destination'])) $consolData['destination'] = $validated['destination'];
            if (!empty($consolData)) $enquiry->consolidationDetail->update($consolData);
        }

        AuditLog::create([
            'user_id' => auth()->id(),
            'action' => 'ENQUIRY_UPDATED',
            'module' => 'Enquiry',
            'reference_number' => $enquiry->reference_number,
            'description' => "Updated enquiry {$enquiry->reference_number}",
            'old_values' => $oldValues,
            'new_values' => $validated,
            'ip_address' => $request->ip(),
        ]);

        return response()->json([
            'success' => true,
            'enquiry' => $enquiry->fresh(['assignedTo:id,name', 'tenderDetail', 'consolidationDetail']),
        ]);
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
