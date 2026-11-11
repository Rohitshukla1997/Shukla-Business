import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shukla Electronic & Computer Services",
    short_name: "Shukla Electronic",
    description:
      "Electronics and computer repair services and professional website development in Nagpur.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#000000",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
