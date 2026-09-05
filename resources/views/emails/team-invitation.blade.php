<x-mail::message>
# Welcome to Husserin Investment Company

Hello {{ $name }},

You have been invited to join the Husserin Investment Company admin panel as a **{{ $role === 'SUPER_ADMIN' ? 'Super Admin' : 'Staff Member' }}**.

To activate your account, please set your password by clicking the button below:

<x-mail::button :url="$setupUrl">
Set Your Password
</x-mail::button>

This link will expire in **48 hours**. If you did not expect this invitation, you can safely ignore this email.

---

**Your email:** {{ $email }}

If the button above doesn't work, copy and paste this link into your browser:

{{ $setupUrl }}

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
