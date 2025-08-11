import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
      <header className="mb-8">
        <h1 className="text-5xl font-headline font-bold text-glow">
          Settings
        </h1>
        <p className="text-muted-foreground mt-2">
          Customize your AURA experience.
        </p>
      </header>
      <Card className="glass-pane">
        <CardHeader>
          <CardTitle>Personalization</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Settings page is currently under development. More customization options coming soon!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
