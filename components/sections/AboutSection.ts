import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import { defineQuery } from 'next-sanity';
import { sanityFetch } from '@/sanity/lib/live';

const ABOUT_QUERY = defineQuery(`*[_id == "singleton-profile"][0]{
  firstName,
  lastName,
  fullBio,
  yearsOfExperience,
  stats,
  email,
  phone,
  location
}`);

export async function AboutSection() {
  const { data: profile } = await sanityFetch({ query: ABOUT_QUERY });

  if (!profile) {
    return null;
  }

  return (
    <section id="about" className="px-6 py-20">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-bold text-4xl md:text-5xl">About Me</h2>
          <p className="text-muted-foreground text-xl">Get to know me better</p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          {profile.fullBio && (
            <PortableText
              value={profile.fullBio}
              components={{
                block: {
                  normal: ({ children }) => (
                    <p className="mb-4 text-muted-foreground leading-relaxed">{children}</p>
                  ),
                  h2: ({ children }) => (
                    <h2 className="mt-8 mb-4 font-bold text-3xl">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="mt-6 mb-3 font-semibold text-2xl">{children}</h3>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="my-4 border-primary border-l-4 pl-4 italic">
                      {children}
                    </blockquote>
                  ),
                },
                marks: {
                  strong: ({ children }) => (
                    <strong className="font-semibold text-foreground">{children}</strong>
                  ),
                  em: ({ children }) => <em className="italic">{children}</em>,
                  link: ({ children, value }) => {
                    const href = value?.href || '';
                    const isExternal = href.startsWith('http');
                    return (
                      <Link
                        href={href}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                        className="text-primary hover:underline"
                      >
                        {children}
                      </Link>
                    );
                  },
                },
                list: {
                  bullet: ({ children }) => (
                    <ul className="mb-4 list-inside list-disc space-y-2 text-muted-foreground">
                      {children}
                    </ul>
                  ),
                  number: ({ children }) => (
                    <ol className="mb-4 list-inside list-decimal space-y-2 text-muted-foreground">
                      {children}
                    </ol>
                  ),
                },
              }}
            />
          )}
        </div>

        {/* Stats from CMS */}
        {profile.stats && profile.stats.length > 0 && (
          <div className="@container mt-12 border-t pt-12">
            <div className="grid @lg:grid-cols-4 grid-cols-2 gap-6">
              {profile.stats.map((stat, idx) => (
                <div key={`${stat.label}-${idx}`} className="@container/stat text-center">
                  <div className="mb-2 font-bold @md/stat:text-4xl text-3xl text-primary">
                    {stat.value}
                  </div>
                  <div className="@md/stat:text-sm text-muted-foreground text-xs">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
