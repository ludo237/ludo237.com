import { database } from "~/modules/database.server";

export type Inquiry = {
  id: string,
  name: string,
  email: string,
  content: string,
  createdAt: Date,
  updatedAt: Date,
};

type CreateInquiry = {
  name: string,
  email: string,
  content: string,
}

export const getInquiries = async (): Promise<Inquiry[]> => {
  return await database.inquiry.findMany();
};

export const createInquiry = async (inquiry: CreateInquiry): Promise<Inquiry> => {
  return await database.inquiry.create({
    data: {
      name: inquiry.name,
      email: inquiry.email,
      content: inquiry.content,
    },
  });
};
