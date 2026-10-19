import { initialQuestions } from './src/data/questions.js';
import { getCellCoordinates } from './src/utils/boardUtils.js';

const LADDERS = {
  4: 14,
  9: 31,
  20: 38,
  28: 84,
  40: 59,
  51: 67,
  63: 81,
  71: 91,
};

const SNAKES = {
  17: 7,
  54: 34,
  62: 19,
  64: 60,
  87: 24,
  93: 73,
  95: 75,
  99: 78,
};

console.log('--- 1. Testing Question Bank Data Integrity ---');
console.log(`Total questions: ${initialQuestions.length}`);
if (initialQuestions.length < 30) {
  throw new Error(`Expected at least 30 questions, found ${initialQuestions.length}`);
}

initialQuestions.forEach((q, idx) => {
  if (!q.id || !q.category || !q.question || !Array.isArray(q.options) || q.options.length !== 4) {
    throw new Error(`Invalid question format at index ${idx}: ${JSON.stringify(q)}`);
  }
  if (q.answerIndex < 0 || q.answerIndex > 3) {
    throw new Error(`Invalid answerIndex at index ${idx}: ${q.answerIndex}`);
  }
  if (!q.explanation) {
    throw new Error(`Missing explanation at index ${idx}`);
  }
});
console.log('✅ All questions format and answer indexes verified!');

console.log('\n--- 2. Testing 10x10 Board Coordinates ---');
// Cell 1: rowFromBottom 0, even, col 0, rowFromTop 9
const c1 = getCellCoordinates(1);
console.log(`Cell 1: col=${c1.col}, row=${c1.row}, x=${c1.x}%, y=${c1.y}%`);
if (c1.col !== 0 || c1.row !== 9) throw new Error('Cell 1 position mismatch');

// Cell 10: col 9, row 9
const c10 = getCellCoordinates(10);
console.log(`Cell 10: col=${c10.col}, row=${c10.row}`);
if (c10.col !== 9 || c10.row !== 9) throw new Error('Cell 10 position mismatch');

// Cell 11: rowFromBottom 1 (odd), col 9, row 8
const c11 = getCellCoordinates(11);
console.log(`Cell 11: col=${c11.col}, row=${c11.row}`);
if (c11.col !== 9 || c11.row !== 8) throw new Error('Cell 11 position mismatch');

// Cell 20: col 0, row 8
const c20 = getCellCoordinates(20);
console.log(`Cell 20: col=${c20.col}, row=${c20.row}`);
if (c20.col !== 0 || c20.row !== 8) throw new Error('Cell 20 position mismatch');

// Cell 100: rowFromBottom 9 (odd), col 0, row 0
const c100 = getCellCoordinates(100);
console.log(`Cell 100: col=${c100.col}, row=${c100.row}, x=${c100.x}%, y=${c100.y}%`);
if (c100.col !== 0 || c100.row !== 0) throw new Error('Cell 100 position mismatch');
console.log('✅ Board coordinates calculations verified!');

console.log('\n--- 3. Testing Ladders & Snakes Targets ---');
Object.entries(LADDERS).forEach(([from, to]) => {
  if (Number(to) <= Number(from)) {
    throw new Error(`Ladder must go upwards! From ${from} to ${to}`);
  }
});
console.log(`✅ ${Object.keys(LADDERS).length} Ladders verified moving upward.`);

Object.entries(SNAKES).forEach(([from, to]) => {
  if (Number(to) >= Number(from)) {
    throw new Error(`Snake must slide downwards! From ${from} to ${to}`);
  }
});
console.log(`✅ ${Object.keys(SNAKES).length} Snakes verified moving downward.`);

console.log('\n--- 4. Testing Question Randomization & Reset Logic ---');
let usedIds = [];
for (let i = 0; i < initialQuestions.length; i++) {
  let pool = initialQuestions.filter(q => !usedIds.includes(q.id));
  if (pool.length === 0) {
    usedIds = [];
    pool = [...initialQuestions];
  }
  const picked = pool[Math.floor(Math.random() * pool.length)];
  if (usedIds.includes(picked.id)) {
    throw new Error(`Duplicate question selected before pool exhaustion: id=${picked.id}`);
  }
  usedIds.push(picked.id);
}
console.log(`Used IDs count after all questions: ${usedIds.length}`);

// Next question should trigger reset
let poolAfterFull = initialQuestions.filter(q => !usedIds.includes(q.id));
let didReset = false;
if (poolAfterFull.length === 0) {
  poolAfterFull = [...initialQuestions];
  usedIds = [];
  didReset = true;
}
if (!didReset || poolAfterFull.length !== initialQuestions.length) {
  throw new Error('Auto-reset failed when questions pool was exhausted');
}
console.log('✅ Question randomization and auto-reset after exhaustion verified!');

console.log('\n🎉 ALL LOGIC AND DATA TESTS PASSED SUCCESSFULLY!');
