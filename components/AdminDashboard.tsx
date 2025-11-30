import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, X, Save, Music } from 'lucide-react';
import { Song, Emotion } from '../types';
import { getSongs, saveSong, deleteSong } from '../services/songService';
import { EMOTION_COLORS } from '../constants';
import Button from './Button';

const AdminDashboard: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSong, setEditingSong] = useState<Song | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Song>>({
    title: '',
    artist: '',
    url: '',
    emotion: Emotion.Happy
  });

  useEffect(() => {
    refreshSongs();
  }, []);

  const refreshSongs = () => {
    setSongs(getSongs());
  };

  const handleOpenModal = (song?: Song) => {
    if (song) {
      setEditingSong(song);
      setFormData(song);
    } else {
      setEditingSong(null);
      setFormData({ emotion: Emotion.Happy });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.artist || !formData.url || !formData.emotion) return;

    const newSong: Song = {
      id: editingSong ? editingSong.id : Date.now().toString(),
      title: formData.title,
      artist: formData.artist,
      url: formData.url,
      emotion: formData.emotion,
    };

    saveSong(newSong);
    setIsModalOpen(false);
    refreshSongs();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this song?')) {
      deleteSong(id);
      refreshSongs();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white">Song Database</h2>
          <p className="text-slate-400">Manage the music library for recommendations.</p>
        </div>
        <Button onClick={() => handleOpenModal()}>
          <Plus className="mr-2 h-4 w-4" /> Add Song
        </Button>
      </div>

      {/* Song List Table */}
      <div className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/50 border-b border-slate-700 text-slate-400 text-sm uppercase">
                <th className="p-4 font-semibold">Title</th>
                <th className="p-4 font-semibold">Artist</th>
                <th className="p-4 font-semibold">Emotion</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {songs.map(song => (
                <tr key={song.id} className="hover:bg-slate-700/30 transition-colors">
                  <td className="p-4 font-medium text-white">{song.title}</td>
                  <td className="p-4 text-slate-300">{song.artist}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${EMOTION_COLORS[song.emotion]}`}>
                      {song.emotion}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button 
                      onClick={() => handleOpenModal(song)}
                      className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(song.id)}
                      className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {songs.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500">
                    No songs found. Add some to get started!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-800 rounded-2xl w-full max-w-md border border-slate-700 shadow-2xl animate-fade-in-up">
            <div className="p-6 border-b border-slate-700 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">
                {editingSong ? 'Edit Song' : 'Add New Song'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Song Title</label>
                <input
                  required
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g. Happy"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Artist</label>
                <input
                  required
                  type="text"
                  value={formData.artist}
                  onChange={(e) => setFormData({...formData, artist: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g. Pharrell Williams"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Emotion Category</label>
                <select
                  value={formData.emotion}
                  onChange={(e) => setFormData({...formData, emotion: e.target.value as Emotion})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-indigo-500 outline-none appearance-none"
                >
                  {Object.values(Emotion).filter(e => e !== Emotion.Neutral).map((e) => (
                    <option key={e} value={e}>{e}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">YouTube/Spotify URL</label>
                <input
                  required
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({...formData, url: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="https://..."
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit">
                  <Save size={16} className="mr-2" /> Save Song
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;