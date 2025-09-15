<?php

namespace App\Filament\Resources\Urls\Pages;

use App\Filament\Resources\Urls\UrlResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditUrl extends EditRecord
{
    protected static string $resource = UrlResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
