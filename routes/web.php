<?php

use App\Models\JobExperience;
use App\Models\Language;
use App\Models\Post;
use App\Models\Project;
use App\Models\School;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $jobs = JobExperience::query()
        ->with('urls')
        ->latest('started_at')
        ->get();
    $projects = Project::query()
        ->with('urls')
        ->get();
    $schools = School::query()
        ->with('urls')
        ->latest('started_at')
        ->get();

    return Inertia::render('home', [
        'schools' => $schools,
        'jobs' => $jobs,
        'projects' => $projects,
    ]);
})->name('home');

Route::get('cv', function () {
    $jobs = JobExperience::query()
        ->with('urls')
        ->latest('started_at')
        ->get();
    $languages = Language::query()->get();
    $projects = Project::query()
        ->with('urls')
        ->latest()
        ->get();
    $schools = School::query()
        ->with('urls')
        ->latest('started_at')
        ->get();

    return Inertia::render('curriculum', [
        'jobs' => $jobs,
        'languages' => $languages,
        'projects' => $projects,
        'schools' => $schools,
    ]);
})->name('curriculum');

Route::prefix('blog')->group(function () {
    Route::get('/', function () {
        $posts = Post::query()->get();

        return Inertia::render('blog/index', [
            'posts' => $posts,
        ]);
    })->name('blog.index');

    Route::get('{slug}', function (string $slug) {
        $post = Post::query()->where('slug', '=', $slug)->firstOrFail();

        return Inertia::render('blog/show', [
            'post' => $post,
        ]);
    })->name('blog.show');
});
