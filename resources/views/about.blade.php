<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @php
        $seoTitle = 'About Us · Husserin Investment Company';
        $seoDescription = 'Husserin Investment Company Limited — a general trading, procurement and cargo consolidation company serving businesses and institutions.';
        $seoType = 'website';
        $structuredData = [
            '@context' => 'https://schema.org',
            '@type' => 'AboutPage',
            'name' => $seoTitle,
            'description' => $seoDescription,
            'url' => config('app.url') . '/about',
        ];
    @endphp
    @include('partials.seo')
    @vite(['resources/css/app.css', 'resources/js/about.tsx'])
</head>
<body class="bg-background">
    <div id="app"></div>
</body>
</html>
