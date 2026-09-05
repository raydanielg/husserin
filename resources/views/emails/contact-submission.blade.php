<x-mail::message>
# New Contact Message

A new contact message has been received.

**Reference ID:** {{ $enquiryId }}

---

**Name:** {{ $data['name'] }}
**Email:** {{ $data['email'] }}
**Phone:** {{ $data['phone'] ?? '—' }}
**Company:** {{ $data['company'] ?? '—' }}

**Subject:** {{ $data['subject'] }}

**Message:**
{{ $data['message'] }}

---

You can track this enquiry using the reference ID above.

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
