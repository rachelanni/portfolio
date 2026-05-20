/**
 * Sanity Studio catch-all route.
 * @see https://github.com/sanity-io/next-sanity
 */

import Studio from './Studio';

export { metadata, viewport } from 'next-sanity/studio';

export function generateStaticParams() {
  return [{ tool: [] }];
}

export default function StudioPage() {
  return <Studio />;
}
