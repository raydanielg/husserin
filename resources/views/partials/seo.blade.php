@php
    $siteUrl = config('app.url');
    $siteUrl = rtrim($siteUrl, '/');
    $currentUrl = $siteUrl . request()->getRequestUri();
    $defaultImage = $siteUrl . '/assets/images/Hesserin Logo-01.png';
    $seoImage = $seoImage ?? $defaultImage;
    $seoTitle = $seoTitle ?? 'Husserin Investment Company Limited';
    $seoDescription = $seoDescription ?? 'We source, supply and consolidate goods for businesses, institutions and project requirements. General Trading, Tender Supply, Procurement & Cargo Consolidation.';
    $seoType = $seoType ?? 'website';
@endphp

<!-- Primary Meta Tags -->
<title>{{ $seoTitle }}</title>
<meta name="title" content="{{ $seoTitle }}">
<meta name="description" content="{{ $seoDescription }}">
<meta name="keywords" content="general trading, procurement, tender supply, cargo consolidation, vendor registration, RFQ, sourcing, supply chain, logistics, Tanzania, East Africa, Husserin Investment">
<meta name="author" content="Husserin Investment Company Limited">
<meta name="robots" content="index, follow">
<meta name="language" content="English">
<meta name="revisit-after" content="7 days">
<link rel="canonical" href="{{ $currentUrl }}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="{{ $seoType }}">
<meta property="og:url" content="{{ $currentUrl }}">
<meta property="og:title" content="{{ $seoTitle }}">
<meta property="og:description" content="{{ $seoDescription }}">
<meta property="og:image" content="{{ $seoImage }}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:site_name" content="Husserin Investment Company Limited">
<meta property="og:locale" content="en_US">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="{{ $currentUrl }}">
<meta name="twitter:title" content="{{ $seoTitle }}">
<meta name="twitter:description" content="{{ $seoDescription }}">
<meta name="twitter:image" content="{{ $seoImage }}">

<!-- Favicon -->
<link rel="icon" type="image/png" href="{{ asset('assets/images/Hesserin Logo-01.png') }}">
<link rel="apple-touch-icon" href="{{ asset('assets/images/Hesserin Logo-01.png') }}">
<link rel="manifest" href="{{ $siteUrl }}/site.webmanifest">

<!-- Structured Data: Organization -->
<script type="application/ld+json">
{
  "@@context": "https://schema.org",
  "@@type": "Organization",
  "name": "Husserin Investment Company Limited",
  "url": "{{ $siteUrl }}",
  "logo": "{{ $defaultImage }}",
  "description": "General trading, procurement and cargo consolidation company serving businesses and institutions.",
  "sameAs": [
    "{{ $siteUrl }}"
  ]
}
</script>

@if(isset($structuredData))
<script type="application/ld+json">
{{ json_encode($structuredData) }}
</script>
@endif
