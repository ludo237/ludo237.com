export type CreateEducation = {
  name:string,
  description:string,
  startedAt: Date,
  endedAt: Date,
}
export type CreateInquiry = {
  name: string,
  email: string,
  content: string,
}
export type CreateLanguage = {
  name: string,
  experience: string,
}
export type CreateJob = {
  company: string,
  startedAt: Date,
  endedAt: Date | null,
  description: string,
}
export type CreateProject = {
  url: string,
  name: string,
  description: string,
}

interface Model {
  id: string,
  createdAt: Date,
  updatedAt: Date,
}

export interface Education extends Model {
  name: string,
  description: string,
  startedAt: Date,
  endedAt: Date,
}

export interface Inquiry extends Model {
  name: string,
  email: string,
  content: string,
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

