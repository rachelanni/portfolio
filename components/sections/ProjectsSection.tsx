import Image from 'next/image';
import Link from 'next/link';
import { defineQuery } from 'next-sanity';
import { urlFor } from '@/sanity/lib/image';
import { sanityFetch } from '@/sanity/lib/live';

const PROJECTS_QUERY =
  defineQuery(`*[_type == "project" && featured == true] | order(order asc)[0...6]{
  title,
  slug,
  tagline,
  category,
  liveUrl,
  githubUrl,
  coverImage,
  technologies[]->{name, category, color}
}`);

export async function ProjectsSection() {
  const { data: projects } = await sanityFetch({ query: PROJECTS_QUERY });

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section id="projects" className="bg-muted/30 px-6 py-20">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-bold text-4xl md:text-5xl">Featured Projects</h2>
          <p className="text-muted-foreground text-xl">Some of my best work</p>
        </div>

        <div className="@container">
          <div className="grid @2xl:grid-cols-2 @5xl:grid-cols-3 grid-cols-1 gap-8">
            {projects.map((project) => (
              <div
                key={project.slug?.current}
                className="@container/card group overflow-hidden rounded-lg border bg-card transition-all duration-300 hover:shadow-xl"
              >
                {/* Project Image */}
                {project.coverImage && (
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <Image
                      src={urlFor(project.coverImage).width(600).height(400).url()}
                      alt={project.title || 'Project image'}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Glass overlay that fades on hover */}
                    <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-0" />
                  </div>
                )}

                {/* Project Content */}
                <div className="@md/card:space-y-4 space-y-3 @md/card:p-6 p-4">
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      {project.category && (
                        <span className="rounded-full bg-primary/10 px-2 @md/card:py-1 py-0.5 text-primary text-xs">
                          {project.category}
                        </span>
                      )}
                    </div>
                    <h3 className="mb-2 line-clamp-2 font-semibold @md/card:text-xl text-lg">
                      {project.title || 'Untitled Project'}
                    </h3>
                    <p className="line-clamp-2 @md/card:text-sm text-muted-foreground text-xs">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap @md/card:gap-2 gap-1.5">
                      {project.technologies.slice(0, 4).map((tech, idx) => {
                        const techData =
                          tech && typeof tech === 'object' && 'name' in tech ? tech : null;
                        return techData?.name ? (
                          <span
                            key={`${project.slug?.current}-tech-${idx}`}
                            className="rounded-md bg-muted px-2 @md/card:py-1 py-0.5 text-xs"
                          >
                            {techData.name}
                          </span>
                        ) : null;
                      })}
                      {project.technologies.length > 4 && (
                        <span className="rounded-md bg-muted px-2 @md/card:py-1 py-0.5 text-xs">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex @xs/card:flex-row flex-col @xs/card:gap-3 gap-2 pt-2">
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 rounded-lg bg-primary @md/card:px-4 px-3 py-2 text-center @md/card:text-sm text-primary-foreground text-xs transition-colors hover:bg-primary/90"
                      >
                        Live Demo
                      </Link>
                    )}
                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border @md/card:px-4 px-3 py-2 text-center @md/card:text-sm text-xs transition-colors hover:bg-accent"
                      >
                        GitHub
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
