import { createCookieSessionStorage, Session } from "remix";
import { Inquiry } from "~/api/inquiry";

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const storage = createCookieSessionStorage({
  cookie: {
    name: "_ld237",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export const createInquirySession = async (inquiry: Inquiry): Promise<string> => {
  const session = await storage.getSession();
  session.set("inquiry", JSON.stringify(inquiry));
  return await storage.commitSession(session);
};

export const getInquirySession = async (request: Request): Promise<Session> => {
  return storage.getSession(request.headers.get("Cookie"));
};

export const getInquiry = async (request: Request): Promise<Inquiry | null> => {
  const session = await getInquirySession(request);
  const inquiry = session.get("inquiry");
  if (!inquiry) {
    return null;
  }

  return JSON.parse(inquiry);
};

export const getInquiryId = async (request: Request): Promise<string | null> => {
  const inquiry = await getInquiry(request);

  if (!inquiry) return null;

  return inquiry.id;
};

export const removeInquiry = async (request: Request): Promise<string> => {
  const session = await getInquirySession(request);
  return await storage.destroySession(session);
};
