/** @type {import('tailwindcss').Config} */
import { Config } from 'tailwindcss'

export default <Partial<Config>>{
  mode: 'jit',
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '25px',
        },
        screens: ['1350px'],
      },
      backdropBlur: {
        custom: '7px',
      },
      backgroundImage: {
        'button-gradient': 'linear-gradient(180deg, #FF7544, #FB4403)',
      },
      boxShadow: {
        sm: '0px 12px 32px 0px rgba(23, 31, 24, 0.04)',
      },
      colors: {
        primary: {
          DEFAULT: '#FE622B',
        },
        blue: {
          DEFAULT: '#002734',
        },
        dark: {
          DEFAULT: '#18181B',
        },
        white: {
          DEFAULT: '#FFFFFF',
        },
        warning: {
          DEFAULT: '#FFB900',
        },
        green: {
          DEFAULT: '#0BB43B',
        },
        gray: {
          DEFAULT: '#FAFAFA',
          100: '#E4E4E7',
        },
        red: {
          DEFAULT: '#E04A36',
        },
      },
      borderRadius: {
        10: '10px',
        16: '16px',
        20: '20px',
        28: '28px',
        32: '32px',
      },
      fontSize: {
        32: '32px',
        44: '44px',
      },
      lineHeight: {
        120: '120%',
        125: '125%',
        130: '130%',
        140: '140%',
      },
    },
  },
  plugins: [],
}
