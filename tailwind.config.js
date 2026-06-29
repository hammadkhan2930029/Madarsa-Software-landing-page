/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        urdu: ['"JameelNooriNastaleeq"', '"Jameel Noori Nastaleeq"', '"Noto Nastaliq Urdu"', 'serif'],
        arabic: ['"JameelNooriNastaleeq"', '"Jameel Noori Nastaleeq"', '"Noto Nastaliq Urdu"', 'serif'],
        marhey: ['"JameelNooriNastaleeq"', '"Jameel Noori Nastaleeq"', '"Noto Nastaliq Urdu"', 'serif'],
      },
      boxShadow: {
        theme: 'var(--shadow-main)',
        'card-theme': 'var(--shadow-card)',
      },
      fontSize: {
        'theme-title': ['clamp(1.55rem, 1.1rem + 1.15vw, 2.35rem)', { lineHeight: '1.75' }],
        'theme-kicker': ['1rem', { lineHeight: '1.65' }],
        'theme-body': ['1.125rem', { lineHeight: '2rem' }],
        'theme-nav': ['1rem', { lineHeight: '1.6' }],
        'theme-button': ['1rem', { lineHeight: '1.65' }],
        'theme-detail': ['0.8125rem', { lineHeight: '1.6rem' }],
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
