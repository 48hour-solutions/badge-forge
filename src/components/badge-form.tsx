'use client';

import { RotateCcw } from 'lucide-react';
import type { BadgeConfig, BadgeStyle } from '@/hooks/use-badge-config';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { IconSelector } from './icon-selector';
import type { SimpleIcon } from 'simple-icons';

interface BadgeFormProps {
  config: BadgeConfig;
  updateConfig: (updates: Partial<BadgeConfig>) => void;
  setLogo: (icon: SimpleIcon | null) => void;
  resetConfig: () => void;
}

const badgeStyles: { value: BadgeStyle; label: string }[] = [
  { value: 'plastic', label: 'Plastic' },
  { value: 'flat', label: 'Flat' },
  { value: 'flat-square', label: 'Flat Square' },
  { value: 'for-the-badge', label: 'For The Badge' },
  { value: 'social', label: 'Social' },
];

const DUMMY_DEFAULT_VALUE = 'default';

const logoColors: { value: string; label: string }[] = [
    { value: DUMMY_DEFAULT_VALUE, label: 'Default' },
    { value: 'white', label: 'White' },
    { value: 'black', label: 'Black' },
    { value: 'silver', label: 'Silver' },
    { value: 'gray', label: 'Gray' },
    { value: 'red', label: 'Red' },
    { value: 'maroon', label: 'Maroon' },
    { value: 'yellow', label: 'Yellow' },
    { value: 'olive', label: 'Olive' },
    { value: 'lime', label: 'Lime' },
    { value: 'green', label: 'Green' },
    { value: 'aqua', label: 'Aqua' },
    { value: 'teal', label: 'Teal' },
    { value: 'blue', label: 'Blue' },
    { value: 'navy', label: 'Navy' },
    { value: 'fuchsia', label: 'Fuchsia' },
    { value: 'purple', label: 'Purple' },
];

const isHex = (color: string) => /^([0-9a-fA-F]{3}){1,2}$/.test(color);


export function BadgeForm({ config, updateConfig, setLogo, resetConfig }: BadgeFormProps) {
  const handleStyleChange = (value: string) => {
    updateConfig({ style: value as BadgeStyle });
  };

  const handleLogoColorChange = (value: string) => {
    updateConfig({ logoColor: value === DUMMY_DEFAULT_VALUE ? '' : value });
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-headline">Customize Your Badge</CardTitle>
        <Button variant="ghost" size="icon" onClick={resetConfig} className="h-8 w-8">
            <RotateCcw className="h-4 w-4" />
            <span className="sr-only">Reset</span>
        </Button>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="label">Label</Label>
          <Input
            id="label"
            value={config.label}
            onChange={(e) => updateConfig({ label: e.target.value })}
            placeholder="e.g. build"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Input
            id="message"
            value={config.message}
            onChange={(e) => updateConfig({ message: e.target.value })}
            placeholder="e.g. passing"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="color">Color</Label>
          <div className="relative flex h-10 w-full items-center">
            <Input
              id="color-text"
              value={config.color}
              onChange={(e) => updateConfig({ color: e.target.value.replace(/#/g, '') })}
              placeholder="e.g. green or 4c1"
              className="pr-12"
            />
            <div 
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-md border"
              style={{ backgroundColor: isHex(config.color) ? `#${config.color}` : 'transparent' }}
            />
            <input
              id="color"
              type="color"
              value={isHex(config.color) ? `#${config.color}` : '#008080'}
              onChange={(e) => updateConfig({ color: e.target.value.substring(1) })}
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 cursor-pointer p-0 opacity-0"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="style">Style</Label>
          <Select value={config.style} onValueChange={handleStyleChange}>
            <SelectTrigger id="style">
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              {badgeStyles.map((style) => (
                <SelectItem key={style.value} value={style.value}>
                  {style.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Logo</Label>
            <IconSelector onSelect={setLogo} currentLogoSlug={config.logo} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="logoColor">Logo Color</Label>
            <Select
              value={config.logoColor || DUMMY_DEFAULT_VALUE}
              onValueChange={handleLogoColorChange}
              disabled={!config.logo}
            >
              <SelectTrigger id="logoColor">
                <SelectValue placeholder="Select logo color" />
              </SelectTrigger>
              <SelectContent>
                {logoColors.map((color) => (
                  <SelectItem key={color.value} value={color.value}>
                    {color.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="labelColor">Label Color</Label>
            <div className="relative flex h-10 w-full items-center">
                <Input
                id="labelColor-text"
                value={config.labelColor}
                onChange={(e) => updateConfig({ labelColor: e.target.value.replace(/#/g, '') })}
                placeholder="e.g. 555"
                className="pr-12"
                />
                <div 
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-md border"
                style={{ backgroundColor: isHex(config.labelColor) ? `#${config.labelColor}` : 'transparent' }}
                />
                <input
                id="labelColor"
                type="color"
                value={isHex(config.labelColor) ? `#${config.labelColor}` : '#555555'}
                onChange={(e) => updateConfig({ labelColor: e.target.value.substring(1) })}
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 cursor-pointer p-0 opacity-0"
                />
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
