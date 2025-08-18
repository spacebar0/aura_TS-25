// src/app/select-profile/page.tsx
'use client';

import { useState } from 'react';
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

export default function SelectProfilePage() {
  const router = useRouter();
  const { setActiveProfile } = useActiveProfile();
  const { userProfile, setUserProfile } = useUserProfile(); // In a real app, this would be a list of profiles
  
  // For demonstration, we'll use the single userProfile to create a list of profiles
  const initialProfiles = [
    userProfile,
    { ...initialUserProfile, id: 2, name: 'Nova', avatar: '/images/preset1.png' },
    { ...initialUserProfile, id: 3, name: 'Glitch', avatar: '/images/preset2.png' },
  ];

  const [profiles, setProfiles] = useState(initialProfiles);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleProfileSelect = (profile: any) => {
    setActiveProfile(profile);
    setUserProfile(profile); // Update the main user profile context
    router.push('/home'); // Redirect to the main home page
  };

  const handleAddProfile = (name: string, avatar: string) => {
    const newProfile: UserProfile = {
      ...initialUserProfile,
      id: profiles.length + 1, // Simple ID generation for demo
      name,
      avatar,
    };
    setProfiles([...profiles, newProfile]);
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
          {profiles.map((profile) => (
            <motion.div key={profile.id || 1} variants={itemVariants}>
              <ProfileCard
                profile={profile}
                onSelect={() => handleProfileSelect(profile)}
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
                    <DropdownMenuItem onClick={() => handleEdit(profile.id || 1)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(profile.id || 1)}>
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
              onClick={() => setIsAddDialogOpen(true)}
              className="group w-48 h-64 rounded-2xl border-2 border-dashed border-muted-foreground/50 flex flex-col items-center justify-center text-muted-foreground/80 hover:border-primary hover:text-primary transition-all duration-300 aura-pulse-border focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
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
