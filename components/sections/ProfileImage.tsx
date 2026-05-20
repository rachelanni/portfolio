'use client';

import { useClerk, useUser } from '@clerk/nextjs';
import { MessageCircle, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useSidebar } from '../ui/sidebar';

interface ProfileImageProps {
  imageUrl: string;
  firstName: string;
  lastName: string;
}

export function ProfileImage({ imageUrl, firstName, lastName }: ProfileImageProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { toggleSidebar, open } = useSidebar();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  return (
    <button
      type="button"
      onClick={() => (isSignedIn ? toggleSidebar() : openSignIn())}
      className="group relative block aspect-square w-full cursor-pointer overflow-hidden rounded-2xl border-4 border-primary/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Toggle AI Chat Sidebar"
    >
      <Image
        src={imageUrl}
        alt={`${firstName} ${lastName}`}
        fill
        sizes="(min-width: 1280px) 28rem, 90vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        priority
      />

      {/* Online Badge */}
      <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 backdrop-blur-sm">
        <div className="relative">
          <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-500" />
          <div className="absolute inset-0 h-2.5 w-2.5 animate-ping rounded-full bg-green-500" />
        </div>
        <span className="font-medium text-white text-xs">Online</span>
      </div>

      {/* Hover Overlay */}
      <div
        className={`absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="space-y-3 text-center">
          {open ? (
            <X className="mx-auto h-12 w-12 text-white" />
          ) : (
            <MessageCircle className="mx-auto h-12 w-12 text-white" />
          )}

          <div className="font-semibold text-white text-xl">
            {open ? 'Close Chat' : 'Chat with AI Twin'}
          </div>
          <div className="text-sm text-white/80">
            {open ? 'Click to close chat' : 'Click to open chat'}
          </div>
        </div>
      </div>
    </button>
  );
}
