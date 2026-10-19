import React, { useMemo } from 'react';
import { LADDERS, SNAKES } from '../hooks/useGameEngine';
import { getCellCoordinates } from '../utils/boardUtils';
import { Trophy, Flag } from 'lucide-react';

export default function GameBoard({ players, activePlayerIndex }) {
  // Generate the 100 cells array in visual order (from row 0 to 9, col 0 to 9)
  const boardCells = useMemo(() => {
    const cells = [];
    for (let row = 0; row < 10; row++) {
      const rowFromBottom = 9 - row;
      const isEvenRow = rowFromBottom % 2 === 0;
      for (let col = 0; col < 10; col++) {
        const colInRow = isEvenRow ? col : 9 - col;
        const cellNumber = rowFromBottom * 10 + colInRow + 1;
        cells.push({
          number: cellNumber,
          row,
          col,
          isLadderStart: Boolean(LADDERS[cellNumber]),
          ladderTarget: LADDERS[cellNumber],
          isSnakeStart: Boolean(SNAKES[cellNumber]),
          snakeTarget: SNAKES[cellNumber],
        });
      }
    }
    return cells;
  }, []);

  return (
    <div className="relative w-full max-w-[640px] aspect-square rounded-3xl p-3 sm:p-4 bg-gradient-to-b from-[#102544]/95 via-[#0D1F3A]/95 to-[#0B192C]/95 border border-white/12 shadow-xl shadow-slate-950/60 select-none">
      
      {/* 10x10 Grid of Cells */}
      <div className="grid grid-cols-10 grid-rows-10 w-full h-full gap-1 sm:gap-1.5 relative">
        {boardCells.map((cell) => {
          const isLadder = cell.isLadderStart;
          const isSnake = cell.isSnakeStart;
          const isFinish = cell.number === 100;
          const isStart = cell.number === 1;

          // Find players on this square
          const playersOnCell = players.filter((p) => p.position === cell.number);

          // Alternate background pattern (low, comfortable contrast)
          const isAlt = (cell.row + cell.col) % 2 === 0;

          return (
            <div
              key={cell.number}
              className={`relative rounded-lg sm:rounded-xl flex flex-col justify-between p-1 transition-all duration-200 hover:scale-[1.03] overflow-hidden border ${
                isFinish
                  ? 'bg-gradient-to-br from-amber-400/20 to-amber-500/15 border-amber-300/40'
                  : isStart
                  ? 'bg-gradient-to-br from-emerald-500/20 to-teal-600/15 border-emerald-400/35'
                  : isLadder
                  ? 'bg-amber-400/10 border-amber-300/25 hover:border-amber-300/45'
                  : isSnake
                  ? 'bg-rose-400/10 border-rose-300/25 hover:border-rose-300/45'
                  : isAlt
                  ? 'bg-[#12294B]/75 border-white/8 hover:border-white/15'
                  : 'bg-[#163158]/65 border-white/6 hover:border-white/15'
              }`}
            >
              {/* Header: Cell Number & Event Marker */}
              <div className="flex items-center justify-between w-full leading-none">
                <span
                  className={`text-[9px] sm:text-xs font-bold ${
                    isFinish
                      ? 'text-amber-200 font-extrabold'
                      : isStart
                      ? 'text-emerald-200 font-extrabold'
                      : 'text-slate-300/80'
                  }`}
                >
                  {cell.number}
                </span>

                {/* Ladder / Snake Mini Tag */}
                {isLadder && (
                  <span className="text-[8px] sm:text-[10px] font-semibold text-amber-200 bg-amber-500/20 px-1 py-0.2 rounded border border-amber-300/25 flex items-center gap-0.5">
                    🪜{cell.ladderTarget}
                  </span>
                )}
                {isSnake && (
                  <span className="text-[8px] sm:text-[10px] font-semibold text-rose-200 bg-rose-500/20 px-1 py-0.2 rounded border border-rose-300/25 flex items-center gap-0.5">
                    🐍{cell.snakeTarget}
                  </span>
                )}
                {isFinish && (
                  <Trophy className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-amber-200" />
                )}
                {isStart && (
                  <Flag className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-emerald-300" />
                )}
              </div>

              {/* Center Decoration */}
              <div className="flex-1 flex items-center justify-center pointer-events-none">
                {isFinish && (
                  <span className="text-[9px] sm:text-[11px] font-extrabold tracking-wider text-amber-200/90 uppercase">
                    JUARA
                  </span>
                )}
                {isStart && (
                  <span className="text-[9px] sm:text-[11px] font-extrabold tracking-wider text-emerald-200/90 uppercase">
                    MULAI
                  </span>
                )}
              </div>

              {/* Player Pawns Display */}
              <div className="flex items-center justify-center gap-0.5 sm:gap-1 flex-wrap min-h-[16px] sm:min-h-[20px] z-10">
                {playersOnCell.map((player) => {
                  const isActive = players[activePlayerIndex]?.id === player.id;
                  return (
                    <div
                      key={player.id}
                      className={`relative w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold shadow-md transition-transform duration-300 ${
                        isActive ? 'scale-125 ring-2 ring-white/85 ring-offset-1 ring-offset-[#102544] z-20 animate-bounce' : 'opacity-90 hover:scale-110'
                      }`}
                      style={{
                        backgroundColor: player.color,
                        color: '#0f172a',
                      }}
                      title={`${player.name} (Kotak ${player.position})`}
                    >
                      <span>{player.avatar || player.name.charAt(0)}</span>
                    </div>
                  );
                })}
              </div>

            </div>
          );
        })}
      </div>

      {/* SVG Overlay: Connections for Snakes and Ladders (Softened opacity) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none p-3 sm:p-4 z-0"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Ladder Glow Gradient */}
          <linearGradient id="ladderGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCD34D" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#FDE68A" stopOpacity="0.45" />
          </linearGradient>

          {/* Snake Glow Gradient */}
          <linearGradient id="snakeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FB7185" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#FDA4AF" stopOpacity="0.45" />
          </linearGradient>
        </defs>

        {/* Draw Ladders */}
        {Object.entries(LADDERS).map(([start, end]) => {
          const startCoord = getCellCoordinates(Number(start));
          const endCoord = getCellCoordinates(Number(end));

          // Draw double rails and rungs
          const dx = endCoord.x - startCoord.x;
          const dy = endCoord.y - startCoord.y;
          const len = Math.hypot(dx, dy);
          const nx = (-dy / len) * 0.9; // Perpendicular offset
          const ny = (dx / len) * 0.9;

          return (
            <g key={`ladder-${start}-${end}`} opacity="0.48">
              {/* Left Rail */}
              <line
                x1={startCoord.x + nx}
                y1={startCoord.y + ny}
                x2={endCoord.x + nx}
                y2={endCoord.y + ny}
                stroke="#FCD34D"
                strokeWidth="0.7"
                strokeLinecap="round"
              />
              {/* Right Rail */}
              <line
                x1={startCoord.x - nx}
                y1={startCoord.y - ny}
                x2={endCoord.x - nx}
                y2={endCoord.y - ny}
                stroke="#FCD34D"
                strokeWidth="0.7"
                strokeLinecap="round"
              />
              {/* Ladder Rungs */}
              {Array.from({ length: 6 }).map((_, i) => {
                const t = (i + 1) / 7;
                const rx = startCoord.x + dx * t;
                const ry = startCoord.y + dy * t;
                return (
                  <line
                    key={`rung-${i}`}
                    x1={rx + nx}
                    y1={ry + ny}
                    x2={rx - nx}
                    y2={ry - ny}
                    stroke="#FDE68A"
                    strokeWidth="0.5"
                  />
                );
              })}
            </g>
          );
        })}

        {/* Draw Snakes */}
        {Object.entries(SNAKES).map(([start, end]) => {
          const head = getCellCoordinates(Number(start));
          const tail = getCellCoordinates(Number(end));

          // Sinuous bezier curve
          const midX = (head.x + tail.x) / 2 + (head.x > 50 ? -8 : 8);
          const midY = (head.y + tail.y) / 2;

          return (
            <g key={`snake-${start}-${end}`} opacity="0.48">
              <path
                d={`M ${head.x} ${head.y} Q ${midX} ${midY} ${tail.x} ${tail.y}`}
                fill="none"
                stroke="url(#snakeGlow)"
                strokeWidth="1.05"
                strokeDasharray="2, 1"
                strokeLinecap="round"
              />
              {/* Snake Head Dot */}
              <circle cx={head.x} cy={head.y} r="1.1" fill="#FB7185" />
              {/* Snake Tail Dot */}
              <circle cx={tail.x} cy={tail.y} r="0.7" fill="#FDA4AF" />
            </g>
          );
        })}
      </svg>

    </div>
  );
}
