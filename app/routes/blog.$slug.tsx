import invariant from "@remix-run/dev/invariant";
import { HtmlMetaDescriptor, LoaderFunction, MetaFunction, useLoaderData } from "remix";
import { Post } from "~/api/types";
import { getPost } from "~/api/blog";

type LoaderData = {
  post: Post
}

export const meta: MetaFunction = ({ data }): HtmlMetaDescriptor => {
  if (!data) {
    return {
      title: "Article not found",
    };
  }

  return {
    title: data.post.title,
    description: data.post.excerpt,
    "og:type": "article",
    "og:url": `https://ludo237.com/blog/${data.post.slug}`,
    "og:title": data.post.title,
    "og:description": data.post.excerpt,
    "og:image": data.post.cover,
    "twitter:card": "summary_large_image",
    "twitter:url": `https://ludo237.com/blog/${data.post.slug}`,
    "twitter:title": data.post.title,
    "twitter:description": data.post.excerpt,
    "twitter:image": data.post.cover,
  };
};

export const loader: LoaderFunction = async ({ params }): Promise<LoaderData> => {
  invariant(params.slug, "Slug is required");
  const post = await getPost(params.slug);

  return { post };
};

export default function BlogPost () {
  const { post } = useLoaderData<LoaderData>();

  const rawHtml = () => {
    return { __html: post.html };
  };

  return (
    <article className="px-6 md:px-0 mx-auto prose prose-sky prose-lg text-slate-500" dangerouslySetInnerHTML={rawHtml()} />
  );
}
