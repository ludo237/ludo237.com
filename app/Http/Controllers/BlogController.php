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
        /** @var Post $post */
        $post = Post::query()->where('slug', '=', $slug)->firstOrFail();

        return Inertia::render('blog/show', [
            'post' => $post,
            'meta' => $this->mergeSeoValues([
                'title' => $post->getAttributeValue('title'),
                'description' => $post->getAttributeValue('title'),
                'og' => [
                    'title' => $post->getAttributeValue('title'),
                    'description' => $post->getAttributeValue('title'),
                    'type' => 'article',
                    'url' => route('blog.show', $post->getAttributeValue('slug')),
                    'image' => $post->getAttributeValue('cover'),
                ],
                'twitter' => [
                    'card' => 'summary_large_image',
                    'title' => $post->getAttributeValue('title'),
                    'description' => $post->getAttributeValue('title'),
                    'alt' => $post->getAttributeValue('title'),
                    'image' => $post->getAttributeValue('cover'),
                ],
            ]),
        ]);
    }
}
