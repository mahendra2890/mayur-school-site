import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const wing = z.enum(['english', 'hindi', 'both']);

const announcements = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/announcements' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    wing,
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    detail: z.string(),
    date: z.coerce.date(),
  }),
});

const results = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/results' }),
  schema: z.object({
    wing: z.enum(['english', 'hindi']),
    year: z.number(),
    passRate12: z.string(),
    above90: z.number(),
    toppers: z.array(z.object({
      name: z.string(),
      stream: z.string(),
      percent: z.string(),
      photo: z.string().optional(),
    })),
    history: z.array(z.object({
      batch: z.string(),
      pass10: z.string(),
      pass12: z.string(),
      topper: z.string(),
    })),
  }),
});

const faculty = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/faculty' }),
  schema: z.object({
    wing: z.enum(['english', 'hindi']),
    teacherCount: z.number(),
    principal: z.object({
      name: z.string(),
      title: z.string(),
      bio: z.string(),
      photo: z.string().optional(),
    }),
    teachers: z.array(z.object({
      name: z.string(),
      role: z.string(),
      photo: z.string().optional(),
    })),
    moreNote: z.string().optional(),
  }),
});

const fees = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/fees' }),
  schema: z.object({
    wing: z.enum(['english', 'hindi']),
    headers: z.object({
      group: z.string(),
      admission: z.string(),
      tuition: z.string(),
      annual: z.string(),
    }),
    rows: z.array(z.object({
      group: z.string(),
      admission: z.string(),
      tuition: z.string(),
      annual: z.string(),
    })),
  }),
});

const gallery = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/gallery' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['events', 'sports', 'campus', 'celebrations']),
    image: z.string().optional(),
    order: z.number().default(0),
  }),
});

const downloads = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/downloads' }),
  schema: z.object({
    title: z.string(),
    wing,
    file: z.string().optional(),
    size: z.string().optional(),
    order: z.number().default(0),
  }),
});

const achievements = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/achievements' }),
  schema: z.object({
    level: z.string(),
    year: z.string(),
    title: z.string(),
    description: z.string(),
    order: z.number().default(0),
  }),
});

const alumni = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/alumni' }),
  schema: z.object({
    name: z.string(),
    batch: z.string(),
    detail: z.string(),
    quote: z.string(),
    wing: z.enum(['english', 'hindi']),
    photo: z.string().optional(),
    order: z.number().default(0),
  }),
});

const settings = defineCollection({
  loader: glob({ pattern: 'site.yaml', base: './src/content/settings' }),
  schema: z.object({
    admissionsOpen: z.boolean(),
    admissionsTickerText: z.string(),
    session: z.string(),
    phone: z.string(),
    email: z.string(),
    addressLines: z.array(z.string()),
    schoolHours: z.string(),
    officeHours: z.string(),
    web3formsKey: z.string(),
    mapEmbedUrl: z.string().optional(),
    stats: z.array(z.object({ value: z.string(), label: z.string() })),
  }),
});

const calendar = defineCollection({
  loader: glob({ pattern: 'calendar.yaml', base: './src/content/settings' }),
  schema: z.object({
    terms: z.array(z.object({ name: z.string(), range: z.string() })),
    holidays: z.array(z.object({ name: z.string(), date: z.string() })),
  }),
});

export const collections = {
  announcements, events, results, faculty, fees, gallery,
  downloads, achievements, alumni, settings, calendar,
};
