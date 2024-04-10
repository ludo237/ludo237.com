import type { Config } from 'tailwindcss';

const config = {
  content: ['./src/**/*.{ts,tsx}'],
  plugins: [require('@tailwindcss/typography')],
} satisfies Config;

export default config;
