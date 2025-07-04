'use client';

import * as React from 'react';
import type { SimpleIcon } from 'simple-icons';
import { useSimpleIcons } from '@/hooks/use-simple-icons';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface IconSelectorProps {
  onSelect: (icon: SimpleIcon | null) => void;
  currentLogoSlug?: string;
}

export function IconSelector({ onSelect, currentLogoSlug }: IconSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const { icons } = useSimpleIcons();

  const selectedIcon = React.useMemo(() => {
    return icons.find((icon) => icon.slug === currentLogoSlug);
  }, [icons, currentLogoSlug]);

  const filteredIcons = React.useMemo(() => {
    if (search.length < 2) {
      return [];
    }
    const lowercasedSearch = search.toLowerCase();
    return icons.filter(
      (icon) =>
        icon.title.toLowerCase().includes(lowercasedSearch) ||
        icon.slug.toLowerCase().includes(lowercasedSearch)
    );
  }, [icons, search]);

  const handleSelect = (icon: SimpleIcon | null) => {
    onSelect(icon);
    setOpen(false);
    setSearch('');
  };
  
  React.useEffect(() => {
    if (!open) {
      setSearch('');
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start text-left font-normal">
          {selectedIcon ? (
            <span className="flex items-center gap-2 truncate">
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 fill-current"
              >
                <path d={selectedIcon.path} />
              </svg>
              {selectedIcon.title}
            </span>
          ) : (
            'Select icon...'
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[640px] h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Select an Icon</DialogTitle>
          <DialogDescription>
            Search by name. Over 3000+ icons available from Simple Icons.
          </DialogDescription>
        </DialogHeader>
        <div className="relative">
          <Input
            placeholder="Search icons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10"
            autoFocus
          />
        </div>
        <ScrollArea className="flex-grow -mx-6">
          <div className="px-6 py-4">
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                <Button
                    variant="ghost"
                    onClick={() => handleSelect(null)}
                    className={cn(
                      'p-2 h-auto flex-col gap-2 border items-center justify-center',
                      !selectedIcon && 'border-primary bg-accent'
                    )}
                  >
                    <div className="w-8 h-8 rounded-sm bg-muted flex items-center justify-center text-muted-foreground text-2xl font-light">
                        –
                    </div>
                    <span className="text-xs truncate text-center w-full">None</span>
                </Button>

                {filteredIcons.map((icon) => (
                  <Button
                    variant="ghost"
                    key={icon.slug}
                    onClick={() => handleSelect(icon)}
                    className={cn(
                      'p-2 h-auto flex-col gap-2 border items-center justify-center',
                       selectedIcon?.slug === icon.slug && 'border-primary bg-accent'
                    )}
                    title={icon.title}
                  >
                    <svg
                      role="img"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      style={{ fill: `#${icon.hex}` }}
                    >
                      <title>{icon.title}</title>
                      <path d={icon.path} />
                    </svg>
                    <span className="text-xs truncate text-center w-full">{icon.title}</span>
                  </Button>
                ))}
             </div>
             {search.length >= 2 && filteredIcons.length === 0 && (
                <p className="p-8 text-center text-sm text-muted-foreground">
                  No icons found for &quot;{search}&quot;.
                </p>
             )}
             {search.length < 2 && (
                <p className="p-8 text-center text-sm text-muted-foreground">
                  Type at least 2 characters to start searching.
                </p>
             )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
