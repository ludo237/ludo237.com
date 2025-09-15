<?php

namespace App\Filament\Resources\JobExperiences\Pages;

use App\Filament\Resources\JobExperiences\JobExperienceResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewJobExperience extends ViewRecord
{
    protected static string $resource = JobExperienceResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
