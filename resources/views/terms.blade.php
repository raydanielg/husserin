<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @php
        $seoTitle = 'Terms of Service · Husserin Investment Company';
        $seoDescription = 'Terms governing the use of Husserin Investment Company Limited website and services.';
        $seoType = 'website';
    @endphp
    @include('partials.seo')
    @vite(['resources/css/app.css', 'resources/js/terms.tsx'])
</head>
<body class="bg-background">
    <div id="app"></div>
</body>
</html>
