<x-mail::message>
# New Vendor Registration

A new vendor registration has been submitted.

**Reference ID:** {{ $enquiryId }}

---

**Company Name:** {{ $data['company_name'] }}
**Country:** {{ $data['country'] }}
**Contact Person:** {{ $data['contact_person'] }}
**Email:** {{ $data['email'] }}
**Phone:** {{ $data['phone'] }}
**Website:** {{ $data['website'] ?? '—' }}
**Category:** {{ $data['category'] }}
**Brands:** {{ $data['brands'] ?? '—' }}
**Certifications:** {{ $data['certifications'] ?? '—' }}

**Address:**
{{ $data['address'] ?? '—' }}

**Message:**
{{ $data['message'] ?? '—' }}

---

You can track this enquiry using the reference ID above.

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
