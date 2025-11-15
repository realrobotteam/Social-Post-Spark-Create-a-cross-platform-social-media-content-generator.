import React from 'react';
import { Platform, Tone, PlatformConfig } from './types';
import { LinkedInIcon } from './components/icons/LinkedInIcon';
import { TwitterIcon } from './components/icons/TwitterIcon';
import { InstagramIcon } from './components/icons/InstagramIcon';

export const TONES: Tone[] = [Tone.Professional, Tone.Witty, Tone.Urgent, Tone.Casual];

export const PLATFORM_CONFIGS: Record<Platform, PlatformConfig> = {
  [Platform.LinkedIn]: {
    name: Platform.LinkedIn,
    icon: LinkedInIcon,
    aspectRatio: '1:1',
    promptEnhancement: 'A professional and clean square image suitable for a corporate audience.'
  },
  [Platform.Twitter]: {
    name: Platform.Twitter,
    icon: TwitterIcon,
    aspectRatio: '16:9',
    promptEnhancement: 'An eye-catching and dynamic image, perfect for a fast-paced feed.'
  },
  [Platform.Instagram]: {
    name: Platform.Instagram,
    icon: InstagramIcon,
    aspectRatio: '9:16',
    promptEnhancement: 'A vibrant and visually aesthetic vertical image, ideal for engaging an audience on mobile.'
  },
};
