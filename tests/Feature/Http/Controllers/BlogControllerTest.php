<?php

use App\Models\Post;

test('blog index page can be rendered', function () {
    $response = $this->get('/blog');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page->component('blog/index'));
});

test('blog index loads all posts', function () {
    $post1 = Post::factory()->create(['title' => 'First Post']);
    $post2 = Post::factory()->create(['title' => 'Second Post']);

    $response = $this->get('/blog');

    $response->assertStatus(200)
        ->assertInertia(fn ($page) => $page
            ->component('blog/index')
            ->has('posts', 2)
            ->where('posts.0.id', $post1->id)
            ->where('posts.1.id', $post2->id)
        );
});

test('blog show page can be rendered with valid slug', function () {
    $post = Post::factory()->create(['slug' => 'test-post']);

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
    $post = Post::factory()->create([
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
