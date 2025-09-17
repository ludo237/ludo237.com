<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function index(): Response
    {
        $posts = Post::latest()->paginate(20);

        return Inertia::render('posts/index', [
            'posts' => PostResource::collection($posts),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('posts/create');
    }

    public function store(StorePostRequest $request): RedirectResponse
    {
        // TOOD: missing slug
        Post::create($request->dto()->toArray());

        return redirect()->route('posts.index')
            ->with('success', 'Post created successfully.');
    }

    public function show(Post $post): Response
    {
        return Inertia::render('posts/show', [
            'post' => new PostResource($post),
        ]);
    }

    public function edit(Post $post): Response
    {
        return Inertia::render('posts/edit', [
            'post' => new PostResource($post),
        ]);
    }

    public function update(UpdatePostRequest $request, Post $post): RedirectResponse
    {
        $post->update([
            'title' => $request->dto()->title,
            'excerpt' => $request->dto()->excerpt,
            'cover' => $request->dto()->cover,
            'content' => $request->dto()->content,
            'published_at' => $request->dto()->publishedAt,
        ]);

        return redirect()->route('posts.index')
            ->with('success', 'Post updated successfully.');
    }

    public function destroy(Post $post): RedirectResponse
    {
        $post->delete();

        return redirect()->route('posts.index')
            ->with('success', 'Post deleted successfully.');
    }
}
