'use client';

import * as React from 'react';
import { useBadgeConfig } from '@/hooks/use-badge-config';
import { BadgeForm } from '@/components/badge-form';
import { BadgePreview } from '@/components/badge-preview';
import { SavedConfigs } from '@/components/saved-configs';
import { Shield } from 'lucide-react';
import { AIBadgeGenerator } from '@/components/ai-badge-generator';

interface BadgeForgeAppProps {
  aiEnabled: boolean;
}

export function BadgeForgeApp({ aiEnabled }: BadgeForgeAppProps) {
  const badgeProps = useBadgeConfig();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold font-headline tracking-tight text-foreground">
                BadgeForge
              </h1>
            </div>
            {aiEnabled && <AIBadgeGenerator {...badgeProps} />}
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <BadgeForm {...badgeProps} />
          </div>
          <div className="flex flex-col gap-8">
            <BadgePreview {...badgeProps} />
            <SavedConfigs {...badgeProps} />
          </div>
        </div>
      </main>

      <footer className="py-6 border-t mt-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground text-sm">
          <p>Built with ❤️ and shields.io. Inspired by modern UI trends.</p>
        </div>
      </footer>
    </div>
  );
}
