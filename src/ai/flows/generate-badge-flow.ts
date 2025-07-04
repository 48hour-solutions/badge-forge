'use server';
/**
 * @fileOverview An AI flow for generating badge configurations.
 *
 * - generateBadges - A function that handles the badge generation process.
 * - GenerateBadgeInput - The input type for the generateBadges function.
 * - GenerateBadgeOutput - The return type for the generateBadges function.
 */

import { ai, isAiEnabled } from '@/ai/genkit';
import { z } from 'zod';
import * as allIcons from 'simple-icons';
import type { SimpleIcon } from 'simple-icons';

const iconList: SimpleIcon[] = Object.values(allIcons);
const getIconSample = (count: number) => {
  const shuffled = iconList.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map((icon) => icon.slug);
};

const badgeStyles = [
  'plastic',
  'flat',
  'flat-square',
  'for-the-badge',
  'social',
];

const GenerateBadgeInputSchema = z.object({
  description: z
    .string()
    .describe("The user's description of the desired badge."),
  count: z
    .number()
    .min(1)
    .max(5)
    .describe('The number of badge variations to generate.'),
});
export type GenerateBadgeInput = z.infer<typeof GenerateBadgeInputSchema>;

const BadgeConfigSchema = z.object({
  label: z.string(),
  message: z.string(),
  color: z.string().describe('A 3 or 6-digit hex color code without the #.'),
  labelColor: z
    .string()
    .optional()
    .describe('An optional 3 or 6-digit hex color code for the label, without the #.'),
  style: z.enum(['plastic', 'flat', 'flat-square', 'for-the-badge', 'social']),
  logo: z
    .string()
    .optional()
    .describe('The slug of an icon from the provided list.'),
  logoColor: z.string().optional().describe('An optional color name for the logo.'),
});

const GenerateBadgeOutputSchema = z.object({
  badges: z.array(BadgeConfigSchema),
});
export type GenerateBadgeOutput = z.infer<typeof GenerateBadgeOutputSchema>;

export async function generateBadges(
  input: GenerateBadgeInput
): Promise<GenerateBadgeOutput> {
  if (!isAiEnabled) {
    throw new Error('AI features are disabled. Please provide a GEMINI_API_KEY in your .env file.');
  }
  return generateBadgeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBadgePrompt',
  input: {
    schema: GenerateBadgeInputSchema.extend({
      styles: z.array(z.string()),
      icons: z.array(z.string()),
    }),
  },
  output: { schema: GenerateBadgeOutputSchema },
  prompt: `You are a badge design expert. A user wants to create a badge for their project.
    
User's request: "{{description}}"

Generate {{count}} different badge configurations based on the user's request.

Here are the available options you can use:
- Badge Styles: {{#each styles}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
- Icons: You can use slugs for popular brand and technology icons. Here is a small sample of available icon slugs: {{#each icons}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}. Use your knowledge to pick a relevant icon slug from simple-icons. The slug is usually the company name in lowercase without spaces. For example, 'typescript', 'javascript', 'react', 'nextdotjs', 'google'.
- Colors: For the 'color' and 'labelColor' fields, you **MUST** use a 3 or 6-digit hex code (without the '#'). Do not use color names like 'blue' or 'green' for these. For the 'logoColor' field, you can use a common color name. For the main color, bright and vibrant colors are often good. For labelColor, more neutral colors like '555555' or 'FFFFFF' are common.

Think step-by-step for each of the {{count}} badges:
1.  What is a good label and message?
2.  What is a fitting main color (as a hex code)?
3.  What style would look best?
4.  Is there a relevant logo? If so, what slug should be used?
5.  Does the logo need a specific color (logoColor)? Does the label need a specific color (labelColor, as a hex code)?

Return the final configurations as a JSON object that strictly follows the output schema.
`,
});

const generateBadgeFlow = ai.defineFlow(
  {
    name: 'generateBadgeFlow',
    inputSchema: GenerateBadgeInputSchema,
    outputSchema: GenerateBadgeOutputSchema,
  },
  async (input) => {
    const iconSample = getIconSample(50);
    const { output } = await prompt({
      ...input,
      styles: badgeStyles,
      icons: iconSample,
    });
    if (!output) {
      throw new Error('AI failed to generate a response.');
    }
    return output;
  }
);
