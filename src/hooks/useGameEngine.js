import { useState, useEffect, useCallback, useRef } from 'react';
import { initialQuestions } from '../data/questions';
import { soundEngine } from '../audio/soundEffects';

export const LADDERS = {
  4: 14,
  9: 31,
  20: 38,
  28: 84,
  40: 59,
  51: 67,
  63: 81,
  71: 91,
};

export const SNAKES = {
  17: 7,
  54: 34,
  62: 19,
  64: 60,
  87: 24,
  93: 73,
  95: 75,
  99: 78,
};

const DEFAULT_PLAYERS = [
  { id: 1, name: 'Siswa 1', color: '#38BDF8', avatar: '👨‍🎓', position: 1, correctAnswers: 0, wrongAnswers: 0, totalRolls: 0 },
  { id: 2, name: 'Siswa 2', color: '#FBBF24', avatar: '🧕', position: 1, correctAnswers: 0, wrongAnswers: 0, totalRolls: 0 },
];

export function useGameEngine() {
  // Game Phase: 'landing' | 'setup' | 'playing' | 'gameover'
  const [gameState, setGameState] = useState('landing');

  // Question Repository (includes user additions from Admin Panel)
  const [questions, setQuestions] = useState(() => {
    try {
      const saved = localStorage.getItem('man_ular_tangga_questions');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return initialQuestions;
  });

  // Track used question IDs to prevent repetition
  const [usedQuestionIds, setUsedQuestionIds] = useState([]);
  const [questionResetNotification, setQuestionResetNotification] = useState(false);

  // Players Configuration
  const [players, setPlayers] = useState(DEFAULT_PLAYERS);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  // Game Duration (in seconds)
  const [totalDurationMinutes, setTotalDurationMinutes] = useState(10);
  const [remainingTime, setRemainingTime] = useState(600);

  // Dice State
  const [diceValue, setDiceValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);

  // Quiz Modal State
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [quizTimer, setQuizTimer] = useState(15);
  const [quizResult, setQuizResult] = useState(null); // null | 'correct' | 'wrong' | 'timeout'
  const [selectedOption, setSelectedOption] = useState(null);
  const [specialMoveInfo, setSpecialMoveInfo] = useState(null); // { type: 'ladder' | 'snake', from, to }

  // Turn Activity Log
  const [gameLogs, setGameLogs] = useState([]);

  // Admin Modal state
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);

  const quizIntervalRef = useRef(null);

  // Save custom questions to localStorage
  const saveQuestions = useCallback((newQuestions) => {
    setQuestions(newQuestions);
    try {
      localStorage.setItem('man_ular_tangga_questions', JSON.stringify(newQuestions));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }, []);

  const addQuestion = useCallback((newQ) => {
    const updated = [
      ...questions,
      {
        ...newQ,
        id: Date.now(),
      }
    ];
    saveQuestions(updated);
  }, [questions, saveQuestions]);

  const deleteQuestion = useCallback((id) => {
    const updated = questions.filter(q => q.id !== id);
    saveQuestions(updated);
  }, [questions, saveQuestions]);

  const resetQuestionsToDefault = useCallback(() => {
    saveQuestions(initialQuestions);
    setUsedQuestionIds([]);
  }, [saveQuestions]);

  // Main Game Countdown Timer
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameState('gameover');
          soundEngine.playVictory();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  // Question Picker with No-Repeat & Auto-Reset Logic
  const getNextQuestion = useCallback(() => {
    let pool = questions.filter(q => !usedQuestionIds.includes(q.id));
    let didReset = false;

    if (pool.length === 0) {
      // Seluruh bank soal sudah habis digunakan -> reset riwayat!
      pool = [...questions];
      setUsedQuestionIds([]);
      didReset = true;
      setQuestionResetNotification(true);
      setTimeout(() => setQuestionResetNotification(false), 4000);
    }

    const randomIndex = Math.floor(Math.random() * pool.length);
    const selected = pool[randomIndex];

    setUsedQuestionIds(prev => (didReset ? [selected.id] : [...prev, selected.id]));
    return selected;
  }, [questions, usedQuestionIds]);

  // Handle Roll Dice
  const rollDice = useCallback(() => {
    if (isRolling || isQuizOpen || gameState !== 'playing') return;

    soundEngine.playDiceRoll();
    setIsRolling(true);

    // Roll animation duration ~1000ms
    setTimeout(() => {
      const rolled = Math.floor(Math.random() * 6) + 1;
      setDiceValue(rolled);
      setIsRolling(false);

      // Trigger Quiz Immediately
      const question = getNextQuestion();
      setCurrentQuestion(question);
      setQuizTimer(15);
      setQuizResult(null);
      setSelectedOption(null);
      setSpecialMoveInfo(null);
      setIsQuizOpen(true);
    }, 1000);
  }, [isRolling, isQuizOpen, gameState, getNextQuestion]);

  // Handle Quiz Timeout (15 seconds elapsed)
  const handleQuizTimeout = useCallback(() => {
    setQuizResult('timeout');
    soundEngine.playTimeout();

    // Player stays in place
    setPlayers(prev => {
      const updated = [...prev];
      const p = updated[currentPlayerIndex];
      p.wrongAnswers += 1;
      return updated;
    });

    const activePlayer = players[currentPlayerIndex];
    setGameLogs(prev => [
      {
        id: Date.now(),
        text: `⏳ ${activePlayer.name} kehabisan waktu kuis! Gagal melangkah dan tetap di kotak ${activePlayer.position}.`,
        type: 'timeout',
      },
      ...prev.slice(0, 25),
    ]);
  }, [currentPlayerIndex, players]);

  // Quiz 15-second countdown timer
  useEffect(() => {
    if (!isQuizOpen || quizResult !== null) {
      if (quizIntervalRef.current) clearInterval(quizIntervalRef.current);
      return;
    }

    quizIntervalRef.current = setInterval(() => {
      setQuizTimer((prev) => {
        if (prev <= 1) {
          clearInterval(quizIntervalRef.current);
          handleQuizTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (quizIntervalRef.current) clearInterval(quizIntervalRef.current);
    };
  }, [isQuizOpen, quizResult, handleQuizTimeout]);

  // Handle Quiz Answer Submission
  const submitAnswer = useCallback((optionIdx) => {
    if (quizResult !== null || !currentQuestion) return;

    setSelectedOption(optionIdx);
    const isCorrect = optionIdx === currentQuestion.answerIndex;

    if (isCorrect) {
      setQuizResult('correct');
      soundEngine.playCorrect();

      // Calculate Player Movement
      const activePlayer = players[currentPlayerIndex];
      const targetPos = Math.min(100, activePlayer.position + diceValue);
      let finalPos = targetPos;
      let moveType = null;

      if (LADDERS[targetPos]) {
        finalPos = LADDERS[targetPos];
        moveType = { type: 'ladder', from: targetPos, to: finalPos };
      } else if (SNAKES[targetPos]) {
        finalPos = SNAKES[targetPos];
        moveType = { type: 'snake', from: targetPos, to: finalPos };
      }

      setSpecialMoveInfo(moveType);

      // Play ladder or snake sound after brief delay
      if (moveType?.type === 'ladder') {
        setTimeout(() => soundEngine.playLadder(), 800);
      } else if (moveType?.type === 'snake') {
        setTimeout(() => soundEngine.playSnake(), 800);
      }

      // Update Player state
      setPlayers(prev => {
        const updated = [...prev];
        const p = updated[currentPlayerIndex];
        p.position = finalPos;
        p.correctAnswers += 1;
        p.totalRolls += 1;
        return updated;
      });

      // Log movement
      let logMsg = `✨ ${activePlayer.name} menjawab BENAR! Maju ${diceValue} langkah ke kotak ${targetPos}.`;
      if (moveType?.type === 'ladder') {
        logMsg += ` 🪜 Naik tangga ke kotak ${finalPos}!`;
      } else if (moveType?.type === 'snake') {
        logMsg += ` 🐍 Tergelincir ular ke kotak ${finalPos}!`;
      }

      setGameLogs(prev => [
        { id: Date.now(), text: logMsg, type: 'correct' },
        ...prev.slice(0, 25),
      ]);

      // Win Condition check
      if (finalPos >= 100) {
        setTimeout(() => {
          setIsQuizOpen(false);
          setGameState('gameover');
          soundEngine.playVictory();
        }, 2200);
      }
    } else {
      setQuizResult('wrong');
      soundEngine.playWrong();

      // Player stays in place
      setPlayers(prev => {
        const updated = [...prev];
        const p = updated[currentPlayerIndex];
        p.wrongAnswers += 1;
        p.totalRolls += 1;
        return updated;
      });

      const activePlayer = players[currentPlayerIndex];
      setGameLogs(prev => [
        {
          id: Date.now(),
          text: `❌ ${activePlayer.name} menjawab SALAH! Tetap di kotak ${activePlayer.position}.`,
          type: 'wrong',
        },
        ...prev.slice(0, 25),
      ]);
    }
  }, [quizResult, currentQuestion, players, currentPlayerIndex, diceValue]);

  // Proceed to next player's turn
  const closeQuizAndNextTurn = useCallback(() => {
    setIsQuizOpen(false);
    setQuizResult(null);
    setSelectedOption(null);
    setSpecialMoveInfo(null);

    // Pass turn to next player
    setCurrentPlayerIndex(prev => (prev + 1) % players.length);
  }, [players.length]);

  // Start Game with setup options
  const startGame = useCallback((playerConfigs, durationMinutes) => {
    soundEngine.init();
    soundEngine.startBGM();

    const formattedPlayers = playerConfigs.map((p, idx) => ({
      id: idx + 1,
      name: p.name.trim() || `Pemain ${idx + 1}`,
      color: p.color,
      avatar: p.avatar,
      position: 1,
      correctAnswers: 0,
      wrongAnswers: 0,
      totalRolls: 0,
    }));

    setPlayers(formattedPlayers);
    setCurrentPlayerIndex(0);
    setTotalDurationMinutes(durationMinutes);
    setRemainingTime(durationMinutes * 60);
    setUsedQuestionIds([]);
    setGameLogs([
      { id: Date.now(), text: `🎮 Permainan dimulai! Durasi: ${durationMinutes} menit. Giliran pertama: ${formattedPlayers[0].name}.`, type: 'info' }
    ]);
    setGameState('playing');
  }, []);

  // Reset entire game
  const resetGame = useCallback(() => {
    soundEngine.stopBGM();
    setGameState('landing');
    setPlayers(DEFAULT_PLAYERS);
    setCurrentPlayerIndex(0);
    setRemainingTime(600);
    setIsQuizOpen(false);
    setQuizResult(null);
    setDiceValue(1);
    setGameLogs([]);
  }, []);

  return {
    gameState,
    setGameState,
    questions,
    addQuestion,
    deleteQuestion,
    resetQuestionsToDefault,
    usedQuestionIds,
    questionResetNotification,
    players,
    currentPlayerIndex,
    activePlayer: players[currentPlayerIndex] || players[0],
    remainingTime,
    totalDurationMinutes,
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
  };
}
