import { PrismaClient } from "@prisma/client";
import { CreateEducation, CreateJob, CreateLanguage, CreateProject } from "~/api/types";

const db = new PrismaClient();

export const educationSeeder = (): CreateEducation[] => {
  return [
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
};
export const languageSeeder = (): CreateLanguage[] => {
  return [
    { name: "Italian", experience: "mother tongue" },
    { name: "English", experience: "fluent" },
    { name: "Spanish", experience: "beginner" },
  ];
};
export const jobsSeeder = (): CreateJob[] => {
  return [
    {
      company: "6GO S.r.l.",
      startedAt: new Date(2012, 9),
      endedAt: null,
      description: "In this brave new world, it is critical to have at least one person with at least a functional understanding of each of the composite parts who is also capable of connecting various tiers and working with each expert so that a feature can actually be delivered. In a way, these tier-connecting, bridge-building software architects — who are likely experts in only one or a couple of tiers — are less full stack developer and much more full stack integratorIn this brave new world, it is critical to have at least one person with at least a functional understanding of each of the composite parts who is also capable of connecting various tiers and working with each expert so that a feature can actually be delivered. In a way, these tier-connecting, bridge-building software architects — who are likely experts in only one or a couple of tiers — are less full stack developer and much more full stack integrator",
    },
    {
      company: "Microsoft",
      startedAt: new Date(2011, 8),
      endedAt: new Date(2011, 9),
      description: "Develop some awesome games with Kinect, Windows Phone 7, Windows Phone 8.x and Microsoft Windows 7",
    },
    {
      company: "Google",
      startedAt: new Date(2012, 1),
      endedAt: new Date(2012, 6),
      description: "Provides QA feedback and direct testing to Google Big Query",
    },
  ];
};
export const projectsSeeder = (): CreateProject[] => {
  return [
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
};

const main = async () => {
  // SQL lite doesn't support create many
  await Promise.all(educationSeeder().map(e => db.education.create({ data: e })));
  await Promise.all(languageSeeder().map(l => db.language.create({ data: l })));
  await Promise.all(jobsSeeder().map(j => db.job.create({ data: j })));
  await Promise.all(projectsSeeder().map(p => db.project.create({ data: p })));
};

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await db.$disconnect());
