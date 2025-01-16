import { formatDistanceToNowStrict } from "date-fns";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { getPosts } from "~/actions/blog";
import { Header } from "~/components/sections/header";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { readingTime } from "~/lib/utils";

export const revalidate = 86400;

export const metadata: Metadata = {
	title: "Ludo237 | Blog",
	description:
		"Some thoughts on software engineering, entrepreneurship, and life.",
};

const Post: FC<{ post: Post }> = ({ post }) => {
	return (
		<Card>
			<div className="relative overflow-hidden rounded-t-md">
				<AspectRatio ratio={16 / 9}>
					<Image
						src={post.cover}
						alt={post.title}
						fill
						className="object-cover"
					/>
				</AspectRatio>
			</div>
			<CardHeader>
				<CardTitle className="text-sky-500 hover:underline">
					<Link href={`/blog/${post.slug}`}>{post.title}</Link>
				</CardTitle>
				<CardDescription>
					{readingTime(post.content)} minutes read. Written{" "}
					{formatDistanceToNowStrict(post.date, { addSuffix: true })}
				</CardDescription>
			</CardHeader>
			<CardContent>{post.summary}</CardContent>
		</Card>
	);
};

const BlogPage: FC = async () => {
	const posts = await getPosts();

	return (
		<>
			<Header />

			<Breadcrumb className="py-3">
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/">Home</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Blog</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<main className="grid grid-cols-1 gap-6 md:grid-cols-2 py-3">
				{posts.map((post) => (
					<Post key={post.slug} post={post} />
				))}
			</main>
		</>
	);
};

export default BlogPage;
