import React, { useEffect, useRef } from 'react';
import { Clock, CheckCircle2, XCircle, AlertTriangle, ArrowRight, BookOpen } from 'lucide-react';
import { soundEngine } from '../audio/soundEffects';

export default function QuizModal({
  isOpen,
  activePlayer,
  question,
  timer,
  result, // null | 'correct' | 'wrong' | 'timeout'
  selectedOption,
  diceValue,
  specialMoveInfo, // { type: 'ladder' | 'snake', from, to }
  onSubmitAnswer,
  onProceed,
}) {
  const scrollContainerRef = useRef(null);
  const resultSectionRef = useRef(null);

  // Reset scroll to top when a new question opens
  useEffect(() => {
    if (isOpen && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [isOpen, question?.id]);

  // Smoothly scroll down to result & explanation when answered or timed out
  useEffect(() => {
    if (result !== null && resultSectionRef.current) {
      resultSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [result]);

  if (!isOpen || !question) return null;

  const isAnswered = result !== null;
  const isTimeCritical = timer <= 5 && !isAnswered;

  // Option letter indicators
  const letters = ['A', 'B', 'C', 'D'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#081322]/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[86vh] bg-[#102544] border border-white/15 rounded-3xl p-5 sm:p-7 shadow-2xl shadow-slate-950/80 flex flex-col overflow-hidden">
        
        {/* Subtle background glow effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-400/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-400/6 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Top Header (Sticky/Fixed at Top) */}
        <div className="shrink-0 flex items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
          {/* Active Player Tag */}
          <div className="flex items-center gap-2.5">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border border-white/75 shadow-sm"
              style={{ backgroundColor: activePlayer?.color }}
            >
              {activePlayer?.avatar || activePlayer?.name?.charAt(0)}
            </div>
            <div>
              <div className="text-[10px] text-slate-300/75 font-semibold uppercase tracking-wider">
                Giliran Menjawab
              </div>
              <div className="text-sm font-bold text-slate-100">
                {activePlayer?.name}
              </div>
            </div>
          </div>

          {/* 15-Second Countdown Timer */}
          <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all duration-300 ${
            isAnswered
              ? 'bg-white/5 border-white/10 text-slate-400'
              : isTimeCritical
              ? 'bg-rose-500/20 border-rose-400/40 text-rose-200 urgent-pulse'
              : 'bg-sky-500/15 border-sky-300/25 text-sky-200'
          }`}>
            <Clock className={`w-4 h-4 ${isTimeCritical ? 'animate-spin' : ''}`} />
            <span className="font-mono text-base font-bold">
              {timer}s
            </span>
          </div>
        </div>

        {/* Scrollable Content Area for Question, Options, Feedback & Explanation */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto pr-1.5 space-y-5 scroll-smooth"
        >
          {/* Question Category & Text */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-500/15 border border-sky-400/20 text-sky-200 text-xs font-semibold">
              <BookOpen className="w-3.5 h-3.5 text-amber-300" />
              <span>Kategori: {question.category}</span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-100 leading-relaxed">
              {question.question}
            </h3>
          </div>

          {/* 4 Multiple Choice Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {question.options.map((option, idx) => {
              let btnStyle = 'bg-[#152E52]/75 border-white/10 hover:bg-[#1B3A66]/85 hover:border-sky-300/30 text-slate-200';

              if (isAnswered) {
                if (idx === question.answerIndex) {
                  // Correct Answer highlighted in soft emerald
                  btnStyle = 'bg-emerald-500/20 border-emerald-400/45 text-emerald-100 ring-1 ring-emerald-400/30';
                } else if (idx === selectedOption) {
                  // Selected Wrong Answer highlighted in soft rose
                  btnStyle = 'bg-rose-500/20 border-rose-400/45 text-rose-100 ring-1 ring-rose-400/30';
                } else {
                  btnStyle = 'bg-white/5 border-white/5 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => {
                    soundEngine.playClick();
                    onSubmitAnswer(idx);
                  }}
                  className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all duration-200 ${btnStyle} ${
                    !isAnswered ? 'hover:scale-[1.01] hover:-translate-y-0.5 active:scale-[0.99] cursor-pointer' : 'cursor-default'
                  }`}
                >
                  <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                    isAnswered && idx === question.answerIndex
                      ? 'bg-emerald-400 text-slate-900'
                      : isAnswered && idx === selectedOption
                      ? 'bg-rose-400 text-slate-900'
                      : 'bg-white/10 text-slate-200'
                  }`}>
                    {letters[idx]}
                  </span>
                  <span className="text-sm font-medium leading-snug pt-0.5">
                    {option}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Result Notification Banner (Correct / Wrong / Timeout) */}
          {result === 'correct' && (
            <div
              ref={resultSectionRef}
              className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-400/35 text-emerald-100 space-y-2 animate-in zoom-in-95 duration-200"
            >
              <div className="flex items-center gap-2 font-bold text-base sm:text-lg">
                <CheckCircle2 className="w-6 h-6 text-emerald-300" />
                <span>Jawaban Benar! 🎉</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-100/90">
                Hebat! {activePlayer?.name} berhak maju <strong>{diceValue}</strong> langkah.
                {specialMoveInfo?.type === 'ladder' && (
                  <span className="block font-semibold text-amber-200 mt-1">
                    🪜 Menemukan TANGGA! Naik dari kotak {specialMoveInfo.from} ke kotak {specialMoveInfo.to}!
                  </span>
                )}
                {specialMoveInfo?.type === 'snake' && (
                  <span className="block font-semibold text-rose-200 mt-1">
                    🐍 Tergelincir ULAR! Turun dari kotak {specialMoveInfo.from} ke kotak {specialMoveInfo.to}.
                  </span>
                )}
              </p>
              {question.explanation && (
                <div className="text-xs text-emerald-200/80 pt-1.5 border-t border-emerald-400/20 leading-relaxed">
                  <strong>Pembahasan:</strong> {question.explanation}
                </div>
              )}
            </div>
          )}

          {result === 'wrong' && (
            <div
              ref={resultSectionRef}
              className="p-4 rounded-2xl bg-rose-500/15 border border-rose-400/35 text-rose-100 space-y-2 animate-in zoom-in-95 duration-200"
            >
              <div className="flex items-center gap-2 font-bold text-base sm:text-lg">
                <XCircle className="w-6 h-6 text-rose-300" />
                <span>Jawaban Salah! ❌</span>
              </div>
              <p className="text-xs sm:text-sm text-rose-100/90">
                Sayang sekali, {activePlayer?.name} tetap di kotak <strong>{activePlayer?.position}</strong> dan tidak melangkah.
              </p>
              {question.explanation && (
                <div className="text-xs text-rose-200/80 pt-1.5 border-t border-rose-400/20 leading-relaxed">
                  <strong>Jawaban Benar:</strong> {letters[question.answerIndex]}. {question.options[question.answerIndex]}
                  <br />
                  <strong>Pembahasan:</strong> {question.explanation}
                </div>
              )}
            </div>
          )}

          {result === 'timeout' && (
            <div
              ref={resultSectionRef}
              className="p-4 rounded-2xl bg-rose-500/20 border border-rose-400/40 text-rose-100 space-y-2 animate-in zoom-in-95 duration-200"
            >
              <div className="flex items-center gap-2 font-extrabold text-lg sm:text-xl text-rose-200">
                <AlertTriangle className="w-6 h-6 text-rose-300 animate-bounce" />
                <span>WAKTU TELAH HABIS! ⏰</span>
              </div>
              <p className="text-xs sm:text-sm text-rose-100/90">
                Waktu 15 detik telah habis! {activePlayer?.name} gagal melangkah dan tetap di kotak <strong>{activePlayer?.position}</strong>.
              </p>
              {question.explanation && (
                <div className="text-xs text-rose-200/80 pt-1.5 border-t border-rose-400/20 leading-relaxed">
                  <strong>Kunci Jawaban:</strong> {letters[question.answerIndex]}. {question.options[question.answerIndex]}
                </div>
              )}
            </div>
          )}

          {/* Next Turn CTA Button */}
          {isAnswered && (
            <div className="flex justify-end pt-2 pb-1">
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  onProceed();
                }}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#0D47A1] to-[#1976D2] hover:from-[#1565C0] hover:to-[#0288D1] text-white font-bold text-sm shadow-lg shadow-blue-950/50 hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 border border-sky-300/25"
              >
                <span>Lanjut ke Giliran Berikutnya</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
