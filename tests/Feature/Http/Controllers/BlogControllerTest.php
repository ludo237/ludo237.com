<?php

declare(strict_types=1);

use App\Models\Post;
use Database\Factories\PostFactory;

test('blog index page can be rendered', function () {
    $response = $this->get('/blog');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page->component('blog/index'));
});

test('blog index loads published posts ordered by date', function () {
    // Clear existing posts
    Post::query()->delete();

    $oldPost = PostFactory::new()->published()->create([
        'title' => 'Old Post',
        'published_at' => now()->subDays(2),
    ]);
    $newPost = PostFactory::new()->published()->create([
        'title' => 'New Post',
        'published_at' => now()->subDay(),
    ]);
    PostFactory::new()->draft()->create(['title' => 'Draft Post']);

    $response = $this->get('/blog');

    $response->assertStatus(200)
        ->assertInertia(fn ($page) => $page
            ->component('blog/index')
            ->has('posts', 2)
            ->where('posts.0.id', $newPost->id)
            ->where('posts.1.id', $oldPost->id)
        );
});

test('blog show page can be rendered with valid slug', function () {
    $post = PostFactory::new()->create(['slug' => 'test-post']);

    $response = $this->get('/blog/test-post');

    $response->assertStatus(200)
        ->assertInertia(fn ($page) => $page
            ->component('blog/show')
            ->where('post.id', $post->id)
            ->where('post.slug', 'test-post')
        );
});

test('blog show page returns 404 for invalid slug', function () {
    $response = $this->get('/blog/non-existent-post');

    $response->assertStatus(404);
});

test('blog show page loads specific post data', function () {
    $post = PostFactory::new()->create([
        'title' => 'My Awesome Post',
        'slug' => 'my-awesome-post',
        'content' => 'This is the content of my post.',
    ]);

    $response = $this->get('/blog/my-awesome-post');

    $response->assertStatus(200)
        ->assertInertia(fn ($page) => $page
            ->component('blog/show')
            ->where('post.title', 'My Awesome Post')
            ->where('post.content', 'This is the content of my post.')
        );
});
