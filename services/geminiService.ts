import { GoogleGenAI, Type } from "@google/genai";
import type { SocialPostResponse, AspectRatio } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const textModel = 'gemini-2.5-flash';
const imageModel = 'imagen-4.0-generate-001';

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        linkedin: {
            type: Type.OBJECT,
            properties: {
                postText: {
                    type: Type.STRING,
                    description: "A long-form, detailed post for LinkedIn, including professional language and relevant hashtags."
                }
            },
            required: ['postText']
        },
        twitter: {
            type: Type.OBJECT,
            properties: {
                postText: {
                    type: Type.STRING,
                    description: "A short, punchy, and concise post for Twitter/X, under 280 characters, with 1-2 relevant hashtags."
                }
            },
            required: ['postText']
        },
        instagram: {
            type: Type.OBJECT,
            properties: {
                postText: {
                    type: Type.STRING,
                    description: "An engaging Instagram caption with a strong call-to-action and a block of 5-10 relevant hashtags."
                }
            },
            required: ['postText']
        }
    },
    required: ['linkedin', 'twitter', 'instagram']
};

export const generateSocialPosts = async (idea: string, tone: string): Promise<SocialPostResponse> => {
    const prompt = `
    Based on the following idea, generate social media posts for LinkedIn, Twitter/X, and Instagram.
    The tone of the posts should be ${tone}.

    Idea: "${idea}"

    Provide the response as a JSON object that matches the specified schema.
    - LinkedIn: A detailed, professional post.
    - Twitter/X: A short, catchy post.
    - Instagram: A visually-focused caption with many relevant hashtags.
    `;

    try {
        const response = await ai.models.generateContent({
            model: textModel,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });

        const jsonString = response.text.trim();
        const parsedResponse: SocialPostResponse = JSON.parse(jsonString);
        return parsedResponse;
    } catch (error) {
        console.error("Error generating social posts:", error);
        throw new Error("Failed to generate post content. The AI model might be unable to generate content for the provided idea.");
    }
};

export const generateImage = async (prompt: string, aspectRatio: AspectRatio): Promise<string> => {
    try {
        const response = await ai.models.generateImages({
            model: imageModel,
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: aspectRatio,
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes = response.generatedImages[0].image.imageBytes;
            return `data:image/jpeg;base64,${base64ImageBytes}`;
        } else {
            throw new Error("No image was generated.");
        }
    } catch (error) {
        console.error(`Error generating image with aspect ratio ${aspectRatio}:`, error);
        throw new Error(`Failed to generate an image for the post. Aspect Ratio: ${aspectRatio}.`);
    }
};
