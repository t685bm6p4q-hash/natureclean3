import { heroui } from '@heroui/theme/plugin';

/** Thème HeroUI sombre — vert Nature Clean (#15803d) sur fond gray-900. */
export default heroui({
  defaultTheme: 'dark',
  themes: {
    dark: {
      extend: 'dark',
      layout: {
        radius: {
          small: '0.5rem',
          medium: '0.75rem',
          large: '1rem',
        },
      },
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          DEFAULT: '#15803d',
          foreground: '#ffffff',
        },
        focus: '#22c55e',
        background: '#111827',
        content1: '#1f2937',
        content2: '#374151',
        content3: '#4b5563',
        content4: '#6b7280',
        default: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          DEFAULT: '#374151',
          foreground: '#e5e7eb',
        },
      },
    },
  },
});
