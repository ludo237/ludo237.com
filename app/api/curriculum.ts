import { Education, Job, Language, Project } from "~/api/types";
import { database } from "~/modules/database.server";

export const getEducations = async (): Promise<Education[]> => await database.education.findMany();

export const getLanguages = async (): Promise<Language[]> => await database.language.findMany();

export const getJobs = async (): Promise<Job[]> => await database.job.findMany();

export const getProjects = async (): Promise<Project[]> => await database.project.findMany();
