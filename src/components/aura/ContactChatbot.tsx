// src/components/aura/ContactChatbot.tsx
'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { SendHorizonal, Bot, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { getSupportResponse } from '@/app/actions';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

export function ContactChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: "Hello! I'm the AURA Support Bot. How can I assist you today? You can ask about troubleshooting, account help, or game information.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => `${m.sender}: ${m.text}`).join('\n');
      const result = await getSupportResponse(input, history);

      if ('error' in result) {
        const botMessage: Message = { sender: 'bot', text: result.error };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        const botMessage: Message = { sender: 'bot', text: result.response };
        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      const botMessage: Message = {
        sender: 'bot',
        text: 'Sorry, I seem to be having trouble connecting. Please try again later.',
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-background/30 rounded-b-lg">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                'flex items-start gap-3',
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.sender === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-primary-foreground">
                  <Bot className="w-5 h-5" />
                </div>
              )}
              <div
                className={cn(
                  'max-w-xs md:max-w-md rounded-lg px-4 py-2 text-sm',
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                {message.text}
              </div>
              {message.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-primary-foreground">
                  <Bot className="w-5 h-5" />
              </div>
              <div className="bg-muted rounded-lg px-4 py-3">
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 border-t border-border bg-background/50 rounded-b-lg">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1 bg-background/50 border-white/20 focus-visible:ring-primary"
            disabled={isLoading}
            autoComplete="off"
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            <SendHorizonal className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
