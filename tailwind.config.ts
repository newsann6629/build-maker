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
                background: "var(--background)",
                foreground: "var(--foreground)",
                arcane: {
                    gold: "#eab308",
                    dark: "#050506",
                    card: "rgba(10, 10, 12, 0.8)",
                    accent: "#8b5cf6", // Purple accent
                    success: "#10b981", // Emerald
                    danger: "#ef4444", // Red
                },
            },
            fontFamily: {
                maitree: ['Maitree', 'serif'],
                prompt: ['Prompt', 'sans-serif'],
                outfit: ['Outfit', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
export default config;
