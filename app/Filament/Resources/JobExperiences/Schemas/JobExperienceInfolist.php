<?php

namespace App\Filament\Resources\JobExperiences\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class JobExperienceInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('id')
                    ->label('ID'),
                TextEntry::make('avatar'),
                TextEntry::make('company'),
                TextEntry::make('company_description')
                    ->columnSpanFull(),
                TextEntry::make('location'),
                TextEntry::make('role'),
                TextEntry::make('role_description')
                    ->columnSpanFull(),
                TextEntry::make('skills')
                    ->columnSpanFull(),
                TextEntry::make('started_at')
                    ->date(),
                TextEntry::make('ended_at')
                    ->date()
                    ->placeholder('-'),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
            ]);
    }
}
