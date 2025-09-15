<?php

namespace App\Filament\Resources\Urls;

use App\Filament\Resources\Urls\Pages\CreateUrl;
use App\Filament\Resources\Urls\Pages\EditUrl;
use App\Filament\Resources\Urls\Pages\ListUrls;
use App\Filament\Resources\Urls\Pages\ViewUrl;
use App\Filament\Resources\Urls\Schemas\UrlForm;
use App\Filament\Resources\Urls\Schemas\UrlInfolist;
use App\Filament\Resources\Urls\Tables\UrlsTable;
use App\Models\Url;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class UrlResource extends Resource
{
    protected static ?string $model = Url::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'Urls';

    public static function form(Schema $schema): Schema
    {
        return UrlForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return UrlInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return UrlsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListUrls::route('/'),
            'create' => CreateUrl::route('/create'),
            'view' => ViewUrl::route('/{record}'),
            'edit' => EditUrl::route('/{record}/edit'),
        ];
    }
}
