<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

/**
 * Provides default SEO meta tags for all Inertia pages.
 *
 * Controllers can override specific meta properties using a mergeSeoValues() method
 * that manually merges controller meta with shared defaults from this middleware.
 *
 * Example implementation of mergeSeoValues() in your controller:
 *
 * protected function mergeSeoValues(array $meta): array
 * {
 *     return array_merge_recursive(
 *         Inertia::getShared()['meta'] ?? [],
 *         $meta
 *     );
 * }
 *
 * Usage examples:
 *
 * // Override just the title, inherit defaults for description, og, twitter:
 * return Inertia::render('page', [
 *     'meta' => $this->mergeSeoValues([
 *         'title' => 'Custom Page Title',
 *     ])
 * ]);
 *
 * // Override multiple properties:
 * return Inertia::render('page', [
 *     'meta' => $this->mergeSeoValues([
 *         'title' => 'Custom Title',
 *         'description' => 'Custom description',
 *     ])
 * ]);
 *
 * // Override nested properties (like og title) while keeping other og properties:
 * return Inertia::render('page', [
 *     'meta' => $this->mergeSeoValues([
 *         'og' => [
 *             'title' => 'Custom OG Title',
 *             // Inherits og.description, og.image, etc. from defaults
 *         ]
 *     ])
 * ]);
 *
 * // Completely override all meta (no inheritance):
 * return Inertia::render('page', [
 *     'meta' => [
 *         'title' => '...',
 *         'description' => '...',
 *         'og' => [...],
 *         'twitter' => [...]
 *     ]
 * ]);
 *
 * // Use defaults (no meta in controller):
 * return Inertia::render('page');
 */
final class HandleSeo
{
    public function handle(Request $request, Closure $next): Response
    {
        // Share default meta data before the response is built
        Inertia::share('meta', $this->getDefaultSeoMeta($request));

        return $next($request);
    }

    /**
     * @return array<string, mixed>
     */
    private function getDefaultSeoMeta(Request $request): array
    {
        $appUrl = config('app.url');
        $currentUrl = $request->url();
        $routeName = $request->route()?->getName();

        // Get route-specific SEO content
        $seoData = $this->getRouteSpecificSeo($routeName);

        return [
            'title' => $seoData['title'],
            'description' => $seoData['description'],
            'og' => [
                'title' => $seoData['title'],
                'description' => $seoData['description'],
                'type' => 'website',
                'url' => $currentUrl,
                'image' => $appUrl.'/og-image.jpg', // Placeholder until image is ready
            ],
            'twitter' => [
                'card' => 'summary_large_image',
                'title' => $seoData['title'],
                'description' => $seoData['description'],
                'image' => $appUrl.'/og-image.jpg', // Placeholder until image is ready
                'alt' => $seoData['alt'] ?? $seoData['title'],
            ],
        ];
    }

    /**
     * Get SEO content specific to the current route
     *
     * @return array<string, string>
     */
    private function getRouteSpecificSeo(?string $routeName): array
    {
        return match ($routeName) {
            'curriculum' => [
                'title' => 'CV - Claudio Ludovico Panetta | Full Stack Developer & CTO',
                'description' => 'Curriculum of Claudio Ludovico Panetta: from Full Stack Developer at 6GO to Senior Engineer at Immobiliare.it, now CTO scaling SaaS platforms. Expertise in PHP, Laravel, React, TypeScript, and remote team leadership.',
                'alt' => 'Professional CV and career timeline of Claudio Ludovico Panetta',
            ],
            'blog.index' => [
                'title' => 'Tech Blog - Development & Leadership Insights',
                'description' => 'Technical blog covering full-stack development, SaaS architecture, team leadership, and personal insights from a self-taught developer turned CTO. Topics include PHP, Laravel, React, DevOps, and technology philosophy.',
                'alt' => 'Technical blog about software development, SaaS, and technology leadership',
            ],
            default => [
                'title' => 'Claudio Ludovico Panetta - Full Stack Developer & CTO',
                'description' => 'Self-taught Full Stack Developer and Chief Technology Officer with expertise in PHP, Laravel, React, TypeScript. Passionate about SaaS, DevOps, and team leadership. Currently scaling back-end APIs and leading remote development teams.',
                'alt' => 'Claudio Ludovico Panetta - Full Stack Developer, CTO, and Technology Leader',
            ],
        };
    }
}
