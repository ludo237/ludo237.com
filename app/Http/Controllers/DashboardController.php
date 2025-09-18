<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\JobExperience;
use App\Models\Post;
use Inertia\Inertia;
use Inertia\Response;

final class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('dashboard', [
            'stats' => [
                'posts' => Post::count(),
                'published_posts' => Post::whereNotNull('published_at')->count(),
                'job_experiences' => JobExperience::count(),
            ],
        ]);
    }
}
