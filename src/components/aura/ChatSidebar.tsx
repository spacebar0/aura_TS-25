// src/components/aura/ChatSidebar.tsx
'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { type Friend } from '@/lib/mock-data';
import Image from 'next/image';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { SendHorizonal } from 'lucide-react';

interface ChatSidebarProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  friend: Friend | null;
}

const mockMessages = [
    { sender: 'other', text: 'Yo, you up for a match in Cyber Runner?' },
    { sender: 'me', text: 'Yeah, absolutely! Let me just finish this quest.' },
    { sender: 'other', text: 'No worries, hit me up when you\'re ready.' },
    { sender: 'other', text: 'We need one more for the squad.' },
    { sender: 'me', text: 'Almost done. 5 more minutes.' },
];

export function ChatSidebar({ isOpen, onOpenChange, friend }: ChatSidebarProps) {
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
        setMessages([...messages, { sender: 'me', text: newMessage.trim() }]);
        setNewMessage('');
    }
  }

  if (!friend) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="glass-pane w-[380px] sm:w-[420px] p-0 flex flex-col border-l-primary/20">
        <SheetHeader className="p-4 flex flex-row items-center gap-4 border-b border-white/10 bg-black/20">
            <Image 
                src={friend.avatar}
                alt={friend.name}
                width={40}
                height={40}
                className="rounded-full"
                data-ai-hint="avatar"
            />
          <SheetTitle className="text-lg font-medium text-white">{friend.name}</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((msg, index) => (
                <div 
                    key={index}
                    className={cn('flex', {
                        'justify-end': msg.sender === 'me',
                        'justify-start': msg.sender === 'other'
                    })}
                >
                    <div className={cn('max-w-[75%] rounded-lg px-3 py-2 text-sm', {
                        'bg-primary text-primary-foreground': msg.sender === 'me',
                        'bg-muted': msg.sender === 'other'
                    })}>
                        {msg.text}
                    </div>
                </div>
            ))}
          </div>
        </ScrollArea>
        <div className="p-4 border-t border-white/10 bg-black/20">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <Input 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-background/50 border-white/20 focus-visible:ring-primary"
                />
                <Button type="submit" size="icon">
                    <SendHorizonal className="w-5 h-5" />
                </Button>
            </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
