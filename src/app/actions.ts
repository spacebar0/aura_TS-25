'use server';

import { curateStoreCapsules, CurateStoreCapsulesOutput } from '@/ai/flows/curate-store-capsules';
import { games, userProfile } from '@/lib/mock-data';

export async function getCuratedCapsules(): Promise<CurateStoreCapsulesOutput | { error: string }> {
  try {
    const trendingGamesList = games.slice(0, 3).map(g => g.title).join(', ');
    const storeGamesList = games.map(g => `${g.title} (${g.price}, ${g.genre})`).join(', ');

    const result = await curateStoreCapsules({
      userPreferences: userProfile.preferences,
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
