
import React from 'react';
import { Tone } from '../types';
import { TONES } from '../constants';
import { LoadingSpinner } from './LoadingSpinner';

interface InputFormProps {
  idea: string;
  setIdea: (idea: string) => void;
  tone: Tone;
  setTone: (tone: Tone) => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ idea, setIdea, tone, setTone, handleSubmit, loading }) => {
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-6 bg-white/5 p-6 rounded-2xl border border-white/10 shadow-lg">
      <div>
        <label htmlFor="idea" className="block text-lg font-medium text-gray-200 mb-2">
          Content Idea
        </label>
        <textarea
          id="idea"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="e.g., Launching a new productivity app..."
          className="w-full h-28 p-3 bg-gray-800/50 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
          required
        />
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-200 mb-2">
          Tone of Voice
        </label>
        <div className="flex flex-wrap gap-3">
          {TONES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTone(t)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                tone === t
                  ? 'bg-purple-600 text-white shadow-lg ring-2 ring-purple-400'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        {loading ? (
            <>
                <LoadingSpinner />
                <span className="ml-2">Generating...</span>
            </>
        ) : (
          '✨ Spark Content'
        )}
      </button>
    </form>
  );
};
