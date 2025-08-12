export type Game = {
  id: number;
  title: string;
  description: string;
  cover: string;
  trailerVideo?: string;
  genre: string;
  rating: number;
  lastPlayed: string;
};

export const featuredGames: Game[] = [
  {
    id: 1,
    title: 'Cyber Runner 2099',
    description: 'Race through neon-drenched cityscapes.',
    cover: '/images/Untitled-1.png',
    genre: 'Racing',
    rating: 4.8,
    lastPlayed: '2 hours ago',
  },
  {
    id: 2,
    title: 'Galaxy Raiders',
    description: 'Explore uncharted star systems.',
    cover: 'https://placehold.co/300x400.png',
    genre: 'Sci-Fi RPG',
    rating: 4.9,
    lastPlayed: 'Yesterday',
  },
  {
    id: 3,
    title: 'Echoes of the Void',
    description: 'A psychological thriller in deep space.',
    cover: 'https://placehold.co/300x400.png',
    genre: 'Horror',
    rating: 4.7,
    lastPlayed: '3 days ago',
  },
];

export const games: Game[] = [
  ...featuredGames,
  {
    id: 4,
    title: 'Chrono Weavers',
    description: 'Manipulate time to solve puzzles.',
    cover: 'https://placehold.co/300x400.png',
    genre: 'Puzzle',
    rating: 4.6,
    lastPlayed: '1 week ago',
  },
  {
    id: 5,
    title: 'Neon Fury',
    description: 'High-octane arena combat.',
    cover: 'https://placehold.co/300x400.png',
    genre: 'Action',
    rating: 4.5,
    lastPlayed: '5 days ago',
  },
  {
    id: 6,
    title: 'Aethelgard Online',
    description: 'A sprawling fantasy MMORPG.',
    cover: 'https://placehold.co/300x400.png',
    genre: 'MMORPG',
    rating: 4.8,
    lastPlayed: '3 hours ago',
  },
  {
    id: 7,
    title: 'Quantum Drift',
    description: 'Defy physics in this futuristic racer.',
    cover: 'https://placehold.co/300x400.png',
    genre: 'Racing',
    rating: 4.7,
    lastPlayed: '2 weeks ago',
  },
  {
    id: 8,
    title: 'The Last Sentinel',
    description: 'Protect humanity from an ancient evil.',
    cover: 'https://placehold.co/300x400.png',
    genre: 'Action-Adventure',
    rating: 4.9,
    lastPlayed: '6 hours ago',
  },
  {
    id: 9,
    title: 'Simulacrum',
    description: 'Question your reality.',
    cover: 'https://placehold.co/300x400.png',
    genre: 'Narrative',
    rating: 4.6,
    lastPlayed: '1 month ago',
  },
  {
    id: 10,
    title: 'Project Chimera',
    description: 'Genetically engineer creatures for battle.',
    cover: 'https://placehold.co/300x400.png',
    genre: 'Strategy',
    rating: 4.4,
    lastPlayed: 'Yesterday',
  },
  {
    id: 11,
    title: 'Starlight Odyssey',
    description: 'A cozy life-sim in space.',
    cover: 'https://placehold.co/300x400.png',
    genre: 'Simulation',
    rating: 4.8,
    lastPlayed: '5 hours ago',
  },
  {
    id: 12,
    title: 'Blade Symphony',
    description: 'Master the art of sword fighting.',
    cover: 'https://placehold.co/300x400.png',
    genre: 'Fighting',
    rating: 4.7,
    lastPlayed: '4 days ago',
  },
];

export const userProfile = {
  name: 'Vapor',
  avatar: 'https://placehold.co/100x100.png',
  auraColor: 'magenta',
  pinnedGames: [games[0], games[4], games[7]],
  preferences: 'Likes fast-paced action, sci-fi themes, and competitive multiplayer games. Enjoys vibrant, neon aesthetics and synthwave music.'
};
