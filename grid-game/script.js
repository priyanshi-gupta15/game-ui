// ════════════════════════════════════════════════════
// AUDIO ENGINE (Web Audio API — no files needed)
// ════════════════════════════════════════════════════
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx;
function ensureAudio() { if (!audioCtx) audioCtx = new AudioCtx(); }

function playTone(freq, duration, type = 'square', vol = 0.1) {
  ensureAudio();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  gain.gain.setValueAtTime(vol, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}
function sfxCollect() { playTone(880, 0.12, 'sine', 0.12); setTimeout(() => playTone(1320, 0.1, 'sine', 0.1), 60); }
function sfxHit()     { playTone(120, 0.25, 'sawtooth', 0.15); }
function sfxMove()    { playTone(440, 0.04, 'sine', 0.04); }
function sfxWin()     { [523,659,784,1047].forEach((f,i) => setTimeout(() => playTone(f, 0.2, 'sine', 0.12), i*100)); }
function sfxLose()    { [300,250,200,150].forEach((f,i) => setTimeout(() => playTone(f, 0.25, 'sawtooth', 0.1), i*120)); }

// ════════════════════════════════════════════════════
// PARTICLES
// ════════════════════════════════════════════════════
function spawnParticles(x, y, color, count = 10) {
  const cont = document.getElementById('particles');
  if (!cont) return;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const angle = Math.random() * Math.PI * 2;
    const dist = 30 + Math.random() * 60;
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    p.style.background = color;
    p.style.setProperty('--px', Math.cos(angle) * dist + 'px');
    p.style.setProperty('--py', Math.sin(angle) * dist + 'px');
    p.style.width = (3 + Math.random() * 5) + 'px';
    p.style.height = p.style.width;
    cont.appendChild(p);
    setTimeout(() => p.remove(), 600);
  }
}

// ════════════════════════════════════════════════════
// GAME STATE
// ════════════════════════════════════════════════════
let ROWS = 30, COLS = 10;
let selectedPattern = 1;
let currentLevel = 1;
let grid = [];
let playerR = 0, playerC = 0;
let prevR = 0, prevC = 0;
let lives = 5, score = 0, totalBlue = 0;
let timeLeft = 30;
let timerInterval = null;
let gameStarted = false, gameOver = false;

const T = { EMPTY: 'empty', BLUE: 'blue', RED: 'red', GREEN: 'green' };

// ════════════════════════════════════════════════════
// TRANSITION HELPER
// ════════════════════════════════════════════════════
function applyGridFade(callback) {
  const container = document.getElementById('gridContainer');
  container.classList.add('grid-fade-out');
  setTimeout(() => {
    callback();
    container.classList.remove('grid-fade-out');
  }, 300);
}

// ════════════════════════════════════════════════════
// SETUP CONTROLS
// ════════════════════════════════════════════════════
function setPattern(p) {
  selectedPattern = p;
  document.getElementById('btnP1').classList.toggle('active-pattern', p === 1);
  document.getElementById('btnP2').classList.toggle('active-pattern', p === 2);
}

function generateGrid() {
  applyGridFade(() => {
    ROWS = Math.max(10, parseInt(document.getElementById('rowsInput').value) || 30);
    COLS = Math.max(10, parseInt(document.getElementById('colsInput').value) || 10);
    document.getElementById('rowsInput').value = ROWS;
    document.getElementById('colsInput').value = COLS;
    currentLevel = selectedPattern;
    resetGame();
  });
}

function resetGame() {
  clearInterval(timerInterval);
  timerInterval = null;
  lives = 5; score = 0; timeLeft = 30;
  gameStarted = false; gameOver = false;

  currentLevel === 1 ? buildPattern1() : buildPattern2();
  totalBlue = countBlue();

  // Place player at bottom-left safe cell
  playerR = ROWS - 1; playerC = 0;
  findSafeStart();
  grid[playerR][playerC] = T.EMPTY;
  prevR = playerR; prevC = playerC;

  document.getElementById('hud').classList.add('show');
  hideOverlay();
  updateHUD();
  renderGrid();
}

function findSafeStart() {
  if (grid[playerR][playerC] !== T.RED && grid[playerR][playerC] !== T.BLUE) return;
  for (let c = 0; c < COLS; c++) {
    if (grid[ROWS-1][c] === T.EMPTY || grid[ROWS-1][c] === T.GREEN) {
      playerC = c; return;
    }
  }
  for (let r = ROWS - 1; r >= 0; r--) {
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c] === T.EMPTY || grid[r][c] === T.GREEN) {
        playerR = r; playerC = c; return;
      }
    }
  }
}

// ════════════════════════════════════════════════════
// PATTERN 1 — INTERLOCKING DIAMONDS
// ════════════════════════════════════════════════════
function buildPattern1() {
  grid = Array.from({ length: ROWS }, () => Array(COLS).fill(T.EMPTY));

  const centerC = Math.floor(COLS / 2);
  const halfH = Math.max(3, Math.floor(COLS / 2) - 1);

  let row = 0;
  while (row < ROWS - 1) {
    for (let i = 0; i <= halfH && row + i < ROWS - 1; i++) {
      const r = row + i;
      const left  = centerC - i;
      const right = centerC + i;
      if (left >= 0 && left < COLS)  grid[r][left]  = T.RED;
      if (right >= 0 && right < COLS && right !== left) grid[r][right] = T.RED;
    }
    for (let i = 1; i <= halfH && row + halfH + i < ROWS - 1; i++) {
      const r = row + halfH + i;
      const span = halfH - i;
      const left  = centerC - span;
      const right = centerC + span;
      if (left >= 0 && left < COLS)  grid[r][left]  = T.RED;
      if (right >= 0 && right < COLS && right !== left) grid[r][right] = T.RED;
    }

    if (row < ROWS - 1) {
      if (centerC - 1 >= 0) grid[row][centerC - 1] = T.BLUE;
      if (centerC + 1 < COLS) grid[row][centerC + 1] = T.BLUE;
    }

    const wideRow = row + halfH;
    if (wideRow < ROWS - 1) {
      const outerL = centerC - halfH - 1;
      const outerR = centerC + halfH + 1;
      if (outerL >= 0) grid[wideRow][outerL] = T.BLUE;
      if (outerR < COLS) grid[wideRow][outerR] = T.BLUE;
      if (0 < outerL) grid[wideRow][0] = T.BLUE;
      if (COLS - 1 > outerR) grid[wideRow][COLS - 1] = T.BLUE;
    }

    const bottomVertex = row + halfH * 2;
    if (bottomVertex < ROWS - 1) {
      if (centerC - 1 >= 0) grid[bottomVertex][centerC - 1] = T.BLUE;
      if (centerC + 1 < COLS) grid[bottomVertex][centerC + 1] = T.BLUE;
    }
    row += halfH * 2;
  }
  for (let c = 0; c < COLS; c++) grid[ROWS - 1][c] = T.GREEN;

  let extra = 0, attempts = 0;
  const targetExtra = Math.floor(ROWS * COLS * 0.015);
  while (extra < targetExtra && attempts < 500) {
    const r = Math.floor(Math.random() * (ROWS - 1));
    const c = Math.floor(Math.random() * COLS);
    if (grid[r][c] === T.EMPTY) { grid[r][c] = T.BLUE; extra++; }
    attempts++;
  }
}

// ════════════════════════════════════════════════════
// PATTERN 2 — MAZE
// ════════════════════════════════════════════════════
function buildPattern2() {
  grid = Array.from({ length: ROWS }, () => Array(COLS).fill(T.GREEN));
  const visited = Array.from({ length: ROWS }, () => Array(COLS).fill(false));

  function carve(r, c) {
    visited[r][c] = true;
    grid[r][c] = T.EMPTY;
    for (const [dr, dc] of shuffle([[0,2],[0,-2],[2,0],[-2,0]])) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && !visited[nr][nc]) {
        grid[r + dr / 2][c + dc / 2] = T.EMPTY;
        carve(nr, nc);
      }
    }
  }
  carve(1, 1);
  grid[ROWS - 1][0] = T.EMPTY;
  grid[ROWS - 2][0] = T.EMPTY;
  if (ROWS > 2) grid[ROWS - 3][0] = T.EMPTY;

  let placed = 0, att = 0;
  const target = 12 + Math.floor(Math.random() * 10);
  while (placed < target && att < 600) {
    const r = Math.floor(Math.random() * ROWS);
    const c = Math.floor(Math.random() * COLS);
    if (grid[r][c] === T.EMPTY && !(r === ROWS - 1 && c === 0)) { grid[r][c] = T.BLUE; placed++; }
    att++;
  }
  let rp = 0; att = 0;
  const rTarget = 5 + Math.floor(Math.random() * 5);
  while (rp < rTarget && att < 400) {
    const r = Math.floor(Math.random() * ROWS);
    const c = Math.floor(Math.random() * COLS);
    if (grid[r][c] === T.EMPTY && !(r === ROWS - 1 && c === 0)) { grid[r][c] = T.RED; rp++; }
    att++;
  }
}

function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }

// ════════════════════════════════════════════════════
// RENDER GRID
// ════════════════════════════════════════════════════
function renderGrid() {
  const container = document.getElementById('gridContainer');
  const maxW = window.innerWidth - 40;
  const maxH = window.innerHeight - 360;
  const cellSize = Math.max(16, Math.min(Math.floor(maxW / COLS), Math.floor(maxH / ROWS), 36));

  container.style.gridTemplateColumns = `repeat(${COLS}, ${cellSize}px)`;
  container.style.gridTemplateRows = `repeat(${ROWS}, ${cellSize}px)`;
  container.innerHTML = '';

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.r = r;
      cell.dataset.c = c;
      const num = r * COLS + c + 1;

      if (r === playerR && c === playerC) {
        cell.classList.add('cell-player');
        cell.textContent = '★';
      } else {
        switch (grid[r][c]) {
          case T.BLUE:  cell.classList.add('cell-blue');  break;
          case T.RED:   cell.classList.add('cell-red');   break;
          case T.GREEN: cell.classList.add('cell-green'); break;
          default:      cell.classList.add('cell-empty'); cell.textContent = num; break;
        }
      }
      if (!gameOver && isAdj(r, c)) cell.classList.add('cell-adjacent');
      cell.addEventListener('click', () => handleMove(r, c));
      container.appendChild(cell);
    }
  }
}

// ════════════════════════════════════════════════════
// MOVEMENT
// ════════════════════════════════════════════════════
function isAdj(r, c) { return Math.abs(r - playerR) + Math.abs(c - playerC) === 1; }

function handleMove(r, c) {
  if (gameOver || !isAdj(r, c)) return;
  ensureAudio();
  if (!gameStarted) { gameStarted = true; startTimer(); }
  const tile = grid[r][c];

  if (tile === T.RED) {
    sfxHit();
    const el = document.querySelector(`[data-r="${r}"][data-c="${c}"]`);
    if (el) { el.classList.remove('cell-flash'); void el.offsetWidth; el.classList.add('cell-flash'); }
    const wrapper = document.getElementById('gridWrapper');
    wrapper.classList.remove('shake'); void wrapper.offsetWidth; wrapper.classList.add('shake');
    if (el) {
      const rect = el.getBoundingClientRect();
      spawnParticles(rect.left + rect.width/2, rect.top + rect.height/2, 'var(--red)', 12);
    }
    lives--;
    updateHUD();
    if (lives <= 0) endGame(false);
    return;
  }

  sfxMove();
  prevR = playerR; prevC = playerC;
  playerR = r; playerC = c;

  if (tile === T.BLUE) {
    sfxCollect();
    score++;
    grid[r][c] = T.EMPTY;
    const el = document.querySelector(`[data-r="${r}"][data-c="${c}"]`);
    if (el) {
      const rect = el.getBoundingClientRect();
      spawnParticles(rect.left + rect.width/2, rect.top + rect.height/2, 'var(--blue)', 14);
    }
  }
  updateHUD();
  renderGrid();
  if (score >= totalBlue) {
    currentLevel === 1 ? showLevelComplete() : endGame(true);
  }
}

document.addEventListener('keydown', e => {
  if (gameOver) return;
  let nr = playerR, nc = playerC;
  switch (e.key) {
    case 'ArrowUp': case 'w': case 'W':    nr--; break;
    case 'ArrowDown': case 's': case 'S':  nr++; break;
    case 'ArrowLeft': case 'a': case 'A':  nc--; break;
    case 'ArrowRight': case 'd': case 'D': nc++; break;
    default: return;
  }
  e.preventDefault();
  if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) handleMove(nr, nc);
});

// ════════════════════════════════════════════════════
// TIMER
// ════════════════════════════════════════════════════
function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    updateHUD();
    if (timeLeft <= 0) { clearInterval(timerInterval); endGame(false); }
  }, 1000);
}

// ════════════════════════════════════════════════════
// HUD
// ════════════════════════════════════════════════════
function updateHUD() {
  let h = '';
  for (let i = 0; i < 5; i++) h += i < lives ? '❤' : '<span class="heart-lost">🖤</span>';
  document.getElementById('hudHearts').innerHTML = h;
  const timerEl = document.getElementById('hudTimer');
  const m = Math.floor(Math.max(timeLeft, 0) / 60);
  const s = String(Math.max(timeLeft, 0) % 60).padStart(2, '0');
  timerEl.textContent = `${m}:${s}`;
  timerEl.classList.toggle('timer-danger', timeLeft <= 10 && timeLeft > 0);
  document.getElementById('hudScore').textContent = `${score} / ${totalBlue}`;
  document.getElementById('hudLevel').textContent = currentLevel === 1 ? 'DIAMONDS' : 'MAZE';
}

function countBlue() {
  let n = 0;
  for (const row of grid) for (const c of row) if (c === T.BLUE) n++;
  return n;
}

// ════════════════════════════════════════════════════
// END GAME / LEVEL TRANSITION
// ════════════════════════════════════════════════════
function endGame(won) {
  gameOver = true;
  clearInterval(timerInterval);
  renderGrid();
  const icon  = document.getElementById('overlayIcon');
  const title = document.getElementById('overlayTitle');
  const msg   = document.getElementById('overlayMsg');
  const stats = document.getElementById('overlayStats');
  const btn   = document.getElementById('overlayBtn');

  if (won) {
    sfxWin();
    icon.textContent = '🏆';
    title.className = 'win-text';
    title.textContent = 'YOU WIN!';
    msg.textContent = 'All targets collected. Mission accomplished!';
  } else {
    sfxLose();
    icon.textContent = '💀';
    title.className = 'lose-text';
    title.textContent = 'GAME OVER';
    msg.textContent = lives <= 0 ? 'All lives lost.' : 'Time expired.';
  }
  stats.innerHTML = `
    <div class="overlay-stat"><div class="overlay-stat-val">${score}</div><div class="overlay-stat-label">Collected</div></div>
    <div class="overlay-stat"><div class="overlay-stat-val">${totalBlue}</div><div class="overlay-stat-label">Total</div></div>
    <div class="overlay-stat"><div class="overlay-stat-val">${lives}</div><div class="overlay-stat-label">Lives Left</div></div>
  `;
  btn.textContent = 'PLAY AGAIN';
  btn.onclick = playAgain;
  showOverlay();
}

function showLevelComplete() {
  clearInterval(timerInterval);
  gameOver = true;
  sfxWin();
  const icon  = document.getElementById('overlayIcon');
  const title = document.getElementById('overlayTitle');
  const msg   = document.getElementById('overlayMsg');
  const stats = document.getElementById('overlayStats');
  const btn   = document.getElementById('overlayBtn');

  icon.textContent = '⚡';
  title.className = 'lvl-text';
  title.textContent = 'LEVEL COMPLETE!';
  msg.textContent = 'Diamond field cleared! Entering the maze in 2 seconds...';
  stats.innerHTML = `
    <div class="overlay-stat"><div class="overlay-stat-val">${score}</div><div class="overlay-stat-label">Points</div></div>
    <div class="overlay-stat"><div class="overlay-stat-val">${lives}</div><div class="overlay-stat-label">Lives Left</div></div>
  `;
  btn.textContent = 'CONTINUE NOW →';
  
  const transition = () => {
    applyGridFade(() => {
      currentLevel = 2;
      score = 0; timeLeft = 30;
      gameStarted = false; gameOver = false;
      buildPattern2();
      totalBlue = countBlue();
      playerR = ROWS - 1; playerC = 0;
      findSafeStart();
      grid[playerR][playerC] = T.EMPTY;
      prevR = playerR; prevC = playerC;
      hideOverlay();
      updateHUD();
      renderGrid();
    });
  };

  btn.onclick = transition;
  showOverlay();

  // Automatic transition after 2 seconds
  setTimeout(() => {
    if (gameOver && currentLevel === 1) {
      transition();
    }
  }, 2000);
}

function showOverlay() { document.getElementById('overlay').classList.add('visible'); }
function hideOverlay() { document.getElementById('overlay').classList.remove('visible'); }
function playAgain() { 
  applyGridFade(() => {
    currentLevel = selectedPattern; 
    hideOverlay(); 
    resetGame(); 
  });
}

// ════════════════════════════════════════════════════
// BOOT
// ════════════════════════════════════════════════════
generateGrid();
