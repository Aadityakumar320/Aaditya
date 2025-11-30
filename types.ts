export enum Emotion {
  Happy = 'Happy',
  Sad = 'Sad',
  Angry = 'Angry',
  Relaxed = 'Relaxed',
  Energetic = 'Energetic',
  Neutral = 'Neutral' // Fallback
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  url: string;
  emotion: Emotion;
  thumbnail?: string; // Optional, can be derived or placeholder
}

export type ViewState = 'USER' | 'ADMIN_LOGIN' | 'ADMIN_DASHBOARD';

export interface AdminCredentials {
  username: string;
  passwordHash: string; // Storing hash simulated
}