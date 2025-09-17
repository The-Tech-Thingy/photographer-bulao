import { RecommendationForm } from './recommendation-form';
import { Bot } from 'lucide-react';

export default function RecommendPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
            <Bot className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold font-headline">Smart Package Recommendation</h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-xl">
          Not sure which package to choose? Describe your needs, and our AI will suggest the perfect fit for you.
        </p>
      </div>
      <div className="mt-8">
        <RecommendationForm />
      </div>
    </div>
  );
}
