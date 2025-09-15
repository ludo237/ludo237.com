<?php

namespace App\Filament\Resources\Urls\Pages;

use App\Filament\Resources\Urls\UrlResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewUrl extends ViewRecord
{
    protected static string $resource = UrlResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
