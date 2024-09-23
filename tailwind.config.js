/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        colorPreset1: "rgba(var(--color-preset1), <alpha-value>)",
        colorPreset2: "rgba(var(--color-preset2), <alpha-value>)",
        colorPreset3: "rgba(var(--color-preset3), <alpha-value>)",
        colorPreset4: "rgba(var(--color-preset4), <alpha-value>)",
        colorPreset5: "rgba(var(--color-preset5), <alpha-value>)",
        colorPreset6: "rgba(var(--color-preset6), <alpha-value>)",
        colorPreset7: "rgba(var(--color-preset7), <alpha-value>)",
        colorPreset8: "rgba(var(--color-preset8), <alpha-value>)",
        colorPreset9: "rgba(var(--color-preset9), <alpha-value>)",
        colorPreset10: "rgba(var(--color-preset10), <alpha-value>)",
      },

      fontSize: {
        sizePreset1: "var(--size-preset1)",
        sizePreset2: "var(--size-preset2)",
        sizePreset3: "var(--size-preset3)",
        sizePreset4: "var(--size-preset4)",
        sizePreset5: "var(--size-preset5)",
        sizePreset6: "var(--size-preset6)",
        sizePreset7: "var(--size-preset7)",
        sizePreset8: "var(--size-preset8)",
        sizePreset9: "var(--size-preset9)",
      },
    },
  },
  plugins: [],
};
