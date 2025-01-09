'use server';

import fs from 'fs';
import matter from 'gray-matter';
import { createTransport } from 'nodemailer';
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

const email = {
  service: process.env.EMAIL_SERVICE,
  defaultSubject: 'New contact from ludo237.com',
  to: process.env.EMAIL_TO,
  user: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASSWORD,
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

export const sendEmail = async (
  values: z.infer<typeof contactSchema>
): Promise<boolean> => {
  const transporter = createTransport({
    service: email.service,
    auth: {
      user: email.user,
      pass: email.password,
    },
  });

  const mailOptions = {
    from: values.email,
    to: email.to,
    subject: email.defaultSubject,
    text: values.message,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    // Suppress the error for the time being
    // TODO Log it somewhere
    console.log(error);
    return false;
  }
};

export const generateEmail = async (
  quantity: number = 1
): Promise<string[]> => {
  const res = await fetch(
    `${process.env.TEMP_EMAIL_BASE_URL}genRandomMailbox&count=${quantity}`
  );
  const data = await res.json();

  return data;
};

export const refresh = async (email: string): Promise<Email[]> => {
  const [identifier, domain] = email.split('@');
  const res = await fetch(
    `${process.env.TEMP_EMAIL_BASE_URL}getMessages&login=${identifier}&domain=${domain}`
  );
  const data = await res.json();

  return data;
};

export const load = async (email: string, id: string): Promise<Email> => {
  const [identifier, domain] = email.split('@');

  const res = await fetch(
    `${process.env.TEMP_EMAIL_BASE_URL}readMessage&login=${identifier}&domain=${domain}&id=${id}`
  );
  const data = await res.json();

  return data;
};
