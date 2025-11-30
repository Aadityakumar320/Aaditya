import React from 'react';
import { Play, ExternalLink, Music2 } from 'lucide-react';
import { Song, Emotion } from '../types';
import { EMOTION_COLORS, EMOTION_EMOJIS } from '../constants';

interface SongCardProps {
  song: Song;
}

const SongCard: React.FC<SongCardProps> = ({ song }) => {
  return (
    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 hover:border-slate-500 transition-all hover:shadow-lg hover:shadow-indigo-500/10 group flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Thumbnail Placeholder */}
        <div className={`h-12 w-12 rounded-full flex items-center justify-center ${EMOTION_COLORS[song.emotion]} bg-opacity-20 text-xl shadow-inner`}>
          {EMOTION_EMOJIS[song.emotion]}
        </div>
        
        <div>
          <h3 className="font-semibold text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-1">
            {song.title}
          </h3>
          <p className="text-sm text-slate-400 flex items-center gap-1">
            <Music2 size={12} />
            {song.artist}
          </p>
        </div>
      </div>

      <a 
        href={song.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="p-3 rounded-full bg-slate-700 text-slate-300 hover:bg-indigo-600 hover:text-white transition-all transform hover:scale-110"
        title="Play on Platform"
      >
        <Play size={20} fill="currentColor" />
      </a>
    </div>
  );
};

export default SongCard;