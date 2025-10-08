import localFont from "next/font/local";

export const junicode = localFont({
  src: [
    {
      path: "../public/fonts/junicode/Junicode.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/junicode/Junicode-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/junicode/Junicode-Bold.ttf",
      weight: "700",
      style: "normal",
    },

    {
      path: "../public/fonts/junicode/Junicode-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  display: "swap",
});
