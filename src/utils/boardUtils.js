/**
 * Board layout and coordinate calculation utilities
 */

export function getCellCoordinates(n) {
  const rowFromBottom = Math.floor((n - 1) / 10);
  const rowFromTop = 9 - rowFromBottom;
  const colInRow = (n - 1) % 10;
  const col = (rowFromBottom % 2 === 0) ? colInRow : 9 - colInRow;

  return {
    x: (col + 0.5) * 10,
    y: (rowFromTop + 0.5) * 10,
    col,
    row: rowFromTop,
  };
}
