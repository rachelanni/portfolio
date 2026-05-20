import type { SanityImageSource } from '@sanity/image-url';
import { IconExternalLink } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { defineQuery } from 'next-sanity';
import { CometCard } from '@/components/ui/comet-card';
import { urlFor } from '@/sanity/lib/image';
import { sanityFetch } from '@/sanity/lib/live';

type CertificationSkill = {
  name?: string | null;
  category?: string | null;
};

type CertificationItem = {
  name: string | null;
  issuer: string | null;
  issueDate: string | null;
  expiryDate: string | null;
  credentialId: string | null;
  credentialUrl: string | null;
  logo: SanityImageSource | null;
  description: string | null;
  skills: CertificationSkill[] | null;
  order: number | null;
};

const CERTIFICATIONS_QUERY = defineQuery(`*[_type == "certification"] | order(issueDate desc){
  name,
  issuer,
  issueDate,
  expiryDate,
  credentialId,
  credentialUrl,
  logo,
  description,
  skills[]->{name, category},
  order
}`);

export async function CertificationsSection() {
  const { data } = await sanityFetch({
    query: CERTIFICATIONS_QUERY,
  });
  const certifications = data as CertificationItem[] | null;

  if (!certifications || certifications.length === 0) {
    return null;
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const isExpired = (expiryDate: string | null | undefined) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  return (
    <section
      id="certifications"
      className="from-background via-muted/20 to-background px-6.bg-gradient-to-b py-20"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-bold text-4xl md:text-5xl">Certifications</h2>
          <p className="text-muted-foreground text-xl">
            Professional credentials and certifications
          </p>
        </div>

        <div className="@container">
          <div className="grid @2xl:grid-cols-2 grid-cols-1 gap-10">
            {certifications.map((certification: CertificationItem) => (
              <CometCard
                key={`${certification.issuer ?? 'issuer'}-${certification.name ?? 'name'}-${certification.issueDate ?? 'date'}`}
                rotateDepth={8}
                translateDepth={10}
                className="w-full"
              >
                {/* Outer Frame - Light Matting */}
                <div
                  className="relative rounded-sm border-8 border-card/80 bg-card p-4 shadow-2xl"
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Inner Certificate - Dark Background */}
                  <div className="relative.bg-gradient-to-br flex min-h-[450px] flex-col border-2 border-yellow-600/40 from-zinc-900 via-zinc-900 to-zinc-950 p-8 dark:from-zinc-950 dark:via-black dark:to-zinc-950">
                    {/* Decorative Corner Frames - Top Left */}
                    <div className="absolute top-0 left-0 h-20 w-20">
                      <div className="absolute top-3 left-3 h-10 w-10 border-yellow-600/60 border-t-2 border-l-2" />
                      <div className="absolute top-5 left-5 h-6 w-6 border-yellow-600/60 border-t-2 border-l-2" />
                    </div>

                    {/* Decorative Corner Frames - Top Right */}
                    <div className="absolute top-0 right-0 h-20 w-20">
                      <div className="absolute top-3 right-3 h-10 w-10 border-yellow-600/60 border-t-2 border-r-2" />
                      <div className="absolute top-5 right-5 h-6 w-6 border-yellow-600/60 border-t-2 border-r-2" />
                    </div>

                    {/* Decorative Corner Frames - Bottom Left */}
                    <div className="absolute bottom-0 left-0 h-20 w-20">
                      <div className="absolute bottom-3 left-3 h-10 w-10 border-yellow-600/60 border-b-2 border-l-2" />
                      <div className="absolute bottom-5 left-5 h-6 w-6 border-yellow-600/60 border-b-2 border-l-2" />
                    </div>

                    {/* Decorative Corner Frames - Bottom Right */}
                    <div className="absolute right-0 bottom-0 h-20 w-20">
                      <div className="absolute right-3 bottom-3 h-10 w-10 border-yellow-600/60 border-r-2 border-b-2" />
                      <div className="absolute right-5 bottom-5 h-6 w-6 border-yellow-600/60 border-r-2 border-b-2" />
                    </div>

                    {/* Diamond Accents - Corners */}
                    <div className="absolute top-2 left-2 h-3 w-3 rotate-45 bg-yellow-600/70" />
                    <div className="absolute top-2 right-2 h-3 w-3 rotate-45 bg-yellow-600/70" />
                    <div className="absolute bottom-2 left-2 h-3 w-3 rotate-45 bg-yellow-600/70" />
                    <div className="absolute right-2 bottom-2 h-3 w-3 rotate-45 bg-yellow-600/70" />

                    <div className="relative z-10 flex flex-1 flex-col items-center text-center">
                      {/* Date at Top */}
                      <div className="mb-4">
                        <p className="text-xs text-zinc-400">
                          {certification.issueDate && formatDate(certification.issueDate)}
                        </p>
                      </div>

                      {/* Certificate Title - Small and Gold at top */}
                      <div className="mb-5">
                        <h4 className="mb-1 font-bold text-lg text-yellow-600/80 uppercase tracking-wide">
                          CERTIFICATE
                        </h4>
                        <p className="text-xs text-yellow-600/80 italic">for</p>
                      </div>

                      {/* Certificate Name - Main Subject */}
                      <h3 className="mb-6 px-4 font-bold text-3xl text-white leading-tight">
                        {String(certification.name ?? '')}
                      </h3>

                      {/* Description */}
                      {certification.description && (
                        <p className="mb-5 line-clamp-3 px-8 text-sm text-zinc-300/80 leading-relaxed">
                          {String(certification.description)}
                        </p>
                      )}

                      {/* Logo Badge */}
                      {certification.logo && (
                        <div className="relative mb-5 flex items-center justify-center">
                          <div className="relative h-16 w-16 rounded-full border border-yellow-600/30 bg-white/10 p-2">
                            <div className="relative h-full w-full">
                              <Image
                                src={urlFor(certification.logo).width(64).height(64).url()}
                                alt={`${certification.name ?? 'Certification'} badge`}
                                fill
                                className="object-contain"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Issued By */}
                      <div className="mb-4">
                        <p className="font-semibold text-lg text-white">
                          {String(certification.issuer ?? '')}
                        </p>
                      </div>

                      {/* Certificate Details */}
                      <div className="mt-auto flex w-full flex-1 flex-col justify-end">
                        {/* Skills/Competencies */}
                        {certification.skills && certification.skills.length > 0 && (
                          <div className="mb-4">
                            <div className="flex flex-wrap justify-center gap-1.5">
                              {certification.skills
                                .slice(0, 4)
                                .map((skill: CertificationSkill, idx: number) => {
                                  return skill?.name ? (
                                    <span
                                      key={`${certification.name ?? 'cert'}-skill-${idx}`}
                                      className="border border-yellow-600/30 bg-yellow-600/20 px-2.5 py-1 font-medium text-[10px] text-yellow-500"
                                    >
                                      {skill.name}
                                    </span>
                                  ) : null;
                                })}
                            </div>
                          </div>
                        )}

                        {/* Expiry and Credential Info */}
                        <div className="mb-4 space-y-2 text-xs">
                          {certification.expiryDate && (
                            <div className="text-center">
                              <span className="text-zinc-400">Valid Until: </span>
                              <span
                                className={
                                  isExpired(certification.expiryDate)
                                    ? 'font-semibold text-red-400'
                                    : 'font-semibold text-zinc-300'
                                }
                              >
                                {formatDate(certification.expiryDate)}
                                {isExpired(certification.expiryDate) && ' (Expired)'}
                              </span>
                            </div>
                          )}
                          {certification.credentialId && (
                            <div className="text-center">
                              <p className="mb-1 text-[9px] text-zinc-500">Credential ID:</p>
                              <p className="break-all px-4 font-mono text-[9px] text-zinc-400">
                                {certification.credentialId}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Verify Credential Button */}
                        {certification.credentialUrl && (
                          <div className="w-full border-yellow-600/20 border-t pt-4">
                            <Link
                              href={certification.credentialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-1.5 bg-yellow-600/90 px-5 py-2 font-semibold text-xs text-zinc-900 shadow-md transition-all hover:bg-yellow-500 hover:shadow-lg"
                            >
                              Verify Credential
                              <IconExternalLink className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CometCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
