// src/ai/flows/generate-chat-messages.ts
'use server';
/**
 * @fileOverview Generates a mock chat conversation between two users.
 *
 * This file defines a Genkit flow that uses an AI model to create a short,
 * informal chat history between two friends discussing a video game.
 *
 * @function generateChatMessages - The main function to generate chat messages.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema
const GenerateChatMessagesInputSchema = z.object({
  userName: z.string().describe("The name of the main user."),
  friendName: z.string().describe("The name of the friend."),
  game: z.string().describe("The game they are talking about."),
});
type GenerateChatMessagesInput = z.infer<typeof GenerateChatMessagesInputSchema>;

// Define the schema for a single chat message
const ChatMessageSchema = z.object({
  sender: z.enum(['me', 'other']).describe("Who sent the message. 'me' is the main user, 'other' is the friend."),
  text: z.string().describe("The content of the chat message."),
});

// Define the output schema
const GenerateChatMessagesOutputSchema = z.object({
  messages: z.array(ChatMessageSchema).describe("An array of 5 to 7 chat messages representing a recent conversation."),
});
export type GenerateChatMessagesOutput = z.infer<typeof GenerateChatMessagesOutputSchema>;

export async function generateChatMessages(input: GenerateChatMessagesInput): Promise<GenerateChatMessagesOutput> {
  return generateChatMessagesFlow(input);
}

// Define the prompt
const generateChatMessagesPrompt = ai.definePrompt({
  name: 'generateChatMessagesPrompt',
  input: {schema: GenerateChatMessagesInputSchema},
  output: {schema: GenerateChatMessagesOutputSchema},
  prompt: `You are an AI that generates realistic, informal chat conversations between two friends who are gamers.
  The main user is named '{{userName}}' and their friend is '{{friendName}}'.

  Generate a short chat history (between 5 and 7 messages) where they are talking about the game '{{game}}'.
  The conversation should be casual, use slang, and feel authentic.
  The main user, {{userName}}, should be assigned the sender 'me'.
  The friend, {{friendName}}, should be assigned the sender 'other'.

  Keep the messages short and to the point. Example topics:
  - Planning to play together.
  - Reacting to a recent match or in-game event.
  - Asking for help with a quest or level.
  - Sharing a cool in-game item they found.

  Your response MUST be in the requested JSON format.
  `,
});

// Define the flow
const generateChatMessagesFlow = ai.defineFlow(
  {
    name: 'generateChatMessagesFlow',
    inputSchema: GenerateChatMessagesInputSchema,
    outputSchema: GenerateChatMessagesOutputSchema,
  },
  async input => {
    const {output} = await generateChatMessagesPrompt(input);
    return output!;
  }
);
