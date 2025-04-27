// tailwind.config.ts
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./shared/**/*.{ts,tsx}" // wherever your shared folder is
  ],
  safelist: [
    "bg-green-500/10",
    "text-green-500",
    "bg-yellow-500/10",
    "text-yellow-500",
    "bg-red-500/10",
    "text-red-500",
    "bg-blue-500/10",
    "text-blue-500",
    "bg-purple-500/10",
    "text-purple-500",
    "bg-gray-500/10",
    "text-gray-400",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
