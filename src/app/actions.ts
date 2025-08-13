'use server';

import { curateStoreCapsules } from '@/ai/flows/curate-store-capsules';
import { games, userProfile } from '@/lib/mock-data';

export async function getCuratedCapsules() {
  try {
    const trendingGamesList = games.slice(0, 3).map(g => g.title).join(', ');
    const storeGamesList = games.map(g => g.title).join(', ');

    const result = await curateStoreCapsules({
      userPreferences: userProfile.preferences,
      trendingGames: trendingGamesList,
      storeGames: storeGamesList,
    });
    
    return result.capsuleCollections;
  } catch (error) {
    console.error('Error curating store capsules:', error);
    // Return a more structured error
    return { error: 'Could not generate AI recommendations at this time. Please try again later.' };
  }
}
