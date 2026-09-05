<x-mail::message>
# New RFQ Submission

A new Request for Quotation has been submitted.

**Reference ID:** {{ $enquiryId }}

---

**Company:** {{ $data['company'] }}
**Contact Person:** {{ $data['contact_person'] }}
**Email:** {{ $data['email'] }}
**Phone:** {{ $data['phone'] ?? '—' }}
**Country:** {{ $data['country'] ?? '—' }}

**Item / Specification:**
{{ $data['item_or_spec'] }}

**Category:** {{ $data['category'] ?? '—' }}
**Quantity:** {{ isset($data['quantity']) ? $data['quantity'] . ' ' . ($data['unit'] ?? '') : '—' }}
**Destination:** {{ $data['destination'] ?? '—' }}
**Required Date:** {{ $data['required_date'] ?? '—' }}

**Additional Notes:**
{{ $data['message'] ?? '—' }}

---

You can track this enquiry using the reference ID above.

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
