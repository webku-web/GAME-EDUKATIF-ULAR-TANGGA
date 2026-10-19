import React from 'react';
import { Dices } from 'lucide-react';

export default function DiceRoller({
  diceValue,
  isRolling,
  onRoll,
  activePlayer,
  disabled,
}) {
  // Dot layout configurations for faces 1 to 6
  const renderDots = (val) => {
    switch (val) {
      case 1:
        return (
          <div className="w-full h-full flex items-center justify-center">
            <span className="w-3.5 h-3.5 rounded-full bg-rose-500 shadow-xs" />
          </div>
        );
      case 2:
        return (
          <div className="w-full h-full flex justify-between p-1">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700 self-end" />
          </div>
        );
      case 3:
        return (
          <div className="w-full h-full flex justify-between p-1">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700 self-center" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700 self-end" />
          </div>
        );
      case 4:
        return (
          <div className="w-full h-full grid grid-cols-2 place-content-between p-1">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700 justify-self-end" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700 self-end" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700 self-end justify-self-end" />
          </div>
        );
      case 5:
        return (
          <div className="w-full h-full relative p-1">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700 absolute top-1 left-1" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700 absolute top-1 right-1" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700 absolute bottom-1 left-1" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700 absolute bottom-1 right-1" />
          </div>
        );
      case 6:
        return (
          <div className="w-full h-full grid grid-cols-2 place-content-between p-1">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700 justify-self-end" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700 self-center" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700 self-center justify-self-end" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700 self-end" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700 self-end justify-self-end" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 bg-[#102544]/85 border border-white/10 rounded-3xl p-5 backdrop-blur-md shadow-lg w-full max-w-sm">
      
      {/* Player Turn Header */}
      <div className="flex items-center gap-2.5">
        <div 
          className="w-7 h-7 rounded-full flex items-center justify-center text-sm shadow-sm font-bold border border-white/75"
          style={{ backgroundColor: activePlayer?.color }}
        >
          {activePlayer?.avatar || activePlayer?.name?.charAt(0)}
        </div>
        <div className="text-left">
          <div className="text-[10px] text-slate-300/75 font-semibold uppercase tracking-wider">
            Giliran Beraksi
          </div>
          <div className="text-sm font-bold text-slate-100">
            {activePlayer?.name}
          </div>
        </div>
      </div>

      {/* 3D Rolling Dice Arena */}
      <div className="py-2 flex items-center justify-center">
        <div className="dice-scene">
          <div
            className={`dice-cube ${isRolling ? 'rolling' : ''}`}
            data-face={diceValue}
          >
            <div className="dice-face face-1">{renderDots(1)}</div>
            <div className="dice-face face-2">{renderDots(2)}</div>
            <div className="dice-face face-3">{renderDots(3)}</div>
            <div className="dice-face face-4">{renderDots(4)}</div>
            <div className="dice-face face-5">{renderDots(5)}</div>
            <div className="dice-face face-6">{renderDots(6)}</div>
          </div>
        </div>
      </div>

      {/* Dice Value Display */}
      <div className="text-center">
        <div className="text-xs text-slate-300/80">
          {isRolling ? 'Sedang mengocok dadu...' : (
            <span>Angka Dadu: <strong className="text-sky-200 text-base">{diceValue}</strong></span>
          )}
        </div>
      </div>

      {/* Roll Action Button */}
      <button
        type="button"
        disabled={disabled || isRolling}
        onClick={onRoll}
        className={`w-full py-3.5 px-6 rounded-2xl font-bold text-base flex items-center justify-center gap-2.5 transition-all duration-300 shadow-md ${
          disabled || isRolling
            ? 'bg-white/5 text-slate-400 border border-white/10 cursor-not-allowed'
            : 'bg-gradient-to-r from-[#0D47A1] to-[#1976D2] hover:from-[#1565C0] hover:to-[#0288D1] text-white hover:shadow-lg hover:scale-[1.02] hover:-translate-y-0.5 active:scale-95 border border-sky-300/25'
        }`}
      >
        <Dices className={`w-5 h-5 ${isRolling ? 'animate-spin' : ''}`} />
        <span>{isRolling ? 'Mengocok Dadu...' : 'Kocok Dadu Sekarang'}</span>
      </button>

    </div>
  );
}
