import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

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
    date: new Date(data.createdAt),
    content,
  } as Post;
};
