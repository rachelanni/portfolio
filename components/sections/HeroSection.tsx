import Link from 'next/link';
import { defineQuery } from 'next-sanity';
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect';
import { LayoutTextFlip } from '@/components/ui/layout-text-flip';
import { urlForProfile } from '@/sanity/lib/image';
import { sanityFetch } from '@/sanity/lib/live';
import { ProfileImage } from './ProfileImage';

const HERO_QUERY = defineQuery(`*[_id == "singleton-profile"][0]{
  firstName,
  lastName,
  headline,
  headlineStaticText,
  headlineAnimatedWords,
  headlineAnimationDuration,
  shortBio,
  email,
  phone,
  location,
  availability,
  socialLinks,
  yearsOfExperience,
  profileImage
}`);

export async function HeroSection() {
  const { data: profile } = await sanityFetch({ query: HERO_QUERY });

  if (!profile) {
    return null;
  }

  const profileImageUrl =
    profile.profileImage?.asset != null ? urlForProfile(profile.profileImage).url() : null;

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20"
    >
      {/* Background Ripple Effect */}
      <BackgroundRippleEffect rows={8} cols={27} cellSize={56} />

      <div className="container relative z-10 mx-auto max-w-6xl">
        <div className="@container">
          <div className="grid @3xl:grid-cols-2 grid-cols-1 items-center @lg:gap-12 gap-8">
            {/* Text Content */}
            <div className="@container/hero @md/hero:space-y-6 space-y-4">
              <h1 className="font-bold @lg/hero:text-7xl @md/hero:text-5xl text-4xl tracking-tight">
                {profile.firstName} <span className="text-primary">{profile.lastName}</span>
              </h1>
              {profile.headlineStaticText &&
              profile.headlineAnimatedWords &&
              profile.headlineAnimatedWords.length > 0 ? (
                <LayoutTextFlip
                  text={profile.headlineStaticText}
                  words={profile.headlineAnimatedWords}
                  duration={profile.headlineAnimationDuration || 3000}
                />
              ) : (
                <p className="font-medium @lg/hero:text-3xl @md/hero:text-2xl text-muted-foreground text-xl">
                  {profile.headline}
                </p>
              )}
              <p className="@md/hero:text-lg text-base text-muted-foreground leading-relaxed">
                {profile.shortBio}
              </p>

              {profile.socialLinks && (
                <div className="flex flex-wrap @md/hero:gap-4 gap-3 pt-4">
                  {profile.socialLinks.github && (
                    <Link
                      href={profile.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border @md/hero:px-6 px-4 @md/hero:py-3 py-2 @md/hero:text-base text-sm transition-colors hover:bg-accent"
                    >
                      GitHub
                    </Link>
                  )}
                  {profile.socialLinks.linkedin && (
                    <Link
                      href={profile.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border @md/hero:px-6 px-4 @md/hero:py-3 py-2 @md/hero:text-base text-sm transition-colors hover:bg-accent"
                    >
                      LinkedIn
                    </Link>
                  )}
                  {profile.socialLinks.twitter && (
                    <Link
                      href={profile.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border @md/hero:px-6 px-4 @md/hero:py-3 py-2 @md/hero:text-base text-sm transition-colors hover:bg-accent"
                    >
                      Twitter
                    </Link>
                  )}
                  {profile.socialLinks.website && (
                    <Link
                      href={profile.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border @md/hero:px-6 px-4 @md/hero:py-3 py-2 @md/hero:text-base text-sm transition-colors hover:bg-accent"
                    >
                      Website
                    </Link>
                  )}
                </div>
              )}

              <div className="flex flex-wrap @md/hero:gap-6 gap-4 pt-4 @md/hero:text-sm text-muted-foreground text-xs">
                {profile.email && (
                  <div className="flex items-center gap-2">
                    <span>📧</span>
                    <span className="truncate">{profile.email}</span>
                  </div>
                )}
                {profile.location && (
                  <div className="flex items-center gap-2">
                    <span>📍</span>
                    <span>{profile.location}</span>
                  </div>
                )}
                {profile.availability && (
                  <div className="flex items-center gap-2">
                    <span>✅</span>
                    <span>{profile.availability}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Image */}
            {profileImageUrl ? (
              <ProfileImage
                imageUrl={profileImageUrl}
                firstName={profile.firstName || ''}
                lastName={profile.lastName || ''}
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
