'use server';

const github = {
  url: 'https://api.github.com',
  token: process.env.GITHUB_FEED_TOKEN,
};

export const getEvents = async () => {
  return await fetch(`${github.url}/users/ludo237/events`, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${github.token}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
};
