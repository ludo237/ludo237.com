# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Technology Stack

This is a Laravel + React application using:
- **Backend**: Laravel 12 with Inertia.js for SPA-style navigation
- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite with Laravel Vite plugin
- **CSS**: Tailwind CSS 4.x
- **UI Components**: Radix UI primitives with shadcn/ui patterns
- **Testing**: Pest PHP (backend), no frontend testing framework configured
- **Database**: SQLite (for development)

## Development Commands

### Starting Development Environment
- `composer run dev` - Starts full development environment (Laravel server, queue worker, logs, and Vite)
- `composer run dev:ssr` - Development with Server-Side Rendering enabled
- `bun run dev` - Frontend only (Vite dev server)

### Code Quality
- `bun run lint` - Run ESLint with auto-fix
- `bun run format` - Format code with Prettier
- `bun run format:check` - Check formatting without changes
- `bun run types` - TypeScript type checking
- `composer run test` - Run PHP tests with Pest

### Building
- `bun run build` - Build for production
- `bun run build:ssr` - Build with SSR support

### Single Test Execution
- `php artisan test --filter=TestName` - Run a specific test class
- `php artisan test tests/Feature/path/to/TestFile.php` - Run a specific test file

## Architecture

### Backend Structure
- **Controllers**: Standard Laravel controllers in `app/Http/Controllers/`
  - Routes defined directly in `routes/web.php` using closures (no dedicated controllers currently)
  - Simple routing structure for home, CV, and blog pages
- **Models**: Eloquent models in `app/Models/`
  - `Post`, `Project`, `JobExperience`, `School`, `Language`, `User`, `Url`
  - All models include factories for seeding test data
- **Database**: SQLite for development, migrations in `database/migrations/`
- **Seeders**: Database seeders in `database/seeders/` for populating development data
- **Routes**: Main routes in `routes/web.php` (single file structure)

### Frontend Structure
- **Entry Point**: `resources/js/app.tsx` - Inertia.js React setup with theme initialization
- **Pages**: Located in `resources/js/pages/` (Inertia convention)
  - `home.tsx`, `curriculum.tsx`, `blog/index.tsx`, `blog/show.tsx`, `error.tsx`
- **Components**: 
  - UI components in `resources/js/components/ui/` (shadcn/ui style)
  - Feature components in `resources/js/components/` (`header.tsx`, `career-timeline.tsx`, `projects.tsx`)
- **Hooks**: Custom React hooks in `resources/js/hooks/`
  - `use-appearance.tsx` - Theme switching functionality
  - `use-mobile.tsx`, `use-mobile-navigation.ts` - Mobile responsive behavior
  - `use-initials.tsx` - User avatar initials
- **Types**: TypeScript definitions in `resources/js/types/`
- **Utils**: Helper functions in `resources/js/lib/utils.ts`

### Key Integrations
- **Inertia.js**: Connects Laravel backend to React frontend without API
- **Ziggy**: Laravel route helper for frontend (aliased in Vite config at `vendor/tightenco/ziggy`)
- **SSR Support**: Configured with `resources/js/ssr.tsx` (enabled by default in config)
- **shadcn/ui**: UI component system configured in `components.json` with Radix UI primitives
- **Tailwind CSS 4.x**: With Vite plugin integration and custom CSS variables for theming

### Database Schema
- Uses SQLite for development (file at `database/database.sqlite`)
- **Core Models**: User authentication and core entities
- **Content Models**: Posts, Projects, JobExperience, School, Language, Url
- **Relationships**: Models use Eloquent relationships (e.g., `with('urls')` for URL attachments)
- All models include factories and comprehensive seeders for development data

## Code Formatting
- **Prettier**: 4-space tabs, single quotes, 150 character line width
- **ESLint**: TypeScript + React rules with React 17+ JSX transform (no React import needed)
- **File Organization**: Prettier plugin organizes imports automatically
- **Import Aliases**: `@/*` maps to `resources/js/*` for cleaner imports

## Testing
- **Backend**: Pest PHP with feature and unit tests
- **Test Structure**: Tests in `tests/Feature/` and `tests/Unit/` directories
- **Coverage**: Authentication, CRUD operations, model tests, and HTTP controllers
- **No frontend testing framework** currently configured

## Development Notes
- **Theme System**: Dark/light mode switching via `use-appearance` hook with localStorage persistence
- **Mobile-First**: Responsive design patterns with mobile navigation hooks
- **Component Architecture**: Follows shadcn/ui patterns with Radix UI primitives
- **TypeScript Paths**: Configured for `@/*` imports and Ziggy route helpers
- **Build Tools**: Uses Bun for package management, Vite for bundling
- **Concurrency**: Development command runs Laravel server, queue worker, logs, and Vite simultaneously