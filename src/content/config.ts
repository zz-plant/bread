import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional().default(false),
    tags: z.array(z.string()).default([])
  })
});

const archive = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().int().nonnegative(),
    updated: z.coerce.date(),
    tags: z.array(z.string()).default([])
  })
});

export const collections = { blog, archive };
