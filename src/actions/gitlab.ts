"use server";

const gitlab = {
	url: "https://gitlab.com/api/v4",
	token: process.env.GITLAB_FEED_TOKEN,
};

export const getEvents = async () => {
	return await fetch(`${gitlab.url}/events`, {
		headers: {
			Authorization: `Bearer ${gitlab.token}`,
			"Content-Type": "application/json",
		},
	});
};

export const getProjects = async () => {
	return await fetch(`${gitlab.url}/users/ludo237/projects`, {
		headers: {
			Authorization: `Bearer ${gitlab.token}`,
			"Content-Type": "application/json",
		},
	});
};
