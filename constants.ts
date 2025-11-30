import { Song, Emotion } from './types';

export const INITIAL_SONGS: Song[] = [
  {
    id: '1',
    title: 'Happy',
    artist: 'Pharrell Williams',
    url: 'https://www.youtube.com/watch?v=ZbZSe6N_BXs',
    emotion: Emotion.Happy,
  },
  {
    id: '2',
    title: 'Can\'t Stop the Feeling!',
    artist: 'Justin Timberlake',
    url: 'https://www.youtube.com/watch?v=ru0K8uYEZWw',
    emotion: Emotion.Happy,
  },
  {
    id: '3',
    title: 'Someone Like You',
    artist: 'Adele',
    url: 'https://www.youtube.com/watch?v=hLQl3WQQoQ0',
    emotion: Emotion.Sad,
  },
  {
    id: '4',
    title: 'Fix You',
    artist: 'Coldplay',
    url: 'https://www.youtube.com/watch?v=k4V3Mo61fJM',
    emotion: Emotion.Sad,
  },
  {
    id: '5',
    title: 'Break Stuff',
    artist: 'Limp Bizkit',
    url: 'https://www.youtube.com/watch?v=ZpUYjpKg9KY',
    emotion: Emotion.Angry,
  },
  {
    id: '6',
    title: 'Weightless',
    artist: 'Marconi Union',
    url: 'https://www.youtube.com/watch?v=UfcAVejslrU',
    emotion: Emotion.Relaxed,
  },
  {
    id: '7',
    title: 'Lo-Fi Beats to Study To',
    artist: 'Lofi Girl',
    url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
    emotion: Emotion.Relaxed,
  },
  {
    id: '8',
    title: 'Eye of the Tiger',
    artist: 'Survivor',
    url: 'https://www.youtube.com/watch?v=btPJPFnesV4',
    emotion: Emotion.Energetic,
  },
  {
    id: '9',
    title: 'Uptown Funk',
    artist: 'Mark Ronson ft. Bruno Mars',
    url: 'https://www.youtube.com/watch?v=OPf0YbXqDm0',
    emotion: Emotion.Energetic,
  }
];

export const EMOTION_COLORS: Record<Emotion, string> = {
  [Emotion.Happy]: 'bg-yellow-500',
  [Emotion.Sad]: 'bg-blue-600',
  [Emotion.Angry]: 'bg-red-600',
  [Emotion.Relaxed]: 'bg-teal-500',
  [Emotion.Energetic]: 'bg-purple-600',
  [Emotion.Neutral]: 'bg-gray-500',
};

export const EMOTION_EMOJIS: Record<Emotion, string> = {
  [Emotion.Happy]: '😄',
  [Emotion.Sad]: '😢',
  [Emotion.Angry]: '😡',
  [Emotion.Relaxed]: '😌',
  [Emotion.Energetic]: '⚡',
  [Emotion.Neutral]: '😐',
};