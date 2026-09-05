<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Track Enquiry · Husserin Investment Company</title>
    <meta name="description" content="Track the status of your vendor registration, RFQ or contact message using your reference ID.">
    <link rel="icon" type="image/png" href="{{ asset('assets/images/Hesserin Logo-01.png') }}" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite(['resources/css/app.css', 'resources/js/track.tsx'])
</head>
<body class="bg-background">
    <div id="app"></div>
</body>
</html>
