// src/components/aura/AddProfileDialog.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface AddProfileDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onAddProfile: (name: string, avatar: string) => void;
}

const presetAvatars = [
    '/images/preset1.png',
    '/images/preset2.png',
    '/images/preset3.png',
    '/images/preset4.png',
    '/images/preset5.png',
    '/images/preset6.png',
];

export function AddProfileDialog({ isOpen, onOpenChange, onAddProfile }: AddProfileDialogProps) {
  const [username, setUsername] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(presetAvatars[0]);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!username.trim()) {
      toast({
        title: "Username Required",
        description: "Please enter a name for the new profile.",
        variant: "destructive",
      });
      return;
    }
    onAddProfile(username, selectedAvatar);
    // Reset for next time
    setUsername('');
    setSelectedAvatar(presetAvatars[0]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="glass-pane">
        <DialogHeader>
          <DialogTitle>Create New Profile</DialogTitle>
          <DialogDescription>
            Enter a name and choose an avatar for your new AURA profile.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
            <div className="space-y-2">
                <Label htmlFor="new-username">Profile Name</Label>
                <Input
                    id="new-username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter a username..."
                />
            </div>
            <div className="space-y-2">
                <Label>Choose Avatar</Label>
                <div className="grid grid-cols-4 gap-4">
                    {presetAvatars.map((preset, index) => (
                    <button 
                        key={index} 
                        onClick={() => setSelectedAvatar(preset)} 
                        className="rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all"
                    >
                        <Image
                            src={preset}
                            alt={`Preset avatar ${index + 1}`}
                            width={60}
                            height={60}
                            className={cn(
                                "rounded-full border-2",
                                selectedAvatar === preset ? 'border-primary' : 'border-transparent hover:border-primary/50'
                            )}
                            data-ai-hint="futuristic avatar"
                        />
                    </button>
                    ))}
              </div>
            </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Create Profile</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
