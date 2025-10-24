import { RecommendationForm } from './recommendation-form';
import { Bot } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'AI Assistant',
    description: 'Not sure which service to choose? Describe your needs, and our AI will suggest the perfect fit for you.',
}

export default function RecommendPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <header className="flex flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
            <Bot className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold font-headline">AI Assistant</h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-xl">
          Not sure which service to choose? Describe your needs, and our AI will suggest the perfect fit for you.
        </p>
      </header>
      <div className="mt-8">
        <RecommendationForm />
      </div>
    </div>
  );
}
