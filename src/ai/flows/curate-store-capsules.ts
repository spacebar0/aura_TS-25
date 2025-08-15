// src/ai/flows/curate-store-capsules.ts
'use server';
/**
 * @fileOverview AI-curated capsule collections for the game store.
 *
 * This file defines a Genkit flow that utilizes AI to generate weekly 'capsule collections'
 * in the game store, tailored to user preferences and trending games.
 * It also creates a special discounted bundle from the curated games.
 *
 * @function curateStoreCapsules - The main function to curate store capsules.
 * @typedef {CurateStoreCapsulesInput} CurateStoreCapsulesInput - Input type for the function.
 * @typedef {CurateStoreCapsulesOutput} CurateStoreCapsulesOutput - Output type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { games, Game } from '@/lib/mock-data';

// Define the input schema
const CurateStoreCapsulesInputSchema = z.object({
  userPreferences: z
    .string()
    .describe('A summary of the user game preferences (e.g., genres, styles).'),
  trendingGames: z
    .string()
    .describe('A list of trending games this week.'),
  storeGames: z.string().describe('A comma-separated list of games with their prices and genres currently available in the store (e.g., "Cyber Runner 2099 ($23.99, Racing), Galaxy Raiders ($49.99, Sci-Fi RPG)").'),
});
export type CurateStoreCapsulesInput = z.infer<typeof CurateStoreCapsulesInputSchema>;

const GameRecommendationSchema = z.object({
    title: z.string().describe('The title of the game.'),
    description: z.string().describe('A short, 1-2 line compelling description of why this game is recommended for the user.'),
    genre: z.string().describe('The genre of the game.'),
    price: z.string().describe('The current price of the game as a string (e.g., "$29.99").'),
});

const AiBundleSchema = z.object({
    title: z.string().describe('A creative name for the AI-generated bundle, like "AI Mega Bundle" or "Vapor\'s Curated Collection".'),
    games: z.array(z.string()).describe('The titles of the 3 games included in the bundle.'),
    totalPrice: z.string().describe('The total original price of all games in the bundle combined, as a string (e.g., "$109.97").'),
    discount: z.string().describe('A percentage discount for the bundle (e.g., "-25%").'),
    bundlePrice: z.string().describe('The new, discounted price for the entire bundle as a string (e.g., "$82.48").'),
});

// Define the output schema
const CurateStoreCapsulesOutputSchema = z.object({
  recommendedGames: z.array(GameRecommendationSchema).describe('An array of exactly 3 recommended games.'),
  aiBundle: AiBundleSchema.describe('A special bundle containing the 3 recommended games with a unique discount.'),
});
export type CurateStoreCapsulesOutput = z.infer<typeof CurateStoreCapsulesOutputSchema>;

// Define the main function
export async function curateStoreCapsules(input: CurateStoreCapsulesInput): Promise<CurateStoreCapsulesOutput> {
  const result = await curateStoreCapsulesFlow(input);

  // Post-process to add full game data to the result
  const recommendedGamesWithFullData = result.recommendedGames.map(rec => {
    const fullGame = games.find(g => g.title === rec.title);
    return {
      ...rec,
      ...fullGame, // Add all fields from the full game object
    };
  });
  
  return {
    ...result,
    recommendedGames: recommendedGamesWithFullData as any, // Cast to any to include full Game properties
  };
}

// Define the prompt
const curateStoreCapsulesPrompt = ai.definePrompt({
  name: 'curateStoreCapsulesPrompt',
  input: {schema: CurateStoreCapsulesInputSchema},
  output: {schema: CurateStoreCapsulesOutputSchema},
  prompt: `You are an AI curator for a high-end digital game store called AURA.
  Your task is to create a personalized "AI Curator Weekly" section for a user.
  Be creative and generate a different, unique, and surprising collection each time.

  Based on the user's preferences, trending games, and the list of available store games, you will:
  1.  Select EXACTLY 3 games from the store list that would be a perfect fit for the user.
  2.  For each of the 3 games, write a short, compelling 1-2 line description highlighting why it's a great choice for this specific user.
  3.  Provide the genre and price for each selected game, taken directly from the store games list.
  4.  Create a special "AI Mega Bundle" containing these 3 games.
  5.  Calculate the total original price of the 3 games.
  6.  Apply a special discount (between 15% and 30%) to the bundle and calculate the final price.
  7.  Give the bundle a creative name.

  User Preferences: {{{userPreferences}}}
  Trending Games: {{{trendingGames}}}
  Available Store Games (Title, Price, Genre): {{{storeGames}}}

  Your response MUST be in the requested JSON format.
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
