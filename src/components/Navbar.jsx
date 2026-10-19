import React, { useState } from 'react';
import { Volume2, VolumeX, Shield, BookOpen, Clock, RotateCcw } from 'lucide-react';
import { soundEngine } from '../audio/soundEffects';

export default function Navbar({
  gameState,
  onResetGame,
  onOpenAdmin,
  onOpenRules,
  remainingTime,
  activePlayer,
  onBackToLanding,
}) {
  const [isMuted, setIsMuted] = useState(soundEngine.isMuted);

  const handleToggleMute = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isTimeCritical = remainingTime <= 60 && gameState === 'playing';

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#0D213F]/85 border-b border-white/10 px-4 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand / Logo */}
        <div 
          onClick={gameState !== 'landing' ? onBackToLanding : undefined}
          className="flex items-center gap-3 cursor-pointer group"
          title="Ular Tangga Edukatif MAN"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#155293] to-[#0D47A1] p-[1.5px] shadow-md shadow-slate-950/40 group-hover:scale-105 group-hover:-translate-y-0.5 transition-all duration-300 border border-white/15">
            <div className="w-full h-full bg-[#0F2747] rounded-[10px] flex items-center justify-center text-xl">
              🪜
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base md:text-lg tracking-tight text-slate-100 group-hover:text-white transition-colors">
                ULAR TANGGA MAN
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-sky-500/15 text-sky-200 border border-sky-400/20">
                EDUKATIF
              </span>
            </div>
            <p className="text-[11px] text-slate-300/75 hidden sm:block">
              Media Pembelajaran Madrasah Aliyah Negeri
            </p>
          </div>
        </div>

        {/* Center: In-Game Status (Active Player & Main Timer) */}
        {gameState === 'playing' && (
          <div className="flex items-center gap-3 md:gap-5 bg-[#122B4D]/90 border border-white/10 rounded-full px-4 py-1.5 shadow-sm">
            {/* Active Player Indicator */}
            {activePlayer && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-300/80 hidden md:inline">Giliran:</span>
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border border-white/70 shadow-sm transition-transform duration-300"
                  style={{ backgroundColor: activePlayer.color }}
                >
                  {activePlayer.avatar || activePlayer.name.charAt(0)}
                </div>
                <span className="text-xs md:text-sm font-semibold text-slate-100 max-w-[100px] truncate">
                  {activePlayer.name}
                </span>
              </div>
            )}

            <div className="w-[1px] h-4 bg-white/15 hidden sm:block" />

            {/* Countdown Game Timer */}
            <div className={`flex items-center gap-1.5 text-xs md:text-sm font-mono font-semibold ${
              isTimeCritical ? 'text-rose-300 urgent-pulse' : 'text-amber-200/90'
            }`}>
              <Clock className={`w-4 h-4 ${isTimeCritical ? 'animate-spin' : ''}`} />
              <span>{formatTime(remainingTime)}</span>
            </div>
          </div>
        )}

        {/* Right Actions: Rules, Sound, Admin, New Game */}
        <div className="flex items-center gap-2">
          {/* Rules Button */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenRules();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-medium hover:text-white hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
            title="Panduan Aturan Main"
          >
            <BookOpen className="w-3.5 h-3.5 text-sky-300" />
            <span className="hidden md:inline">Panduan</span>
          </button>

          {/* Audio Mute/Unmute */}
          <button
            onClick={() => {
              soundEngine.playClick();
              handleToggleMute();
            }}
            className={`p-2 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 active:scale-95 ${
              isMuted
                ? 'bg-rose-500/10 border-rose-400/20 text-rose-300 hover:bg-rose-500/20'
                : 'bg-sky-500/10 border-sky-400/20 text-sky-200 hover:bg-sky-500/20'
            }`}
            title={isMuted ? 'Nyalakan Musik & Suara' : 'Bisukan Suara'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Admin Panel Button */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenAdmin();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 border border-amber-300/25 text-amber-200 text-xs font-semibold transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 active:scale-95"
            title="Masuk ke Panel Pengajar / Admin"
          >
            <Shield className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Admin Panel</span>
          </button>

          {/* In-game Reset / New Game Button */}
          {gameState === 'playing' && (
            <button
              onClick={() => {
                soundEngine.playClick();
                if (window.confirm('Apakah Anda yakin ingin mengulang permainan dari awal?')) {
                  onResetGame();
                }
              }}
              className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/15 border border-white/10 hover:border-rose-400/30 text-slate-300 hover:text-rose-200 hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
              title="Mulai Ulang Permainan"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </header>
  );
}
