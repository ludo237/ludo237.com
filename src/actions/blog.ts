"use server";

import fs from "node:fs";
import matter from "gray-matter";
import path from "node:path";

export const getPosts = async () => {
	const postsDirectory = path.join(process.cwd(), "/data/posts");
	const files = fs.readdirSync(postsDirectory);
	return files
		.map((file) => {
			const slug = path.basename(file, ".mdx");
			const fullPath = path.join(postsDirectory, file);
			const fileContent = fs.readFileSync(fullPath, "utf8");
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
	const postsDirectory = path.join(process.cwd(), "/data/posts");
	const fullPath = path.join(postsDirectory, `${slug}.mdx`);
	const fileContent = fs.readFileSync(fullPath, "utf8");
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
