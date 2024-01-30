module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "auto-fill-270": "repeat(auto-fill, minmax(270px, 1fr))",
      },
      plugins: [],
    },
  },
};
