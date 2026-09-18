import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Veil brand colors from websiteinfo.txt
        'veil-ink': '#0B1220',
        'veil-white': '#F7F8FA',
        'signal-green': '#1FAE6E',
        'guard-purple': '#6E5BD0',
        'caution-amber': '#E8A23D',
        'alert-red': '#E5484D',
        'slate-gray': '#5B6472',
        'mist-gray': '#E4E7EC',

        // shadcn compatible
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'footer-breathe': {
          '0%': { transform: 'translate(-50%, -50%) scale(1)', opacity: '0.6' },
          '100%': { transform: 'translate(-50%, -50%) scale(1.1)', opacity: '1' },
        },
        'footer-scroll-marquee': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'footer-heartbeat': {
          '0%, 100%': { transform: 'scale(1)', filter: 'drop-shadow(0 0 5px hsl(var(--destructive) / 0.5))' },
          '15%, 45%': { transform: 'scale(1.2)', filter: 'drop-shadow(0 0 10px hsl(var(--destructive) / 0.8))' },
          '30%': { transform: 'scale(1)' },
        },
        'scan-pulse': {
          '0%': { opacity: '0.75', transform: 'scaleY(1)' },
          '100%': { opacity: '1', transform: 'scaleY(1.03)' },
        },
        'glitch': {
          '0%, 16%, 50%, 100%': { opacity: '1' },
          '15%, 99%': { opacity: '0.9' },
          '49%': { opacity: '0.8' },
        },
      },
      animation: {
        'footer-breathe': 'footer-breathe 8s ease-in-out infinite alternate',
        'footer-scroll-marquee': 'footer-scroll-marquee 40s linear infinite',
        'footer-heartbeat': 'footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite',
        'scan-pulse': 'scan-pulse 1.5s infinite alternate ease-in-out',
        'glitch': 'glitch 0.1s infinite linear alternate-reverse',
      },
    },
  },
  plugins: [],
}
export default config