// src/ai/flows/contact-support-chat.ts
'use server';
/**
 * @fileOverview AI-powered support chatbot for the AURA console.
 *
 * This file defines a Genkit flow that acts as a customer support agent.
 * It takes a user's query and conversation history to provide helpful responses.
 *
 * @function generateSupportResponse - The main function for the support chatbot.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Define the input schema
const SupportChatInputSchema = z.object({
  userQuery: z.string().describe('The latest message from the user.'),
  history: z
    .string()
    .describe('The recent conversation history between the user and the bot.'),
});
export type SupportChatInput = z.infer<typeof SupportChatInputSchema>;

// Define the output schema
const SupportChatOutputSchema = z.object({
  response: z
    .string()
    .describe('The helpful and concise response from the support bot.'),
});
export type SupportChatOutput = z.infer<typeof SupportChatOutputSchema>;

// Exported function to be called from server actions
export async function generateSupportResponse(
  input: SupportChatInput
): Promise<SupportChatOutput> {
  return contactSupportFlow(input);
}

// Define the prompt
const contactSupportPrompt = ai.definePrompt({
  name: 'contactSupportPrompt',
  input: { schema: SupportChatInputSchema },
  output: { schema: SupportChatOutputSchema },
  prompt: `You are a friendly and helpful AI customer support agent for AURA, a high-end gaming console.
Your name is the AURA Support Bot.
Your goal is to assist users with their questions concisely and effectively.

- Keep your responses brief and to the point (2-3 sentences max).
- If you don't know the answer, politely say so and suggest they contact a human support agent via the helpline or email provided on the contact page.
- Do not make up information about games, prices, or account details.
- You can answer questions about basic troubleshooting (e.g., "my controller won't connect"), account management (e.g., "how do I change my username?"), and general AURA features.

Here is the conversation history so far:
{{{history}}}

Here is the new user query:
User: {{{userQuery}}}

Based on this, provide a helpful response.
`,
});

// Define the flow
const contactSupportFlow = ai.defineFlow(
  {
    name: 'contactSupportFlow',
    inputSchema: SupportChatInputSchema,
    outputSchema: SupportChatOutputSchema,
  },
  async (input) => {
    const { output } = await contactSupportPrompt(input);
    return output!;
  }
);
