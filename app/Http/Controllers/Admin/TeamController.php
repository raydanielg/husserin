<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\AuditLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class TeamController extends Controller
{
    public function index()
    {
        $users = User::select('id', 'name', 'email', 'role', 'is_active', 'created_at')
            ->orderBy('name')
            ->get();

        return response()->json($users);
    }

    public function create(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
            'role' => ['required', 'in:SUPER_ADMIN,STAFF'],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        AuditLog::create([
            'user_id' => auth()->id(),
            'action' => 'TEAM_CREATED',
            'module' => 'Team',
            'reference_number' => $user->email,
            'description' => "Created user {$user->name} with role {$user->role}",
            'new_values' => ['name' => $user->name, 'email' => $user->email, 'role' => $user->role],
            'ip_address' => $request->ip(),
        ]);

        return response()->json([
            'success' => true,
            'user' => $user->only(['id', 'name', 'email', 'role', 'is_active', 'created_at']),
        ], 201);
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
