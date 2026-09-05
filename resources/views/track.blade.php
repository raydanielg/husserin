<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @php
        $seoTitle = 'Track Enquiry · Husserin Investment Company';
        $seoDescription = 'Track the status of your vendor registration, RFQ or contact message using your reference ID.';
        $seoType = 'website';
    @endphp
    @include('partials.seo')
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite(['resources/css/app.css', 'resources/js/track.tsx'])
</head>
<body class="bg-background">
    <div id="app"></div>
</body>
</html>
