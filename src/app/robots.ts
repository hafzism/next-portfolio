import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://hafzism.in";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/", // Disallow search engines from crawling backend API endpoints
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
