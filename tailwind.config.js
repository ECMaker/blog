/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        CutiveMono: ['CutiveMono', 'monospace'],
        baloo: ['Baloo', 'sans-serif'],
        firaCode: ['FiraCode VariableFont', 'sans-serif'],
      },
    },
    screens: {
      sp: { max: '640px' },
      sm: { max: '767px' },
      md: { min: '768px' },
      lg: { min: '1024px'},
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
  corePlugins: {
    preflight: false, // TailWindCSSのResetCSSとMantineの競合を防ぐために無効化
  },
};
