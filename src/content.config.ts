import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '[^_]*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    year: z.number().optional(),
    category: z.string().optional(),
    status: z.enum(['active', 'archive', 'draft']).default('active'),
    featured: z.boolean().default(false),
    url: z.string().optional(),
    description: z.string().optional(),
    thumbnail: z.string().optional(),
    slides: z.array(
      z.object({
        type: z.enum(['image', 'video']),
        src: z.string(),
        caption: z.string().optional(),
        alt: z.string().optional(),
        poster: z.string().optional(),
        autoplay: z.boolean().optional(),
      })
    ),
  }),
});

export const collections = { projects };
