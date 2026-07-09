import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const releases = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/releases" }),
  schema: z.object({
    version: z.string(),
    date: z.coerce.date(),
  }),
});

export const collections = { releases };
