<?php

namespace App\Filament\Resources\Urls\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class UrlInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('id')
                    ->label('ID'),
                TextEntry::make('owner_type'),
                TextEntry::make('owner_id'),
                TextEntry::make('name'),
                TextEntry::make('href'),
                TextEntry::make('type'),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
            ]);
    }
}
