'use client';

import { SignInButton, useUser } from '@clerk/nextjs';
import { MessageSquare, Sparkles } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';

function SidebarToggle() {
  const { toggleSidebar, open, isMobile, openMobile } = useSidebar();
  const { isSignedIn } = useUser();

  const isSidebarOpen = isMobile ? openMobile : open;

  if (isSidebarOpen) return null;

  const buttonStyles = `relative w-16 h-16 rounded-full 
    bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 
    dark:from-violet-600 dark:via-purple-600 dark:to-fuchsia-600 
    shadow-[0_0_40px_rgba(168,85,247,0.4)] 
    hover:shadow-[0_0_60px_rgba(168,85,247,0.6)] 
    transition-all duration-500 
    hover:scale-110 hover:rotate-12 
    flex items-center justify-center`;

  return (
    <div className="group fixed right-6 bottom-6 z-50">
      {/* Animated rings */}
      <div className="absolute inset-0 animate-ping rounded-full bg-linear-to-br from-violet-500 to-fuchsia-500 opacity-20 blur-2xl [animation-duration-[200s]" />
      <div className="absolute inset-0 animate-pulse rounded-full bg-linear-to-br from-purple-500 to-pink-500 opacity-30 blur-xl [animation-duration-[3s]" />

      {/* Sparkle badge */}
      <div className="-top-1 -right-1 absolute z-10">
        <div className="flex h-6 w-6 animate-bounce items-center justify-center rounded-full bg-linear-to-br from-amber-400 to-orange-500 shadow-lg [animation-duration-[2s]">
          <Sparkles className="h-3 w-3 text-white" />
        </div>
      </div>

      {/* Tooltip */}
      <div className="group-hover:-translate-y-1 pointer-events-none absolute right-0 bottom-full mb-2 scale-90 whitespace-nowrap rounded-lg border border-white/40 bg-white/90 px-3 py-1.5 font-medium text-neutral-800 text-sm opacity-0 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] backdrop-blur-xl transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 dark:border-white/20 dark:bg-black/90 dark:text-neutral-200">
        Chat with My AI Twin
        {/* Tooltip arrow */}
        <div className="-bottom-1 absolute right-6 h-2 w-2 rotate-45 border-white/40 border-r border-b bg-white/90 dark:border-white/20 dark:bg-black/90" />
      </div>

      {isSignedIn ? (
        <button
          type="button"
          onClick={toggleSidebar}
          className={buttonStyles}
          aria-label="Chat with AI Twin"
        >
          <MessageSquare className="h-7 w-7 text-white transition-transform group-hover:scale-110" />
        </button>
      ) : (
        <SignInButton mode="modal">
          <button type="button" className={buttonStyles} aria-label="Sign in to chat with AI Twin">
            <MessageSquare className="h-7 w-7 text-white transition-transform group-hover:scale-110" />
          </button>
        </SignInButton>
      )}
    </div>
  );
}

export default SidebarToggle;
