import { promises as fs } from "node:fs";
import glob from "tiny-glob";
import { PrismaClient } from "@prisma/client";
import MarkdownIt from "markdown-it";
import matter from "gray-matter";

const db = new PrismaClient();

const fetchFiles = async (path: string): Promise<string[]> => {
  return await glob(path, { filesOnly: true, flush: true });
};

const postsSeeder = async () => {
  const markdown = new MarkdownIt();
  const files = await fetchFiles("posts/*.mdx");

  for (let file of files) {
    const data = await fs.readFile(`./${file}`);
    const post = matter(data);

    await db.post.create({
      data: {
        slug: file.replace("posts/", "").replace(/\.mdx?$/, ""),
        title: post.data.title,
        excerpt: post.data.excerpt,
        markdown: post.content,
        html: markdown.render(post.content),
      },
    });
  }
};

const main = async () => {
  await postsSeeder();
};

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await db.$disconnect());

