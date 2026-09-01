import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // AWS-inspired base
        navy: {
          DEFAULT: '#232F3E',
          light: '#2D3A4A',
          lighter: '#37475A',
        },
        orange: {
          DEFAULT: '#FF9900',
          hover: '#EC7211',
          light: '#FFF3E0',
        },
        surface: {
          DEFAULT: '#FAFAFA',
          card: '#FDFDFD',
          muted: '#F2F3F3',
          border: '#D5DBDB',
        },
        ink: {
          DEFAULT: '#232F3E',
          muted: '#545B64',
          light: '#879596',
        },
        // Gambian flag (for badge only)
        gambia: {
          red: '#CE1126',
          blue: '#0C1C8C',
          green: '#3A7728',
        },
        // Semantic
        success: '#1B8A2A',
        error: '#D13212',
        warning: '#FF9900',
        info: '#0073BB',
      },
      fontSize: {
        display: ["2.5rem", { lineHeight: "1.1", fontWeight: "800" }],
        h1: ["2rem", { lineHeight: "1.2", fontWeight: "700" }],
        h2: ["1.5rem", { lineHeight: "1.3", fontWeight: "700" }],
        h3: ["1.25rem", { lineHeight: "1.4", fontWeight: "600" }],
        body: ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
        caption: ["0.75rem", { lineHeight: "1.4", fontWeight: "500" }],
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
      },
      spacing: {
        section: "3rem",
        "card-gap": "1.5rem",
        "card-pad": "1.25rem",
        "nav-height": "4rem",
      },
      borderRadius: {
        card: "0.75rem",
        badge: "9999px",
        button: "0.5rem",
      },
      boxShadow: {
        card: "0 2px 8px rgba(26, 35, 50, 0.10), 0 1px 3px rgba(26, 35, 50, 0.06)",
        "card-hover": "0 8px 24px rgba(26, 35, 50, 0.15)",
        nav: "0 2px 8px rgba(26, 35, 50, 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
