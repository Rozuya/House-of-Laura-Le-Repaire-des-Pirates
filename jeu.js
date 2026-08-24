let score = 0;
let bestScore = parseInt(localStorage.getItem('bestScore') || '0');

function initGame() {
  score = 0;
  const board = document.getElementById('game-board');
  if (!board) return;
  
  board.innerHTML = '';
  document.getElementById('current-score').textContent = score;
  document.getElementById('best-score').textContent = bestScore;
  
  const items = ['💰', '💀', '🌊', '🌊', '🌊', '💰', '💀', '🌊', '🌊', '🌊', '💰', '🌊', '🌊', '🌊', '🌊', '🌊'];
  items.sort(() => Math.random() - 0.5);

  items.forEach((item) => {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.value = item;
    cell.addEventListener('click', () => revealCell(cell));
    board.appendChild(cell);
  });
}

function revealCell(cell) {
  if (cell.classList.contains('revealed')) return;
  cell.classList.add('revealed');
  const val = cell.dataset.value;
  cell.textContent = val;

  if (val === '💰') {
    score += 150;
  } else if (val === '💀') {
    score = Math.max(0, score - 50);
  }

  document.getElementById('current-score').textContent = score;

  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem('bestScore', bestScore);
    document.getElementById('best-score').textContent = bestScore;
  }
}

document.addEventListener('DOMContentLoaded', initGame);
