<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Dashboard · Husserin Investment Company</title>
    <meta name="description" content="Admin dashboard for managing enquiries, vendors, RFQs and operations.">
    <link rel="icon" type="image/png" href="{{ asset('assets/images/Hesserin Logo-01.png') }}" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite(['resources/css/app.css', 'resources/js/dashboard.tsx'])
</head>
<body class="bg-background">
    <div id="app"></div>
</body>
</html>
