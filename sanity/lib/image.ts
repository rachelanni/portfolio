import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';
import { client } from '@/sanity/lib/client';

const builder = createImageUrlBuilder(client);

export const PROFILE_IMAGE_SIZE = 600;

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export function urlForProfile(source: SanityImageSource) {
  return builder
    .image(source)
    .width(PROFILE_IMAGE_SIZE)
    .height(PROFILE_IMAGE_SIZE)
    .fit('crop')
    .auto('format')
    .quality(90);
}
