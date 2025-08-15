// src/ai/flows/generate-wifi-names.ts
'use server';
/**
 * @fileOverview Generates a list of creative Wi-Fi network names.
 *
 * This file defines a Genkit flow that uses an AI model to create a list of
 * fictional, gaming-themed Wi-Fi network names.
 *
 * @function generateWifiNames - The main function to generate Wi-Fi names.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema
const GenerateWifiNamesInputSchema = z.object({
  count: z.number().describe("The number of Wi-Fi network names to generate."),
});
type GenerateWifiNamesInput = z.infer<typeof GenerateWifiNamesInputSchema>;

// Define the output schema
const GenerateWifiNamesOutputSchema = z.object({
  networks: z.array(z.string()).describe("An array of creative, fictional Wi-Fi network names."),
});
export type GenerateWifiNamesOutput = z.infer<typeof GenerateWifiNamesOutputSchema>;

export async function generateWifiNames(input: GenerateWifiNamesInput): Promise<GenerateWifiNamesOutput> {
  return generateWifiNamesFlow(input);
}

// Define the prompt
const generateWifiNamesPrompt = ai.definePrompt({
  name: 'generateWifiNamesPrompt',
  input: {schema: GenerateWifiNamesInputSchema},
  output: {schema: GenerateWifiNamesOutputSchema},
  prompt: `You are an AI that generates creative and fictional Wi-Fi network names for a futuristic gaming console UI.

  Generate a list of exactly {{count}} unique Wi-Fi network names.
  The names should be inspired by gaming culture, cyberpunk, sci-fi, and futuristic themes.
  
  Examples:
  - "Lagless Sanctuary"
  - "The Holo-Net"
  - "Cyber-Cortex Stream"
  - "AURA_Mainframe"
  - "Vapor's Private Relay"

  Your response MUST be in the requested JSON format.
  `,
});

// Define the flow
const generateWifiNamesFlow = ai.defineFlow(
  {
    name: 'generateWifiNamesFlow',
    inputSchema: GenerateWifiNamesInputSchema,
    outputSchema: GenerateWifiNamesOutputSchema,
  },
  async input => {
    const {output} = await generateWifiNamesPrompt(input);
    return output!;
  }
);
