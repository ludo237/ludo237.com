import { promises as fs } from "node:fs";
import glob from "tiny-glob";
import { PrismaClient } from "@prisma/client";
import MarkdownIt from "markdown-it";
import matter from "gray-matter";

const db = new PrismaClient();

const main = async () => {
  const markdown = new MarkdownIt();
  let files = await glob("posts/*.mdx", { filesOnly: true, flush: true });

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

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await db.$disconnect());

