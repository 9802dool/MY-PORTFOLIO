import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tt: {
          ocean: "#0c4a6e",
          coral: "#e07a5f",
          palm: "#166534",
          cream: "#fefdfb",
          sand: {
            DEFAULT: "#f5ebe0",
            dark: "#e8dcc8",
          },
          ink: {
            DEFAULT: "#1c1917",
            muted: "#57534e",
          },
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
