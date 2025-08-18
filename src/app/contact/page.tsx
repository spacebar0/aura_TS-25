// src/app/contact/page.tsx
'use client';

import { AppLifecycle } from '@/app/app-lifecycle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, Twitter, Instagram, Facebook } from 'lucide-react';
import { ContactChatbot } from '@/components/aura/ContactChatbot';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

function ContactPageContent() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500 w-full relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 w-1/2 h-full bg-blue-500/20 -translate-y-1/2 rounded-full blur-[150px] opacity-30 pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left column for contact info */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:pt-16 space-y-8"
        >
          <header className="mb-12">
            <h1 className="text-5xl font-poppins font-medium text-glow leading-tight">
              We're here to help
            </h1>
            <p className="text-muted-foreground mt-4 font-silkscreen">
              Get in touch with us through any of the methods below, or chat with our AI assistant.
            </p>
          </header>

          <div className="space-y-6">
            <Card className="glass-pane border-0">
                <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                    <Phone className="w-5 h-5 text-primary" />
                    <span>24/7 Helpline</span>
                </CardTitle>
                </CardHeader>
                <CardContent>
                <p className="text-2xl font-mono text-foreground">
                    1-800-AURA-GAM
                </p>
                </CardContent>
            </Card>

            <Card className="glass-pane border-0">
                <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                    <Mail className="w-5 h-5 text-primary" />
                    <span>Email Support</span>
                </CardTitle>
                </CardHeader>
                <CardContent>
                <p className="text-lg font-mono text-foreground break-all">
                    support@aura-console.com
                </p>
                </CardContent>
            </Card>

            <div className="flex items-center gap-2 pt-4">
                <Button variant="outline" size="icon">
                    <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon">
                    <Instagram className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon">
                    <Facebook className="h-5 w-5" />
                </Button>
            </div>
          </div>
        </motion.div>

        {/* Right column for the chatbot */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-1 h-[calc(100vh-12rem)]"
        >
          <Card className="glass-pane h-full flex flex-col border-white/5 shadow-2xl shadow-black/50">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle className="text-glow text-primary font-poppins">AURA Support Bot</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col min-h-0">
              <ContactChatbot />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <AppLifecycle>
      <ContactPageContent />
    </AppLifecycle>
  );
}
