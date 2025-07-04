'use client';

import { useState, useEffect, useCallback } from 'react';
import type { SimpleIcon } from 'simple-icons';
import { useToast } from '@/hooks/use-toast';

export type BadgeStyle = 'plastic' | 'flat' | 'flat-square' | 'for-the-badge' | 'social';

export interface BadgeConfig {
  label: string;
  message: string;
  color: string;
  labelColor: string;
  style: BadgeStyle;
  logo: string;
  logoColor: string;
}

export interface SavedConfig {
  id: string;
  name: string;
  config: BadgeConfig;
}

const defaultConfig: BadgeConfig = {
  label: 'shields.io',
  message: 'badge',
  color: '008080',
  labelColor: '',
  style: 'flat',
  logo: '',
  logoColor: '',
};

export function useBadgeConfig() {
  const [config, setConfig] = useState<BadgeConfig>(defaultConfig);
  const [savedConfigs, setSavedConfigs] = useState<SavedConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/configs');
        if (!response.ok) {
          throw new Error('Failed to fetch configs');
        }
        const data = await response.json();
        setSavedConfigs(data);
      } catch (error) {
        console.error("Failed to load saved configs:", error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Could not load saved configurations.',
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchConfigs();
  }, [toast]);

  const updateConfig = useCallback((updates: Partial<BadgeConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetConfig = useCallback(() => {
    setConfig(defaultConfig);
    toast({
      title: 'Configuration Reset',
      description: 'The badge has been reset to its default settings.',
    });
  }, [toast]);

  const saveConfig = useCallback(async (name: string) => {
    try {
      const response = await fetch('/api/configs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, config }),
      });
      if (!response.ok) {
        throw new Error('Failed to save config');
      }
      const newSavedConfig = await response.json();
      setSavedConfigs((prev) => [...prev, newSavedConfig]);
    } catch (error) {
      console.error("Failed to save config:", error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not save the configuration.',
      });
    }
  }, [config, toast]);

  const loadConfig = useCallback((id: string) => {
    const saved = savedConfigs.find((c) => c.id === id);
    if (saved) {
      setConfig(saved.config);
      toast({ title: "Configuration Loaded", description: `"${saved.name}" has been loaded.` });
    }
  }, [savedConfigs, toast]);

  const deleteConfig = useCallback(async (id: string) => {
    const configToDelete = savedConfigs.find(c => c.id === id);
    if (!configToDelete) return;

    try {
      const response = await fetch(`/api/configs?id=${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete config');
      }
      setSavedConfigs((prev) => prev.filter((c) => c.id !== id));
      toast({ title: "Configuration Deleted", description: `"${configToDelete.name}" has been deleted.` });
    } catch (error) {
      console.error("Failed to delete config:", error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not delete the configuration.',
      });
    }
  }, [savedConfigs, toast]);
  
  const setLogo = useCallback((icon: SimpleIcon | null) => {
    updateConfig({ logo: icon ? icon.slug : '' });
  }, [updateConfig]);

  return {
    config,
    updateConfig,
    savedConfigs,
    saveConfig,
    loadConfig,
    deleteConfig,
    setLogo,
    isLoading,
    resetConfig,
  };
}
