import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

const plugins = [];
export const isAiEnabled = !!process.env.GEMINI_API_KEY;

if (isAiEnabled) {
  plugins.push(googleAI());
}

export const ai = genkit({
  plugins,
  model: 'googleai/gemini-2.0-flash',
});
