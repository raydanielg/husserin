<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @php
        $seoTitle = 'Trading & Supply · Husserin Investment Company';
        $seoDescription = 'General trading and supply — we source and supply goods across multiple categories for businesses, institutions and project buyers.';
        $seoType = 'website';
        $structuredData = [
            '@context' => 'https://schema.org',
            '@type' => 'ServicePage',
            'name' => 'Trading & Supply',
            'description' => $seoDescription,
            'url' => config('app.url') . '/trading',
            'provider' => [
                '@type' => 'Organization',
                'name' => 'Husserin Investment Company Limited',
            ],
        ];
    @endphp
    @include('partials.seo')
    @vite(['resources/css/app.css', 'resources/js/trading.tsx'])
</head>
<body class="bg-background">
    <div id="app"></div>
</body>
</html>
