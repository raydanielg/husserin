<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @php
        $seoTitle = 'Husserin Investment Company Limited · Global Trading, Procurement & Consolidation';
        $seoDescription = 'We source, supply and consolidate goods for businesses, institutions and project requirements. General Trading, Tender Supply, Procurement & Cargo Consolidation.';
        $seoType = 'website';
        $structuredData = [
            '@context' => 'https://schema.org',
            '@type' => 'WebSite',
            'name' => 'Husserin Investment Company Limited',
            'url' => config('app.url'),
            'description' => $seoDescription,
            'potentialAction' => [
                '@type' => 'SearchAction',
                'target' => config('app.url') . '/track?q={search_term_string}',
                'query-input' => 'required name=search_term_string',
            ],
        ];
    @endphp
    @include('partials.seo')
    @vite(['resources/css/app.css', 'resources/js/landing.tsx'])
</head>
<body class="bg-background">
    <div id="app"></div>
</body>
</html>
