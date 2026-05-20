import Link from 'next/link';
import { defineQuery } from 'next-sanity';
import { sanityFetch } from '@/sanity/lib/live';
import { ContactForm } from './ContactForm';

const PROFILE_QUERY = defineQuery(`*[_id == "singleton-profile"][0]{
  email,
  phone,
  location,
  socialLinks
}`);

export async function ContactSection() {
  const { data: profile } = await sanityFetch({ query: PROFILE_QUERY });

  if (!profile) {
    return null;
  }

  return (
    <section id="contact" className="bg-muted/30 px-6 py-20 pb-40">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-bold text-4xl md:text-5xl">Get In Touch</h2>
          <p className="text-muted-foreground text-xl">
            Wherever you are in the world, let&apos;s work together on your next project.
          </p>
        </div>

        <div className="@container">
          <div className="grid @3xl:grid-cols-2 grid-cols-1 gap-8">
            {/* Contact Info */}
            <div className="@container/info space-y-6">
              <h3 className="mb-6 font-semibold @md/info:text-2xl text-xl">Contact Information</h3>

              {profile.email && (
                <div className="flex items-start @md/info:gap-4 gap-3">
                  <div className="flex @md/info:h-12 h-10 @md/info:w-12 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <span className="@md/info:text-2xl text-xl">📧</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="mb-1 font-semibold @md/info:text-base text-sm">Email</h4>
                    <Link
                      href={`mailto:${profile.email}`}
                      className="block truncate @md/info:text-sm text-muted-foreground text-xs transition-colors hover:text-primary"
                    >
                      {profile.email}
                    </Link>
                  </div>
                </div>
              )}

              {profile.phone && (
                <div className="flex items-start @md/info:gap-4 gap-3">
                  <div className="flex @md/info:h-12 h-10 @md/info:w-12 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <span className="@md/info:text-2xl text-xl">📱</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="mb-1 font-semibold @md/info:text-base text-sm">Phone</h4>
                    <Link
                      href={`tel:${profile.phone}`}
                      className="@md/info:text-sm text-muted-foreground text-xs transition-colors hover:text-primary"
                    >
                      {profile.phone}
                    </Link>
                  </div>
                </div>
              )}

              {profile.location && (
                <div className="flex items-start @md/info:gap-4 gap-3">
                  <div className="flex @md/info:h-12 h-10 @md/info:w-12 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <span className="@md/info:text-2xl text-xl">📍</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="mb-1 font-semibold @md/info:text-base text-sm">Location</h4>
                    <p className="@md/info:text-sm text-muted-foreground text-xs">
                      {profile.location}
                    </p>
                  </div>
                </div>
              )}

              {profile.socialLinks && (
                <div className="pt-6">
                  <h4 className="mb-4 font-semibold @md/info:text-base text-sm">Follow Me</h4>
                  <div className="flex flex-wrap @md/info:gap-3 gap-2">
                    {profile.socialLinks.github && (
                      <Link
                        href={profile.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border @md/info:px-4 px-3 @md/info:py-2 py-1.5 @md/info:text-sm text-xs transition-colors hover:bg-accent"
                      >
                        GitHub
                      </Link>
                    )}
                    {profile.socialLinks.linkedin && (
                      <Link
                        href={profile.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border @md/info:px-4 px-3 @md/info:py-2 py-1.5 @md/info:text-sm text-xs transition-colors hover:bg-accent"
                      >
                        LinkedIn
                      </Link>
                    )}
                    {profile.socialLinks.twitter && (
                      <Link
                        href={profile.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border @md/info:px-4 px-3 @md/info:py-2 py-1.5 @md/info:text-sm text-xs transition-colors hover:bg-accent"
                      >
                        Twitter
                      </Link>
                    )}
                    {profile.socialLinks.website && (
                      <Link
                        href={profile.socialLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border @md/info:px-4 px-3 @md/info:py-2 py-1.5 @md/info:text-sm text-xs transition-colors hover:bg-accent"
                      >
                        Website
                      </Link>
                    )}
                    {profile.socialLinks.medium && (
                      <Link
                        href={profile.socialLinks.medium}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border @md/info:px-4 px-3 @md/info:py-2 py-1.5 @md/info:text-sm text-xs transition-colors hover:bg-accent"
                      >
                        Medium
                      </Link>
                    )}
                    {profile.socialLinks.devto && (
                      <Link
                        href={profile.socialLinks.devto}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border @md/info:px-4 px-3 @md/info:py-2 py-1.5 @md/info:text-sm text-xs transition-colors hover:bg-accent"
                      >
                        Dev.to
                      </Link>
                    )}
                    {profile.socialLinks.youtube && (
                      <Link
                        href={profile.socialLinks.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border @md/info:px-4 px-3 @md/info:py-2 py-1.5 @md/info:text-sm text-xs transition-colors hover:bg-accent"
                      >
                        YouTube
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
