'use client';

import { useMemo } from 'react';
import * as allIcons from 'simple-icons';
import type { SimpleIcon } from 'simple-icons';

// The 'simple-icons' package exports an object where keys are icon slugs (e.g., 'siNextdotjs')
// and values are the icon objects. We want an array of these objects for easier mapping.
const icons: SimpleIcon[] = Object.values(allIcons);

export function useSimpleIcons() {
  const allIconsList = useMemo(() => icons, []);
  
  return { icons: allIconsList };
}
