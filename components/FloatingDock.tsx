import { defineQuery } from 'next-sanity';
import { FloatingDockClient } from '@/components/FloatingDockClient';
import { sanityFetch } from '@/sanity/lib/live';

const NAVIGATION_QUERY = defineQuery(`*[_type == "navigation"] | order(order asc){
  title,
  href,
  icon,
  isExternal
}`);

export async function FloatingDock() {
  const { data: navItems } = await sanityFetch({ query: NAVIGATION_QUERY });
  const items = Array.isArray(navItems) ? navItems : [];

  if (items.length === 0) {
    return null;
  }

  return <FloatingDockClient navItems={items} />;
}
