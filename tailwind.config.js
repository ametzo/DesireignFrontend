/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                customGray: "#434343",
                mainBg: "#ededed",
            },
        },
    },
    plugins: [],
};
