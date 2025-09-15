<?php

namespace App\Filament\Resources\JobExperiences\Pages;

use App\Filament\Resources\JobExperiences\JobExperienceResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditJobExperience extends EditRecord
{
    protected static string $resource = JobExperienceResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
