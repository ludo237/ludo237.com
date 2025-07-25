<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        $posts = Post::query()
            ->whereNotNull('published_at')
            ->orderBy('published_at', 'desc')
            ->get();

        return Inertia::render('blog/index', [
            'posts' => $posts,
        ]);
    }

    public function show(string $slug)
    {
        $post = Post::query()->where('slug', '=', $slug)->firstOrFail();

        return Inertia::render('blog/show', [
            'post' => $post,
        ]);
    }
}
