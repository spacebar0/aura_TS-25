// src/app/settings/page.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Cog, Volume2, Monitor, Wifi, Shield, Users, Accessibility, Palette } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { SettingsNav } from '@/components/aura/SettingsNav';
import { AuraLevelBadge } from '@/components/aura/AuraLevelBadge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ThemeSwitcher } from '@/components/aura/ThemeSwitcher';
import { cn } from '@/lib/utils';

export type SettingCategory = 'system' | 'audio' | 'display' | 'network' | 'privacy' | 'profiles' | 'accessibility' | 'theme';

const categories = [
  { id: 'system', label: 'System', icon: Cog, color: 'hsl(210, 80%, 60%)' },
  { id: 'audio', label: 'Audio', icon: Volume2, color: 'hsl(39, 100%, 50%)' },
  { id: 'display', label: 'Display', icon: Monitor, color: 'hsl(180, 80%, 60%)' },
  { id: 'network', label: 'Network', icon: Wifi, color: 'hsl(120, 80%, 60%)' },
  { id: 'privacy', label: 'Privacy', icon: Shield, color: 'hsl(260, 80%, 60%)' },
  { id: 'profiles', label: 'Profiles', icon: Users, color: 'hsl(320, 80%, 60%)' },
  { id: 'accessibility', label: 'Accessibility', icon: Accessibility, color: 'hsl(0, 80%, 60%)' },
  { id: 'theme', label: 'Themes', icon: Palette, color: 'hsl(300, 80%, 60%)' },
];

const SettingsCard = ({ title, description, children }: { title: string, description?: string, children: React.ReactNode }) => (
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
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent className="space-y-8">
                {children}
            </CardContent>
        </Card>
    </motion.div>
);

const SettingRow = ({ label, description, children }: {label: string, description?: string, children: React.ReactNode}) => (
    <div className="flex items-center justify-between p-4 rounded-lg bg-background/20">
        <div className="flex-1 min-w-0">
            <Label className="text-base">{label}</Label>
            {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        </div>
        <div className="flex-shrink-0">
            {children}
        </div>
    </div>
);


export default function SettingsPage() {
  const [activeCategory, setActiveCategory] = useState<SettingCategory>('system');
  const [audioLevels, setAudioLevels] = useState({ master: 75, chat: 50 });
  const [brightness, setBrightness] = useState(80);

  const renderContent = () => {
    switch (activeCategory) {
      case 'system':
        return (
          <SettingsCard title="System Settings" description="Manage core console behavior and notifications.">
             <SettingRow label="Performance Mode" description="Optimizes system resources for gaming.">
                <Switch id="game-mode" defaultChecked />
             </SettingRow>
             <SettingRow label="Do Not Disturb" description="Silence all notifications and alerts.">
                <Switch id="dnd-mode" />
             </SettingRow>
             <SettingRow label="Auto Updates" description="Keep your games and system up-to-date automatically.">
                <Switch id="auto-updates-mode" defaultChecked />
            </SettingRow>
          </SettingsCard>
        );
      case 'audio':
        return (
          <SettingsCard title="Audio Settings" description="Fine-tune your audio experience.">
            <SettingRow label="Master Volume">
                <div className="flex items-center gap-4 w-64">
                    <Slider value={[audioLevels.master]} onValueChange={(value) => setAudioLevels(prev => ({...prev, master: value[0]}))} max={100} step={1} />
                    <span className="w-10 text-center font-mono text-muted-foreground">{audioLevels.master}</span>
                </div>
            </SettingRow>
            <SettingRow label="Voice Chat Volume">
                <div className="flex items-center gap-4 w-64">
                    <Slider value={[audioLevels.chat]} onValueChange={(value) => setAudioLevels(prev => ({...prev, chat: value[0]}))} max={100} step={1} />
                    <span className="w-10 text-center font-mono text-muted-foreground">{audioLevels.chat}</span>
                </div>
            </SettingRow>
             <SettingRow label="3D Audio" description="Enable immersive spatial audio.">
                <Switch id="3d-audio-mode" />
             </SettingRow>
          </SettingsCard>
        );
      case 'display':
        return (
          <SettingsCard title="Display Settings" description="Adjust visuals and screen output.">
            <SettingRow label="HDR (High Dynamic Range)" description="Enable for more vibrant colors.">
                <Switch id="hdr-mode" defaultChecked/>
            </SettingRow>
            <SettingRow label="Brightness">
                <div className="flex items-center gap-4 w-64">
                    <Slider value={[brightness]} onValueChange={(value) => setBrightness(value[0])} max={100} step={1} />
                    <span className="w-10 text-center font-mono text-muted-foreground">{brightness}</span>
                </div>
            </SettingRow>
             <SettingRow label="120Hz Mode" description="Allows for higher frame rates on supported displays.">
                <Switch id="120hz-mode" />
             </SettingRow>
          </SettingsCard>
        );
      case 'theme':
        return (
            <SettingsCard title="Themes" description="Customize the look and feel of your AURA console.">
                <ThemeSwitcher />
            </SettingsCard>
        );
      default:
        return (
            <SettingsCard title={categories.find(c => c.id === activeCategory)?.label || 'Settings'}>
                <p className="text-muted-foreground text-center py-16">
                    Settings for this category are under development.
                </p>
            </SettingsCard>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500 h-full">
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
