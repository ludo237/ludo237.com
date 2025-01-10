'use server';

import { createTransport } from 'nodemailer';
import { z } from 'zod';
import { contactSchema } from '~/schemas';

const email = {
  service: process.env.EMAIL_SERVICE,
  defaultSubject: 'New contact from ludo237.com',
  to: process.env.EMAIL_TO,
  user: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASSWORD,
};

export const send = async (
  values: z.infer<typeof contactSchema>
): Promise<boolean> => {
  const transporter = createTransport({
    service: email.service,
    auth: {
      user: email.user,
      pass: email.password,
    },
  });

  const mailOptions = {
    from: values.email,
    to: email.to,
    subject: email.defaultSubject,
    text: values.message,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    // Suppress the error for the time being
    // TODO Log it somewhere
    console.log(error);
    return false;
  }
};

export const generateTemporaryEmail = async (
  quantity: number = 1
): Promise<string[]> => {
  const res = await fetch(
    `${process.env.TEMP_EMAIL_BASE_URL}genRandomMailbox&count=${quantity}`
  );
  const data = await res.json();

  return data;
};

export const refreshTemporaryEmail = async (
  email: string
): Promise<Email[]> => {
  const [identifier, domain] = email.split('@');
  const res = await fetch(
    `${process.env.TEMP_EMAIL_BASE_URL}getMessages&login=${identifier}&domain=${domain}`
  );
  const data = await res.json();

  return data;
};

export const loadTemporaryEmail = async (
  email: string,
  id: string
): Promise<Email> => {
  const [identifier, domain] = email.split('@');

  const res = await fetch(
    `${process.env.TEMP_EMAIL_BASE_URL}readMessage&login=${identifier}&domain=${domain}&id=${id}`
  );
  const data = await res.json();

  return data;
};
