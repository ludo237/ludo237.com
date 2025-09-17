<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Http\DataTransferObjects\JobExperienceDto;
use App\Http\Requests\Contracts\HasDto;
use Illuminate\Foundation\Http\FormRequest;

class UpdateJobExperienceRequest extends FormRequest implements HasDto
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, array<string>>
     */
    public function rules(): array
    {
        return [
            'avatar' => ['required', 'string'],
            'company' => ['required', 'string'],
            'companyDescription' => ['required', 'string'],
            'location' => ['required', 'string'],
            'role' => ['required', 'string'],
            'roleDescription' => ['required', 'string'],
            'skills' => ['required', 'array'],
            'skills.*' => ['string'],
            'startedAt' => ['required', 'date'],
            'endedAt' => ['nullable', 'date', 'after_or_equal:startedAt'],
        ];
    }

    public function dto(): JobExperienceDto
    {
        return new JobExperienceDto(
            avatar: $this->input('avatar'),
            company: $this->input('company'),
            companyDescription: $this->input('companyDescription'),
            location: $this->input('location'),
            role: $this->input('role'),
            roleDescription: $this->input('roleDescription'),
            skills: $this->input('skills'),
            startedAt: $this->input('startedAt'),
            endedAt: $this->input('endedAt'),
        );
    }
}
