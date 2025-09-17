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

class CurriculumController extends Controller
{
    public function index(): Response
    {
        $jobs = JobExperience::query()
            ->with('urls')
            ->get()
            ->sort(function ($a, $b) {
                $aStartDate = strtotime($a->started_at);
                $aEndDate = $a->ended_at ? strtotime($a->ended_at) : null;
                $bStartDate = strtotime($b->started_at);
                $bEndDate = $b->ended_at ? strtotime($b->ended_at) : null;
                $now = time();
                $twoYearsAgo = $now - (2 * 365 * 24 * 60 * 60);

                // Priority 1: Current/ongoing jobs (no end date)
                if (! $aEndDate && $bEndDate) {
                    return -1;
                }
                if ($aEndDate && ! $bEndDate) {
                    return 1;
                }
                if (! $aEndDate && ! $bEndDate) {
                    // Both ongoing, sort by start date (newest first)
                    return $bStartDate - $aStartDate;
                }

                // Priority 2: Recently ended jobs (within 2 years)
                $aRecentlyEnded = $aEndDate && $aEndDate > $twoYearsAgo;
                $bRecentlyEnded = $bEndDate && $bEndDate > $twoYearsAgo;

                if ($aRecentlyEnded && ! $bRecentlyEnded) {
                    return -1;
                }
                if (! $aRecentlyEnded && $bRecentlyEnded) {
                    return 1;
                }
                if ($aRecentlyEnded && $bRecentlyEnded) {
                    // Both recently ended, sort by end date (newest first)
                    return $bEndDate - $aEndDate;
                }

                // Priority 3: Historical jobs, sort by start date (newest first)
                return $bStartDate - $aStartDate;
            })
            ->values();

        $languages = Language::query()->get();

        $projects = Project::query()
            ->with('urls')
            ->latest()
            ->get();

        $schools = School::query()
            ->with('urls')
            ->get()
            ->sort(function ($a, $b) {
                $aStartDate = strtotime($a->started_at);
                $aEndDate = strtotime($a->ended_at);
                $bStartDate = strtotime($b->started_at);
                $bEndDate = strtotime($b->ended_at);
                $now = time();
                $twoYearsAgo = $now - (2 * 365 * 24 * 60 * 60);

                // For schools, prioritize more recent completions first
                // Recently completed schools
                $aRecentlyCompleted = $aEndDate > $twoYearsAgo;
                $bRecentlyCompleted = $bEndDate > $twoYearsAgo;

                if ($aRecentlyCompleted && ! $bRecentlyCompleted) {
                    return -1;
                }
                if (! $aRecentlyCompleted && $bRecentlyCompleted) {
                    return 1;
                }

                return $bEndDate - $aEndDate;

                // Historical schools, sort by end date (newest first)
            })
            ->values();

        return Inertia::render('curriculum', [
            'jobs' => JobExperienceResource::collection($jobs),
            'languages' => LanguageResource::collection($languages),
            'projects' => ProjectResource::collection($projects),
            'schools' => SchoolResource::collection($schools),
        ]);
    }
}
