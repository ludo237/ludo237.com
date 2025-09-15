<?php

namespace App\Filament\Resources\JobExperiences\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class JobExperienceForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('avatar')
                    ->required(),
                TextInput::make('company')
                    ->required(),
                RichEditor::make('company_description')
                    ->required()
                    ->columnSpanFull(),
                TextInput::make('location')
                    ->required(),
                TextInput::make('role')
                    ->required(),
                RichEditor::make('role_description')
                    ->required()
                    ->columnSpanFull(),
                TagsInput::make('skills')
                    ->required()
                    ->columnSpanFull(),
                DatePicker::make('started_at')
                    ->required(),
                DatePicker::make('ended_at'),
            ]);
    }
}
