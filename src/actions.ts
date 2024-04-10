const githubApiKey = process.env.GITHUB_FEED_TOKEN;
const gitlabApiKey = process.env.GITLAB_FEED_TOKEN;

export const getGilabProjects = async () => {
  return await fetch('https://gitlab.com/api/v4/users/ludo237/projects', {
    headers: {
      Authorization: `Bearer glpat-3ZNRWyMb5dUACsybsfEz`,
      'Content-Type': 'application/json',
    },
  });
};

export const getGithubEvents = async () => {
  return await fetch('https://api.github.com/users/ludo237/events', {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${githubApiKey}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
};

export const getGitlabEvents = async () => {
  return await fetch('https://gitlab.com/api/v4/events', {
    headers: {
      Authorization: `Bearer ${gitlabApiKey}`,
      'Content-Type': 'application/json',
    },
  });
};
