
import React, { useState } from 'react';
import { PlatformConfig } from '../types';

interface PostCardProps {
  platformConfig: PlatformConfig;
  text: string;
  imageUrl: string;
}

export const PostCard: React.FC<PostCardProps> = ({ platformConfig, text, imageUrl }) => {
  const [copied, setCopied] = useState(false);
  const Icon = platformConfig.icon;

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-white/20 transform hover:scale-[1.02] transition-transform duration-300 ease-in-out flex flex-col">
      <div className="relative w-full" style={{ aspectRatio: platformConfig.aspectRatio.replace(':', ' / ') }}>
        {imageUrl ? (
          <img src={imageUrl} alt={`Generated for ${platformConfig.name}`} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-gray-800 animate-pulse"></div>
        )}
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <Icon className="w-6 h-6 text-gray-300" />
          <h3 className="font-bold text-xl text-white">{platformConfig.name}</h3>
        </div>
        <p className="text-gray-300 whitespace-pre-wrap text-sm flex-grow">
          {text}
        </p>
        <button
          onClick={handleCopy}
          className="mt-4 w-full bg-purple-600/50 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-600/80 transition-colors"
        >
          {copied ? 'Copied!' : 'Copy Text'}
        </button>
      </div>
    </div>
  );
};
