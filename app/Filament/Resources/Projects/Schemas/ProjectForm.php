<?php

namespace App\Filament\Resources\Projects\Schemas;

use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class ProjectForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                RichEditor::make('description')
                    ->required()
                    ->columnSpanFull(),
            ]);
    }
}
