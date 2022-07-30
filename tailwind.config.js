/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js}'],
    theme: {
        extend: {
            spacing: {
                7.5: '1.875rem',
            },
        },
    },
    plugins: [],
};
