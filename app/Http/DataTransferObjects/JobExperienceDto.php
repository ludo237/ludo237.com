<?php

declare(strict_types=1);

namespace App\Http\DataTransferObjects;

final readonly class JobExperienceDto
{
    /**
     * @param  array<string>|null  $skills
     */
    public function __construct(
        public ?string $avatar,
        public string $company,
        public ?string $companyDescription,
        public ?string $location,
        public string $role,
        public ?string $roleDescription,
        public ?array $skills,
        public string $startedAt,
        public ?string $endedAt,
    ) {}

    /**
     * @return array{
     *     avatar: string|null,
     *     company: string,
     *     company_description: string|null,
     *     location: string|null,
     *     role: string,
     *     role_description: string|null,
     *     skills: array<string>|null,
     *     started_at: string,
     *     ended_at: string|null
     * }
     */
    public function toArray(): array
    {
        return [
            'avatar' => $this->avatar,
            'company' => $this->company,
            'company_description' => $this->companyDescription,
            'location' => $this->location,
            'role' => $this->role,
            'role_description' => $this->roleDescription,
            'skills' => $this->skills,
            'started_at' => $this->startedAt,
            'ended_at' => $this->endedAt,
        ];
    }
}
