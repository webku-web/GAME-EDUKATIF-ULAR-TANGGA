import React, { useState } from 'react';
import { Shield, Lock, PlusCircle, Trash2, X, Check, Search, AlertCircle, RotateCcw, ListFilter } from 'lucide-react';
import { CATEGORIES } from '../data/questions';
import { soundEngine } from '../audio/soundEffects';

export default function AdminPanelModal({
  isOpen,
  onClose,
  questions,
  onAddQuestion,
  onDeleteQuestion,
  onResetQuestions,
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab: 'add' | 'list'
  const [activeTab, setActiveTab] = useState('add');

  // New Question Form State
  const [newCategory, setNewCategory] = useState("Al-Qur'an Hadits");
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newOptions, setNewOptions] = useState(['', '', '', '']);
  const [newAnswerIndex, setNewAnswerIndex] = useState(0);
  const [newExplanation, setNewExplanation] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Search in Questions List
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('Semua Kategori');

  if (!isOpen) return null;

  // Handle Admin Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'WULAN17') {
      soundEngine.playCorrect();
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      soundEngine.playWrong();
      setAuthError('Kata sandi salah! Akses ditolak.');
      setPassword('');
    }
  };

  // Handle Option text change
  const handleOptionChange = (idx, val) => {
    setNewOptions((prev) => {
      const updated = [...prev];
      updated[idx] = val;
      return updated;
    });
  };

  // Handle Add Question
  const handleCreateQuestion = (e) => {
    e.preventDefault();

    if (!newQuestionText.trim()) return;
    if (newOptions.some((opt) => !opt.trim())) {
      alert('Harap isi semua 4 pilihan jawaban.');
      return;
    }

    onAddQuestion({
      category: newCategory,
      question: newQuestionText.trim(),
      options: newOptions.map((o) => o.trim()),
      answerIndex: Number(newAnswerIndex),
      explanation: newExplanation.trim() || 'Kunci jawaban yang tepat.',
    });

    soundEngine.playCorrect();
    setSuccessMsg('Soal baru berhasil ditambahkan ke bank soal!');
    setTimeout(() => setSuccessMsg(''), 3000);

    // Reset Form
    setNewQuestionText('');
    setNewOptions(['', '', '', '']);
    setNewAnswerIndex(0);
    setNewExplanation('');
  };

  // Filter questions
  const filteredQuestions = questions.filter((q) => {
    const matchCat =
      selectedCategoryFilter === 'Semua Kategori' || q.category === selectedCategoryFilter;
    const matchSearch =
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#081322]/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#102544] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-slate-950/80 max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-300/25 flex items-center justify-center text-amber-300">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-100">Panel Administrator</h2>
              <p className="text-xs text-slate-300/75">Pengelolaan Bank Soal MAN</p>
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

        {/* Content */}
        {!isAuthenticated ? (
          /* Password Protection Gate */
          <div className="py-12 flex flex-col items-center justify-center max-w-sm mx-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-400/12 border border-amber-300/25 flex items-center justify-center text-amber-300">
              <Lock className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100 mb-1">Akses Terproteksi</h3>
              <p className="text-xs text-slate-300/80">
                Masukkan kata sandi admin pengajar untuk mengelola bank soal.
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi..."
                  className="w-full px-4 py-3 rounded-xl bg-[#0C1D36] border border-white/15 text-slate-100 text-center text-base tracking-widest focus:outline-none focus:border-amber-300/60 transition-all font-mono"
                  autoFocus
                />
                {authError && (
                  <div className="flex items-center justify-center gap-1.5 text-xs text-rose-300 mt-2 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{authError}</span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0D47A1] to-[#1976D2] hover:from-[#1565C0] hover:to-[#0288D1] text-white font-bold text-sm shadow-md shadow-blue-950/50 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-95 transition-all duration-200 border border-sky-300/25"
              >
                Masuk ke Panel
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Admin Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden pt-4">
            
            {/* Navigation Tabs & Stats */}
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2 bg-[#0C1D36] p-1 rounded-xl border border-white/10">
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setActiveTab('add');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    activeTab === 'add'
                      ? 'bg-[#1976D2] text-white shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Tambah Soal Baru</span>
                </button>
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setActiveTab('list');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    activeTab === 'list'
                      ? 'bg-[#1976D2] text-white shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <ListFilter className="w-3.5 h-3.5" />
                  <span>Daftar Soal ({questions.length})</span>
                </button>
              </div>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  if (window.confirm('Reset seluruh bank soal ke default 30 soal awal?')) {
                    onResetQuestions();
                    alert('Bank soal telah di-reset ke default.');
                  }
                }}
                className="flex items-center gap-1 text-[11px] text-slate-300/75 hover:text-rose-300 hover:scale-105 transition-all duration-200"
                title="Reset Bank Soal ke Default"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Default</span>
              </button>
            </div>

            {/* TAB 1: FORM TAMBAH SOAL */}
            {activeTab === 'add' && (
              <form onSubmit={handleCreateQuestion} className="flex-1 overflow-y-auto pr-1 space-y-4">
                
                {successMsg && (
                  <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-400/35 text-emerald-200 text-xs font-semibold flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>{successMsg}</span>
                  </div>
                )}

                {/* Kategori */}
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Kategori Materi:
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0C1D36] border border-white/15 text-slate-100 text-xs focus:outline-none focus:border-sky-300/60 font-medium"
                  >
                    {CATEGORIES.filter((c) => c !== 'Semua Kategori').map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Pertanyaan */}
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Teks Pertanyaan:
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newQuestionText}
                    onChange={(e) => setNewQuestionText(e.target.value)}
                    placeholder="Tuliskan pertanyaan soal pilihan ganda di sini..."
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0C1D36] border border-white/15 text-slate-100 text-xs focus:outline-none focus:border-sky-300/60 font-medium"
                  />
                </div>

                {/* 4 Pilihan Ganda & Kunci */}
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Pilihan Jawaban & Kunci: (Pilih radio untuk jawaban benar)
                  </label>
                  <div className="space-y-2">
                    {['A', 'B', 'C', 'D'].map((letter, idx) => (
                      <div key={letter} className="flex items-center gap-2">
                        <label className="flex items-center gap-1.5 cursor-pointer bg-[#0C1D36] px-2.5 py-2 rounded-xl border border-white/10 shrink-0 hover:border-white/25 transition-colors">
                          <input
                            type="radio"
                            name="answerIndex"
                            checked={newAnswerIndex === idx}
                            onChange={() => setNewAnswerIndex(idx)}
                            className="text-sky-400 focus:ring-0"
                          />
                          <span className="text-xs font-bold text-amber-200">{letter}</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={newOptions[idx]}
                          onChange={(e) => handleOptionChange(idx, e.target.value)}
                          placeholder={`Teks pilihan ${letter}...`}
                          className="w-full px-3 py-2 rounded-xl bg-[#0C1D36] border border-white/15 text-slate-100 text-xs focus:outline-none focus:border-sky-300/60 font-medium"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pembahasan / Penjelasan */}
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Penjelasan / Pembahasan Singkat:
                  </label>
                  <input
                    type="text"
                    value={newExplanation}
                    onChange={(e) => setNewExplanation(e.target.value)}
                    placeholder="Penjelasan kenapa jawaban tersebut benar..."
                    className="w-full px-3 py-2 rounded-xl bg-[#0C1D36] border border-white/15 text-slate-100 text-xs focus:outline-none focus:border-sky-300/60 font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0D47A1] to-[#1976D2] hover:from-[#1565C0] hover:to-[#0288D1] text-white font-bold text-sm shadow-md shadow-blue-950/50 hover:scale-[1.01] hover:-translate-y-0.5 active:scale-95 transition-all duration-200 mt-2 border border-sky-300/25"
                >
                  Simpan Soal ke Bank Permainan
                </button>
              </form>
            )}

            {/* TAB 2: DAFTAR SOAL & FILTER */}
            {activeTab === 'list' && (
              <div className="flex-1 flex flex-col overflow-hidden space-y-3">
                {/* Search & Filter Controls */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari pertanyaan atau materi..."
                      className="w-full pl-8 pr-3 py-2 rounded-xl bg-[#0C1D36] border border-white/15 text-slate-100 text-xs focus:outline-none focus:border-sky-300/60"
                    />
                  </div>
                  <select
                    value={selectedCategoryFilter}
                    onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-[#0C1D36] border border-white/15 text-slate-100 text-xs focus:outline-none focus:border-sky-300/60"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Questions List */}
                <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                  {filteredQuestions.length === 0 ? (
                    <div className="py-12 text-center text-xs text-slate-400">
                      Tidak ada soal yang cocok dengan pencarian.
                    </div>
                  ) : (
                    filteredQuestions.map((q, idx) => (
                      <div
                        key={q.id || idx}
                        className="p-3.5 rounded-2xl bg-[#152E52]/65 border border-white/10 hover:border-white/20 transition-all duration-200 flex items-start justify-between gap-3 text-left"
                      >
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-sky-500/15 text-sky-200 border border-sky-400/20">
                              {q.category}
                            </span>
                            <span className="text-[10px] text-slate-400">#{idx + 1}</span>
                          </div>
                          <p className="text-xs font-medium text-slate-100">{q.question}</p>
                          <p className="text-[11px] text-emerald-300 font-medium">
                            Kunci: {['A', 'B', 'C', 'D'][q.answerIndex]}. {q.options[q.answerIndex]}
                          </p>
                        </div>

                        <button
                          onClick={() => {
                            soundEngine.playClick();
                            if (window.confirm('Hapus soal ini?')) {
                              onDeleteQuestion(q.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-400/20 hover:scale-105 active:scale-95 transition-all duration-200"
                          title="Hapus Soal"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
