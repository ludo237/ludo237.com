import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const readingTime = (content: string): number => {
  //Matches words See https://regex101.com/r/q2Kqjg/6
  const words = content.match(/\w+/g)?.length || 0;
  return Math.ceil(words / 237);
};
