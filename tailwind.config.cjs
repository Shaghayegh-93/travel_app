module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "auto-fill-270": "repeat(auto-fill, minmax(270px, 1fr))",
      },
      fontFamily: {
        Inter: ["Inter"],
        system: ["system-ui", "sans-serif"],
        Avenir: ["Avenir", "sans-serif"],
        Helvetica: ["Helvetica", "sans-serif"],
        Arial: ["Arial", "sans-serif"],
        Gilda: ["Gilda-Display"],
      },
      plugins: [],
    },
  },
};
