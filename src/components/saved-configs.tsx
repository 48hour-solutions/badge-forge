'use client';

import * as React from 'react';
import { BookMarked, Loader2, Plus, Trash2 } from 'lucide-react';
import type { SavedConfig } from '@/hooks/use-badge-config';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';


interface SavedConfigsProps {
  savedConfigs: SavedConfig[];
  saveConfig: (name: string) => void;
  loadConfig: (id: string) => void;
  deleteConfig: (id: string) => void;
  isLoading: boolean;
}

export function SavedConfigs({
  savedConfigs,
  saveConfig,
  loadConfig,
  deleteConfig,
  isLoading,
}: SavedConfigsProps) {
  const [name, setName] = React.useState('');
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    if (name.trim()) {
      saveConfig(name.trim());
      setName('');
      setDialogOpen(false);
      toast({ title: "Configuration Saved", description: `"${name.trim()}" has been saved.`});
    } else {
        toast({ variant: "destructive", title: "Invalid Name", description: "Please enter a name for your configuration."});
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      );
    }

    if (savedConfigs.length === 0) {
      return (
        <div className="text-center text-muted-foreground p-4 h-40 flex items-center justify-center">
            <p>No saved configurations yet.</p>
        </div>
      );
    }

    return savedConfigs.map((item) => (
      <div key={item.id} className="flex items-center justify-between gap-2 rounded-md p-2 hover:bg-muted/50 transition-colors">
          <button onClick={() => loadConfig(item.id)} className="text-left flex-grow truncate">
              <p className="font-medium truncate">{item.name}</p>
          </button>
          <div className='flex gap-1'>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => loadConfig(item.id)}>
                <BookMarked className="h-4 w-4" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete the &quot;{item.name}&quot; configuration. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => deleteConfig(item.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
      </div>
    ));
  };


  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className='space-y-1.5'>
          <CardTitle className="font-headline">Saved Configurations</CardTitle>
          <CardDescription>Save and load your favorite badges.</CardDescription>
        </div>
        <AlertDialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button size="sm"><Plus className="-ml-1 h-4 w-4"/> Save Current</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Save Configuration</AlertDialogTitle>
              <AlertDialogDescription>
                Enter a name for your current badge configuration to save it for later.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <Input 
                value={name} 
                onChange={e => setName(e.target.value)} 
                placeholder="e.g., My Project's Build Badge"
                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                autoFocus
            />
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSave}>Save</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-48">
            <div className="space-y-2 pr-4">
              {renderContent()}
            </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
