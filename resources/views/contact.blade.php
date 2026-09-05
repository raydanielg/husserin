<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @php
        $seoTitle = 'Contact · Husserin Investment Company';
        $seoDescription = 'Get in touch with Husserin Investment Company Limited. Send us a message and our team will respond within 1-2 business days.';
        $seoType = 'website';
        $structuredData = [
            '@context' => 'https://schema.org',
            '@type' => 'ContactPage',
            'name' => $seoTitle,
            'description' => $seoDescription,
            'url' => config('app.url') . '/contact',
        ];
    @endphp
    @include('partials.seo')
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite(['resources/css/app.css', 'resources/js/contact.tsx'])
</head>
<body class="bg-background">
    <div id="app"></div>
</body>
</html>
