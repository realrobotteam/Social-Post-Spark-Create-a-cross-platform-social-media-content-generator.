
import React, { useState, useCallback } from 'react';
import { InputForm } from './components/InputForm';
import { PostCard } from './components/PostCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { generateSocialPosts, generateImage } from './services/geminiService';
import { Tone, GeneratedPost, Platform, SocialPostResponse } from './types';
import { PLATFORM_CONFIGS } from './constants';

const App: React.FC = () => {
    const [idea, setIdea] = useState<string>('');
    const [tone, setTone] = useState<Tone>(Tone.Professional);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<GeneratedPost[]>([]);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!idea.trim()) {
            setError("Please enter a content idea.");
            return;
        }
        setLoading(true);
        setError(null);
        setResults([]);

        try {
            const textResponse = await generateSocialPosts(idea, tone);

            const platforms = [Platform.LinkedIn, Platform.Twitter, Platform.Instagram];
            const imageGenerationPromises = platforms.map(p => {
                const config = PLATFORM_CONFIGS[p];
                const imagePrompt = `A high-quality, visually appealing image for a social media post about "${idea}". ${config.promptEnhancement}. Avoid text in the image.`;
                return generateImage(imagePrompt, config.aspectRatio);
            });

            const imageUrls = await Promise.all(imageGenerationPromises);

            const platformKeys: Record<Platform, keyof SocialPostResponse> = {
                [Platform.LinkedIn]: 'linkedin',
                [Platform.Twitter]: 'twitter',
                [Platform.Instagram]: 'instagram',
            };

            const newResults: GeneratedPost[] = platforms.map((p, index) => ({
                platform: p,
                text: textResponse[platformKeys[p]].postText,
                imageUrl: imageUrls[index]
            }));

            setResults(newResults);

        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    }, [idea, tone]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white font-sans p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto">
                <header className="text-center mb-8 md:mb-12">
                    <div className="flex justify-center items-center gap-3">
                         <SparklesIcon className="w-10 h-10 text-purple-400" />
                         <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                            Social Post Spark
                         </h1>
                    </div>
                    <p className="mt-3 text-lg text-gray-300 max-w-2xl mx-auto">
                        Instantly generate tailored content with AI-powered images for all your social platforms.
                    </p>
                </header>

                <main>
                    <InputForm
                        idea={idea}
                        setIdea={setIdea}
                        tone={tone}
                        setTone={setTone}
                        handleSubmit={handleSubmit}
                        loading={loading}
                    />

                    {error && (
                        <div className="mt-8 text-center bg-red-500/20 text-red-300 p-4 rounded-lg max-w-2xl mx-auto">
                            <p><strong>Error:</strong> {error}</p>
                        </div>
                    )}

                    {loading && (
                        <div className="mt-12 flex flex-col items-center justify-center gap-4">
                            <LoadingSpinner />
                            <p className="text-lg text-purple-300 animate-pulse">Generating your content... this may take a moment.</p>
                        </div>
                    )}

                    {results.length > 0 && (
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {results.map((result) => (
                                <PostCard
                                    key={result.platform}
                                    platformConfig={PLATFORM_CONFIGS[result.platform]}
                                    text={result.text}
                                    imageUrl={result.imageUrl}
                                />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default App;
