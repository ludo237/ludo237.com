<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\JobExperienceResource;
use App\Http\Resources\LanguageResource;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\SchoolResource;
use App\Models\JobExperience;
use App\Models\Language;
use App\Models\Project;
use App\Models\School;
use Inertia\Inertia;
use Inertia\Response;

final class CurriculumController extends Controller
{
    public function index(): Response
    {
        $jobs = JobExperience::query()
            ->with('urls')
            ->orderByRaw('ended_at IS NULL DESC, started_at DESC')
            ->get();

        $languages = Language::query()->get();

        $projects = Project::query()
            ->with('urls')
            ->latest()
            ->get();

        $schools = School::query()
            ->with('urls')
            ->orderBy('ended_at', 'desc')
            ->get();

        return Inertia::render('curriculum', [
            'jobs' => JobExperienceResource::collection($jobs),
            'languages' => LanguageResource::collection($languages),
            'projects' => ProjectResource::collection($projects),
            'schools' => SchoolResource::collection($schools),
        ]);
    }
}
