import type { ComponentType } from 'react';

export enum Tone {
  Professional = 'Professional',
  Witty = 'Witty',
  Urgent = 'Urgent',
  Casual = 'Casual',
}

export enum Platform {
  LinkedIn = 'LinkedIn',
  Twitter = 'Twitter / X',
  Instagram = 'Instagram',
}

export type AspectRatio = "1:1" | "4:3" | "3:4" | "16:9" | "9:16";

export interface PlatformConfig {
  name: Platform;
  // FIX: Import `ComponentType` from `react` to resolve the missing namespace error.
  icon: ComponentType<{ className?: string }>;
  aspectRatio: AspectRatio;
  promptEnhancement: string;
}

export interface SocialPostContent {
    postText: string;
}

export interface SocialPostResponse {
  linkedin: SocialPostContent;
  twitter: SocialPostContent;
  instagram: SocialPostContent;
}

export interface GeneratedPost {
  platform: Platform;
  text: string;
  imageUrl: string;
}
