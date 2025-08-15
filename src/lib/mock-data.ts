
export type Game = {
  id: number;
  title: string;
  description: string;
  cover: string;
  trailerVideo?: string;
  genre: string;
  rating: number;
  lastPlayed: string;
  lastPlayedDate: string; // ISO 8601 date string
  price: string;
  originalPrice?: string;
  discount?: string;
};

export type Friend = {
  id: number;
  name: string;
  avatar: string;
  status: 'Online' | 'Offline' | 'In-Game' | 'Idle' | 'Do Not Disturb';
  gamePlaying?: string;
  invited?: boolean;
};

export type RecentPlayer = {
  id: number;
  name: string;
  avatar: string;
  game: string;
  lastPlayed: string;
}

export type UserProfile = {
  name: string;
  avatar: string;
  auraColor: string;
  pinnedGames: Game[];
  preferences: string;
  totalPlaytime: string;
  gamesOwned: number;
  friends: Friend[];
}

export const storeCarouselImages: string[] = [
  'https://placehold.co/1920x1080.png',
  'https://placehold.co/1920x1080.png',
  'https://placehold.co/1920x1080.png',
  'https://placehold.co/1920x1080.png',
];

export const featuredGames: Game[] = [
  {
    id: 101,
    title: 'Voidfall',
    description: 'A 4X game that brings the genre to a new level.',
    cover: 'https://placehold.co/1920x1080.png',
    genre: 'Strategy',
    rating: 4.9,
    lastPlayed: 'N/A',
    lastPlayedDate: new Date(Date.now() - 10 * 30 * 24 * 60 * 60 * 1000).toISOString(),
    price: '$59.99'
  },
  {
    id: 102,
    title: 'Helldivers II',
    description: 'A 3rd person squad-based shooter.',
    cover: 'https://placehold.co/1920x1080.png',
    genre: 'Shooter',
    rating: 4.8,
    lastPlayed: 'N/A',
    lastPlayedDate: new Date(Date.now() - 11 * 30 * 24 * 60 * 60 * 1000).toISOString(),
    price: '$39.99'
  },
  {
    id: 103,
    title: 'Manor Lords',
    description: 'A medieval strategy game featuring in-depth city building.',
    cover: 'https://placehold.co/1920x1080.png',
    genre: 'Strategy',
    rating: 4.7,
    lastPlayed: 'N/A',
    lastPlayedDate: new Date(Date.now() - 12 * 30 * 24 * 60 * 60 * 1000).toISOString(),
    price: '$39.99'
  },
    {
    id: 104,
    title: 'Frostpunk 2',
    description: 'A city-survival game where heat means life.',
    cover: 'https://placehold.co/1920x1080.png',
    genre: 'Strategy',
    rating: 4.9,
    lastPlayed: 'N/A',
    lastPlayedDate: new Date(Date.now() - 13 * 30 * 24 * 60 * 60 * 1000).toISOString(),
    price: '$49.99'
  },
  {
    id: 105,
    title: 'Elden Ring',
    description: 'An action RPG developed by FromSoftware.',
    cover: 'https://placehold.co/1920x1080.png',
    genre: 'Action RPG',
    rating: 5.0,
    lastPlayed: 'N/A',
    lastPlayedDate: new Date(Date.now() - 14 * 30 * 24 * 60 * 60 * 1000).toISOString(),
    price: '$59.99'
  },
];

export const games: Game[] = [
  {
    id: 1,
    title: 'EA FC 25',
    description: 'A football simulation.',
    cover: '/images/1.jpg',
    genre: 'Sports',
    rating: 4.8,
    lastPlayed: '2 hours ago',
    lastPlayedDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    price: '$23.99',
    originalPrice: '$59.99',
    discount: '-60%'
  },
    {
      id: 2,
      title: 'GTA 5',
      description: 'A vast open-world game set in the city of Los Santos.',
      cover: '/images/2.jpg',
      genre: 'Action-Adventure',
      rating: 4.9,
      lastPlayed: 'Yesterday',
      lastPlayedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      price: '$49.99',
    },
    {
      id: 3,
      title: 'Just Cause 4',    
      description: 'An action game with a focus on destruction and grappling hook mechanics.',
      cover: '/images/3.webp',
      genre: 'Action-Adventure',
      rating: 4.7,
      lastPlayed: '3 days ago',
      lastPlayedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      price: '$29.99',
    },
    {
      id: 4,
      title: 'F1 24',    
      description: 'A realistic simulation of the Formula 1 racing season.',
      cover: '/images/5.avif',
      genre: 'Racing',
      rating: 4.6,
      lastPlayed: '1 week ago',
      lastPlayedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      price: '$19.99',
    },
    {
      id: 5,
      title: '2K24',    
      description: 'A basketball simulation game.',
      cover: '/images/6.jpeg',
      genre: 'Sports',
      rating: 4.5,
      lastPlayed: '5 days ago',
      lastPlayedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      price: '$9.99',
    },
    {
      id: 6,
      title: 'RDR 2',
      description: 'An open-world Western-themed action-adventure game.',
      cover: '/images/7.jpg',
      genre: 'Action-Adventure',
      rating: 4.8,
      lastPlayed: '3 hours ago',
      lastPlayedDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      price: '$59.99',
    },
    {
      id: 7,
      title: 'CyberPunk 2099',    
      description: 'An open-world RPG set in a dystopian future.',
      cover: '/images/8.jpg',
      genre: 'Action RPG',
      rating: 4.7,
      lastPlayed: '2 weeks ago',
      lastPlayedDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      price: '$24.99',
    },
    {
      id: 8,
      title: 'C.O.D 10',    
      description: 'A first-person shooter game.',
      cover: '/images/9.jpg',
      genre: 'Shooter',
      rating: 4.9,
      lastPlayed: '6 hours ago',
      lastPlayedDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      price: '$38.00',
      originalPrice: '$94.99',
      discount: '-60%'
    }, 
  {
    id: 9,
    title: 'Minecraft',
    description: 'Test your survival skills',
    cover: '/images/10.jpg',
    genre: 'Narrative',
    rating: 4.6,
    lastPlayed: '1 month ago',
    lastPlayedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    price: '$14.99',
  },
  {
    id: 10,
    title: 'Fortnite',
    description: 'Genetically engineer creatures for battle.',
    cover: '/images/11.webp',
    genre: 'Strategy',
    rating: 4.4,
    lastPlayed: 'Yesterday',
    lastPlayedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    price: '$39.99',
  },
  {
    id: 11,
    title: 'God Of WAR',
    description: 'A cozy life-sim in space.',
    cover: '/images/12.jpg',
    genre: 'Simulation',
    rating: 4.8,
    lastPlayed: '5 hours ago',
    lastPlayedDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    price: '$29.99',
  },
  {
    id: 12,
    title: 'Uncharted 4',
    description: 'Master the art of sword fighting.',
    cover: '/images/4.jpg',
    genre: 'Fighting',
    rating: 4.7,
    lastPlayed: '4 days ago',
    lastPlayedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    price: '$19.99',
  },
];

export const initialUserProfile: UserProfile = {
  name: 'Vapor',
  avatar: 'https://placehold.co/100x100.png',
  auraColor: 'magenta',
  pinnedGames: [games[0], games[4], games[7]],
  preferences: 'Likes fast-paced action, sci-fi themes, and competitive multiplayer games. Enjoys vibrant, neon aesthetics and synthwave music.',
  totalPlaytime: '1,240 hours',
  gamesOwned: games.length,
  friends: [
    { id: 1, name: 'Spacebar', avatar: '/images/profile1.jpg', status: 'In-Game', gamePlaying: 'Cyber Runner 2099' },
    { id: 2, name: 'PixelPrincess', avatar: '/images/profile2.jpg', status: 'Online' },
    { id: 3, name: 'HorizonRed', avatar: '/images/profile3.jpg', status: 'Idle' },
    { id: 4, name: 'SolarFlex', avatar: '/images/profile4.jpg', status: 'Offline' },
    { id: 5, name: 'VoidWalker', avatar: '/images/profile5.png', status: 'Do Not Disturb' },
    { id: 6, name: 'Glitch', avatar: 'https://placehold.co/100x100.png', status: 'Online' },
    { id: 7, name: 'RogueWave', avatar: 'https://placehold.co/100x100.png', status: 'In-Game', gamePlaying: 'Starfall' },
    { id: 8, name: 'SynthShadow', avatar: 'https://placehold.co/100x100.png', status: 'Offline' },
    { id: 9, name: 'NeonNinja', avatar: 'https://placehold.co/100x100.png', status: 'Idle' },
  ] as Friend[]
};

export const recentPlayers: RecentPlayer[] = [
    { id: 1, name: 'Ghost', avatar: 'https://placehold.co/96x96.png', game: 'Cyber Runner 2099', lastPlayed: '2h ago' },
    { id: 2, name: 'Ace', avatar: 'https://placehold.co/96x96.png', game: 'Starfall', lastPlayed: '5h ago' },
    { id: 3, name: 'Reaper', avatar: 'https://placehold.co/96x96.png', game: 'Blade Symphony', lastPlayed: '1d ago' },
    { id: 4, name: 'Nyx', avatar: 'https://placehold.co/96x96.png', game: 'Galaxy Raiders', lastPlayed: '1d ago' },
    { id: 5, name: 'Wraith', avatar: 'https://placehold.co/96x96.png', game: 'Cyber Runner 2099', lastPlayed: '2d ago' },
    { id: 6, name: 'Zero', avatar: 'https://placehold.co/96x96.png', game: 'Aethelgard Online', lastPlayed: '3d ago' },
    { id: 7, name: 'Viper', avatar: 'https://placehold.co/96x96.png', game: 'Mech Warriors', lastPlayed: '3d ago' },
    { id: 8, name: 'Blitz', avatar: 'https://placehold.co/96x96.png', game: 'Starfall', lastPlayed: '4d ago' },
];

export type Song = {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  coverArt: string;
};

export type Playlist = {
  id: string;
  name: string;
  songs: Song[];
};

export const recentlyPlayed: Song[] = [
  { id: 's1', title: 'Mirage', artist: 'Else', album: 'Mirage', duration: '4:20', coverArt: 'https://placehold.co/100x100.png' },
  { id: 's2', title: 'Hotline', artist: 'Kavinsky', album: 'OutRun', duration: '3:25', coverArt: 'https://placehold.co/100x100.png' },
  { id: 's3', title: 'Genesis', artist: 'Justice', album: 'Cross', duration: '3:54', coverArt: 'https://placehold.co/100x100.png' },
];

export const userPlaylists: Playlist[] = [
  {
    id: 'p1',
    name: 'Synthwave Dreams',
    songs: [
        { id: 's4', title: 'Nightcall', artist: 'Kavinsky', album: 'OutRun', duration: '4:18', coverArt: 'https://placehold.co/100x100.png' },
        { id: 's5', title: 'Resonance', artist: 'Home', album: 'Odyssey', duration: '3:32', coverArt: 'https://placehold.co/100x100.png' },
        ...recentlyPlayed,
    ],
  },
  {
    id: 'p2',
    name: 'Focus Flow',
    songs: [
      { id: 's6', title: 'Dayvan Cowboy', artist: 'Boards of Canada', album: 'The Campfire Headphase', duration: '5:01', coverArt: 'https://placehold.co/100x100.png' },
    ],
  },
];
