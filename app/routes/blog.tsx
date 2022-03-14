import { useLoaderData } from "@remix-run/react";
import { LoaderFunction, Outlet } from "remix";
import { getPosts } from "~/api/blog";
import { Post } from "~/api/types";
import Link from "~/components/Link";

type LoaderData = {
  posts: Post[]
}
export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  const posts = await getPosts();

  return { posts };
};

export default function Blog () {
  const { posts } = useLoaderData<LoaderData>();

  return (
    <div>
      <ul>
        {posts.map(post =>
          <li key={post.id}>
            <Link to={`/blog/${post.slug}`} title={post.title}>
              {post.title}
            </Link>
          </li>,
        )}
      </ul>
      <Outlet />
    </div>
  );
}
