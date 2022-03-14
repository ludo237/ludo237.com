import invariant from "@remix-run/dev/invariant";
import { useLoaderData } from "@remix-run/react";
import { LoaderFunction } from "remix";
import { Post } from "~/api/types";
import { getPost } from "~/api/blog";

type LoaderData = {
  post: Post
}

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
    <div>
      <article
        className="prose"
        dangerouslySetInnerHTML={rawHtml()}
      />
    </div>
  );
}
