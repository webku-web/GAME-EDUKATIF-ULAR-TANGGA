import React from 'react';
import { X, BookOpen, Clock, Dices, HelpCircle, Trophy, Sparkles } from 'lucide-react';
import { soundEngine } from '../audio/soundEffects';

export default function RulesModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#081322]/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#102544] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-slate-950/80 max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-400/25 flex items-center justify-center text-sky-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-100">Panduan Aturan Main</h2>
              <p className="text-xs text-slate-300/75">Ular Tangga Edukatif Siswa MAN</p>
            </div>
          </div>
          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Rules Content */}
        <div className="flex-1 overflow-y-auto pt-4 space-y-3.5 pr-1 text-left text-xs sm:text-sm text-slate-200">
          
          <div className="p-3.5 rounded-2xl bg-[#152E52]/65 border border-white/10 hover:border-white/20 transition-all duration-200 space-y-1.5">
            <div className="font-bold text-slate-100 flex items-center gap-2">
              <Dices className="w-4 h-4 text-sky-300" />
              <span>1. Giliran & Kocokan Dadu</span>
            </div>
            <p className="text-slate-300/80 leading-relaxed text-xs">
              Pemain bergiliran mengocok dadu 3D untuk mendapatkan angka langkah (1 - 6).
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#152E52]/65 border border-white/10 hover:border-white/20 transition-all duration-200 space-y-1.5">
            <div className="font-bold text-slate-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-300" />
              <span>2. Kuis Kilat 15 Detik</span>
            </div>
            <p className="text-slate-300/80 leading-relaxed text-xs">
              Setiap selesai mengocok dadu, akan muncul soal kuis seputar PAI dan Pengetahuan Umum. Anda memiliki waktu tepat <strong>15 detik</strong> untuk menjawab.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#152E52]/65 border border-white/10 hover:border-white/20 transition-all duration-200 space-y-1.5">
            <div className="font-bold text-slate-100 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-300" />
              <span>3. Sistem Reward & Hukuman</span>
            </div>
            <ul className="text-slate-300/80 space-y-1 text-xs list-disc list-inside">
              <li><strong className="text-emerald-200">Jawaban Benar:</strong> Pemain maju sejumlah angka dadu. Jika tiba di pangkal tangga, naik ke puncak! Jika di kepala ular, turun ke ekor.</li>
              <li><strong className="text-rose-200">Jawaban Salah:</strong> Pemain tidak melangkah dan tetap di posisinya saat ini.</li>
              <li><strong className="text-rose-300">Waktu Habis (15s):</strong> Muncul peringatan waktu habis dan pemain gagal melangkah.</li>
            </ul>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#152E52]/65 border border-white/10 hover:border-white/20 transition-all duration-200 space-y-1.5">
            <div className="font-bold text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>4. Sistem Pengacakan Soal Fair</span>
            </div>
            <p className="text-slate-300/80 leading-relaxed text-xs">
              Soal yang sudah keluar tidak akan diulang lagi sampai seluruh bank soal habis digunakan. Ketika seluruh soal sudah selesai, riwayat soal akan otomatis di-reset dari awal.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#152E52]/65 border border-white/10 hover:border-white/20 transition-all duration-200 space-y-1.5">
            <div className="font-bold text-slate-100 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-200" />
              <span>5. Akhir Permainan & Pemenang</span>
            </div>
            <p className="text-slate-300/80 leading-relaxed text-xs">
              Permainan selesai bila ada pemain yang berhasil mencapai kotak 100 atau durasi waktu permainan utama habis. Pemenang ditentukan dari kotak terjauh.
            </p>
          </div>

        </div>

        {/* Footer CTA */}
        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0D47A1] to-[#1976D2] hover:from-[#1565C0] hover:to-[#0288D1] text-white font-bold text-xs shadow-md hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 border border-sky-300/25"
          >
            Mengerti
          </button>
        </div>

      </div>
    </div>
  );
}
