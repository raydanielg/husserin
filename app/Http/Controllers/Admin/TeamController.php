<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\AuditLog;
use App\Mail\TeamInvitation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
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
            'role' => ['required', 'in:SUPER_ADMIN,STAFF'],
        ]);

        $token = Str::random(60);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make(Str::random(32)),
            'role' => $validated['role'],
            'is_active' => true,
            'email_verified_at' => now(),
            'password_setup_token' => $token,
            'password_setup_expires_at' => now()->addHours(48),
        ]);

        $setupUrl = url("/set-password?token={$token}&email=" . urlencode($validated['email']));

        $emailSent = true;
        $emailError = null;

        try {
            Mail::to($validated['email'])->send(new TeamInvitation(
                $validated['name'],
                $validated['email'],
                $validated['role'],
                $setupUrl,
            ));
        } catch (\Exception $e) {
            $emailSent = false;
            $emailError = $e->getMessage();
        }

        AuditLog::create([
            'user_id' => auth()->id(),
            'action' => 'TEAM_CREATED',
            'module' => 'Team',
            'reference_number' => $user->email,
            'description' => "Created user {$user->name} with role {$user->role}" . ($emailSent ? " and sent invitation email" : " (email failed: {$emailError})"),
            'new_values' => ['name' => $user->name, 'email' => $user->email, 'role' => $user->role],
            'ip_address' => $request->ip(),
        ]);

        return response()->json([
            'success' => true,
            'user' => $user->only(['id', 'name', 'email', 'role', 'is_active', 'created_at']),
            'message' => $emailSent
                ? 'Invitation email sent to ' . $validated['email']
                : 'User created but email could not be sent. Share the setup link manually.',
            'email_sent' => $emailSent,
            'setup_url' => $emailSent ? null : $setupUrl,
        ], 201);
    }

    public function resendInvitation(Request $request, $id)
    {
        $user = User::findOrFail($id);

        if (!$user->password_setup_token) {
            $token = Str::random(60);
            $user->update([
                'password_setup_token' => $token,
                'password_setup_expires_at' => now()->addHours(48),
            ]);
        } else {
            if ($user->password_setup_expires_at && $user->password_setup_expires_at->isPast()) {
                $token = Str::random(60);
                $user->update([
                    'password_setup_token' => $token,
                    'password_setup_expires_at' => now()->addHours(48),
                ]);
            } else {
                $token = $user->password_setup_token;
            }
        }

        $setupUrl = url("/set-password?token={$token}&email=" . urlencode($user->email));

        $emailSent = true;
        $emailError = null;

        try {
            Mail::to($user->email)->send(new TeamInvitation(
                $user->name,
                $user->email,
                $user->role,
                $setupUrl,
            ));
        } catch (\Exception $e) {
            $emailSent = false;
            $emailError = $e->getMessage();
        }

        AuditLog::create([
            'user_id' => auth()->id(),
            'action' => 'TEAM_RESEND_INVITATION',
            'module' => 'Team',
            'reference_number' => $user->email,
            'description' => "Resent invitation to {$user->name}" . ($emailSent ? "" : " (email failed: {$emailError})"),
            'ip_address' => $request->ip(),
        ]);

        return response()->json([
            'success' => true,
            'message' => $emailSent
                ? 'Invitation email resent to ' . $user->email
                : 'Email could not be sent. Share the setup link manually.',
            'email_sent' => $emailSent,
            'setup_url' => $emailSent ? null : $setupUrl,
        ]);
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
