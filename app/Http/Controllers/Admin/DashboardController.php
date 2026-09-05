<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Enquiry;
use App\Models\Vendor;
use App\Models\Rfq;
use App\Models\ContactMessage;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function stats()
    {
        $totalEnquiries = Enquiry::count();
        $newRfqs = Enquiry::where('type', 'RFQ')->where('status', 'NEW')->count();
        $openTenders = Enquiry::where('type', 'TENDER')->whereNotIn('status', ['CLOSED', 'WON', 'LOST', 'EXPIRED'])->count();
        $consolidation = Enquiry::where('type', 'CONSOLIDATION')->whereNotIn('status', ['COMPLETED', 'CANCELLED'])->count();
        $vendors = Vendor::count();
        $pendingVendors = Vendor::where('status', 'pending')->count();

        $byType = [
            'RFQ' => Enquiry::where('type', 'RFQ')->count(),
            'TENDER' => Enquiry::where('type', 'TENDER')->count(),
            'CONSOLIDATION' => Enquiry::where('type', 'CONSOLIDATION')->count(),
            'VENDOR' => Enquiry::where('type', 'VENDOR')->count(),
        ];

        $byStatus = Enquiry::selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status')
            ->toArray();

        return response()->json([
            'total_enquiries' => $totalEnquiries,
            'new_rfqs' => $newRfqs,
            'open_tenders' => $openTenders,
            'consolidation' => $consolidation,
            'vendors' => $vendors,
            'pending_vendors' => $pendingVendors,
            'by_type' => $byType,
            'by_status' => $byStatus,
        ]);
    }

    public function recentEnquiries()
    {
        $enquiries = Enquiry::with('assignedTo:id,name')
            ->latest()
            ->limit(10)
            ->get();

        return response()->json($enquiries);
    }

    public function upcomingTenders()
    {
        $tenders = Enquiry::where('type', 'TENDER')
            ->whereNotIn('status', ['CLOSED', 'WON', 'LOST', 'EXPIRED'])
            ->whereHas('tenderDetail', function ($q) {
                $q->whereNotNull('closing_date')
                  ->where('closing_date', '>=', now()->toDateString())
                  ->orderBy('closing_date');
            })
            ->with('tenderDetail')
            ->limit(5)
            ->get();

        return response()->json($tenders);
    }
}
