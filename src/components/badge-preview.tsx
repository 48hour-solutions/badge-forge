'use client';

import * as React from 'react';
import Image from 'next/image';
import { Copy } from 'lucide-react';
import type { BadgeConfig } from '@/hooks/use-badge-config';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface BadgePreviewProps {
  config: BadgeConfig;
  showInputs?: boolean;
}

const escapeShields = (str: string) =>
  str.replace(/-/g, '--').replace(/_/g, '__').replace(/ /g, '_');
const sanitizeColor = (color: string) => (color || '').replace(/^#/, '');

export function BadgePreview({ config, showInputs = true }: BadgePreviewProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(true);

  const badgeUrl = React.useMemo(() => {
    const { label, message, color, labelColor, style, logo, logoColor } =
      config;
    if (!label && !message) {
      return 'https://img.shields.io/badge/Badge-Forge-1708040';
    }

    const encodedLabel = escapeShields(label || ' ');
    const encodedMessage = escapeShields(message);
    const sanitizedColor = sanitizeColor(color);

    const path = `${encodedLabel}-${encodedMessage}-${sanitizedColor}`;

    const params = new URLSearchParams();
    if (style) params.append('style', style);
    if (logo) params.append('logo', logo.toLowerCase().replace(/ /g, '-'));
    if (logoColor) params.append('logoColor', sanitizeColor(logoColor));
    if (labelColor) params.append('labelColor', sanitizeColor(labelColor));

    const queryString = params.toString();
    return `https://img.shields.io/badge/${path}${
      queryString ? `?${queryString}` : ''
    }`;
  }, [config]);

  const markdown = React.useMemo(() => {
    return `![${config.label || 'Custom Badge'}](${badgeUrl})`;
  }, [badgeUrl, config.label]);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast({
          title: 'Copied to clipboard!',
          description: `${type} has been copied.`,
        });
      },
      (err) => {
        toast({
          variant: 'destructive',
          title: 'Failed to copy',
          description: 'Could not copy text to clipboard.',
        });
      }
    );
  };

  React.useEffect(() => {
    setIsLoading(true);
  }, [badgeUrl]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">
          {showInputs ? 'Preview' : 'Suggestion'}
        </CardTitle>
        {!showInputs && (
          <CardDescription>An AI-generated suggestion.</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center p-6 bg-muted rounded-md min-h-[80px]">
          {isLoading && <Skeleton className="h-8 w-32" />}
          <Image
            key={badgeUrl}
            src={badgeUrl}
            alt={
              config.label
                ? `${config.label}: ${config.message}`
                : 'Badge preview'
            }
            width={180}
            height={28}
            unoptimized
            className={cn(
              'transition-opacity duration-300',
              isLoading ? 'opacity-0' : 'opacity-100'
            )}
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />
        </div>
        {showInputs && (
          <>
            <div className="space-y-2">
              <Label htmlFor="markdown-output">Markdown</Label>
              <div className="flex gap-2">
                <Input
                  id="markdown-output"
                  value={markdown}
                  readOnly
                  className="text-sm"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(markdown, 'Markdown')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="url-output">URL</Label>
              <div className="flex gap-2">
                <Input
                  id="url-output"
                  value={badgeUrl}
                  readOnly
                  className="text-sm"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(badgeUrl, 'URL')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
