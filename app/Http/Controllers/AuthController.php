<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Mail\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        if (Auth::attempt($credentials, $request->boolean('remember'))) {
            $request->session()->regenerate();

            $user = Auth::user();

            if (!$user->is_active) {
                Auth::logout();
                return response()->json([
                    'message' => 'Your account has been deactivated. Contact the administrator.',
                ], 403);
            }

            return response()->json([
                'success' => true,
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                ],
                'redirect' => $user->isSuperAdmin() ? '/dashboard' : '/dashboard',
            ]);
        }

        return response()->json([
            'message' => 'Invalid email or password.',
        ], 422);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['success' => true]);
    }

    public function me()
    {
        if (!Auth::check()) {
            return response()->json(['user' => null], 401);
        }

        $user = Auth::user();

        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'is_active' => $user->is_active,
            ],
        ]);
    }

    public function forgotPassword(Request $request)
    {
        $validated = $request->validate([
            'email' => ['required', 'email'],
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (!$user) {
            return response()->json([
                'success' => true,
                'message' => 'If an account with that email exists, a password reset link has been sent.',
            ]);
        }

        $token = Str::random(60);

        $user->update([
            'password_setup_token' => $token,
            'password_setup_expires_at' => now()->addHours(48),
        ]);

        $resetUrl = url("/set-password?token={$token}&email=" . urlencode($validated['email']) . "&mode=reset");

        Mail::to($validated['email'])->send(new PasswordReset(
            $user->name,
            $resetUrl,
        ));

        return response()->json([
            'success' => true,
            'message' => 'If an account with that email exists, a password reset link has been sent.',
        ]);
    }

    public function setPassword(Request $request)
    {
        $validated = $request->validate([
            'token' => ['required', 'string'],
            'email' => ['required', 'email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $user = User::where('email', $validated['email'])
            ->where('password_setup_token', $validated['token'])
            ->first();

        if (!$user) {
            return response()->json([
                'message' => 'Invalid or expired token. Please request a new password reset link.',
            ], 422);
        }

        if ($user->password_setup_expires_at && $user->password_setup_expires_at->isPast()) {
            return response()->json([
                'message' => 'This link has expired. Please request a new password reset link.',
            ], 422);
        }

        $user->update([
            'password' => Hash::make($validated['password']),
            'password_setup_token' => null,
            'password_setup_expires_at' => null,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Your password has been set successfully. You can now sign in.',
        ]);
    }
}
