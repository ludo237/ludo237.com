<?php

namespace App\Http\Controllers;

use App\Models\JobExperience;
use App\Models\Language;
use App\Models\Project;
use App\Models\School;
use Inertia\Inertia;

class CurriculumController extends Controller
{
    public function index()
    {
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
    }
}
