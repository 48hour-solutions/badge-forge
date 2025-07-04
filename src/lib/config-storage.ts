import { promises as fs } from 'fs';
import path from 'path';
import type { BadgeConfig, SavedConfig } from '@/hooks/use-badge-config';
import { v4 as uuidv4 } from 'uuid';

const dataDir = path.join(process.cwd(), 'data');
const configsFilePath = path.join(dataDir, 'configs.json');

async function ensureDataFileExists(): Promise<SavedConfig[]> {
  try {
    await fs.mkdir(dataDir, { recursive: true });
    const fileContent = await fs.readFile(configsFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(configsFilePath, JSON.stringify([]), 'utf-8');
      return [];
    }
    throw error;
  }
}

export async function getSavedConfigs(): Promise<SavedConfig[]> {
  return await ensureDataFileExists();
}

export async function saveNewConfig(name: string, config: BadgeConfig): Promise<SavedConfig> {
  const configs = await getSavedConfigs();
  
  const newSavedConfig: SavedConfig = {
    id: uuidv4(),
    name,
    config,
  };
  
  configs.push(newSavedConfig);
  
  await fs.writeFile(configsFilePath, JSON.stringify(configs, null, 2), 'utf-8');
  
  return newSavedConfig;
}

export async function deleteExistingConfig(id: string): Promise<{ success: boolean }> {
  let configs = await getSavedConfigs();
  const initialLength = configs.length;

  configs = configs.filter(c => c.id !== id);

  if (configs.length < initialLength) {
    await fs.writeFile(configsFilePath, JSON.stringify(configs, null, 2), 'utf-8');
    return { success: true };
  } else {
    return { success: false };
  }
}
