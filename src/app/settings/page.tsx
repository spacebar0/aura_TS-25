// src/app/settings/page.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cog, Volume2, Monitor, Wifi, Shield, Users, Accessibility, Gamepad2, Moon, Sun } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { SettingsNav } from '@/components/aura/SettingsNav';
import { AuraLevelBadge } from '@/components/aura/AuraLevelBadge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

export type SettingCategory = 'system' | 'audio' | 'display' | 'network' | 'privacy' | 'profiles' | 'accessibility';

const categories = [
  { id: 'system', label: 'System', icon: Cog, color: 'hsl(210, 80%, 60%)' },
  { id: 'audio', label: 'Audio', icon: Volume2, color: 'hsl(39, 100%, 50%)' },
  { id: 'display', label: 'Display', icon: Monitor, color: 'hsl(180, 80%, 60%)' },
  { id: 'network', label: 'Network', icon: Wifi, color: 'hsl(120, 80%, 60%)' },
  { id: 'privacy', label: 'Privacy', icon: Shield, color: 'hsl(260, 80%, 60%)' },
  { id: 'profiles', label: 'Profiles', icon: Users, color: 'hsl(320, 80%, 60%)' },
  { id: 'accessibility', label: 'Accessibility', icon: Accessibility, color: 'hsl(0, 80%, 60%)' },
];

const SettingsCard = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="h-full"
    >
        <Card className="glass-pane h-full">
            <CardHeader>
                <CardTitle className="text-2xl font-poppins text-glow">{title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {children}
            </CardContent>
        </Card>
    </motion.div>
);

export default function SettingsPage() {
  const [activeCategory, setActiveCategory] = useState<SettingCategory>('system');

  const renderContent = () => {
    switch (activeCategory) {
      case 'system':
        return (
          <SettingsCard title="System Settings">
             <div className="flex items-center justify-between">
              <Label htmlFor="game-mode">Game Mode</Label>
              <Switch id="game-mode" defaultChecked />
            </div>
             <div className="flex items-center justify-between">
              <Label htmlFor="dnd-mode">Do Not Disturb</Label>
              <Switch id="dnd-mode" />
            </div>
            <div className="flex items-center justify-between">
                <Label>Theme</Label>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon"><Sun /></Button>
                    <Button variant="secondary" size="icon"><Moon /></Button>
                </div>
            </div>
          </SettingsCard>
        );
      case 'audio':
        return (
          <SettingsCard title="Audio Settings">
            <div className="space-y-2">
              <Label htmlFor="master-volume">Master Volume</Label>
              <Slider id="master-volume" defaultValue={[75]} max={100} step={1} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="chat-volume">Voice Chat Volume</Label>
              <Slider id="chat-volume" defaultValue={[50]} max={100} step={1} />
            </div>
          </SettingsCard>
        );
      case 'display':
        return (
          <SettingsCard title="Display Settings">
            <div className="flex items-center justify-between">
                <Label htmlFor="hdr-mode">HDR Mode</Label>
                <Switch id="hdr-mode" defaultChecked/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="brightness">Brightness</Label>
              <Slider id="brightness" defaultValue={[80]} max={100} step={1} />
            </div>
          </SettingsCard>
        );
      default:
        return (
            <SettingsCard title={categories.find(c => c.id === activeCategory)?.label || 'Settings'}>
                <p className="text-muted-foreground">
                    Settings for this category are under development.
                </p>
            </SettingsCard>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500 h-full">
      <div className="absolute top-8 right-8 z-20">
          <AuraLevelBadge />
      </div>
      <div className="flex h-full gap-8">
        <SettingsNav 
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
        />
        <main className="flex-1 relative">
            <AnimatePresence mode="wait">
                <div key={activeCategory} className="h-full">
                    {renderContent()}
                </div>
            </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
