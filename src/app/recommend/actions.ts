'use server';

import { recommendPackages, type PackageRecommendationInput } from '@/ai/flows/package-recommendation';

export async function handleRecommendation(
    prevState: {
        recommendedPackages: string;
        error: string | null;
    } | null,
    formData: FormData
) {
    const userInput = formData.get('userInput') as string;

    if (!userInput || userInput.trim().length < 10) {
        return {
            recommendedPackages: '',
            error: 'Please provide a more detailed description of your needs (at least 10 characters).'
        };
    }

    try {
        const input: PackageRecommendationInput = { userInput };
        const result = await recommendPackages(input);
        
        return {
            recommendedPackages: result.recommendedPackages,
            error: null
        };
    } catch (e) {
        console.error(e);
        return {
            recommendedPackages: '',
            error: 'An unexpected error occurred. Please try again later.'
        };
    }
}
