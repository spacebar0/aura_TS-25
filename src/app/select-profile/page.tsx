
// src/app/select-profile/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Settings, Plus, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { ProfileCard } from '@/components/aura/ProfileCard';
import { useUserProfile } from '@/context/UserProfileContext';
import { useActiveProfile } from '@/context/ActiveProfileContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { initialUserProfile, UserProfile } from '@/lib/mock-data'; // Using this as a template
import { AddProfileDialog } from '@/components/aura/AddProfileDialog';
import { useGamepad } from '@/hooks/use-gamepad';
import { cn } from '@/lib/utils';
import { useFocus } from '@/context/FocusContext';

export default function SelectProfilePage() {
  const router = useRouter();
  const { setActiveProfile } = useActiveProfile();
  const { setUserProfile } = useUserProfile();
  const { selectProfileIndex, setSelectProfileIndex } = useFocus();
  
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, profiles.length + 1);
  }, [profiles]);

  useGamepad();

  useEffect(() => {
    // This effect runs on the client, where localStorage is available.
    const storedProfiles = localStorage.getItem('aura-profiles');
    if (storedProfiles) {
      setProfiles(JSON.parse(storedProfiles));
    } else {
      // If no profiles are stored, initialize with some defaults.
      const initialProfiles = [
        { ...initialUserProfile, id: 1 },
        { ...initialUserProfile, id: 2, name: 'Nova', avatar: '/images/preset1.png', pinnedGames: [], totalPlaytime: '0h', gamesOwned: 0 },
        { ...initialUserProfile, id: 3, name: 'Glitch', avatar: '/images/preset2.png', pinnedGames: [], totalPlaytime: '0h', gamesOwned: 0 },
      ];
      setProfiles(initialProfiles);
      localStorage.setItem('aura-profiles', JSON.stringify(initialProfiles));
    }
  }, []);

  useEffect(() => {
    // Whenever profiles change, save them to localStorage.
    if (profiles.length > 0) {
      localStorage.setItem('aura-profiles', JSON.stringify(profiles));
    }
  }, [profiles]);

  const handleProfileSelect = (profile: UserProfile) => {
    setActiveProfile(profile);
    setUserProfile(profile); // Update the main user profile context
    router.push('/home'); // Redirect to the main home page
  };

  const handleAddProfile = (name: string, avatar: string) => {
    const newProfile: UserProfile = {
      ...initialUserProfile,
      id: Date.now(), // Use timestamp for a simple unique ID
      name,
      avatar,
      pinnedGames: [],
      totalPlaytime: '0h',
      gamesOwned: 0,
      preferences: 'New AURA user. Ready to play!',
      friends: initialUserProfile.friends,
    };
    setProfiles(prevProfiles => [...prevProfiles, newProfile]);
    setIsAddDialogOpen(false);
  };


  const handleEdit = (profileId: number) => {
    console.log('Editing profile:', profileId);
    // In a real app, this would navigate to an edit page or open a modal
  };

  const handleDelete = (profileId: number) => {
    setProfiles(profiles.filter(p => p.id !== profileId));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <>
      <div className="w-full h-full flex flex-col items-center justify-center bg-background text-foreground p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-poppins font-medium text-glow">
            Select Your Profile
          </h1>
          <p className="text-muted-foreground mt-2 font-silkscreen">
            Your Universe Awaits
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-center gap-8 flex-wrap"
        >
          {profiles.map((profile, index) => (
            <motion.div key={profile.id} variants={itemVariants}>
              <ProfileCard
                ref={el => cardRefs.current[index] = el}
                profile={profile}
                onSelect={() => handleProfileSelect(profile)}
                isFocused={selectProfileIndex === index}
              >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-black/50 text-white/70 hover:bg-black/80 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="top" align="end" className="glass-pane">
                    <DropdownMenuItem onClick={() => handleEdit(profile.id)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(profile.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </ProfileCard>
            </motion.div>
          ))}

          <motion.div variants={itemVariants}>
            <button
              ref={el => cardRefs.current[profiles.length] = el}
              onClick={() => setIsAddDialogOpen(true)}
              className={cn(
                "group w-48 h-64 rounded-2xl border-2 border-dashed border-muted-foreground/50 flex flex-col items-center justify-center text-muted-foreground/80 transition-all duration-300",
                "hover:border-primary hover:text-primary",
                "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background",
                selectProfileIndex === profiles.length ? "border-primary text-primary shadow-2xl shadow-primary/30 scale-105" : "border-muted-foreground/50"
              )}
            >
              <Plus className="w-16 h-16 mb-2 transition-transform duration-300 group-hover:scale-110" />
              <span className="font-medium text-lg">Add Profile</span>
            </button>
          </motion.div>
        </motion.div>

        <div className="absolute top-6 right-6">
          <Button variant="ghost" size="icon">
            <Settings className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
          </Button>
        </div>
      </div>
      <AddProfileDialog 
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddProfile={handleAddProfile}
      />
    </>
  );
}
