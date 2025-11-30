import { Song } from '../types';
import { INITIAL_SONGS } from '../constants';

const STORAGE_KEY = 'moodmelody_songs_v1';

export const getSongs = (): Song[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    // Initialize with default data if empty
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SONGS));
    return INITIAL_SONGS;
  }
  return JSON.parse(stored);
};

export const saveSong = (song: Song): void => {
  const songs = getSongs();
  const existingIndex = songs.findIndex(s => s.id === song.id);
  
  if (existingIndex >= 0) {
    // Update
    songs[existingIndex] = song;
  } else {
    // Add new
    songs.push(song);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(songs));
};

export const deleteSong = (id: string): void => {
  const songs = getSongs();
  const filtered = songs.filter(s => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};