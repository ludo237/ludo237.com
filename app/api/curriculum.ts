import type { Curriculum } from "~/api/types";
import { database } from "~/modules/database.server";

export const getCurriculum = async (): Promise<Curriculum> => {
  return {
    contacts: await database.contact.findMany({}),
    educations: await database.education.findMany({}),
    languages: await database.language.findMany({}),
    jobs: await database.job.findMany({}),
    projects: await database.project.findMany({}),
  };
};
