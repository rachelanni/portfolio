import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { SanityLive } from '@/sanity/lib/live';
import '../globals.css';
import { draftMode } from 'next/headers';
import Script from 'next/script';
import { VisualEditing } from 'next-sanity/visual-editing';
import { AppSidebar } from '@/components/app-sidebar';
import { ModeToggle } from '@/components/DarkModeToggle';
import { DisableDraftMode } from '@/components/DisableDraftMode';
import { FloatingDock } from '@/components/FloatingDock';
import SidebarToggle from '@/components/SidebarToggle';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'My Portfolio with AI Twin',
  description: 'Powered by Rachel Harris',
};

/** ISR backup so Sanity publishes propagate even if Live/tag revalidation hiccups. */
export const revalidate = 60;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Script
              src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js"
              strategy="beforeInteractive"
            />

            <SidebarProvider defaultOpen={false}>
              <SidebarInset className="">{children}</SidebarInset>

              <AppSidebar side="right" />

              <FloatingDock />
              <SidebarToggle />

              {/* Mode Toggle - Desktop: bottom right next to AI chat, Mobile: top right next to burger menu */}
              <div className="fixed top-4 right-18 z-20 md:top-auto md:right-24 md:bottom-6 md:left-auto">
                <div className="h-10 w-10 md:h-12 md:w-12">
                  <ModeToggle />
                </div>
              </div>
            </SidebarProvider>

            {/* Live content API */}
            <SanityLive />

            {(await draftMode()).isEnabled && (
              <>
                <VisualEditing />
                <DisableDraftMode />
              </>
            )}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
