<?php

namespace App\Http\Controllers;

use App\Models\JobExperience;
use App\Models\Project;
use App\Models\School;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
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
    }
}
