import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/index.{md,mdoc}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    year: z.number().nullable().optional(),
    category: z.string().nullable().optional(),
    status: z.enum(['active', 'archive', 'draft']).default('active'),
    featured: z.boolean().default(false),
    url: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    thumbnail: z.string().nullable().optional(),
    slides: z.array(
      z.object({
        type: z.enum(['image', 'video']),
        src: z.string(),
        caption: z.string().nullable().optional(),
        alt: z.string().nullable().optional(),
        poster: z.string().nullable().optional(),
        autoplay: z.boolean().default(false),
      })
    ).optional().default([]),
  }),
});

export const collections = { projects };
