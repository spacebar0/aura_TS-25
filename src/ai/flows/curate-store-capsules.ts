// src/ai/flows/curate-store-capsules.ts
'use server';
/**
 * @fileOverview AI-curated capsule collections for the game store.
 *
 * This file defines a Genkit flow that utilizes AI to generate weekly 'capsule collections'
 * in the game store, tailored to user preferences and trending games.
 *
 * @function curateStoreCapsules - The main function to curate store capsules.
 * @typedef {CurateStoreCapsulesInput} CurateStoreCapsulesInput - Input type for the function.
 * @typedef {CurateStoreCapsulesOutput} CurateStoreCapsulesOutput - Output type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema
const CurateStoreCapsulesInputSchema = z.object({
  userPreferences: z
    .string()
    .describe('A summary of the user game preferences (e.g., genres, styles).'),
  trendingGames: z
    .string()
    .describe('A list of trending games this week.'),
  storeGames: z.string().describe('A list of games currently available in the store'),
});
export type CurateStoreCapsulesInput = z.infer<typeof CurateStoreCapsulesInputSchema>;

const CapsuleSchema = z.object({
  title: z.string().describe('The name of the capsule collection.'),
  description: z.string().describe('A brief description of the collection and why the games fit.'),
});

// Define the output schema
const CurateStoreCapsulesOutputSchema = z.object({
  capsuleCollections: z.array(CapsuleSchema).describe('An array of 3 capsule collections for the week.'),
});
export type CurateStoreCapsulesOutput = z.infer<typeof CurateStoreCapsulesOutputSchema>;

// Define the main function
export async function curateStoreCapsules(input: CurateStoreCapsulesInput): Promise<CurateStoreCapsulesOutput> {
  return curateStoreCapsulesFlow(input);
}

// Define the prompt
const curateStoreCapsulesPrompt = ai.definePrompt({
  name: 'curateStoreCapsulesPrompt',
  input: {schema: CurateStoreCapsulesInputSchema},
  output: {schema: CurateStoreCapsulesOutputSchema},
  prompt: `You are an AI curator for a game store.
  Based on the user's preferences, trending games, and the current store games,
  you will generate a list of weekly 'capsule collections' to present in the store.

  User Preferences: {{{userPreferences}}}
  Trending Games: {{{trendingGames}}}
  Store Games: {{{storeGames}}}

  Create a list of 3 capsule collections. For each, provide a title and a description of what games should be included and why.
  `,
});

// Define the flow
const curateStoreCapsulesFlow = ai.defineFlow(
  {
    name: 'curateStoreCapsulesFlow',
    inputSchema: CurateStoreCapsulesInputSchema,
    outputSchema: CurateStoreCapsulesOutputSchema,
  },
  async input => {
    const {output} = await curateStoreCapsulesPrompt(input);
    return output!;
  }
);
