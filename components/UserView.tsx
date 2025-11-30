import React, { useState, useEffect } from 'react';
import { Send, Sparkles, AlertCircle } from 'lucide-react';
import { Emotion, Song } from '../types';
import { getSongs } from '../services/songService';
import { analyzeEmotion } from '../services/geminiService';
import { EMOTION_COLORS, EMOTION_EMOJIS } from '../constants';
import SongCard from './SongCard';
import Button from './Button';

const UserView: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectedEmotion, setDetectedEmotion] = useState<Emotion | null>(null);
  const [recommendedSongs, setRecommendedSongs] = useState<Song[]>([]);
  const [allSongs, setAllSongs] = useState<Song[]>([]);

  // Load songs on mount
  useEffect(() => {
    setAllSongs(getSongs());
  }, []);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsAnalyzing(true);
    setDetectedEmotion(null);
    setRecommendedSongs([]);

    try {
      const emotion = await analyzeEmotion(inputText);
      setDetectedEmotion(emotion);
      
      // Filter songs based on emotion
      const filtered = allSongs.filter(s => s.emotion === emotion);
      setRecommendedSongs(filtered);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          How are you <span className="text-indigo-500">feeling</span>?
        </h2>
        <p className="text-slate-400 text-lg">
          Describe your mood, and our AI will curate the perfect playlist for you.
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-slate-800/50 p-1 rounded-2xl shadow-2xl border border-slate-700 mb-12 backdrop-blur-sm">
        <form onSubmit={handleAnalyze} className="relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="I'm feeling stressed about exams and just need to chill..."
            className="w-full bg-slate-900/50 text-white rounded-xl p-4 pr-32 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 border-none resize-none h-32 placeholder-slate-500"
          />
          <div className="absolute bottom-4 right-4">
            <Button 
              type="submit" 
              isLoading={isAnalyzing} 
              disabled={!inputText.trim()}
              className="rounded-full px-6"
            >
              {isAnalyzing ? 'Thinking...' : (
                <>
                  Analyze <Sparkles size={16} className="ml-2" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Results Section */}
      {detectedEmotion && (
        <div className="animate-fade-in-up">
          <div className="flex items-center gap-4 mb-6">
            <div className={`p-3 rounded-xl ${EMOTION_COLORS[detectedEmotion]} bg-opacity-20 text-3xl`}>
              {EMOTION_EMOJIS[detectedEmotion]}
            </div>
            <div>
              <p className="text-slate-400 text-sm uppercase tracking-wider font-semibold">Detected Mood</p>
              <h3 className="text-2xl font-bold text-white">{detectedEmotion}</h3>
            </div>
          </div>

          {recommendedSongs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedSongs.map(song => (
                <SongCard key={song.id} song={song} />
              ))}
            </div>
          ) : (
            <div className="bg-slate-800/30 rounded-xl p-8 text-center border border-dashed border-slate-700">
              <AlertCircle className="mx-auto h-12 w-12 text-slate-500 mb-3" />
              <p className="text-slate-400">No songs found for this specific mood in the database.</p>
              <p className="text-slate-500 text-sm mt-2">Try adding some via the Admin Dashboard!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserView;