import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString().split("T")[0];

  const publicRoutes = [
    {
      route: "",
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      route: "/electronics-repair",
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      route: "/website-development",
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      route: "/second-hand-deals",
      changeFrequency: "daily" as const,
      priority: 0.85,
    },
    {
      route: "/about",
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      route: "/contact",
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];

  return publicRoutes.map(({ route, changeFrequency, priority }) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: currentDate,
    changeFrequency,
    priority,
  }));
}
