'use client';

import * as React from 'react';
import { Bot, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  generateBadges,
  GenerateBadgeOutput,
} from '@/ai/flows/generate-badge-flow';
import type { BadgeConfig } from '@/hooks/use-badge-config';
import { BadgePreview } from './badge-preview';

interface AIBadgeGeneratorProps {
  updateConfig: (updates: Partial<BadgeConfig>) => void;
}

export function AIBadgeGenerator({ updateConfig }: AIBadgeGeneratorProps) {
  const [open, setOpen] = React.useState(false);
  const [description, setDescription] = React.useState('');
  const [count, setCount] = React.useState([1]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [results, setResults] = React.useState<BadgeConfig[]>([]);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!description.trim()) {
      toast({
        variant: 'destructive',
        title: 'Description is empty',
        description: 'Please describe the badge you want to generate.',
      });
      return;
    }
    setIsLoading(true);
    setResults([]);
    try {
      const response: GenerateBadgeOutput = await generateBadges({
        description,
        count: count[0],
      });
      if (!response || !response.badges || response.badges.length === 0) {
        throw new Error('AI did not return any badges.');
      }
      setResults(response.badges);
    } catch (error) {
      console.error('Failed to generate badges:', error);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: 'Could not generate badges. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyConfig = (config: BadgeConfig) => {
    updateConfig(config);
    setOpen(false);
    toast({
      title: 'AI Suggestion Applied!',
      description: 'The badge configuration has been updated.',
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Bot className="h-4 w-4 mr-2" />
          Generate with AI
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Generate Badges with AI</DialogTitle>
          <DialogDescription>
            Describe the badge you want, and our AI will generate some options
            for you.
          </DialogDescription>
        </DialogHeader>
        <div className="grid flex-1 grid-cols-1 md:grid-cols-2 gap-x-6 min-h-0">
          <div className="flex flex-col gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="description">Badge Description</Label>
              <Textarea
                id="description"
                placeholder="e.g., 'A badge for a TypeScript project on GitHub that just passed its tests'"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="count">Number of variations ({count[0]})</Label>
              <Slider
                id="count"
                min={1}
                max={5}
                step={1}
                value={count}
                onValueChange={setCount}
                disabled={isLoading}
              />
            </div>
            <Button onClick={handleGenerate} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Generate
            </Button>
          </div>
          <div className="overflow-y-auto border-l border-border">
            <div className="pl-6 py-4 space-y-4">
              {isLoading &&
                Array.from({ length: count[0] }).map((_, i) => (
                  <div
                    key={i}
                    className="p-4 bg-muted rounded-md flex items-center justify-center min-h-[80px]"
                  >
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ))}
              {!isLoading && results.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8">
                  <Sparkles className="h-10 w-10 mb-4" />
                  <p className="font-medium">AI suggestions will appear here</p>
                  <p className="text-sm">
                    Fill out the form and click generate!
                  </p>
                </div>
              )}
              {results.map((badge, index) => (
                <div key={index}>
                  <BadgePreview config={badge} showInputs={false} />
                  <Button
                    size="sm"
                    className="w-full mt-2"
                    onClick={() => handleApplyConfig(badge)}
                  >
                    Apply this configuration
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
