<?php

namespace App\Filament\Resources\Projects\RelationManagers;

use App\Filament\Resources\JobExperiences\JobExperienceResource;
use App\Filament\Resources\Urls\UrlResource;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\CreateAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class UrlsRelationManager extends RelationManager
{
    protected static string $relationship = 'urls';

    protected static ?string $relatedResource = UrlResource::class;

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->searchable(),
                TextColumn::make('href')
                    ->searchable(),
                TextColumn::make('type')
                    ->searchable(),
            ])
            ->headerActions([
                CreateAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
