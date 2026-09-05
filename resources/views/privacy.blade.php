<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @php
        $seoTitle = 'Privacy Policy · Husserin Investment Company';
        $seoDescription = 'How Husserin Investment Company Limited collects, uses and protects your information.';
        $seoType = 'website';
    @endphp
    @include('partials.seo')
    @vite(['resources/css/app.css', 'resources/js/privacy.tsx'])
</head>
<body class="bg-background">
    <div id="app"></div>
</body>
</html>
