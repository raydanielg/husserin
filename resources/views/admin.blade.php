<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Admin · Husserin Investment Company</title>
    <link rel="icon" type="image/png" href="{{ asset('assets/images/Hesserin Logo-01.png') }}" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite(['resources/css/app.css', 'resources/js/admin.tsx'])
</head>
<body class="bg-background">
    <div id="app"></div>
</body>
</html>
