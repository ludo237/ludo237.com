<?php

namespace App\Filament\Resources\Urls\Schemas;

use App\Models\JobExperience;
use App\Models\Project;
use Filament\Forms\Components\MorphToSelect;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class UrlForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                MorphToSelect::make("owner")
                    ->types([
                        MorphToSelect\Type::make(JobExperience::class)->titleAttribute("company"),
                        MorphToSelect\Type::make(Project::class)->titleAttribute('name'),
                    ])
                    ->searchable()
                    ->preload(),
                TextInput::make('name')
                    ->required(),
                TextInput::make('href')
                    ->label("Full URL")
                    ->required(),
                TextInput::make('type')
                    ->datalist([
                        'external',
                        'internal',
                    ])
                    ->required(),
            ]);
    }
}
