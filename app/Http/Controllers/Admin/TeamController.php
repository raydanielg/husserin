<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\AuditLog;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    public function index()
    {
        $users = User::select('id', 'name', 'email', 'role', 'is_active', 'created_at')
            ->orderBy('name')
            ->get();

        return response()->json($users);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'is_active' => ['boolean'],
            'role' => ['sometimes', 'in:SUPER_ADMIN,STAFF'],
        ]);

        $oldValues = [
            'is_active' => $user->is_active,
            'role' => $user->role,
        ];

        $user->update($validated);

        AuditLog::create([
            'user_id' => auth()->id(),
            'action' => 'TEAM_UPDATE',
            'module' => 'Team',
            'reference_number' => $user->email,
            'description' => "Updated user {$user->name}",
            'old_values' => $oldValues,
            'new_values' => $validated,
            'ip_address' => $request->ip(),
        ]);

        return response()->json([
            'success' => true,
            'user' => $user->fresh(),
        ]);
    }
}
