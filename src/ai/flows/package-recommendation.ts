'use server';

/**
 * @fileOverview Recommends photography packages based on user input.
 *
 * - recommendPackages - A function that recommends photography packages based on user input.
 * - PackageRecommendationInput - The input type for the recommendPackages function.
 * - PackageRecommendationOutput - The return type for the recommendPackages function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PackageRecommendationInputSchema = z.object({
  userInput: z
    .string()
    .describe('A description of what the user is looking for in a photography package.'),
});
export type PackageRecommendationInput = z.infer<typeof PackageRecommendationInputSchema>;

const PackageRecommendationOutputSchema = z.object({
  recommendedPackages: z
    .string()
    .describe('A list of recommended photography packages that best suit the user needs.'),
});
export type PackageRecommendationOutput = z.infer<typeof PackageRecommendationOutputSchema>;

export async function recommendPackages(input: PackageRecommendationInput): Promise<PackageRecommendationOutput> {
  return recommendPackagesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'packageRecommendationPrompt',
  input: {schema: PackageRecommendationInputSchema},
  output: {schema: PackageRecommendationOutputSchema},
  prompt: `You are a photography package recommendation expert.
  Based on the user's input, recommend photography packages that best suit their needs.

  User Input: {{{userInput}}}

  Provide a detailed explanation of why each package is recommended and how it aligns with the user's requirements.`,
});

const recommendPackagesFlow = ai.defineFlow(
  {
    name: 'recommendPackagesFlow',
    inputSchema: PackageRecommendationInputSchema,
    outputSchema: PackageRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
