<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @php
        $seoTitle = 'Industries · Husserin Investment Company';
        $seoDescription = 'We source and supply across a wide range of industries — government, construction, aviation, energy, ICT, hospitality, healthcare, automotive and more.';
        $seoType = 'website';
        $structuredData = [
            '@context' => 'https://schema.org',
            '@type' => 'CollectionPage',
            'name' => 'Industries We Serve',
            'description' => $seoDescription,
            'url' => config('app.url') . '/industries',
        ];
    @endphp
    @include('partials.seo')
    @vite(['resources/css/app.css', 'resources/js/industries-page.tsx'])
</head>
<body class="bg-background">
    <div id="app"></div>
</body>
</html>
