'use server';

import { curateStoreCapsules, CurateStoreCapsulesOutput } from '@/ai/flows/curate-store-capsules';
import { games, initialUserProfile } from '@/lib/mock-data';

export async function getCuratedCapsules(): Promise<CurateStoreCapsulesOutput | { error: string }> {
  try {
    // Shuffle games to get a random list of trending games
    const shuffledGames = [...games].sort(() => 0.5 - Math.random());
    const trendingGamesCount = Math.floor(Math.random() * 3) + 3; // 3 to 5 trending games
    const trendingGamesList = shuffledGames.slice(0, trendingGamesCount).map(g => g.title).join(', ');
    
    const storeGamesList = games.map(g => `${g.title} (${g.price}, ${g.genre})`).join(', ');

    // Add a dynamic element to user preferences
    const allGenres = [...new Set(games.map(g => g.genre))];
    const randomGenre = allGenres[Math.floor(Math.random() * allGenres.length)];
    const dynamicPreferences = `${initialUserProfile.preferences} This week, I'm especially interested in ${randomGenre} games.`;

    const result = await curateStoreCapsules({
      userPreferences: dynamicPreferences,
      trendingGames: trendingGamesList,
      storeGames: storeGamesList,
    });
    
    return result;
  } catch (error) {
    console.error('Error curating store capsules:', error);
    // Return a more structured error
    return { error: 'Could not generate AI recommendations at this time. Please try again later.' };
  }
}
