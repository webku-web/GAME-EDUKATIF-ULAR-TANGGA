import React, { useState } from 'react';
import { Users, Clock, ArrowRight, ArrowLeft, Sparkles, User } from 'lucide-react';
import { soundEngine } from '../audio/soundEffects';

const AVAILABLE_AVATARS = ['👨‍🎓', '🧕', '🧑‍🎓', '👩‍🎓', '🌟', '🦅', '🎯', '⚡'];
const PRESET_COLORS = [
  '#38BDF8', // Soft Sky Blue
  '#FBBF24', // Warm Gold
  '#34D399', // Soft Emerald
  '#F472B6', // Soft Rose
  '#A78BFA', // Soft Lavender
  '#FB923C', // Soft Coral Orange
];

export default function GameSetup({ onStart, onBack }) {
  const [playerCount, setPlayerCount] = useState(2);
  const [durationMinutes, setDurationMinutes] = useState(10);

  const [players, setPlayers] = useState([
    { name: 'Siswa Ahmad', color: '#38BDF8', avatar: '👨‍🎓' },
    { name: 'Siti Fatimah', color: '#FBBF24', avatar: '🧕' },
    { name: 'Muhammad Ali', color: '#34D399', avatar: '🧑‍🎓' },
    { name: 'Aisyah Putri', color: '#F472B6', avatar: '👩‍🎓' },
  ]);

  const handlePlayerCountChange = (count) => {
    soundEngine.playClick();
    setPlayerCount(count);
  };

  const handleDurationChange = (mins) => {
    soundEngine.playClick();
    setDurationMinutes(mins);
  };

  const updatePlayer = (index, field, value) => {
    setPlayers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    soundEngine.playClick();
    const activePlayers = players.slice(0, playerCount);
    onStart(activePlayers, durationMinutes);
  };

  return (
    <div className="min-h-[calc(100vh-65px)] flex items-center justify-center px-4 py-8 islamic-pattern">
      <div className="w-full max-w-3xl bg-[#102544]/90 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl shadow-slate-950/60">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
          <div>
            <span className="text-xs font-semibold text-sky-300 uppercase tracking-widest flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Konfigurasi Pertandingan
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
              Persiapan Sebelum Bermain
            </h2>
          </div>
          <button
            onClick={() => {
              soundEngine.playClick();
              onBack();
            }}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white hover:-translate-x-0.5 active:scale-95 transition-all duration-200 border border-white/10"
            title="Kembali"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Durasi Permainan */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-200 mb-3">
              <Clock className="w-4 h-4 text-amber-300" />
              <span>Pilih Durasi Waktu Permainan:</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[5, 10, 15, 20].map((mins) => (
                <button
                  type="button"
                  key={mins}
                  onClick={() => handleDurationChange(mins)}
                  className={`p-3.5 rounded-2xl border text-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95 ${
                    durationMinutes === mins
                      ? 'bg-gradient-to-br from-[#0D47A1] to-[#1976D2] border-sky-300/40 text-white font-bold shadow-md shadow-blue-950/50 scale-[1.02]'
                      : 'bg-[#152E52]/70 border-white/10 text-slate-300 hover:bg-[#1A3863]/80 font-medium'
                  }`}
                >
                  <div className="text-xl font-bold">{mins} Menit</div>
                  <div className="text-[11px] opacity-80 mt-0.5">
                    {mins === 5 ? '⚡ Cepat' : mins === 10 ? '⭐ Standar' : mins === 15 ? '🎯 Santai' : '🏆 Lengkap'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Jumlah Pemain */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-200 mb-3">
              <Users className="w-4 h-4 text-sky-300" />
              <span>Jumlah Pemain (2 - 4 Siswa):</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[2, 3, 4].map((count) => (
                <button
                  type="button"
                  key={count}
                  onClick={() => handlePlayerCountChange(count)}
                  className={`py-3 px-4 rounded-2xl border text-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95 ${
                    playerCount === count
                      ? 'bg-gradient-to-br from-[#0D47A1] to-[#1976D2] border-sky-300/40 text-white font-bold shadow-md shadow-blue-950/50 scale-[1.02]'
                      : 'bg-[#152E52]/70 border-white/10 text-slate-300 hover:bg-[#1A3863]/80 font-medium'
                  }`}
                >
                  <span className="text-lg font-bold">{count} Pemain</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Data Pemain */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-200 mb-3">
              <User className="w-4 h-4 text-emerald-300" />
              <span>Profil & Nama Pemain:</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: playerCount }).map((_, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#152E52]/65 border border-white/10 hover:border-white/20 transition-all duration-200 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-300/80">Pemain #{idx + 1}</span>
                    <div 
                      className="w-5 h-5 rounded-full border border-white/60 shadow-sm transition-colors duration-200"
                      style={{ backgroundColor: players[idx].color }}
                    />
                  </div>

                  {/* Input Nama */}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      required
                      value={players[idx].name}
                      onChange={(e) => updatePlayer(idx, 'name', e.target.value)}
                      placeholder={`Nama Siswa ${idx + 1}`}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0C1D36]/90 border border-white/15 text-slate-100 font-medium text-sm focus:outline-none focus:border-sky-300/60 transition-all"
                      maxLength={18}
                    />
                  </div>

                  {/* Pilihan Avatar & Warna */}
                  <div className="flex items-center justify-between pt-1">
                    {/* Avatar selector */}
                    <div className="flex items-center gap-1">
                      {AVAILABLE_AVATARS.slice(idx * 2, idx * 2 + 3).map((av) => (
                        <button
                          type="button"
                          key={av}
                          onClick={() => {
                            soundEngine.playClick();
                            updatePlayer(idx, 'avatar', av);
                          }}
                          className={`w-8 h-8 rounded-lg text-base flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                            players[idx].avatar === av
                              ? 'bg-[#1976D2] border border-sky-300/50 scale-110 shadow-sm'
                              : 'bg-[#0C1D36]/70 hover:bg-[#193866] text-slate-300'
                          }`}
                        >
                          {av}
                        </button>
                      ))}
                    </div>

                    {/* Color selector */}
                    <div className="flex items-center gap-1.5">
                      {PRESET_COLORS.map((col) => (
                        <button
                          type="button"
                          key={col}
                          onClick={() => {
                            soundEngine.playClick();
                            updatePlayer(idx, 'color', col);
                          }}
                          className={`w-5 h-5 rounded-full transition-transform duration-200 ${
                            players[idx].color === col ? 'scale-125 ring-2 ring-white/80 ring-offset-2 ring-offset-[#102544]' : 'opacity-75 hover:opacity-100 hover:scale-110'
                          }`}
                          style={{ backgroundColor: col }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-4 flex items-center justify-end gap-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                onBack();
              }}
              className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5"
            >
              Batal
            </button>
            <button
              type="submit"
              className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#0D47A1] to-[#1976D2] hover:from-[#1565C0] hover:to-[#0288D1] text-white font-bold text-base shadow-lg shadow-blue-950/50 hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 border border-sky-300/25"
            >
              <span>Masuk ke Arena Permainan</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
