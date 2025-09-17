<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\JobExperienceResource;
use App\Http\Resources\SchoolResource;
use App\Models\JobExperience;
use App\Models\School;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $jobs = JobExperience::query()
            ->with('urls')
            ->latest('started_at')
            ->get();

        $schools = School::query()
            ->with('urls')
            ->latest('started_at')
            ->get();

        return Inertia::render('home', [
            'schools' => SchoolResource::collection($schools),
            'jobs' => JobExperienceResource::collection($jobs),
        ]);
    }
}
