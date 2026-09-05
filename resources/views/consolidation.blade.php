<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @php
        $seoTitle = 'Cargo Consolidation · Husserin Investment Company';
        $seoDescription = 'We combine orders from multiple vendors and suppliers into coordinated consolidated cargo, reducing freight costs and simplifying documentation.';
        $seoType = 'website';
        $structuredData = [
            '@context' => 'https://schema.org',
            '@type' => 'ServicePage',
            'name' => 'Cargo Consolidation',
            'description' => $seoDescription,
            'url' => config('app.url') . '/consolidation',
            'provider' => [
                '@type' => 'Organization',
                'name' => 'Husserin Investment Company Limited',
            ],
        ];
    @endphp
    @include('partials.seo')
    @vite(['resources/css/app.css', 'resources/js/consolidation.tsx'])
</head>
<body class="bg-background">
    <div id="app"></div>
</body>
</html>
