<x-mail::message>
# Reset Your Password

Hello {{ $name }},

We received a request to reset your password for your Husserin Investment Company account.

Click the button below to set a new password:

<x-mail::button :url="$resetUrl">
Reset Password
</x-mail::button>

This link will expire in **48 hours**. If you did not request a password reset, you can safely ignore this email.

---

If the button above doesn't work, copy and paste this link into your browser:

{{ $resetUrl }}

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
