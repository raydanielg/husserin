<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @php
        $seoTitle = 'Tender & Procurement · Husserin Investment Company';
        $seoDescription = 'Tender supply and procurement services — we respond to RFQs, tenders and framework supply requirements with full compliance.';
        $seoType = 'website';
        $structuredData = [
            '@context' => 'https://schema.org',
            '@type' => 'ServicePage',
            'name' => 'Tender & Procurement',
            'description' => $seoDescription,
            'url' => config('app.url') . '/tender',
            'provider' => [
                '@type' => 'Organization',
                'name' => 'Husserin Investment Company Limited',
            ],
        ];
    @endphp
    @include('partials.seo')
    @vite(['resources/css/app.css', 'resources/js/tender.tsx'])
</head>
<body class="bg-background">
    <div id="app"></div>
</body>
</html>
