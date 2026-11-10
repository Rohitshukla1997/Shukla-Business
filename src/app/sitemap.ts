import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/electronics-repair",
    "/website-development",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: "2026-11-02",
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
}
