<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    public function index(): Response
    {
        $posts = Post::query()
            ->whereNotNull('published_at')
            ->orderBy('published_at', 'desc')
            ->get();

        return Inertia::render('blog/index', [
            'posts' => $posts,
        ]);
    }

    public function show(string $slug): Response
    {
        $post = Post::query()->where('slug', '=', $slug)->firstOrFail();

        return Inertia::render('blog/show', [
            'post' => $post,
        ]);
    }
}
