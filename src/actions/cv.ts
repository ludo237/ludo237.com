'use server';

import fs from 'node:fs';
import path from 'node:path';

export const getJobs = async () => {
  const jobsDirectory = path.join(process.cwd(), '/data/db/jobs.json');
  const fileContent = fs.readFileSync(jobsDirectory, 'utf8');
  const jobs = JSON.parse(fileContent) as Job[];

  return jobs;
};

export const getEducations = async () => {
  const educationsDirectory = path.join(
    process.cwd(),
    '/data/db/educations.json'
  );
  const fileContent = fs.readFileSync(educationsDirectory, 'utf8');
  const educations = JSON.parse(fileContent) as Education[];

  return educations;
};

export const getLanguages = async () => {
  const languagesDirectory = path.join(
    process.cwd(),
    '/data/db/languages.json'
  );
  const fileContent = fs.readFileSync(languagesDirectory, 'utf8');
  const languages = JSON.parse(fileContent) as Language[];

  return languages;
};

export const getProjects = async (): Promise<Project[]> => {
  const projectsDirectory = path.join(process.cwd(), '/data/db/projects.json');
  const fileContent = fs.readFileSync(projectsDirectory, 'utf8');
  const projects = JSON.parse(fileContent) as Project[];

  return projects;
};
