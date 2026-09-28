import { MetadataRoute } from "next";
import { COURSE_LEVELS } from "@/lib/curriculum-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://agentic-craft.dev";

  const moduleUrls = COURSE_LEVELS.flatMap((level) =>
    level.modules.map((mod) => ({
      url: `${baseUrl}/learn/${level.id}/${mod.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))
  );

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...moduleUrls,
  ];
}
