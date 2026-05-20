import Image from 'next/image';
import Link from 'next/link';
import { defineQuery } from 'next-sanity';
import { urlFor } from '@/sanity/lib/image';
import { sanityFetch } from '@/sanity/lib/live';

const BLOG_QUERY = defineQuery(`*[_type == "blog"] | order(publishedAt desc){
  title,
  slug,
  excerpt,
  category,
  tags,
  publishedAt,
  readTime,
  featuredImage
}`);

export async function BlogSection() {
  const { data: posts } = await sanityFetch({
    query: BLOG_QUERY,
  });

  if (!posts || posts.length === 0) {
    return null;
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section id="blog" className="bg-muted/30 px-6 py-20">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-bold text-4xl md:text-5xl">Latest Blog Posts</h2>
          <p className="text-muted-foreground text-xl">Thoughts, tutorials, and insights</p>
        </div>

        <div className="@container">
          <div className="grid @2xl:grid-cols-2 @5xl:grid-cols-3 grid-cols-1 gap-8">
            {posts.map((post) => (
              <article
                key={post.slug?.current}
                className="@container/card group overflow-hidden rounded-lg border bg-card transition-all duration-300 hover:shadow-xl"
              >
                {post.featuredImage && (
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <Image
                      src={urlFor(post.featuredImage).width(600).height(400).url()}
                      alt={post.title || 'Blog post'}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="@md/card:space-y-4 space-y-3 @md/card:p-6 p-4">
                  <div className="flex @xs/card:flex-row flex-col @xs/card:items-center gap-2 @md/card:text-sm text-muted-foreground text-xs">
                    {post.category && (
                      <span className="w-fit rounded-full bg-primary/10 px-2 @md/card:py-1 py-0.5 text-primary text-xs">
                        {post.category}
                      </span>
                    )}
                    <div className="flex items-center gap-2">
                      {post.publishedAt && (
                        <span className="truncate">{formatDate(post.publishedAt)}</span>
                      )}
                      {post.readTime && (
                        <>
                          <span>•</span>
                          <span>{post.readTime} min read</span>
                        </>
                      )}
                    </div>
                  </div>

                  <h3 className="line-clamp-2 font-semibold @md/card:text-xl text-lg transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>

                  <p className="line-clamp-3 @md/card:text-sm text-muted-foreground text-xs">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap @md/card:gap-2 gap-1.5">
                      {post.tags.slice(0, 3).map((tag: string) => (
                        <span
                          key={`${post.slug?.current}-${tag}`}
                          className="rounded-md bg-muted px-2 @md/card:py-1 py-0.5 text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <Link
                    href={`/blog/${post.slug?.current}`}
                    className="inline-flex items-center font-medium @md/card:text-sm text-primary text-xs hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
