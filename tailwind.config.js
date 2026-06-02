/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        urdu: ['"Noto Nastaliq Urdu"', 'serif'],
        arabic: ['"Noto Sans Arabic"', 'sans-serif'],
        marhey: ['"Marhey"', 'cursive'],
      },
      boxShadow: {
        theme: 'var(--shadow-main)',
        'card-theme': 'var(--shadow-card)',
      },
      colors: {
        themeBg: 'var(--color-bg)',
        themeSurface: 'var(--color-surface)',
        themeText: 'var(--color-text-main)',
        themePrimary: 'var(--color-primary)',
        themePrimaryHover: 'var(--color-primary-hover)',
        themeBorder: 'var(--color-border)',
        sidebar: {
          text: '#9ca3af',
          textHover: '#ffffff',
          activeBg: '#00d094',
          primary: '#00d094',
          dark: '#002a33',
          gradientStart: '#004d61',
          gradientEnd: '#002a33',
          surface: 'rgba(255, 255, 255, 0.05)',
        },
      },
    },
  },
  plugins: [],
}
