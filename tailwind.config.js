module.exports = {
  purge: [
    "./pages/**/*.tsx",
    "./pages/**/*.jsx",
    "./components/**/*.tsx",
    "./components/**/*.jsx",
    "./public/index.html",
  ],
  theme: {
    fontFamily: {
      sans: "Rubik, Arial, sans-serif",
      serif: "Rubik, serif",
    },
    extend: {
      colors: {
        primary: "#0D3895",
        bgColor: "#F4EDDB",
      },
      fontSize: {
        "10xl": "221px",
      },
      borderStyle: ["hover"],
      lineHeight: {
        "extra-loose": "2.5",
        12: "3rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
