# Ludo237 dot com

> A modern, full-stack portfolio website built with Laravel and React, showcasing professional experience, projects, and technical blog posts.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Laravel](https://img.shields.io/badge/Laravel-12.x-red.svg)](https://laravel.com)
[![React](https://img.shields.io/badge/React-19.x-blue.svg)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org)

## Features

- **Modern Tech Stack**: Laravel 12 + React 19 + TypeScript
- **Single Page Application**: Powered by Inertia.js for seamless navigation
- **Server-Side Rendering**: Built-in SSR support for improved SEO and performance
- **Responsive Design**: Mobile-first approach with Tailwind CSS 4.x
- **Blog System**: Markdown-based blog with syntax highlighting
- **Project Portfolio**: Showcase of professional work and side projects
- **Career Timeline**: Interactive timeline of professional experience and education
- **Authentication**: Secure admin dashboard with Laravel Sanctum
- **Dark/Light Mode**: Theme switching with persistence
- **Modern UI Components**: shadcn/ui with Radix UI primitives
- **Type Safety**: Full TypeScript coverage across frontend and backend data contracts

## Technology Stack

### Backend
- **Framework**: Laravel 12 with PHP 8.2+
- **Database**: SQLite (development) / MariaDB (production)
- **Authentication**: Laravel Sanctum
- **Testing**: Pest PHP
- **Code Quality**: Laravel Pint

### Frontend
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite with Laravel integration
- **Styling**: Tailwind CSS 4.x with CSS-in-JS
- **UI Components**: shadcn/ui + Radix UI primitives
- **State Management**: React hooks with context
- **Routing**: Inertia.js for SPA navigation
- **Icons**: Lucide React

### Development & Deployment
- **Package Manager**: Bun for frontend, Composer for backend
- **Runtime**: FrankenPHP for production
- **Containerization**: Multi-stage Docker builds
- **CI/CD**: GitLab CI/CD with automated deployment
- **Code Quality**: ESLint, Prettier, TypeScript checking

## Prerequisites

- **PHP**: 8.2 or higher
- **Node.js**: 18 or higher (or Bun)
- **Database**: SQLite (included) or MySQL/MariaDB
- **Git**: For version control

## Quick Start

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/ludo237/ludo237.com.git
cd ludo237.com

# Install PHP dependencies
composer install

# Install JavaScript dependencies
bun install
# or npm install
```

### 2. Environment Setup

```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Create SQLite database
touch database/database.sqlite

# Run migrations and seed data
php artisan migrate --seed
```

### 3. Development Server

```bash
# Start full development environment (recommended)
composer run dev

# This starts:
# - Laravel server (localhost:8000)
# - Queue worker
# - Log monitoring
# - Vite dev server with hot reload
```

Alternative development options:
```bash
# Frontend only
bun run dev

# With Server-Side Rendering
composer run dev:ssr
```

### 4. Build for Production

```bash
# Build frontend assets
bun run build

# With SSR support
bun run build:ssr
```

## Testing

```bash
# Run all tests
composer run test

# Run specific test file
php artisan test tests/Feature/Http/Controllers/HomeControllerTest.php

# Run with coverage
php artisan test --coverage
```

## Code Quality

```bash
# Frontend linting and formatting
bun run lint        # ESLint with auto-fix
bun run format      # Prettier formatting
bun run types       # TypeScript checking

# Backend code style
./vendor/bin/pint   # Laravel Pint code formatting
```

## Project Structure

```
├── app/                    # Laravel application
│   ├── Http/Controllers/   # Route controllers
│   ├── Models/            # Eloquent models
│   └── Providers/         # Service providers
├── database/              # Database files
│   ├── factories/         # Model factories
│   ├── migrations/        # Database migrations
│   └── seeders/          # Database seeders
├── resources/
│   ├── js/               # React application
│   │   ├── components/   # Reusable components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── pages/        # Inertia.js pages
│   │   └── types/        # TypeScript definitions
│   └── css/              # Tailwind CSS
├── routes/               # Application routes
├── tests/                # Test suites
└── docker/               # Docker configuration
```

## API & Data Models

The application uses Inertia.js for seamless data passing between Laravel and React:

### Core Models
- **User**: Authentication and admin access
- **Post**: Blog posts with markdown content
- **Project**: Portfolio projects with metadata
- **JobExperience**: Professional work history
- **School**: Educational background
- **Language**: Programming languages and skills

### Available Routes
- `/` - Homepage with career timeline and projects
- `/cv` - Detailed curriculum vitae
- `/blog` - Blog post listing
- `/blog/{slug}` - Individual blog posts
- `/dashboard` - Admin dashboard (authenticated)

## Docker Deployment

The application includes production-ready Docker configuration:

```bash
# Build production image
docker build -f docker/Dockerfile -t ludo237.com .

# Run with Docker Compose
docker-compose -f docker/compose.production.yml up -d
```

### Multi-stage Build
1. **Frontend Stage**: Bun builds React/TypeScript assets
2. **Backend Stage**: Composer installs PHP dependencies
3. **Production Stage**: FrankenPHP runtime with optimized Laravel

## 🔧 Configuration

### Environment Variables
Key configuration options in `.env`:

```env
APP_NAME="Claudio Ludovico Panetta"
APP_URL=https://ludo237.com
DB_CONNECTION=sqlite
DB_DATABASE=/absolute/path/to/database.sqlite

# For SSR
INERTIA_SSR_ENABLED=true
INERTIA_SSR_URL=http://127.0.0.1:13714
```

### Customization
- **Theme**: Modify `resources/js/hooks/use-appearance.tsx`
- **UI Components**: Customize in `resources/js/components/ui/`
- **Content**: Update seeders in `database/seeders/`
- **Styling**: Configure Tailwind in `tailwind.config.js`

## Performance Features

- **SSR**: Server-side rendering for improved SEO
- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Responsive images with proper sizing
- **Caching**: Laravel route/view/config caching
- **CDN Ready**: Static assets can be served from CDN
- **Database Optimization**: Eloquent relationships and query optimization

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting (`composer run test && bun run lint`)
5. Commit changes (`git commit -m 'Add amazing feature'`)
6. Push to branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Guidelines
- Follow Laravel and React best practices
- Maintain TypeScript coverage
- Write tests for new features
- Use conventional commit messages
- Ensure all CI checks pass

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Laravel](https://laravel.com) - The PHP framework for web artisans
- [React](https://reactjs.org) - A JavaScript library for building user interfaces
- [Inertia.js](https://inertiajs.com) - The modern monolith
- [Tailwind CSS](https://tailwindcss.com) - A utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com) - Beautiful, accessible components
- [Radix UI](https://www.radix-ui.com) - Low-level UI primitives

---

<p align="center">Made with ❤️ and modern web technologies</p>
