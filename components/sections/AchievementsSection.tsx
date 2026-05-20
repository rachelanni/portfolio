import { IconExternalLink, IconStar } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { defineQuery } from 'next-sanity';
import { urlFor } from '@/sanity/lib/image';
import { sanityFetch } from '@/sanity/lib/live';

const ACHIEVEMENTS_QUERY = defineQuery(`*[_type == "achievement"] | order(date desc){
  title,
  type,
  issuer,
  date,
  description,
  image,
  url,
  featured,
  order
}`);

export async function AchievementsSection() {
  const { data: achievements } = await sanityFetch({
    query: ACHIEVEMENTS_QUERY,
  });

  if (!achievements || achievements.length === 0) {
    return null;
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  };

  const getTypeColor = (type: string | null | undefined) => {
    if (!type) return 'bg-gray-500/10 text-gray-500';
    const colors: Record<string, string> = {
      award: 'bg-yellow-500/10 text-yellow-500',
      hackathon: 'bg-purple-500/10 text-purple-500',
      publication: 'bg-blue-500/10 text-blue-500',
      speaking: 'bg-green-500/10 text-green-500',
      'open-source': 'bg-orange-500/10 text-orange-500',
      milestone: 'bg-pink-500/10 text-pink-500',
      recognition: 'bg-cyan-500/10 text-cyan-500',
      other: 'bg-gray-500/10 text-gray-500',
    };
    return colors[type] || colors.other;
  };

  const getTypeLabel = (type: string | null | undefined) => {
    if (!type) return 'Achievement';
    const labels: Record<string, string> = {
      award: 'Award',
      hackathon: 'Hackathon Win',
      publication: 'Publication',
      speaking: 'Speaking',
      'open-source': 'Open Source',
      milestone: 'Milestone',
      recognition: 'Recognition',
      other: 'Other',
    };
    return labels[type] || 'Achievement';
  };

  // Separate featured and regular achievements
  const featured = achievements.filter((a) => a.featured);
  const regular = achievements.filter((a) => !a.featured);

  return (
    <section id="achievements" className="bg-muted/30 px-6 py-20">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-bold text-4xl md:text-5xl">Achievements & Awards</h2>
          <p className="text-muted-foreground text-xl">Milestones and recognitions</p>
        </div>

        {/* Featured Achievements */}
        {featured.length > 0 && (
          <div className="mb-12">
            <h3 className="mb-6 flex items-center gap-2 font-bold text-2xl">
              <IconStar className="h-6 w-6 fill-yellow-500 text-yellow-500" />
              Featured Achievements
            </h3>
            <div className="@container">
              <div className="grid @3xl:grid-cols-2 grid-cols-1 gap-6">
                {featured.map((achievement) => (
                  <div
                    key={`${achievement.title}-${achievement.date}`}
                    className="@container/card rounded-lg border-2 border-primary/20 bg-card p-6 transition-all hover:scale-[1.02] hover:shadow-lg"
                  >
                    {achievement.image && (
                      <div className="relative mb-4 @md/card:h-48 h-32 w-full overflow-hidden rounded-lg">
                        <Image
                          src={urlFor(achievement.image).width(400).height(200).url()}
                          alt={achievement.title || 'Achievement'}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="mb-3 flex @xs/card:flex-row flex-col @xs/card:items-center gap-2">
                      {achievement.type && (
                        <span
                          className={`rounded-full px-2.5 py-1 font-medium text-xs ${getTypeColor(
                            achievement.type
                          )}`}
                        >
                          {getTypeLabel(achievement.type)}
                        </span>
                      )}
                      {achievement.date && (
                        <span className="@md/card:text-sm text-muted-foreground text-xs">
                          {formatDate(achievement.date)}
                        </span>
                      )}
                    </div>

                    <h4 className="mb-2 font-semibold @md/card:text-xl text-lg">
                      {achievement.title}
                    </h4>
                    {achievement.issuer && (
                      <p className="mb-3 truncate font-medium @md/card:text-base text-primary text-sm">
                        {achievement.issuer}
                      </p>
                    )}
                    {achievement.description && (
                      <p className="mb-4 line-clamp-3 @md/card:text-base text-muted-foreground text-sm">
                        {achievement.description}
                      </p>
                    )}

                    {achievement.url && (
                      <Link
                        href={achievement.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 @md/card:text-sm text-primary text-xs hover:underline"
                      >
                        Learn More
                        <IconExternalLink className="@md/card:h-4 h-3.5 @md/card:w-4 w-3.5" />
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Regular Achievements */}
        {regular.length > 0 && (
          <div>
            {featured.length > 0 && <h3 className="mb-6 font-bold text-2xl">All Achievements</h3>}
            <div className="@container">
              <div className="grid @2xl:grid-cols-2 @5xl:grid-cols-3 grid-cols-1 gap-6">
                {regular.map((achievement) => (
                  <div
                    key={`${achievement.title}-${achievement.date}`}
                    className="@container/card flex flex-col rounded-lg border bg-card p-6 transition-all hover:scale-105 hover:shadow-lg"
                  >
                    {achievement.image && (
                      <div className="relative mb-4 @md/card:h-32 h-24 w-full overflow-hidden rounded-lg">
                        <Image
                          src={urlFor(achievement.image).width(300).height(128).url()}
                          alt={achievement.title || 'Achievement'}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="flex-1">
                      <div className="mb-3 flex items-center gap-2">
                        {achievement.type && (
                          <span
                            className={`rounded-full px-2 @md/card:py-1 py-0.5 font-medium text-xs ${getTypeColor(
                              achievement.type
                            )}`}
                          >
                            {getTypeLabel(achievement.type)}
                          </span>
                        )}
                      </div>

                      <h4 className="mb-2 line-clamp-2 font-semibold @md/card:text-lg text-base">
                        {achievement.title}
                      </h4>
                      {achievement.issuer && (
                        <p className="mb-2 truncate font-medium @md/card:text-sm text-primary text-xs">
                          {achievement.issuer}
                        </p>
                      )}
                      {achievement.date && (
                        <p className="mb-3 @md/card:text-sm text-muted-foreground text-xs">
                          {formatDate(achievement.date)}
                        </p>
                      )}
                      {achievement.description && (
                        <p className="line-clamp-3 @md/card:text-sm text-muted-foreground text-xs">
                          {achievement.description}
                        </p>
                      )}
                    </div>

                    {achievement.url && (
                      <Link
                        href={achievement.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 border-t pt-4 @md/card:text-sm text-primary text-xs hover:underline"
                      >
                        Learn More
                        <IconExternalLink className="@md/card:h-4 h-3.5 @md/card:w-4 w-3.5" />
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
