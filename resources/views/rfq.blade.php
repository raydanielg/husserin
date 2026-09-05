<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @php
        $seoTitle = 'Submit RFQ · Husserin Investment Company';
        $seoDescription = 'Send us your specification, BOQ or product list. Our procurement team will source and quote against your requirement.';
        $seoType = 'website';
        $structuredData = [
            '@context' => 'https://schema.org',
            '@type' => 'WebPage',
            'name' => $seoTitle,
            'description' => $seoDescription,
            'url' => config('app.url') . '/rfq',
        ];
    @endphp
    @include('partials.seo')
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite(['resources/css/app.css', 'resources/js/rfq.tsx'])
</head>
<body class="bg-background">
    <div id="app"></div>
</body>
</html>
