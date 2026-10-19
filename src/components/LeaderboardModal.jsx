import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Crown, RotateCcw, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { soundEngine } from '../audio/soundEffects';

export default function LeaderboardModal({
  isOpen,
  players,
  onResetGame,
}) {
  // Trigger celebration confetti unconditionally via Hook
  useEffect(() => {
    if (!isOpen) return;

    soundEngine.playVictory();
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FCD34D', '#38BDF8', '#1976D2', '#F8FAFC'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FCD34D', '#38BDF8', '#1976D2', '#F8FAFC'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, [isOpen]);

  if (!isOpen) return null;

  // Sort players by position descending, ties broken by correct answers
  const sortedPlayers = [...players].sort((a, b) => {
    if (b.position !== a.position) {
      return b.position - a.position;
    }
    return b.correctAnswers - a.correctAnswers;
  });

  const winner = sortedPlayers[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#081322]/80 backdrop-blur-md animate-in fade-in duration-300 islamic-pattern">
      <div className="relative w-full max-w-2xl bg-[#102544] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-slate-950/80 text-center flex flex-col items-center">
        
        {/* Subtle Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* Trophy Icon & Title */}
        <div className="relative mb-3">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-400/15 border border-amber-300/35 shadow-lg flex items-center justify-center animate-bounce">
            <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-amber-300" />
          </div>
          <Crown className="w-7 h-7 text-amber-300 absolute -top-3 -right-2 rotate-12" />
        </div>

        <span className="text-xs font-semibold text-amber-200 uppercase tracking-widest flex items-center gap-1.5 mb-1">
          <Sparkles className="w-3.5 h-3.5" /> Papan Peringkat Akhir Permainan
        </span>

        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 mb-2">
          {winner.position >= 100 ? 'SELAMAT KEPADA JUARA!' : 'WAKTU PERMAINAN SELESAI!'}
        </h2>

        <p className="text-xs sm:text-sm text-slate-300/85 max-w-md mb-6">
          {winner.position >= 100
            ? `${winner.name} berhasil menjadi yang tercepat mencapai puncak kotak ke-100!`
            : `Pertandingan berakhir berdasarkan batas durasi. Pemenang ditentukan dari kotak terjauh yang diraih.`}
        </p>

        {/* Podium / Leaderboard List */}
        <div className="w-full space-y-2.5 mb-8">
          {sortedPlayers.map((player, idx) => {
            const isFirst = idx === 0;
            const accuracy =
              player.totalRolls > 0
                ? Math.round((player.correctAnswers / (player.correctAnswers + player.wrongAnswers || 1)) * 100)
                : 0;

            return (
              <div
                key={player.id}
                className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-between gap-3 ${
                  isFirst
                    ? 'bg-amber-400/12 border-amber-300/35 shadow-md'
                    : 'bg-[#152E52]/65 border-white/10'
                }`}
              >
                {/* Rank & Profile */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0">
                    {idx === 0 ? (
                      <span className="text-xl">🥇</span>
                    ) : idx === 1 ? (
                      <span className="text-xl">🥈</span>
                    ) : idx === 2 ? (
                      <span className="text-xl">🥉</span>
                    ) : (
                      <span className="text-sm text-slate-400 font-semibold">#{idx + 1}</span>
                    )}
                  </div>

                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border border-white/75 shadow-sm"
                    style={{ backgroundColor: player.color }}
                  >
                    {player.avatar || player.name.charAt(0)}
                  </div>

                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm sm:text-base text-slate-100">
                        {player.name}
                      </span>
                      {isFirst && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-300/25 text-amber-200 border border-amber-300/30">
                          JUARA 1
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-300/80 flex items-center gap-3 mt-0.5">
                      <span className="flex items-center gap-1 text-emerald-300 font-medium">
                        <CheckCircle2 className="w-3 h-3" /> {player.correctAnswers} Benar
                      </span>
                      <span className="flex items-center gap-1 text-rose-300">
                        <XCircle className="w-3 h-3" /> {player.wrongAnswers} Salah
                      </span>
                    </div>
                  </div>
                </div>

                {/* Score & Tile Position */}
                <div className="text-right">
                  <div className="text-base sm:text-xl font-bold text-amber-200">
                    Kotak {player.position}
                  </div>
                  <div className="text-[10px] text-slate-300/75">
                    Akurasi Kuis: {accuracy}%
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Big Reset / Start New Game Button */}
        <button
          type="button"
          onClick={() => {
            soundEngine.playClick();
            onResetGame();
          }}
          className="w-full max-w-sm py-4 px-8 rounded-2xl bg-gradient-to-r from-[#0D47A1] to-[#1976D2] hover:from-[#1565C0] hover:to-[#0288D1] text-white font-bold text-lg shadow-lg shadow-blue-950/50 hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 border border-sky-300/25"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Mulai Permainan Baru</span>
        </button>

      </div>
    </div>
  );
}
