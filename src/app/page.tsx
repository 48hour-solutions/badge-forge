import { isAiEnabled } from '@/ai/genkit';
import { BadgeForgeApp } from '@/components/badge-forge-app';

export default function Home() {
  // Check for the env var on the server and pass it as a prop to the client component.
  // This avoids exposing the key to the client.
  const aiEnabled = isAiEnabled;

  return <BadgeForgeApp aiEnabled={aiEnabled} />;
}
