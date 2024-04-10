'use server';

import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { z } from 'zod';
import { contactSchema } from '~/schemas';

const github = {
  url: 'https://api.github.com',
  token: process.env.GITHUB_FEED_TOKEN,
};

const gitlab = {
  url: 'https://gitlab.com/api/v4',
  token: process.env.GITLAB_FEED_TOKEN,
};

export const getGithubEvents = async () => {
  return await fetch(`${github.url}/users/ludo237/events`, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${github.token}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
};

export const getGilabProjects = async () => {
  return await fetch(`${gitlab.url}/users/ludo237/projects`, {
    headers: {
      Authorization: `Bearer ${gitlab.token}`,
      'Content-Type': 'application/json',
    },
  });
};

export const getGitlabEvents = async () => {
  return await fetch(`${gitlab.url}/events`, {
    headers: {
      Authorization: `Bearer ${gitlab.token}`,
      'Content-Type': 'application/json',
    },
  });
};

export const getPosts = async () => {
  const postsDirectory = path.join(process.cwd(), '/data/posts');
  const files = fs.readdirSync(postsDirectory);
  return files
    .map((file) => {
      const slug = path.basename(file, '.mdx');
      const fullPath = path.join(postsDirectory, file);
      const fileContent = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContent);
      return {
        slug,
        title: data.title,
        summary: data.excerpt,
        cover: data.cover,
        date: new Date(data.createdAt),
        content,
      } as Post;
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime());
};

export const getPost = async (slug: string) => {
  const postsDirectory = path.join(process.cwd(), '/data/posts');
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContent = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContent);
  return {
    slug,
    title: data.title,
    summary: data.excerpt,
    cover: data.cover,
    tags: data.tags,
    date: new Date(data.createdAt),
    content,
  } as Post;
};

export const sendEmail = async (
  values: z.infer<typeof contactSchema>
): Promise<boolean> => {
  return true;
};

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

export const getProjects = async () => {
  const projectsDirectory = path.join(process.cwd(), '/data/db/projects.json');
  const fileContent = fs.readFileSync(projectsDirectory, 'utf8');
  const projects = JSON.parse(fileContent) as Project[];

  return projects;
};
