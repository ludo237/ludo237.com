import { PrismaClient } from "@prisma/client";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import { promises as fs } from "node:fs";
import glob from "tiny-glob";

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

    // TODO extract tags from header and perform a firstOrCreate query
    //      create an array of IDs of Tags and fill the post query below
    await db.post.create({
      data: {
        slug: file.replace("posts/", "").replace(/\.mdx?$/, ""),
        title: post.data.title,
        excerpt: post.data.excerpt,
        cover: post.data.cover,
        markdown: post.content,
        html: markdown.render(post.content),
        createdAt: new Date(post.data.createdAt),
        /**
         * tags: {
         *  connect: [{ id: 2 }, { id: 3 }, { id: 7 }],
         * }
         */
      },
    });
  }
};

const cvSeeder = async () => {
  const projects = [
    {
      url: "https://github.com/vuejs/vue",
      name: "VueJS",
      description: "Contributed to the codebase and translation initially to v0.x",
    },
    {
      url: "https://github.com/laravel/framework",
      name: "Laravel",
      description: "Contributed to bug fixing and documentation",
    },
    {
      url: "https://gitlab.com/ludo237/laravel-rules",
      name: "Laravel Rules",
      description: "A set of custom Laravel rules that I've developed over the years I find them useful",
    },
    {
      url: "https://gitlab.com/ludo237/delayed-artistic-guppy",
      name: "Delayed Artistic Guppy",
      description: "Package that generates slugify words like Gfycat or Twitch Clips",
    },
    {
      url: "https://gitlab.com/ludo237/laravel-eloquent-traits",
      name: "Eloquent Traits",
      description: "Useful set of Eloquent traits. The Eloquent ORM included with Laravel provides a beautiful, simple ActiveRecord implementation" +
        " for working with your database. Each database table has a corresponding Model, which is used to interact with that table.",
    },
    {
      url: "https://gitlab.com/ludo237/ts-toolbox",
      name: "TS Toolbox",
      description: "A collection of useful agnostic functions that I've created trough time. They can be useful anywhere",
    },
  ];
  for (const project of projects) {
    await db.project.create({
      data: project,
    });
  }

  const jobs = [
    {
      company: "Microsoft",
      startedAt: new Date(2011, 1),
      endedAt: new Date(2011, 8),
      description: "I was fascinated by this new launch from Microsoft, finally a Windows Phone that actually worked, so cool! I took the plundge and went straight into develop applications for the OS, mostly in C#. This excitement didn't last long because I realized the path Microsoft was taking with this OS so I left the project.",
    },
    {
      company: "6GO S.r.l.",
      startedAt: new Date(2010, 7),
      endedAt: new Date(2013, 7),
      description: "In this brave new world, it is critical to have at least one person with at least a functional understanding of each of the composite parts who is also capable of connecting various tiers and working with each expert so that a feature can actually be delivered. In a way, these tier-connecting, bridge-building software architects — who are likely experts in only one or a couple of tiers — are less full stack developer and much more full stack integratorIn this brave new world, it is critical to have at least one person with at least a functional understanding of each of the composite parts who is also capable of connecting various tiers and working with each expert so that a feature can actually be delivered. In a way, these tier-connecting, bridge-building software architects — who are likely experts in only one or a couple of tiers — are less full stack developer and much more full stack integrator",
    },
    {
      company: "Google",
      startedAt: new Date(2012, 1),
      endedAt: new Date(2012, 6),
      description: "Provides QA feedback and direct testing to Google Big Query",
    },
    {
      company: "Twitter",
      startedAt: new Date(2012, 1),
      endedAt: new Date(2016, 1),
      description: "Manage to deliver new improvements with the twitter timeline team, deploy UI components to Twitter scale and reach millions of user with my improvements",
    },
    {
      company: "Amazon",
      startedAt: new Date(2016, 4),
      endedAt: new Date(2018, 7),
      description: "Having a great time around you help you push your best code to production, worked on improving the efficency and reliability of the AWS console to scale",
    },
    {
      company: "6GO S.r.l.",
      startedAt: new Date(2019, 3),
      endedAt: new Date(2023, 1),
      description: "Came back to this company with only one goal in mind: take everything I learned and apply it to scale the company back-end API to reach new customers around the workd while orchestrating diverse teams of developers in a remote and asynchronous environment",
    },
  ];
  for (const job of jobs) {
    await db.job.create({
      data: job,
    });
  }

  const languages = [
    { name: "Italian", experience: "mother tongue" },
    { name: "English", experience: "fluent" },
    { name: "Spanish", experience: "beginner" },
  ];
  for (const language of languages) {
    await db.language.create({
      data: language,
    });
  }

  const educations = [
    {
      name: "Standford University",
      description: "Basic Knowledge of Machine Learning and Neural Networks, Machine LearningBasic Knowledge of Machine Learning and Neural" +
        " Networks, Machine Learning",
      startedAt: new Date(2015, 1),
      endedAt: new Date(2016, 1),
    },
    {
      name: "SUPSI",
      description: "I learned the basic of Computer Science, Match analysis and Software design that helped, and still help, me in my" +
        " work experience",
      startedAt: new Date(2011, 1),
      endedAt: new Date(2012, 1),
    },
  ];
  for (const education of educations) {
    await db.education.create({
      data: education,
    });
  }

  const contacts = [
    { href: "https://github.com/ludo237", name: "Github.com/ludo237" },
    { href: "mailto:home@ludo237.com", name: "home@ludo237.com" },
    { href: "tel:+393479275671", name: "+393479275671" },
  ];
  for (const contact of contacts) {
    await db.contact.create({
      data: contact,
    });
  }
};

const truncateDatabase = async () => {
  // cleanup in development
  await db.post.deleteMany({});
  await db.project.deleteMany({});
  await db.job.deleteMany({});
  await db.language.deleteMany({});
  await db.education.deleteMany({});
  await db.contact.deleteMany({});
};

const main = async () => {
  await truncateDatabase();
  await postsSeeder();
  await cvSeeder();
};

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await db.$disconnect());

