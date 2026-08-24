// GESTION DU LECTEUR AUDIO
const bgMusic = document.getElementById('bg-music');
const audioToggle = document.getElementById('audio-toggle');
const audioIcon = document.getElementById('audio-icon');
const audioStatus = document.getElementById('audio-status');
const volumeSlider = document.getElementById('volume-slider');

let isPlaying = false;

audioToggle.addEventListener('click', () => {
  if (!isPlaying) {
    bgMusic.play().then(() => {
      isPlaying = true;
      audioStatus.textContent = "Musique : ON";
      audioIcon.textContent = "🎵";
    }).catch(err => console.log("Lecture bloquée :", err));
  } else {
    bgMusic.pause();
    isPlaying = false;
    audioStatus.textContent = "Musique : OFF";
    audioIcon.textContent = "🍺";
  }
});

volumeSlider.addEventListener('input', (e) => {
  bgMusic.volume = e.target.value;
});

// NAVIGATION SPA (SINGLE PAGE APPLICATION)
function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(section => {
    section.classList.remove('active');
  });
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  const targetSection = document.getElementById(tabId);
  if (targetSection) {
    targetSection.classList.add('active');
  }

  const targetBtn = document.querySelector(`[data-tab="${tabId}"]`);
  if (targetBtn) {
    targetBtn.classList.add('active');
  }
}

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.getAttribute('data-tab');
    switchTab(tab);
  });
});

// GESTION DES DOUBLONS & ÉNIGME
let doubloons = parseInt(localStorage.getItem('doubloons') || '0');

function updateDoubloonDisplay() {
  const el = document.getElementById('doubloon-count');
  if (el) el.textContent = doubloons;
}

const riddleData = {
  answer: "vent",
  hints: [
    "Indice 1 : On le sent sans jamais pouvoir le voir.",
    "Indice 2 : Essentiel pour pousser les voiles d'un navire.",
    "Indice 3 : Il peut être une douce brise ou une tempête."
  ],
  solved: false
};

function revealHint(index) {
  const hintEl = document.getElementById(`hint-${index}`);
  if (hintEl) {
    hintEl.textContent = riddleData.hints[index - 1];
  }
}

function submitAnswer() {
  const inputEl = document.getElementById('riddle-input');
  const feedbackEl = document.getElementById('riddle-feedback');
  const userAns = inputEl.value.toLowerCase().trim();

  if (riddleData.solved) {
    feedbackEl.textContent = "Tu as déjà résolu l'énigme du jour, capitaine !";
    feedbackEl.style.color = "#8b5a2b";
    return;
  }

  if (userAns.includes(riddleData.answer)) {
    feedbackEl.textContent = "Hardi ! Bonne réponse ! Tu empooches +50 Doubloons 🪙 !";
    feedbackEl.style.color = "var(--green-win)";
    doubloons += 50;
    localStorage.setItem('doubloons', doubloons);
    updateDoubloonDisplay();
    riddleData.solved = true;
  } else {
    feedbackEl.textContent = "Sacrebleu ! Ce n'est pas la bonne réponse. Retente ta chance !";
    feedbackEl.style.color = "var(--red-trap)";
  }
}

// MINI-JEU "LE TRÉSOR MAUDIT"
let currentScore = 0;
let bestScore = parseInt(localStorage.getItem('pirateBestScore') || '0');

function initGame() {
  currentScore = 0;
  document.getElementById('game-score').textContent = currentScore;
  document.getElementById('game-best').textContent = bestScore;

  const gridContainer = document.getElementById('game-grid');
  gridContainer.innerHTML = '';

  // 16 cases : 3 trésors, 3 pièges, 10 eaux
  const items = ['💰', '💰', '💰', '💀', '💀', '💀', '🌊', '🌊', '🌊', '🌊', '🌊', '🌊', '🌊', '🌊', '🌊', '🌊'];
  items.sort(() => Math.random() - 0.5);

  items.forEach(value => {
    const cell = document.createElement('div');
    cell.className = 'grid-cell';
    cell.dataset.value = value;
    cell.addEventListener('click', () => revealGameCell(cell));
    gridContainer.appendChild(cell);
  });
}

function revealGameCell(cell) {
  if (cell.classList.contains('revealed')) return;

  cell.classList.add('revealed');
  const val = cell.dataset.value;
  cell.textContent = val;

  if (val === '💰') {
    currentScore += 150;
  } else if (val === '💀') {
    currentScore = Math.max(0, currentScore - 50);
  }

  document.getElementById('game-score').textContent = currentScore;

  if (currentScore > bestScore) {
    bestScore = currentScore;
    localStorage.setItem('pirateBestScore', bestScore);
    document.getElementById('game-best').textContent = bestScore;
  }
}

function resetGame() {
  initGame();
}

// CARTE INTERACTIVE & MODAL
function openModal(title, text) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-text').textContent = text;
  document.getElementById('modal').style.display = 'flex';
}

function closeModalDirect() {
  document.getElementById('modal').style.display = 'none';
}

function closeModal(event) {
  if (event.target.id === 'modal') {
    closeModalDirect();
  }
}

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  updateDoubloonDisplay();
  initGame();
});
