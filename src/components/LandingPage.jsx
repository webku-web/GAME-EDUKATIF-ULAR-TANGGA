import React from 'react';
import { Play, Shield, BookOpen, Sparkles, Award, Brain, Clock, Users } from 'lucide-react';
import { soundEngine } from '../audio/soundEffects';

export default function LandingPage({ onStartGameClick, onOpenAdmin, onOpenRules }) {
  return (
    <div className="relative min-h-[calc(100vh-65px)] flex flex-col justify-center items-center px-4 py-12 overflow-hidden islamic-pattern">
      
      {/* Soft Ambient Gradient Flares */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] bg-gradient-to-tr from-[#0D47A1]/25 via-[#1565C0]/20 to-[#0BB3E1]/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-12 right-12 w-72 h-72 bg-[#FBC02D]/8 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto w-full text-center flex flex-col items-center">
        
        {/* Madrasah Aliyah Negeri Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#122C52]/80 border border-sky-300/20 text-sky-200 text-xs md:text-sm font-semibold tracking-wide shadow-sm mb-6 backdrop-blur-md hover:scale-105 transition-transform duration-300">
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          <span>MEDIA PEMBELAJARAN INTERAKTIF MAN</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-300/80" />
          <span className="text-amber-200 font-medium">PAI & SAINS</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-tight md:leading-[1.12] mb-6">
          <span className="block text-slate-100">PERMAINAN EDUKATIF</span>
          <span className="bg-gradient-to-r from-sky-200 via-slate-100 to-amber-200 bg-clip-text text-transparent">
            ULAR TANGGA MAN
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-slate-300/90 text-base sm:text-lg md:text-xl font-normal leading-relaxed mb-10">
          Uji ketajaman pemahaman materi <span className="text-sky-200 font-semibold">Al-Qur'an Hadits, Akidah Akhlak, Fikih, SKI</span>, dan pengetahuan sains dalam petualangan papan 100 kotak yang seru dan kompetitif!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mb-8">
          {/* Main Play Button */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onStartGameClick();
            }}
            className="w-full sm:w-auto flex-1 group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#0D47A1] to-[#1976D2] hover:from-[#1565C0] hover:to-[#0288D1] text-white font-bold text-lg shadow-lg shadow-blue-950/50 hover:shadow-xl hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 border border-sky-300/25"
          >
            <Play className="w-5 h-5 fill-white text-white group-hover:translate-x-1 transition-transform duration-300" />
            <span>Mulai Permainan</span>
          </button>

          {/* Admin Panel Button */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenAdmin();
            }}
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-[#132C50]/85 hover:bg-[#193866]/90 text-amber-200 font-semibold text-base border border-amber-300/25 shadow-md shadow-slate-950/40 hover:border-amber-300/40 hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
          >
            <Shield className="w-5 h-5 text-amber-300/90" />
            <span>Admin Panel</span>
          </button>
        </div>

        {/* Rules button link */}
        <button
          onClick={() => {
            soundEngine.playClick();
            onOpenRules();
          }}
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-300/80 hover:text-sky-200 hover:scale-105 transition-all duration-200 mb-12"
        >
          <BookOpen className="w-4 h-4 text-sky-300/80" />
          <span>Lihat Panduan & Aturan Permainan</span>
        </button>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full text-left">
          
          <div className="p-4 rounded-2xl bg-[#112645]/75 border border-white/10 backdrop-blur-sm hover:border-sky-300/30 hover:bg-[#152E52]/85 hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-400/20 flex items-center justify-center text-sky-300 mb-3 group-hover:scale-110 transition-transform duration-300">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-100 text-sm sm:text-base mb-1">Bank Soal Khusus MAN</h3>
            <p className="text-xs text-slate-300/75 leading-relaxed">
              Materi PAI terstruktur & pengetahuan umum sesuai kurikulum madrasah.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#112645]/75 border border-white/10 backdrop-blur-sm hover:border-amber-300/30 hover:bg-[#152E52]/85 hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-400/20 flex items-center justify-center text-amber-300 mb-3 group-hover:scale-110 transition-transform duration-300">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-100 text-sm sm:text-base mb-1">Kuis Kilat 15 Detik</h3>
            <p className="text-xs text-slate-300/75 leading-relaxed">
              Tantangan batas waktu 15 detik pada setiap kotak sebelum melangkah.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#112645]/75 border border-white/10 backdrop-blur-sm hover:border-sky-300/30 hover:bg-[#152E52]/85 hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-400/20 flex items-center justify-center text-sky-300 mb-3 group-hover:scale-110 transition-transform duration-300">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-100 text-sm sm:text-base mb-1">Multiplayer 2-4 Siswa</h3>
            <p className="text-xs text-slate-300/75 leading-relaxed">
              Adu ketangkasan beregu atau antar siswa dengan bidak beranimasi.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#112645]/75 border border-white/10 backdrop-blur-sm hover:border-amber-300/30 hover:bg-[#152E52]/85 hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-400/20 flex items-center justify-center text-amber-300 mb-3 group-hover:scale-110 transition-transform duration-300">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-100 text-sm sm:text-base mb-1">Leaderboard & Prestasi</h3>
            <p className="text-xs text-slate-300/75 leading-relaxed">
              Peringkat pemenang transparan berdasarkan jarak kotak dan ketepatan kuis.
            </p>
          </div>

        </div>

        {/* Small Footer / Credit */}
        <div className="mt-12 text-xs text-slate-400/80 flex items-center gap-2">
          <span>Kementerian Agama Republik Indonesia</span>
          <span>•</span>
          <span>Madrasah Mandiri Berprestasi</span>
        </div>

      </div>
    </div>
  );
}
