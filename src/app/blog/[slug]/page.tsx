import { formatDistanceToNowStrict } from "date-fns";
import * as marked from "marked";
import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import type { FC } from "react";
import { getPost } from "~/actions/blog";
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

export async function generateMetadata(
	{ params }: { params: Promise<{ slug: string }> },
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const slug = (await params).slug;
	const post = await getPost(slug);

	// optionally access and extend (rather than replace) parent metadata
	const previousImages = (await parent).openGraph?.images || [];

	return {
		title: post.title,
		description: post.summary,
		keywords: post.tags,
		openGraph: {
			images: [post.cover, ...previousImages],
		},
	};
}

const BlogSlugPage: FC<{ params: Promise<{ slug: string }> }> = async ({
	params,
}) => {
	const slug = (await params).slug;
	const post = await getPost(slug);

	const markdownContent = marked.parse(post.content);

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
						<BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{post.title}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<main className="mx-auto max-w-2xl py-3">
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
						<CardTitle className="text-sky-500">{post.title}</CardTitle>

						<CardDescription>
							{readingTime(post.content)} minutes read.Written{" "}
							{formatDistanceToNowStrict(post.date, { addSuffix: true })}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div
							className="prose prose-sm dark:prose-invert md:prose-base"
							// biome-ignore lint/security/noDangerouslySetInnerHtml: <this markdown is handled by me>
							dangerouslySetInnerHTML={{ __html: markdownContent }}
						/>
					</CardContent>
				</Card>
			</main>
		</>
	);
};

export default BlogSlugPage;
