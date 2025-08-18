// src/app/contact/page.tsx
'use client';

import { AppLifecycle } from '@/app/app-lifecycle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, Twitter, Instagram, Facebook } from 'lucide-react';
import { ContactChatbot } from '@/components/aura/ContactChatbot';
import { Button } from '@/components/ui/button';

function ContactPageContent() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500 w-full">
      <header className="mb-8">
        <h1 className="text-5xl font-poppins font-medium text-glow">
          Contact & Support
        </h1>
        <p className="text-muted-foreground mt-2 font-silkscreen">
          We're here to help.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column for contact info and social media */}
        <div className="lg:col-span-1 space-y-8">
          <Card className="glass-pane">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Phone className="w-6 h-6 text-primary" />
                <span>Helpline</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-mono text-foreground">
                1-800-AURA-GAM
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Available 24/7 for technical support.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-pane">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Mail className="w-6 h-6 text-primary" />
                <span>Email Support</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-mono text-foreground break-all">
                support@aura-console.com
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Get a response within 24 hours.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-pane">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Twitter className="w-6 h-6 text-primary" />
                <span>Socials</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <Button variant="outline" size="icon">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Facebook className="h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right column for the chatbot */}
        <div className="lg:col-span-2">
          <Card className="glass-pane h-[70vh] flex flex-col">
            <CardHeader>
              <CardTitle className="text-glow">AURA Support Bot</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col min-h-0">
              <ContactChatbot />
            </CardContent>
          </Card>
        </div>
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
