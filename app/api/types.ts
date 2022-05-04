interface Model {
  readonly id: string,
  readonly createdAt: Date,
  readonly updatedAt: Date,
}

export interface Contact extends Model {
  href: string,
  name: string
}

export interface Education extends Model {
  name: string,
  description: string,
  startedAt: Date,
  endedAt: Date,
}

export interface Language extends Model {
  name: string,
  experience: string,
}

export interface Job extends Model {
  company: string,
  startedAt: Date,
  endedAt: Date | null,
  description: string,
}

export interface Project extends Model {
  url: string,
  name: string,
  description: string,
}

export interface Curriculum {
  readonly contacts: Contact[],
  readonly educations: Education[],
  readonly languages: Language[],
  readonly jobs: Job[],
  readonly projects: Project[]
}
