<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\StoreJobExperienceRequest;
use App\Http\Requests\UpdateJobExperienceRequest;
use App\Http\Resources\JobExperienceResource;
use App\Models\JobExperience;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class JobExperienceController extends Controller
{
    public function index(): Response
    {
        $jobExperiences = JobExperience::with('urls')
            ->orderBy('started_at', 'desc')
            ->paginate(20);

        return Inertia::render('job-experiences/index', [
            'jobExperiences' => JobExperienceResource::collection($jobExperiences),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('job-experiences/create');
    }

    public function store(StoreJobExperienceRequest $request): RedirectResponse
    {
        $dto = $request->dto();

        JobExperience::create($dto->toArray());

        return redirect()->route('job-experiences.index')
            ->with('success', 'Job experience created successfully.');
    }

    public function show(JobExperience $jobExperience): Response
    {
        $jobExperience->loadMissing('urls');

        return Inertia::render('job-experiences/show', [
            'jobExperience' => new JobExperienceResource($jobExperience),
        ]);
    }

    public function edit(JobExperience $jobExperience): Response
    {
        return Inertia::render('job-experiences/edit', [
            'jobExperience' => new JobExperienceResource($jobExperience),
        ]);
    }

    public function update(UpdateJobExperienceRequest $request, JobExperience $jobExperience): RedirectResponse
    {
        $dto = $request->dto();

        $jobExperience->update($dto->toArray());

        return redirect()->route('job-experiences.index')
            ->with('success', 'Job experience updated successfully.');
    }

    public function destroy(JobExperience $jobExperience): RedirectResponse
    {
        $jobExperience->delete();

        return redirect()->route('job-experiences.index')
            ->with('success', 'Job experience deleted successfully.');
    }
}
