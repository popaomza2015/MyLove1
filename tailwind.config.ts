import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#1A1412',
        'candle-glow': '#3A241C',
        paper: '#F6F0E7',
        'paper-edge': '#E6D9CC',
        ink: '#241C18',
        'ink-soft': '#6B5E55',
        cream: '#F3E6D8',
        muted: '#CDBFB2',
        seal: '#8E2F2F',
        gold: '#C6A075',
      },
      fontFamily: {
        serif: ['"Noto Serif Thai"', 'serif'],
        sans: ['"Noto Sans Thai"', 'sans-serif'],
      },
      borderRadius: {
        card: '20px',
        photo: '16px',
      },
      maxWidth: {
        app: '430px',
      },
      boxShadow: {
        quiet: '0 2px 20px rgba(0,0,0,0.15)',
        'card-hover': '0 4px 30px rgba(0,0,0,0.2)',
      },
    },
  },
  plugins: [],
};

export default config;
