<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @php
        $seoTitle = 'Vendor Registration · Husserin Investment Company';
        $seoDescription = 'Register your company as an approved supplier for Husserin Investment Company Limited.';
        $seoType = 'website';
        $structuredData = [
            '@context' => 'https://schema.org',
            '@type' => 'WebPage',
            'name' => $seoTitle,
            'description' => $seoDescription,
            'url' => config('app.url') . '/vendor-registration',
        ];
    @endphp
    @include('partials.seo')
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite(['resources/css/app.css', 'resources/js/vendor-registration.tsx'])
</head>
<body class="bg-background">
    <div id="app"></div>
</body>
</html>
