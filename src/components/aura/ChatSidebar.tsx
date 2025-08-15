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
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { SendHorizonal, Loader } from 'lucide-react';
import { getChatMessages } from '@/app/actions';
import type { GenerateChatMessagesOutput } from '@/ai/flows/generate-chat-messages';
import { Skeleton } from '../ui/skeleton';
import { z } from 'zod';

// Define the schema for a single chat message
export const ChatMessageSchema = z.object({
  sender: z.enum(['me', 'other']).describe("Who sent the message. 'me' is the main user, 'other' is the friend."),
  text: z.string().describe("The content of the chat message."),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;


interface ChatSidebarProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  friend: Friend | null;
}

export function ChatSidebar({ isOpen, onOpenChange, friend }: ChatSidebarProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const isFetching = useRef(false);

  useEffect(() => {
    const fetchMessages = async () => {
      if (friend && !isFetching.current) {
        isFetching.current = true;
        setIsLoading(true);
        setError(null);
        setMessages([]); // Clear old messages

        const result = await getChatMessages(friend);
        if ('error' in result) {
          setError(result.error);
        } else {
          setMessages(result.messages);
        }
        setIsLoading(false);
        isFetching.current = false;
      }
    };

    if (isOpen) {
      fetchMessages();
    }
  }, [isOpen, friend]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
        setMessages([...messages, { sender: 'me', text: newMessage.trim() }]);
        setNewMessage('');
    }
  }

  if (!friend) return null;

  const ChatLoader = () => (
    <div className="space-y-4 p-4">
        <div className="flex items-center gap-2 justify-start">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-48 rounded-md" />
        </div>
        <div className="flex items-center gap-2 justify-end">
            <Skeleton className="h-8 w-40 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-full" />
        </div>
        <div className="flex items-center gap-2 justify-start">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-32 rounded-md" />
        </div>
        <div className="flex items-center gap-2 justify-end">
            <Skeleton className="h-8 w-52 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-full" />
        </div>
    </div>
  );


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
        <ScrollArea className="flex-1" ref={scrollAreaRef}>
           {isLoading ? (
                <ChatLoader />
            ) : error ? (
                <div className="flex items-center justify-center h-full text-destructive p-4 text-center">
                    {error}
                </div>
            ) : (
                <div className="space-y-4 p-4">
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
            )}
        </ScrollArea>
        <div className="p-4 border-t border-white/10 bg-black/20">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <Input 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-background/50 border-white/20 focus-visible:ring-primary"
                    disabled={isLoading}
                />
                <Button type="submit" size="icon" disabled={isLoading}>
                    <SendHorizonal className="w-5 h-5" />
                </Button>
            </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
