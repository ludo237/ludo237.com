<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta content="ie=edge" http-equiv="x-ua-compatible">
    <meta name="handheldfriendly" content="true">

    <title inertia>{{ $page['props']['meta']['title'] ?? config('app.name') }}</title>
    <meta inertia name="description" content="{{ $page['props']['meta']['description'] }}">

@if(isset($page['props']['meta']['og']))
    <meta inertia property="og:title" content="{{ $page['props']['meta']['og']['title'] }}">
    <meta inertia property="og:description" content="{{ $page['props']['meta']['og']['description'] }}">
    <meta inertia property="og:type" content="{{ $page['props']['meta']['og']['type'] }}">
    <meta inertia property="og:url" content="{{ $page['props']['meta']['og']['url'] }}">
    <meta inertia property="og:image" content="{{ $page['props']['meta']['og']['image'] }}">
@endif

@if(isset($page['props']['meta']['twitter']))
    <meta inertia name="twitter:card" content="{{ $page['props']['meta']['twitter']['card'] }}">
    <meta inertia name="twitter:title" content="{{ $page['props']['meta']['twitter']['title'] }}">
    <meta inertia name="twitter:description" content="{{ $page['props']['meta']['twitter']['description'] }}">
    <meta inertia name="twitter:image" content="{{ $page['props']['meta']['twitter']['image'] }}">
    <meta inertia name="twitter:image:alt" content="{{ $page['props']['meta']['twitter']['alt'] }}">
@endif
    {{-- Inline script to detect system dark mode preference and apply it immediately --}}
    <script>
        (function() {
            const appearance = '{{ $appearance ?? "system" }}';

            if (appearance === 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                if (prefersDark) {
                    document.documentElement.classList.add('dark');
                }
            }
        })();
    </script>

    {{-- Inline style to set the HTML background color based on our theme in app.css --}}
    <style>
        html {
            background-color: oklch(1 0 0);
        }

        html.dark {
            background-color: oklch(0.145 0 0);
        }
    </style>

    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=jetbrains-mono:200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i|oxanium:500,600,700,800|source-serif-pro:300,300i,400,400i,600,600i,700,700i,900,900i" rel="stylesheet" />

    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead
</head>
<body class="font-sans antialiased overflow-y-scroll">
    @inertia
</body>
</html>
