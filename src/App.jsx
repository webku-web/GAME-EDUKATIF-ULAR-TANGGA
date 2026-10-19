import React from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import GameSetup from './components/GameSetup';
import GameBoard from './components/GameBoard';
import DiceRoller from './components/DiceRoller';
import QuizModal from './components/QuizModal';
import AdminPanelModal from './components/AdminPanelModal';
import LeaderboardModal from './components/LeaderboardModal';
import RulesModal from './components/RulesModal';
import { useGameEngine } from './hooks/useGameEngine';
import { History, RefreshCw } from 'lucide-react';

export default function App() {
  const {
    gameState,
    setGameState,
    questions,
    addQuestion,
    deleteQuestion,
    resetQuestionsToDefault,
    questionResetNotification,
    players,
    currentPlayerIndex,
    activePlayer,
    remainingTime,
    diceValue,
    isRolling,
    rollDice,
    isQuizOpen,
    currentQuestion,
    quizTimer,
    quizResult,
    selectedOption,
    specialMoveInfo,
    submitAnswer,
    closeQuizAndNextTurn,
    startGame,
    resetGame,
    gameLogs,
    isAdminOpen,
    setIsAdminOpen,
    isRulesOpen,
    setIsRulesOpen,
  } = useGameEngine();

  return (
    <div className="min-h-screen flex flex-col bg-[#0B192C]/80 text-slate-100">
      
      {/* Navigation Header */}
      <Navbar
        gameState={gameState}
        onResetGame={resetGame}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenRules={() => setIsRulesOpen(true)}
        remainingTime={remainingTime}
        activePlayer={activePlayer}
        onBackToLanding={() => {
          if (gameState === 'playing') {
            if (window.confirm('Keluar ke menu utama? Sesi saat ini akan dihentikan.')) {
              resetGame();
            }
          } else {
            setGameState('landing');
          }
        }}
      />

      {/* Main Dynamic View Area */}
      <main className="flex-1 flex flex-col">
        {/* Phase 1: Landing Page */}
        {gameState === 'landing' && (
          <LandingPage
            onStartGameClick={() => setGameState('setup')}
            onOpenAdmin={() => setIsAdminOpen(true)}
            onOpenRules={() => setIsRulesOpen(true)}
          />
        )}

        {/* Phase 2: Setup Screen */}
        {gameState === 'setup' && (
          <GameSetup
            onStart={(configs, duration) => startGame(configs, duration)}
            onBack={() => setGameState('landing')}
          />
        )}

        {/* Phase 3: In-Game Arena */}
        {gameState === 'playing' && (
          <div className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 flex flex-col lg:flex-row gap-6 items-start justify-center">
            
            {/* Left: 100-Square Game Board */}
            <div className="w-full lg:w-auto flex-1 flex flex-col items-center">
              <GameBoard
                players={players}
                activePlayerIndex={currentPlayerIndex}
              />
            </div>

            {/* Right: Controls & Dashboard */}
            <div className="w-full lg:w-96 flex flex-col gap-4">
              
              {/* Question Pool Reset Notification Toast */}
              {questionResetNotification && (
                <div className="p-3 rounded-2xl bg-sky-500/15 border border-sky-300/30 text-sky-100 text-xs font-semibold flex items-center gap-2 shadow-md animate-bounce">
                  <RefreshCw className="w-4 h-4 text-amber-300 animate-spin" />
                  <span>Semua soal telah terjawab! Riwayat bank soal di-reset kembali dari awal.</span>
                </div>
              )}

              {/* 3D Dice Roller Widget */}
              <DiceRoller
                diceValue={diceValue}
                isRolling={isRolling}
                onRoll={rollDice}
                activePlayer={activePlayer}
                disabled={isQuizOpen || isRolling}
              />

              {/* Player Status Cards */}
              <div className="bg-[#102544]/85 border border-white/10 rounded-3xl p-4 backdrop-blur-md shadow-lg space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-300/80 pb-1 border-b border-white/10">
                  <span>Klasemen Sementara</span>
                  <span>Kotak</span>
                </div>

                <div className="space-y-2">
                  {players.map((p, idx) => {
                    const isActive = idx === currentPlayerIndex;
                    return (
                      <div
                        key={p.id}
                        className={`p-2.5 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-between gap-3 ${
                          isActive
                            ? 'bg-sky-500/15 border-sky-300/35 shadow-sm'
                            : 'bg-[#152E52]/65 border-white/8'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div 
                            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-xs border border-white/60"
                            style={{ backgroundColor: p.color, color: '#0f172a' }}
                          >
                            {p.avatar || p.name.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-slate-100">
                                {p.name}
                              </span>
                              {isActive && (
                                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-sky-300/25 text-sky-100 border border-sky-300/30">
                                  Giliran
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-300/80 flex items-center gap-2">
                              <span className="text-emerald-300 font-medium">{p.correctAnswers} Benar</span>
                              <span>•</span>
                              <span className="text-rose-300">{p.wrongAnswers} Salah</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-sm font-bold text-amber-200">
                            #{p.position}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Activity Log / Feed */}
              <div className="bg-[#102544]/85 border border-white/10 rounded-3xl p-4 backdrop-blur-md shadow-lg flex flex-col flex-1 max-h-56">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300/80 pb-2 border-b border-white/10 mb-2">
                  <History className="w-3.5 h-3.5 text-sky-300" />
                  <span>Aktivitas Permainan</span>
                </div>
                <div className="flex-1 overflow-y-auto space-y-2 pr-1 text-xs">
                  {gameLogs.length === 0 ? (
                    <div className="text-slate-400 text-center py-4 text-[11px]">
                      Kocok dadu untuk memulai aksi permainan!
                    </div>
                  ) : (
                    gameLogs.map((log) => (
                      <div
                        key={log.id}
                        className={`p-2.5 rounded-xl border text-[11px] leading-snug transition-all duration-200 ${
                          log.type === 'correct'
                            ? 'bg-emerald-500/12 border-emerald-400/25 text-emerald-100'
                            : log.type === 'wrong'
                            ? 'bg-rose-500/12 border-rose-400/25 text-rose-100'
                            : log.type === 'timeout'
                            ? 'bg-rose-500/15 border-rose-400/30 text-rose-100'
                            : 'bg-[#152E52]/65 border-white/10 text-slate-200'
                        }`}
                      >
                        {log.text}
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>

          </div>
        )}
      </main>

      {/* Quiz Pop-up Modal */}
      <QuizModal
        isOpen={isQuizOpen}
        activePlayer={activePlayer}
        question={currentQuestion}
        timer={quizTimer}
        result={quizResult}
        selectedOption={selectedOption}
        diceValue={diceValue}
        specialMoveInfo={specialMoveInfo}
        onSubmitAnswer={submitAnswer}
        onProceed={closeQuizAndNextTurn}
      />

      {/* Admin Panel Protected Modal */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        questions={questions}
        onAddQuestion={addQuestion}
        onDeleteQuestion={deleteQuestion}
        onResetQuestions={resetQuestionsToDefault}
      />

      {/* Rules Modal */}
      <RulesModal
        isOpen={isRulesOpen}
        onClose={() => setIsRulesOpen(false)}
      />

      {/* Leaderboard / Game Over Modal */}
      <LeaderboardModal
        isOpen={gameState === 'gameover'}
        players={players}
        onResetGame={resetGame}
      />

    </div>
  );
}
