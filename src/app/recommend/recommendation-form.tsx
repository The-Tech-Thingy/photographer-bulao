'use client';

import { useActionState } from 'react';
import { handleRecommendation } from './actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Sparkles } from 'lucide-react';
import { Label } from '@/components/ui/label';

export function RecommendationForm() {
  const [state, formAction, isPending] = useActionState(handleRecommendation, null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Describe Your Photoshoot</CardTitle>
        <CardDescription>
          Tell us about your event, the style you like, number of people, duration, etc.
          The more details, the better the recommendation!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="userInput">Your requirements</Label>
            <Textarea
              id="userInput"
              name="userInput"
              placeholder="e.g., 'I need a photographer for my small, outdoor wedding in the afternoon. I prefer a candid, photojournalistic style. Around 50 guests.'"
              rows={5}
              required
            />
          </div>
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
                'Get Recommendation'
            )}
          </Button>
        </form>

        {state?.error && (
            <Alert variant="destructive" className="mt-4">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
            </Alert>
        )}

        {state?.recommendedPackages && (
          <div className="mt-6">
            <h3 className="text-xl font-bold font-headline flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-primary"/>
                Our Recommendation
            </h3>
            <Card className="bg-secondary">
                <CardContent className="p-6">
                     <div className="prose prose-sm max-w-none text-foreground dark:prose-invert" dangerouslySetInnerHTML={{ __html: state.recommendedPackages.replace(/\n/g, '<br />') }} />
                </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
