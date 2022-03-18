import { Post, Prisma } from "@prisma/client";
import { database } from "~/modules/database.server";

export type { Post } from "@prisma/client";

type Filters = {
  select?: Prisma.PostSelect;
  where?: Prisma.PostWhereInput;
  orderBy?: Prisma.Enumerable<Prisma.PostOrderByWithRelationInput>;
  cursor?: Prisma.PostWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Prisma.Enumerable<Prisma.PostScalarFieldEnum>;
};

export const getPosts = async (filters?: Filters): Promise<Post[]> => {
  const posts = await database.post.findMany(filters);

  return posts as Post[];
};

export const getPost = async (slug: string): Promise<Post> => {
  const post = await database.post.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!post) {
    throw new Response("not found", { status: 404 });
  }

  return post as Post;
};
