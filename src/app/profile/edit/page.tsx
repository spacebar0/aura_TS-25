// src/app/profile/edit/page.tsx
'use client';

import { useState, useRef, ChangeEvent, useEffect } from 'react';
import Image from 'next/image';
import { Game } from '@/lib/mock-data';
import { usePinnedGames } from '@/context/PinnedGamesContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, Upload, User, BadgeCheck, Pin, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useUserProfile } from '@/context/UserProfileContext';

const allAchievements = [
    { game: 'Cyber Runner 2099', rankName: 'Nova' },
    { game: 'Galaxy Raiders', rankName: 'Zenith' },
    { game: 'Aethelgard Online', rankName: 'Eclipse' },
    { game: 'The Last Sentinel', rankName: 'Ascend' },
    { game: 'Blade Symphony', rankName: 'Infinity' },
    { game: 'Starfall', rankName: 'Radiant' },
    { game: 'Mech Warriors', rankName: 'Prism' },
];


export default function EditProfilePage() {
  const { userProfile, setUserProfile } = useUserProfile();
  const { pinnedGames } = usePinnedGames(); // Pinned games are managed globally

  const [avatar, setAvatar] = useState(userProfile.avatar);
  const [username, setUsername] = useState(userProfile.name);
  const [visibleAchievements, setVisibleAchievements] = useState(
     allAchievements.slice(0, 5).map(a => a.game)
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // When profile from context changes, update local state
    setAvatar(userProfile.avatar);
    setUsername(userProfile.name);
  }, [userProfile]);

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAchievementToggle = (gameTitle: string) => {
    setVisibleAchievements((prev) =>
      prev.includes(gameTitle)
        ? prev.filter((g) => g !== gameTitle)
        : [...prev, gameTitle]
    );
  };
  
  const handleSave = () => {
    setUserProfile({
        ...userProfile,
        name: username,
        avatar: avatar,
        pinnedGames: pinnedGames, // We get the latest from context
    });
    
    // In a real app, you would also save visibleAchievements somewhere
    console.log("Saving changes:", {
        username,
        avatar,
        pinnedGames: pinnedGames.map(g => g.id),
        visibleAchievements,
    });

    toast({
        title: "Profile Saved!",
        description: "Your changes have been successfully saved.",
    });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
      <header className="mb-8 flex justify-between items-center">
        <div>
            <h1 className="text-5xl font-poppins font-medium text-glow">
            Edit Profile
            </h1>
            <p className="text-muted-foreground mt-2">
            Customize your AURA presence.
            </p>
        </div>
        <Button size="lg" onClick={handleSave}>
            <Save className="mr-2 h-5 w-5" />
            Save Changes
        </Button>
      </header>

      <div className="space-y-8">
        {/* Profile Info Card */}
        <Card className="glass-pane">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><User /> Profile Information</CardTitle>
            <CardDescription>Update your avatar and username.</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-[150px_1fr] gap-6 items-start">
            <div className="flex flex-col items-center gap-4">
              <Image
                src={avatar}
                alt="Your Avatar"
                width={100}
                height={100}
                className="rounded-full border-4 border-primary"
                data-ai-hint="futuristic avatar"
              />
              <Input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleAvatarChange}
                accept="image/*"
              />
              <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </Button>
            </div>
            <div className="space-y-4">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-lg"
              />
            </div>
          </CardContent>
        </Card>

        {/* Pinned Games Card */}
        <Card className="glass-pane">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Pin /> Pinned Games</CardTitle>
                <CardDescription>Manage the games showcased on your profile.</CardDescription>
            </CardHeader>
            <CardContent>
                {pinnedGames.length > 0 ? (
                <div className="space-y-4">
                    {pinnedGames.map((game: Game) => (
                    <div key={game.id} className="flex items-center justify-between p-2 rounded-md bg-background/30">
                        <div className="flex items-center gap-4">
                        <Image src={game.cover} alt={game.title} width={60} height={45} className="rounded" data-ai-hint="game poster" />
                        <span className="font-medium">{game.title}</span>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => {
                             // This now comes from the PinnedGamesContext
                             // In a real app, you'd probably want to call a function from the context here
                             // For now, let's assume the context handles removal, but we need to find the right component for that
                             console.log("This should be handled by the context provider, likely on the homepage");
                        }}>
                            <Trash2 className="w-5 h-5 text-destructive" />
                        </Button>
                    </div>
                    ))}
                </div>
                ) : (
                <p className="text-muted-foreground text-center py-4">
                    No games pinned. Pin games from the home screen to see them here.
                </p>
                )}
            </CardContent>
        </Card>

        {/* Visible Achievements Card */}
        <Card className="glass-pane">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><BadgeCheck /> Visible Achievements</CardTitle>
                <CardDescription>Choose which achievements to display on your profile.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {allAchievements.map((ach) => (
                        <div key={ach.game} className="flex items-center space-x-3 p-3 rounded-md bg-background/30">
                            <Checkbox
                                id={`ach-${ach.game}`}
                                checked={visibleAchievements.includes(ach.game)}
                                onCheckedChange={() => handleAchievementToggle(ach.game)}
                            />
                            <label
                                htmlFor={`ach-${ach.game}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {ach.game} - <span className="text-muted-foreground">{ach.rankName}</span>
                            </label>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>

      </div>
    </div>
  );
}