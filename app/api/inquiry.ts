import { CreateInquiry, Inquiry } from "~/api/types";
import { database } from "~/modules/database.server";

export const getInquiries = async (): Promise<Inquiry[]> => await database.inquiry.findMany();

export const createInquiry = async (inquiry: CreateInquiry): Promise<Inquiry> => await database.inquiry.create({ data: inquiry });
