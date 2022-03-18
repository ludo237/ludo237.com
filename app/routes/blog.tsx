import { useLoaderData } from "@remix-run/react";
import { CatchBoundaryComponent } from "@remix-run/react/routeModules";
import { LoaderFunction, MetaFunction } from "remix";
import { getPosts, Post } from "~/api/blog";
import Link from "~/components/Link";
import { readingTime } from "~/utils";

type LoaderData = {
  posts: Post[]
}

export const meta: MetaFunction = () => {
  return {
    title: "My humble blog",
  };
};

export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  const posts = await getPosts();

  return { posts };
};

export default function Blog () {
  const { posts } = useLoaderData<LoaderData>();

  return (
    <div className="md:px-4 px-6 grid gap-5 lg:grid-cols-3 lg:max-w-none">
      {posts.map((post) => (
        <div key={post.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
          <Link to={`/blog/${post.slug}`} color={"none"} size={"none"}>
            <div className="flex-shrink-0">
              <img className="h-48 w-full object-cover" src={post.cover} alt={post.excerpt} />
            </div>
            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
              <div className="flex-1">
                <p className="text-xl font-semibold text-slate-900">{post.title}</p>
                <p className="mt-3 text-base text-slate-500">{post.excerpt}</p>
              </div>
              <div className="mt-6 flex items-center">
                <div className="flex space-x-1 text-sm text-slate-500">
                  <time dateTime={(new Date(post.createdAt)).toISOString()}>{(new Date(post.createdAt)).toLocaleDateString()}</time>
                  <span aria-hidden="true">&middot;</span>
                  <span aria-label="average reading time">{readingTime(post.markdown)} minutes read</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
