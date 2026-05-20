import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '@/sanity/env';

const publicSiteBase =
  typeof process.env.NEXT_PUBLIC_BASE_URL === 'string'
    ? process.env.NEXT_PUBLIC_BASE_URL.trim().replace(/\/$/, '')
    : '';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  // Matches next-sanity Live defaults: publish view for visitors; previews use sanityFetch perspectives.
  perspective: 'published',
  stega: {
    enabled: true,
    studioUrl: publicSiteBase !== '' ? `${publicSiteBase}/studio` : 'http://localhost:3000/studio',
  },
});
