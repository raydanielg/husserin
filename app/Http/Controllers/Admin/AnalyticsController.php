<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Enquiry;
use App\Models\Vendor;
use App\Models\AuditLog;
use Illuminate\Http\Request;

class AnalyticsController extends Controller
{
    public function overview()
    {
        $totalEnquiries = Enquiry::count();
        $won = Enquiry::where('status', 'WON')->count();
        $lost = Enquiry::where('status', 'LOST')->count();
        $closed = Enquiry::where('status', 'CLOSED')->count();
        $pending = Enquiry::whereNotIn('status', ['CLOSED', 'WON', 'LOST', 'COMPLETED', 'CANCELLED'])->count();
        $newCount = Enquiry::where('status', 'NEW')->count();
        $underReview = Enquiry::where('status', 'UNDER REVIEW')->count();
        $quoted = Enquiry::where('status', 'QUOTED')->count();
        $sourcing = Enquiry::where('status', 'SOURCING')->count();

        $conversionRate = $totalEnquiries > 0
            ? round(($won / $totalEnquiries) * 100, 1)
            : 0;

        $lossRate = $totalEnquiries > 0
            ? round(($lost / $totalEnquiries) * 100, 1)
            : 0;

        // By type with percentages
        $byType = [
            'RFQ' => Enquiry::where('type', 'RFQ')->count(),
            'TENDER' => Enquiry::where('type', 'TENDER')->count(),
            'CONSOLIDATION' => Enquiry::where('type', 'CONSOLIDATION')->count(),
            'VENDOR' => Enquiry::where('type', 'VENDOR')->count(),
        ];

        $typePercentages = [];
        foreach ($byType as $type => $count) {
            $typePercentages[$type] = $totalEnquiries > 0 ? round(($count / $totalEnquiries) * 100, 1) : 0;
        }

        // By status
        $byStatus = Enquiry::selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status')
            ->toArray();

        // By priority
        $byPriority = [
            'LOW' => Enquiry::where('priority', 'LOW')->count(),
            'NORMAL' => Enquiry::where('priority', 'NORMAL')->count(),
            'HIGH' => Enquiry::where('priority', 'HIGH')->count(),
            'URGENT' => Enquiry::where('priority', 'URGENT')->count(),
        ];

        // Monthly chart data with type breakdown
        $monthly = [];
        for ($i = 1; $i <= 12; $i++) {
            $monthDate = now()->startOfYear()->addMonths($i - 1);
            $monthly[] = [
                'month' => $monthDate->format('M'),
                'total' => Enquiry::whereYear('created_at', now()->year)->whereMonth('created_at', $i)->count(),
                'rfq' => Enquiry::whereYear('created_at', now()->year)->whereMonth('created_at', $i)->where('type', 'RFQ')->count(),
                'tender' => Enquiry::whereYear('created_at', now()->year)->whereMonth('created_at', $i)->where('type', 'TENDER')->count(),
                'consolidation' => Enquiry::whereYear('created_at', now()->year)->whereMonth('created_at', $i)->where('type', 'CONSOLIDATION')->count(),
                'vendor' => Enquiry::whereYear('created_at', now()->year)->whereMonth('created_at', $i)->where('type', 'VENDOR')->count(),
                'won' => Enquiry::whereYear('created_at', now()->year)->whereMonth('created_at', $i)->where('status', 'WON')->count(),
                'lost' => Enquiry::whereYear('created_at', now()->year)->whereMonth('created_at', $i)->where('status', 'LOST')->count(),
            ];
        }

        // Vendor stats
        $vendorStats = [
            'total' => Vendor::count(),
            'pending' => Vendor::where('status', 'pending')->count(),
            'approved' => Vendor::where('status', 'approved')->count(),
            'rejected' => Vendor::where('status', 'rejected')->count(),
            'approval_rate' => Vendor::count() > 0 ? round((Vendor::where('status', 'approved')->count() / Vendor::count()) * 100, 1) : 0,
        ];

        // Type performance (like provider health)
        $typePerformance = [];
        foreach (['RFQ', 'TENDER', 'CONSOLIDATION', 'VENDOR'] as $type) {
            $typeTotal = Enquiry::where('type', $type)->count();
            $typeWon = Enquiry::where('type', $type)->where('status', 'WON')->count();
            $typePerformance[] = [
                'type' => $type,
                'total' => $typeTotal,
                'won' => $typeWon,
                'success_rate' => $typeTotal > 0 ? round(($typeWon / $typeTotal) * 100, 1) : 0,
                'pending' => Enquiry::where('type', $type)->whereNotIn('status', ['CLOSED', 'WON', 'LOST', 'COMPLETED', 'CANCELLED'])->count(),
            ];
        }

        // Conversion funnel
        $funnel = [
            'new' => $newCount,
            'under_review' => $underReview,
            'sourcing' => $sourcing,
            'quoted' => $quoted,
            'won' => $won,
            'lost' => $lost,
        ];

        // Recent activity from audit logs
        $recentActivity = AuditLog::with('user:id,name')
            ->orderByDesc('created_at')
            ->limit(8)
            ->get()
            ->map(function ($log) {
                return [
                    'id' => $log->id,
                    'user' => $log->user?->name ?? 'System',
                    'action' => $log->description ?? $log->action,
                    'module' => $log->module,
                    'time_ago' => $log->created_at?->diffForHumans(),
                ];
            });

        // Status breakdown with percentages
        $statusBreakdown = [];
        foreach ($byStatus as $status => $count) {
            $statusBreakdown[] = [
                'status' => $status,
                'count' => $count,
                'percentage' => $totalEnquiries > 0 ? round(($count / $totalEnquiries) * 100, 1) : 0,
            ];
        }

        // Priority breakdown with percentages
        $priorityBreakdown = [];
        foreach ($byPriority as $priority => $count) {
            $priorityBreakdown[] = [
                'priority' => $priority,
                'count' => $count,
                'percentage' => $totalEnquiries > 0 ? round(($count / $totalEnquiries) * 100, 1) : 0,
            ];
        }

        // Alerts (urgent/pending items needing attention)
        $alerts = [];
        $urgentCount = Enquiry::where('priority', 'URGENT')->whereNotIn('status', ['WON', 'LOST', 'CLOSED', 'COMPLETED', 'CANCELLED'])->count();
        if ($urgentCount > 0) {
            $alerts[] = [
                'id' => '1',
                'title' => "{$urgentCount} urgent enquiries need attention",
                'description' => 'High priority items still pending',
                'severity' => 'HIGH',
                'time_ago' => 'Now',
            ];
        }
        $pendingVendors = Vendor::where('status', 'pending')->count();
        if ($pendingVendors > 0) {
            $alerts[] = [
                'id' => '2',
                'title' => "{$pendingVendors} vendor registrations pending review",
                'description' => 'Awaiting approval',
                'severity' => 'MEDIUM',
                'time_ago' => 'Now',
            ];
        }
        $staleEnquiries = Enquiry::where('status', 'NEW')->where('created_at', '<', now()->subDays(3))->count();
        if ($staleEnquiries > 0) {
            $alerts[] = [
                'id' => '3',
                'title' => "{$staleEnquiries} enquiries untouched for 3+ days",
                'description' => 'Consider following up',
                'severity' => 'MEDIUM',
                'time_ago' => 'Now',
            ];
        }

        return response()->json([
            'total_enquiries' => $totalEnquiries,
            'new' => $newCount,
            'won' => $won,
            'lost' => $lost,
            'closed' => $closed,
            'pending' => $pending,
            'conversion_rate' => $conversionRate,
            'loss_rate' => $lossRate,
            'by_type' => $byType,
            'type_percentages' => $typePercentages,
            'by_status' => $byStatus,
            'status_breakdown' => $statusBreakdown,
            'by_priority' => $byPriority,
            'priority_breakdown' => $priorityBreakdown,
            'monthly' => $monthly,
            'vendor_stats' => $vendorStats,
            'type_performance' => $typePerformance,
            'funnel' => $funnel,
            'recent_activity' => $recentActivity,
            'alerts' => $alerts,
        ]);
    }

    public function enquiriesByType(Request $request)
    {
        $type = $request->get('type', 'RFQ');

        $statusBreakdown = Enquiry::where('type', $type)
            ->selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status')
            ->toArray();

        $monthly = Enquiry::where('type', $type)
            ->selectRaw('MONTH(created_at) as month, COUNT(*) as count')
            ->whereYear('created_at', now()->year)
            ->groupBy('month')
            ->orderBy('month')
            ->pluck('count', 'month')
            ->toArray();

        $months = [];
        for ($i = 1; $i <= 12; $i++) {
            $months[$i] = $monthly[$i] ?? 0;
        }

        return response()->json([
            'type' => $type,
            'status_breakdown' => $statusBreakdown,
            'monthly' => array_values($months),
            'total' => Enquiry::where('type', $type)->count(),
        ]);
    }
}
