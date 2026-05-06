import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const archive = defineCollection({
  loader: glob({ base: "./src/content/archive", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().int().nonnegative(),
    updated: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

const events = defineCollection({
  loader: glob({ base: "./src/content/events", pattern: "**/*.{md,json}" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    year: z.string(),
    venue: z.string(),
    lineup: z.string(),
    confidence: z.string().default("unverified"),
    status: z.string().default("played"),
    sourceLabel: z.string().optional(),
    sourceHref: z.string().optional(),
    sourceExternal: z.boolean().optional().default(false),
  }),
});

const roster = defineCollection({
  loader: glob({ base: "./src/content/roster", pattern: "**/*.{md,json}" }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    notes: z.string().optional(),
    links: z.object({
      sc: z.string().optional(),
      ig: z.string().optional(),
      bc: z.string().optional(),
      ra: z.string().optional(),
    }).default({}),
    order: z.number().int().nonnegative().default(99),
  }),
});

export const collections = { archive, events, roster };
