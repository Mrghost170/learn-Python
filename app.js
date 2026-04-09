// ============================================================
// PyQuest — Main Application Logic v2
// ============================================================

// ── Multi-User State ──────────────────────────────────────────
let CURRENT_USER = null;  // { username, heroClass, ...stats }

let STATE = {
  xp: 0,
  completedLessons: [],
  completedWorlds: [],
  bossDefeated: [],
  currentWorld: null,
  currentLessonId: null,
  currentBossWorld: null,
  achievements: []
};

let BOSS_BATTLE = {
  questions: [], currentQ: 0,
  bossHP: 100, playerHP: 100, streak: 0, answers: []
};

// ── Persistence ────────────────────────────────────────────────
function getAllProfiles() {
  try { return JSON.parse(localStorage.getItem('pyquest_profiles') || '{}'); }
  catch(e) { return {}; }
}

function saveProfile() {
  if (!CURRENT_USER) return;
  const profiles = getAllProfiles();
  profiles[CURRENT_USER.username] = {
    username: CURRENT_USER.username,
    heroClass: CURRENT_USER.heroClass,
    lastLogin: new Date().toISOString(),
    state: STATE
  };
  localStorage.setItem('pyquest_profiles', JSON.stringify(profiles));
}

function loadProfile(username) {
  const profiles = getAllProfiles();
  return profiles[username] || null;
}

function saveState() { saveProfile(); }

function loadState() {
  if (!CURRENT_USER) return;
  const profile = loadProfile(CURRENT_USER.username);
  if (profile && profile.state) {
    STATE = { ...STATE, ...profile.state };
  }
}

// ── DOM Helpers ───────────────────────────────────────────────
function $(id) { return document.getElementById(id); }

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  const el = $(id);
  if (el) { el.classList.remove('hidden'); window.scrollTo({ top: 0, behavior: 'smooth' }); }

  const hudScreens = ['screen-worldmap','screen-world','screen-lesson','screen-boss','screen-profile','screen-victory','screen-defeat'];
  $('game-hud').style.display = hudScreens.includes(id) ? 'flex' : 'none';
  if (hudScreens.includes(id)) updateHUD();
}

function updateHUD() {
  const rank = getRank(STATE.xp);
  $('hud-xp').textContent = STATE.xp.toLocaleString();
  $('hud-rank').textContent = rank.icon + ' ' + rank.name;
  $('hud-worlds').textContent = STATE.completedWorlds.length + '/7';
  if (CURRENT_USER) {
    $('hud-user-badge').textContent = classIcon(CURRENT_USER.heroClass) + ' ' + CURRENT_USER.username;
  }

  const ranks = RANKS;
  const currentIdx = ranks.findIndex(r => r.name === rank.name);
  const nextRank = ranks[currentIdx + 1];
  let pct = 100;
  if (nextRank) pct = ((STATE.xp - rank.minXP) / (nextRank.minXP - rank.minXP)) * 100;
  $('hud-xp-bar').style.width = Math.min(100, pct) + '%';
}

function classIcon(cls) {
  if (cls === 'Mage')   return '🔮';
  if (cls === 'Rogue')  return '🗡️';
  return '⚔️';
}

// ── Particles ─────────────────────────────────────────────────
function initParticles() {
  const canvas = $('particle-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  const symbols = ['def','for','while','if','else','class','return','import','print','{}','()','[]','#','+=','==','->','yield','try','lambda'];

  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  function spawnParticle() {
    return { x: Math.random()*W, y: Math.random()*H, text: symbols[Math.floor(Math.random()*symbols.length)],
             speed: 0.15+Math.random()*0.35, opacity: 0.02+Math.random()*0.06, size: 10+Math.random()*6, drift: (Math.random()-0.5)*0.2 };
  }
  window.addEventListener('resize', resize);
  resize();
  particles = Array.from({ length: 60 }, spawnParticle);
  function animate() {
    ctx.clearRect(0, 0, W, H);
    ctx.font = `400 13px 'JetBrains Mono', monospace`;
    particles.forEach(p => {
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = '#00d4ff';
      ctx.fillText(p.text, p.x, p.y);
      p.y -= p.speed; p.x += p.drift;
      if (p.y < -20) { p.y = H + 20; p.x = Math.random()*W; }
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }
  animate();
}

// ── Toast ─────────────────────────────────────────────────────
function toast(msg, type='default') {
  const container = $('toast-container');
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.innerHTML = msg;
  container.appendChild(t);
  setTimeout(() => { if (t.parentNode) t.parentNode.removeChild(t); }, 3200);
}

function floatXP(amount, x, y) {
  const el = document.createElement('div');
  el.className = 'xp-float';
  el.textContent = '+' + amount + ' XP';
  el.style.left = (x || window.innerWidth/2-40) + 'px';
  el.style.top  = (y || window.innerHeight/2) + 'px';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1300);
}

function flashScreen(type) {
  const el = $('damage-flash');
  el.className = 'damage-flash';
  void el.offsetWidth;
  el.classList.add(type === 'hit' ? 'flash-red' : 'flash-green');
}

// ── World Helpers ─────────────────────────────────────────────
function isWorldUnlocked(worldId) {
  if (worldId === 1) return true;
  return STATE.bossDefeated.includes(worldId - 1);
}

function worldProgress(world) {
  const completed = world.lessons.filter(l => STATE.completedLessons.includes(l.id)).length;
  return { completed, total: world.lessons.length };
}

function allLessonsComplete(world) {
  return world.lessons.every(l => STATE.completedLessons.includes(l.id));
}

function getNextItem() {
  for (const world of WORLDS) {
    if (!isWorldUnlocked(world.id)) continue;
    // Find first incomplete lesson
    for (let i = 0; i < world.lessons.length; i++) {
      const lesson = world.lessons[i];
      if (!STATE.completedLessons.includes(lesson.id)) {
        const lessonUnlocked = i === 0 || STATE.completedLessons.includes(world.lessons[i-1].id);
        if (lessonUnlocked) return { type: 'lesson', world, lesson };
      }
    }
    // All lessons done but boss not defeated
    if (allLessonsComplete(world) && !STATE.bossDefeated.includes(world.id)) {
      return { type: 'boss', world };
    }
  }
  return null;
}

// ══════════════════════════════════════════════════════════════
// LOGIN SCREEN
// ══════════════════════════════════════════════════════════════
function renderLogin() {
  showScreen('screen-login');
  populateSavedHeroes();
  setupLoginTabs();
  setupSignup();
  setupLogin();
}

function populateSavedHeroes() {
  const profiles = getAllProfiles();
  const container = $('saved-heroes');
  container.innerHTML = '';
  const keys = Object.keys(profiles);
  if (keys.length === 0) return;
  const label = document.createElement('div');
  label.style.cssText = 'font-size:11px;color:var(--text-dim);margin-bottom:4px;font-family:"Press Start 2P",monospace;font-size:8px;';
  label.textContent = 'Saved Heroes:';
  container.appendChild(label);
  const row = document.createElement('div');
  row.className = 'saved-heroes';
  keys.forEach(username => {
    const p = profiles[username];
    const chip = document.createElement('div');
    chip.className = 'saved-hero-chip';
    const xp = p.state?.xp || 0;
    chip.innerHTML = `${classIcon(p.heroClass)} ${username}<small>⭐ ${xp} XP</small>`;
    chip.addEventListener('click', () => {
      $('login-username').value = username;
    });
    row.appendChild(chip);
  });
  container.appendChild(row);
}

function setupLoginTabs() {
  $('tab-login').addEventListener('click', () => {
    $('tab-login').classList.add('active');
    $('tab-signup').classList.remove('active');
    $('login-form-panel').style.display = 'block';
    $('signup-form-panel').style.display = 'none';
  });
  $('tab-signup').addEventListener('click', () => {
    $('tab-signup').classList.add('active');
    $('tab-login').classList.remove('active');
    $('signup-form-panel').style.display = 'block';
    $('login-form-panel').style.display = 'none';
  });
}

let selectedClass = 'Warrior';
function setupSignup() {
  document.querySelectorAll('.class-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.class-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      selectedClass = card.dataset.class;
    });
  });

  $('btn-signup').addEventListener('click', () => {
    const username = $('signup-username').value.trim();
    if (!username || username.length < 2) { toast('⚠️ Hero name must be at least 2 characters!', 'error'); return; }
    const profiles = getAllProfiles();
    if (profiles[username]) { toast('⚠️ That hero name is taken! Try logging in.', 'error'); return; }

    CURRENT_USER = { username, heroClass: selectedClass };
    STATE = { xp:0, completedLessons:[], completedWorlds:[], bossDefeated:[], currentWorld:null, currentLessonId:null, currentBossWorld:null, achievements:[] };
    saveProfile();
    toast(`🎉 Welcome, ${username} the ${selectedClass}!`, 'success');
    setTimeout(() => renderWorldMap(), 500);
  });
}

function setupLogin() {
  $('btn-login').addEventListener('click', () => {
    const username = $('login-username').value.trim();
    if (!username) { toast('⚠️ Enter your hero name!', 'error'); return; }
    const profile = loadProfile(username);
    if (!profile) { toast('❌ Hero not found! Create a new hero first.', 'error'); return; }
    CURRENT_USER = { username: profile.username, heroClass: profile.heroClass };
    STATE = { xp:0, completedLessons:[], completedWorlds:[], bossDefeated:[], currentWorld:null, currentLessonId:null, currentBossWorld:null, achievements:[], ...profile.state };
    toast(`⚔️ Welcome back, ${username}!`, 'success');
    setTimeout(() => renderWorldMap(), 400);
  });

  $('login-username').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') $('btn-login').click();
  });
}

// ══════════════════════════════════════════════════════════════
// WORLD MAP
// ══════════════════════════════════════════════════════════════
function renderWorldMap() {
  const grid = $('worlds-grid');
  grid.innerHTML = '';

  // Resume banner
  const next = getNextItem();
  const resumeBanner = $('resume-banner');
  if (next && (STATE.completedLessons.length > 0 || STATE.bossDefeated.length > 0)) {
    resumeBanner.style.display = 'flex';
    const desc = $('resume-desc');
    if (next.type === 'lesson') {
      desc.textContent = `${next.world.icon} ${next.world.title} → ${next.lesson.icon} ${next.lesson.title}`;
    } else {
      desc.textContent = `${next.world.icon} ${next.world.title} → ⚔️ Boss Battle`;
    }
    $('btn-resume').onclick = () => {
      if (next.type === 'lesson') renderLesson(next.world.id, next.lesson.id);
      else startBossBattle(next.world.id);
    };
  } else {
    resumeBanner.style.display = 'none';
  }

  WORLDS.forEach(world => {
    const unlocked = isWorldUnlocked(world.id);
    const bossDefeated = STATE.bossDefeated.includes(world.id);
    const prog = worldProgress(world);
    const pct = prog.total ? (prog.completed / prog.total) * 100 : 0;

    let statusText, statusClass;
    if (bossDefeated) { statusText = '✓ Completed'; statusClass = 'completed'; }
    else if (unlocked) { statusText = '▶ Active'; statusClass = 'unlocked'; }
    else { statusText = '🔒 Locked'; statusClass = 'locked'; }

    const card = document.createElement('div');
    card.className = `world-card ${unlocked ? '' : 'locked'} ${bossDefeated ? 'completed' : ''}`;
    card.style.setProperty('--world-color', world.color);
    card.innerHTML = `
      ${!unlocked ? '<div class="lock-overlay">🔒</div>' : ''}
      <div class="world-card-top">
        <span class="world-number">World ${world.id}</span>
        <span class="world-status-badge ${statusClass}">${statusText}</span>
      </div>
      <span class="world-icon">${world.icon}</span>
      <h2>${world.title}</h2>
      <p>${world.subtitle}</p>
      <div class="world-progress-bar">
        <div class="world-progress-fill" style="width:${unlocked ? pct : 0}%"></div>
      </div>
      <div class="world-meta">
        <span class="world-lesson-count">📖 ${prog.completed}/${prog.total} lessons</span>
        <span class="world-xp-reward">⭐ ${world.xpReward} XP</span>
      </div>`;

    if (unlocked) card.addEventListener('click', () => renderWorldScreen(world.id));
    else card.addEventListener('click', () => toast(`🔒 Defeat the boss of World ${world.id-1} to unlock!`, 'error'));
    grid.appendChild(card);
  });

  showScreen('screen-worldmap');
}

// ══════════════════════════════════════════════════════════════
// WORLD SCREEN
// ══════════════════════════════════════════════════════════════
function renderWorldScreen(worldId) {
  const world = WORLDS.find(w => w.id === worldId);
  STATE.currentWorld = worldId;
  saveState();

  const container = $('screen-world');
  const bossDefeated = STATE.bossDefeated.includes(world.id);
  const bossLocked = !allLessonsComplete(world);

  container.innerHTML = `
    <div class="world-screen-header">
      <span class="world-screen-icon">${world.icon}</span>
      <h1 style="color:${world.color}">${world.title}</h1>
      <p>${world.subtitle} — Complete all lessons, then face the Boss!</p>
    </div>
    <div class="lessons-list" id="lessons-list"></div>
    <div class="boss-card ${bossDefeated ? 'boss-completed' : ''} ${bossLocked ? 'boss-locked' : ''}" id="boss-card">
      <span class="boss-icon-large">${world.boss.icon}</span>
      <div class="boss-info">
        <span class="boss-tag">${bossDefeated ? '✓ Defeated' : '⚔️ Boss Battle'}</span>
        <h2>${world.boss.name}</h2>
        <p>${bossLocked ? 'Complete all lessons to unlock the boss battle!' : world.boss.description}</p>
        ${!bossDefeated && !bossLocked ? `<p style="color:var(--gold);margin-top:10px;font-size:13px;font-weight:600;">⭐ Reward: ${world.boss.xpReward} XP</p>` : ''}
      </div>
    </div>`;

  const lessonsList = container.querySelector('#lessons-list');
  world.lessons.forEach((lesson, idx) => {
    const completed = STATE.completedLessons.includes(lesson.id);
    const lessonUnlocked = idx === 0 || STATE.completedLessons.includes(world.lessons[idx-1].id);
    const item = document.createElement('div');
    item.className = `lesson-item ${completed ? 'completed' : ''} ${!lessonUnlocked ? 'locked' : ''}`;
    item.style.setProperty('--world-color', world.color);
    item.innerHTML = `
      <div class="lesson-item-icon">${lesson.icon}</div>
      <div class="lesson-item-body">
        <div class="lesson-item-title">${lesson.title}</div>
        <div class="lesson-item-xp">⭐ ${lesson.xp} XP · ${lesson.quiz.length} questions</div>
      </div>
      <span class="lesson-item-check">${completed ? '✅' : lessonUnlocked ? '▶' : '🔒'}</span>`;

    if (lessonUnlocked) item.addEventListener('click', () => renderLesson(worldId, lesson.id));
    else item.addEventListener('click', () => toast('Complete the previous lesson first!', 'error'));
    lessonsList.appendChild(item);
  });

  const bossCard = container.querySelector('#boss-card');
  if (!bossLocked && !bossDefeated) bossCard.addEventListener('click', () => startBossBattle(worldId));
  else if (bossDefeated) bossCard.addEventListener('click', () => toast("✅ You've already defeated this boss!", 'success'));
  else bossCard.addEventListener('click', () => toast('🔒 Complete all lessons first!', 'error'));

  showScreen('screen-world');
}

// ══════════════════════════════════════════════════════════════
// LESSON SCREEN
// ══════════════════════════════════════════════════════════════
function renderLesson(worldId, lessonId) {
  const world = WORLDS.find(w => w.id === worldId);
  const lesson = world.lessons.find(l => l.id === lessonId);
  const isCompleted = STATE.completedLessons.includes(lessonId);
  STATE.currentLessonId = lessonId;
  saveState();

  const container = $('screen-lesson');
  container.style.setProperty('--lesson-color', world.color);
  container.innerHTML = `
    <div class="lesson-breadcrumb">
      <a onclick="renderWorldMap()">World Map</a>
      <span>›</span>
      <a onclick="renderWorldScreen(${worldId})">${world.icon} ${world.title}</a>
      <span>›</span>
      <span>${lesson.title}</span>
    </div>
    <div class="lesson-header">
      <div class="lesson-icon-badge">${lesson.icon}</div>
      <div>
        <h1>${lesson.title}</h1>
        <p>World ${worldId}: ${world.title} &nbsp;·&nbsp; ⭐ ${lesson.xp} XP</p>
      </div>
    </div>
    <div class="lesson-content" id="lesson-content">${lesson.content}</div>
    <div class="lesson-quiz-section" id="quiz-section">
      <h3>⚡ Knowledge Check</h3>
      <div class="mini-quiz" id="mini-quiz"></div>
    </div>
    <div class="lesson-nav">
      <button class="btn-ghost" onclick="renderWorldScreen(${worldId})">← Back to World</button>
      <button class="btn-lesson-next" id="btn-complete-lesson"
        style="background:linear-gradient(135deg,${world.color},rgba(0,0,0,0.4))" disabled>
        ${isCompleted ? 'Already Complete ✓' : 'Complete Lesson ✓'}
      </button>
    </div>`;

  // Mini quiz
  const quizContainer = container.querySelector('#mini-quiz');
  const totalQ = lesson.quiz.length;
  window._quizAllCorrect = false;
  window._quizAnswers = {};

  lesson.quiz.forEach((q, qi) => {
    const qEl = document.createElement('div');
    qEl.className = 'mini-quiz-q';
    qEl.dataset.answered = 'false';
    qEl.innerHTML = `
      <div class="question-text">${qi+1}. ${q.q}</div>
      <div class="quiz-options" id="qopts-${lessonId}-${qi}">
        ${q.options.map((opt, oi) => `
          <button class="quiz-option" data-qi="${qi}" data-oi="${oi}"
            onclick="handleMiniQuizAnswer(this,${qi},${oi},${q.answer},'${lessonId}',${totalQ})">
            ${opt}
          </button>`).join('')}
      </div>`;
    quizContainer.appendChild(qEl);
  });

  if (isCompleted) $('btn-complete-lesson').disabled = false;

  $('btn-complete-lesson').addEventListener('click', () => {
    if (isCompleted || window._quizAllCorrect) completeLesson(worldId, lesson);
  });

  showScreen('screen-lesson');
}

function handleMiniQuizAnswer(btn, qi, oi, correctIndex, lessonId, totalQ) {
  const opts = btn.closest('.quiz-options').querySelectorAll('.quiz-option');
  opts.forEach(o => o.disabled = true);
  const parentQ = btn.closest('.mini-quiz-q');
  if (parentQ.dataset.answered === 'true') return;
  parentQ.dataset.answered = 'true';

  if (oi === correctIndex) {
    btn.classList.add('correct');
    flashScreen('heal');
    toast('✅ Correct!', 'success');
  } else {
    btn.classList.add('wrong');
    opts[correctIndex].classList.add('correct');
    flashScreen('hit');
    toast('❌ Wrong! The correct answer is highlighted.', 'error');
  }

  if (!window._quizAnswers[lessonId]) window._quizAnswers[lessonId] = {};
  window._quizAnswers[lessonId][qi] = (oi === correctIndex);

  const answered = Object.keys(window._quizAnswers[lessonId]).length;
  if (answered >= totalQ) {
    window._quizAllCorrect = true;
    $('btn-complete-lesson').disabled = false;
    // Trigger Knowledge Battle after quiz is complete
    const battle = (typeof BATTLES !== 'undefined') && BATTLES[lessonId];
    if (battle) {
      setTimeout(() => {
        const lessonContainer = $('screen-lesson');
        if (!lessonContainer.querySelector('.kb-section')) {
          renderKnowledgeBattle(lessonContainer, lessonId, battle);
        }
      }, 400);
    }
  }
}

function completeLesson(worldId, lesson) {
  if (!STATE.completedLessons.includes(lesson.id)) {
    STATE.completedLessons.push(lesson.id);
    STATE.xp += lesson.xp;
    saveState();
    checkAchievements();
    floatXP(lesson.xp);
    toast(`🎉 Lesson complete! <strong>+${lesson.xp} XP</strong>`, 'xp');
    updateHUD();
  }
  window._quizAllCorrect = false;
  window._quizAnswers = {};
  renderWorldScreen(worldId);
}

// ══════════════════════════════════════════════════════════════
// KNOWLEDGE BATTLE ENGINE
// ══════════════════════════════════════════════════════════════
function normalizeAnswer(s) {
  return String(s).replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
}

function checkKBOutput(userAns, battle) {
  const u = normalizeAnswer(userAns);
  return battle.validAnswers.some(v => normalizeAnswer(v) === u);
}

function checkKBDebug(userAns, battle) {
  const u = normalizeAnswer(userAns).toLowerCase().replace(/\s+/g,' ');
  return battle.validAnswers.some(v => {
    const v2 = normalizeAnswer(v).toLowerCase().replace(/\s+/g,' ');
    return u === v2 || u.includes(v2) || v2.includes(u);
  });
}

function renderKnowledgeBattle(container, lessonId, battle) {
  const section = document.createElement('div');
  section.className = 'kb-section';

  const typeLabel = battle.type === 'output' ? '🖨️ Predict the Output'
                  : battle.type === 'fill'   ? '✏️ Fill in the Blanks'
                  : '🐛 Find & Fix the Bug';

  // Build code block
  const codeLines = battle.code.trim().split('\n');
  const codeHTML = codeLines.map((line, i) => {
    const bugLine = battle.type === 'debug' && line.includes('BUG') ? ' class="bug-line"' : '';
    return `<span${bugLine}>${escapeHtml(line)}</span>`;
  }).join('\n');

  // Build answer input based on type
  let answerHTML = '';
  if (battle.type === 'output' || battle.type === 'debug') {
    const placeholder = battle.type === 'output'
      ? 'Type the exact output here...'
      : 'Type the corrected line here...';
    answerHTML = `
      <label class="kb-answer-label">YOUR ANSWER:</label>
      <textarea class="kb-answer-textarea" id="kb-input" placeholder="${placeholder}" spellcheck="false"></textarea>`;
    if (battle.type === 'debug' && battle.bugDescription) {
      answerHTML = `<div class="kb-bug-desc">🐛 ${escapeHtml(battle.bugDescription)}</div>` + answerHTML;
    }
  } else if (battle.type === 'fill') {
    const rows = battle.blanks.map((blank, i) => `
      <div class="kb-fill-row">
        <span class="kb-fill-label">${escapeHtml(blank.placeholder || `Blank ${i+1}`)}</span>
        <input class="kb-fill-input" id="kb-fill-${i}" type="text" placeholder="type here..." spellcheck="false" autocomplete="off" />
        <span class="kb-fill-check" id="kb-fill-check-${i}"></span>
      </div>`).join('');
    answerHTML = `<div class="kb-fill-container">${rows}</div>`;
  }

  section.innerHTML = `
    <div class="kb-header">
      <span class="kb-header-icon">⚔️</span>
      <div class="kb-header-text">
        <h3>KNOWLEDGE BATTLE</h3>
        <p>${typeLabel} — ${battle.title}</p>
      </div>
      <div class="kb-xp-badge">+${battle.xpReward} XP</div>
    </div>
    <div class="kb-body">
      <div class="kb-problem-desc">${escapeHtml(battle.problem)}</div>
      <div class="kb-code-display">
        <div class="kb-code-label">🐍 Python Code</div>
        <pre>${codeHTML}</pre>
      </div>
      <div class="kb-hint"><strong>💡 Hint:</strong> ${escapeHtml(battle.hint)}</div>
      ${answerHTML}
      <div class="kb-result" id="kb-result"></div>
      <div class="kb-actions">
        <button class="kb-submit-btn" id="kb-submit">⚔️ Check Answer</button>
        <button class="kb-show-sol-btn" id="kb-show-sol" style="display:none">📖 Show Block Solution</button>
      </div>
      <div class="block-solution-container" id="kb-block-sol"></div>
    </div>`;

  container.querySelector('.lesson-nav').before(section);
  section.scrollIntoView({ behavior: 'smooth', block: 'center' });

  // Submit logic
  const submitBtn = section.querySelector('#kb-submit');
  const resultEl  = section.querySelector('#kb-result');
  const showSolBtn= section.querySelector('#kb-show-sol');
  const blockSol  = section.querySelector('#kb-block-sol');

  submitBtn.addEventListener('click', () => {
    submitBtn.disabled = true;
    let passed = false;

    if (battle.type === 'fill') {
      const inputs = section.querySelectorAll('.kb-fill-input');
      let allRight = true;
      inputs.forEach((inp, i) => {
        const blank = battle.blanks[i];
        const u = normalizeAnswer(inp.value);
        const ok = blank.validAnswers.some(v => {
          const nv = normalizeAnswer(v).toLowerCase();
          return u.toLowerCase() === nv || u.toLowerCase().includes(nv);
        });
        inp.classList.toggle('correct', ok);
        inp.classList.toggle('wrong', !ok);
        section.querySelector(`#kb-fill-check-${i}`).textContent = ok ? '✅' : '❌';
        if (!ok) allRight = false;
      });
      passed = allRight;
    } else {
      const ta = section.querySelector('#kb-input');
      passed = battle.type === 'debug'
        ? checkKBDebug(ta.value, battle)
        : checkKBOutput(ta.value, battle);
      ta.classList.toggle('correct', passed);
      ta.classList.toggle('wrong', !passed);
    }

    resultEl.className = 'kb-result show ' + (passed ? 'pass' : 'fail');
    if (passed) {
      resultEl.innerHTML = '✅ Correct! Perfect solve!';
      flashScreen('heal');
      // Award bonus XP
      if (!STATE.kbCompleted) STATE.kbCompleted = [];
      if (!STATE.kbCompleted.includes(lessonId)) {
        STATE.kbCompleted.push(lessonId);
        STATE.xp += battle.xpReward;
        saveState(); updateHUD();
        floatXP(battle.xpReward);
        toast(`⚔️ Battle Won! <strong>+${battle.xpReward} XP</strong>`, 'xp');
      }
    } else {
      resultEl.innerHTML = '❌ Not quite right — study the block solution!';
      flashScreen('hit');
    }

    showSolBtn.style.display = 'inline-block';
  });

  showSolBtn.addEventListener('click', () => {
    showSolBtn.style.display = 'none';
    renderBlockSolution(battle.steps, blockSol);
    blockSol.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function renderBlockSolution(steps, container) {
  container.classList.add('visible');
  container.innerHTML = `<div class="block-sol-title">🧩 STEP-BY-STEP BLOCK SOLUTION</div>`;

  const palette = [
    '#00d4ff','#a855f7','#22c55e','#f59e0b','#ec4899','#ef4444','#82aaff'
  ];

  steps.forEach((step, i) => {
    const color = step.color || palette[i % palette.length];
    const isLast = (i === steps.length - 1);
    const fromRight = (i % 2 === 1);

    const block = document.createElement('div');
    block.className = `block-step${fromRight ? ' from-right' : ''}${isLast ? ' final-block' : ''}`;
    block.style.cssText = `transition-delay:${i * 250}ms`;

    block.innerHTML = `
      <div class="block-step-icon-col">
        <div class="block-step-icon" style="background:${color}18;border-color:${color};color:${color}">
          ${step.icon}
        </div>
        <div class="block-step-line"></div>
      </div>
      <div class="block-step-content" style="border-color:${color}">
        <div class="block-step-header" style="background:${color}10;border-bottom-color:${color}40">
          <span class="block-step-num">STEP ${i+1}</span>
          <span class="block-step-title" style="color:${color}">${escapeHtml(step.title)}</span>
        </div>
        <div class="block-step-explain">${escapeHtml(step.explain)}</div>
        ${step.code ? `<div class="block-step-code">${escapeHtml(step.code)}</div>` : ''}
      </div>`;

    container.appendChild(block);

    // Staggered reveal
    requestAnimationFrame(() => {
      setTimeout(() => block.classList.add('revealed'), i * 250 + 50);
    });
  });
}

// ── Boss Battle ─══════════════════════════════════════════════════════════════
// BOSS BATTLE
// ══════════════════════════════════════════════════════════════
function startBossBattle(worldId) {
  const world = WORLDS.find(w => w.id === worldId);
  STATE.currentBossWorld = worldId;
  saveState();

  const shuffled = [...world.boss.questions].sort(() => Math.random()-0.5);
  BOSS_BATTLE = { questions: shuffled, currentQ:0, bossHP:100, playerHP:100, streak:0, answers:[] };

  renderBossUI(world);
  showScreen('screen-boss');
}

function renderBossUI(world) {
  const boss = world.boss;
  const container = $('screen-boss');
  container.innerHTML = `
    <div class="boss-battle-arena">
      <div class="boss-battle-header">
        <div class="boss-battle-title">⚔️ Boss Battle — World ${world.id}</div>
        <div class="boss-battle-name">${boss.name}</div>
        <p class="boss-battle-desc">${boss.description}</p>
      </div>
      <div class="battle-hp-section">
        <div class="hp-block">
          <div class="hp-label">👹 ${boss.name}</div>
          <div class="hp-bar-bg"><div class="hp-bar-fill boss-hp" id="boss-hp-bar" style="width:100%"></div></div>
          <div class="hp-value" id="boss-hp-value">100 / 100</div>
        </div>
        <div class="vs-badge">VS</div>
        <div class="hp-block">
          <div class="hp-label" style="justify-content:flex-end">🧙 ${CURRENT_USER ? CURRENT_USER.username : 'You'}</div>
          <div class="hp-bar-bg"><div class="hp-bar-fill player-hp" id="player-hp-bar" style="width:100%"></div></div>
          <div class="hp-value" id="player-hp-value">100 / 100</div>
        </div>
      </div>
      <div class="streak-counter" id="streak-counter"></div>
      <div class="boss-question-card">
        <div class="boss-question-progress">
          <span id="q-counter">Question 1 / ${BOSS_BATTLE.questions.length}</span>
          <div class="boss-q-dots" id="boss-q-dots">
            ${BOSS_BATTLE.questions.map((_,i) => `<div class="boss-q-dot" id="dot-${i}"></div>`).join('')}
          </div>
        </div>
        <div class="boss-question-text" id="boss-q-text"></div>
        <div class="boss-options-grid" id="boss-options"></div>
      </div>
      <div id="practical-section"></div>
    </div>`;

  document.getElementById('dot-0').classList.add('active');
  renderBossQuestion();
}

function renderBossQuestion() {
  const q = BOSS_BATTLE.questions[BOSS_BATTLE.currentQ];
  $('q-counter').textContent = `Question ${BOSS_BATTLE.currentQ+1} / ${BOSS_BATTLE.questions.length}`;
  $('boss-q-text').textContent = q.q;
  const opts = $('boss-options');
  opts.innerHTML = '';
  q.options.forEach((opt, oi) => {
    const btn = document.createElement('button');
    btn.className = 'boss-option';
    btn.textContent = opt;
    btn.addEventListener('click', () => handleBossAnswer(oi, q.answer));
    opts.appendChild(btn);
  });
  updateStreakUI();
}

function handleBossAnswer(chosen, correct) {
  const btns = document.querySelectorAll('.boss-option');
  btns.forEach(b => b.disabled = true);
  const isCorrect = chosen === correct;

  if (isCorrect) {
    btns[chosen].classList.add('correct');
    BOSS_BATTLE.streak++;
    const dmg = Math.min(25, 10 + (BOSS_BATTLE.streak-1)*5);
    BOSS_BATTLE.bossHP = Math.max(0, BOSS_BATTLE.bossHP - dmg);
    BOSS_BATTLE.answers.push('correct');
    flashScreen('heal');
    toast(`⚔️ Hit! <strong>-${dmg} Boss HP</strong>${BOSS_BATTLE.streak>1?' 🔥 '+BOSS_BATTLE.streak+'x Streak!':''}`, 'success');
  } else {
    btns[chosen].classList.add('wrong');
    btns[correct].classList.add('correct');
    BOSS_BATTLE.streak = 0;
    BOSS_BATTLE.playerHP = Math.max(0, BOSS_BATTLE.playerHP - 20);
    BOSS_BATTLE.answers.push('wrong');
    flashScreen('hit');
    toast('🛡️ Wrong! You took <strong>-20 HP</strong>!', 'error');
  }

  const dot = document.getElementById('dot-'+BOSS_BATTLE.currentQ);
  if (dot) { dot.classList.remove('active'); dot.classList.add(isCorrect?'correct':'wrong'); }

  updateBossHPBars();
  updateStreakUI();
  BOSS_BATTLE.currentQ++;

  setTimeout(() => {
    if (BOSS_BATTLE.playerHP <= 0) { endBossBattle(false); }
    else if (BOSS_BATTLE.bossHP <= 0) { endBossBattle(true); }
    else if (BOSS_BATTLE.currentQ >= BOSS_BATTLE.questions.length) {
      // After MCQ questions, show the practical problem
      renderPracticalProblem();
    } else {
      const nextDot = document.getElementById('dot-'+BOSS_BATTLE.currentQ);
      if (nextDot) nextDot.classList.add('active');
      renderBossQuestion();
    }
  }, 900);
}

// ── Practical Problem ─────────────────────────────────────────
function renderPracticalProblem() {
  const worldId = STATE.currentBossWorld;
  const world = WORLDS.find(w => w.id === worldId);
  const problem = world.boss.practicalProblem;

  // Hide MCQ section
  const questionCard = document.querySelector('.boss-question-card');
  if (questionCard) questionCard.style.display = 'none';
  const streakCounter = $('streak-counter');
  if (streakCounter) streakCounter.style.display = 'none';

  const section = $('practical-section');
  section.innerHTML = `
    <div class="practical-problem-card">
      <div class="practical-title">🖥️ PRACTICAL CHALLENGE — Solve the Code!</div>
      <div class="practical-desc">${problem.description}</div>
      <div class="code-block" style="margin-bottom:16px;">
        <div class="code-block-header"><span>🐍 Python Problem</span></div>
        <pre>${problem.codeSnippet}</pre>
      </div>
      <p style="font-size:14px;color:var(--text-dim);margin-bottom:12px;">What is the correct output / answer?</p>
      <div class="practical-options" id="practical-options">
        ${problem.options.map((opt, oi) => `
          <button class="practical-option" onclick="handlePracticalAnswer(${oi},${problem.answer},this)">
            ${oi+1}. ${opt}
          </button>`).join('')}
      </div>
      <button class="show-solution-btn" id="show-solution-btn" style="display:none" onclick="openSolutionModal()">
        📖 Show Step-by-Step Solution
      </button>
    </div>`;
}

function handlePracticalAnswer(chosen, correct, btn) {
  const allBtns = document.querySelectorAll('.practical-option');
  allBtns.forEach(b => b.disabled = true);
  const won = chosen === correct;

  if (won) {
    btn.classList.add('correct');
    BOSS_BATTLE.bossHP = 0;
    flashScreen('heal');
    toast('🎉 Perfect! You solved it!', 'success');
  } else {
    btn.classList.add('wrong');
    allBtns[correct].classList.add('correct');
    BOSS_BATTLE.playerHP = Math.max(0, BOSS_BATTLE.playerHP - 30);
    flashScreen('hit');
    toast('❌ Incorrect! Study the solution!', 'error');
  }

  // Always show the "See Solution" button
  setTimeout(() => {
    const sBtn = $('show-solution-btn');
    if (sBtn) sBtn.style.display = 'block';

    setTimeout(() => {
      endBossBattle(won || BOSS_BATTLE.bossHP < BOSS_BATTLE.playerHP);
    }, 2000);
  }, 600);
}

function updateBossHPBars() {
  $('boss-hp-bar').style.width = BOSS_BATTLE.bossHP + '%';
  $('boss-hp-value').textContent = BOSS_BATTLE.bossHP + ' / 100';
  $('player-hp-bar').style.width = BOSS_BATTLE.playerHP + '%';
  $('player-hp-value').textContent = BOSS_BATTLE.playerHP + ' / 100';
}

function updateStreakUI() {
  const sc = $('streak-counter');
  if (!sc) return;
  if (BOSS_BATTLE.streak >= 2) {
    sc.innerHTML = `<span class="streak-fire">🔥</span> ${BOSS_BATTLE.streak}x Answer Streak! <span class="streak-fire">🔥</span>`;
  } else { sc.innerHTML = ''; }
}

function endBossBattle(victory) {
  const worldId = STATE.currentBossWorld;
  const world = WORLDS.find(w => w.id === worldId);
  if (victory) {
    if (!STATE.bossDefeated.includes(worldId)) {
      STATE.bossDefeated.push(worldId);
      STATE.xp += world.boss.xpReward;
      if (!STATE.completedWorlds.includes(worldId)) STATE.completedWorlds.push(worldId);
      saveState();
      checkAchievements();
    }
    renderVictoryScreen(world);
  } else {
    renderDefeatScreen(world);
  }
}

// ── Solution Modal ────────────────────────────────────────────
function openSolutionModal() {
  const worldId = STATE.currentBossWorld;
  const world = WORLDS.find(w => w.id === worldId);
  const problem = world.boss.practicalProblem;

  $('solution-problem-desc').textContent = problem.description;

  const stepsContainer = $('solution-steps');
  stepsContainer.innerHTML = '';
  problem.solution.steps.forEach((step, i) => {
    const el = document.createElement('div');
    el.className = 'sol-step';
    el.innerHTML = `
      <div class="sol-step-header">
        <div class="sol-step-num">STEP ${i+1}</div>
        <div class="sol-step-title">${step.title}</div>
      </div>
      <div class="sol-step-explain">${step.explanation}</div>
      ${step.code ? `
        <div class="code-block">
          <pre>${step.code}</pre>
        </div>` : ''}`;
    stepsContainer.appendChild(el);

    // Animate each step in sequence
    setTimeout(() => { el.classList.add('revealed'); }, i * 350 + 200);
  });

  const finalCode = $('solution-final-code');
  if (problem.solution.finalCode) {
    finalCode.innerHTML = `
      <div class="code-block">
        <div class="code-block-header">
          <span>✅ Final Solution</span>
        </div>
        <pre>${problem.solution.finalCode}</pre>
      </div>`;
    setTimeout(() => finalCode.style.opacity = '1', problem.solution.steps.length * 350 + 400);
  }

  $('solution-modal').classList.remove('hidden');
}

function closeSolutionModal() {
  $('solution-modal').classList.add('hidden');
}

// ══════════════════════════════════════════════════════════════
// VICTORY / DEFEAT
// ══════════════════════════════════════════════════════════════
function renderVictoryScreen(world) {
  const nextWorld = WORLDS.find(w => w.id === world.id+1);
  const container = $('screen-victory');
  container.innerHTML = `
    <div class="result-screen">
      <div class="result-icon-large">🏆</div>
      <div class="result-title victory">Victory!</div>
      <p class="result-subtitle">${world.boss.name} has been defeated! The dungeon is cleared!</p>
      <div class="xp-gained-card">
        <div class="xp-gained-label">XP Earned</div>
        <div class="xp-gained-value">+${world.boss.xpReward}</div>
      </div>
      <div class="result-cta-group">
        ${nextWorld
          ? `<button class="btn-primary" onclick="renderWorldScreen(${nextWorld.id})">Next World: ${nextWorld.title} ${nextWorld.icon}</button>`
          : `<button class="btn-primary" onclick="renderProfile()">🏆 View Your Legend!</button>`}
        <button class="btn-secondary" onclick="renderWorldMap()">World Map</button>
        <button class="show-solution-btn" onclick="openSolutionModal()" style="display:block;margin-top:0;">📖 See Full Solution</button>
      </div>
    </div>`;
  updateHUD(); floatXP(world.boss.xpReward);
  showScreen('screen-victory');
}

function renderDefeatScreen(world) {
  const container = $('screen-defeat');
  container.innerHTML = `
    <div class="result-screen">
      <div class="result-icon-large">💀</div>
      <div class="result-title defeat">Defeated!</div>
      <p class="result-subtitle">${world.boss.name} was too powerful. Train harder and try again!</p>
      <div class="result-cta-group">
        <button class="btn-primary" onclick="startBossBattle(${world.id})">⚔️ Try Again</button>
        <button class="btn-secondary" onclick="renderWorldScreen(${world.id})">← Back to World</button>
        <button class="show-solution-btn" onclick="openSolutionModal()" style="display:block;margin-top:0;">📖 See How to Solve It</button>
      </div>
    </div>`;
  showScreen('screen-defeat');
}

// ══════════════════════════════════════════════════════════════
// PROFILE SCREEN
// ══════════════════════════════════════════════════════════════
function renderProfile() {
  const rank = getRank(STATE.xp);
  const totalLessons = WORLDS.reduce((a,w) => a + w.lessons.length, 0);
  const container = $('screen-profile');
  const next = getNextItem();

  const ACHIEVEMENTS_DEF = [
    { id:'first_lesson', icon:'📖', name:'First Step',      desc:'Complete your first lesson',  check:() => STATE.completedLessons.length >= 1 },
    { id:'first_boss',   icon:'⚔️', name:'Boss Slayer',     desc:'Defeat your first boss',       check:() => STATE.bossDefeated.length >= 1 },
    { id:'world_1',      icon:'🌍', name:'Awakened',        desc:'Complete World 1',             check:() => STATE.bossDefeated.includes(1) },
    { id:'world_3',      icon:'🌀', name:'Loop Master',     desc:'Complete World 3',             check:() => STATE.bossDefeated.includes(3) },
    { id:'world_5',      icon:'📦', name:'Data Whisperer',  desc:'Complete World 5',             check:() => STATE.bossDefeated.includes(5) },
    { id:'world_7',      icon:'👑', name:'Python Legend',   desc:'Complete all 7 worlds!',       check:() => STATE.bossDefeated.includes(7) },
    { id:'xp_500',       icon:'⭐', name:'XP Hunter',       desc:'Earn 500 XP total',            check:() => STATE.xp >= 500 },
    { id:'xp_2000',      icon:'💫', name:'XP Master',       desc:'Earn 2000 XP total',           check:() => STATE.xp >= 2000 },
    { id:'all_lessons',  icon:'🎓', name:'Scholar',         desc:'Complete all lessons',         check:() => STATE.completedLessons.length >= totalLessons }
  ];

  // Next up section
  let nextUpHTML = '';
  if (next) {
    const desc = next.type === 'lesson'
      ? `${next.lesson.icon} ${next.lesson.title} (${next.world.icon} ${next.world.title})`
      : `⚔️ Boss Battle: ${next.world.boss.name} (${next.world.icon} ${next.world.title})`;
    const onclick = next.type === 'lesson'
      ? `renderLesson(${next.world.id},'${next.lesson.id}')`
      : `startBossBattle(${next.world.id})`;
    nextUpHTML = `
      <div class="profile-next-up">
        <span class="profile-next-label">▶ CONTINUE WHERE YOU LEFT OFF</span>
        <div class="profile-next-desc">${desc}</div>
        <div class="profile-next-sub">Tap to jump straight there!</div>
        <button class="block-btn block-btn-small" onclick="${onclick}" style="margin-top:12px;width:auto;">Resume ⚡</button>
      </div>`;
  } else if (STATE.bossDefeated.length === 7) {
    nextUpHTML = `<div class="profile-next-up"><span class="profile-next-label">🏆 QUEST COMPLETE!</span><div class="profile-next-desc">You are a Python Legend! All 7 worlds conquered!</div></div>`;
  }

  // World progress rows
  const worldRows = WORLDS.map(world => {
    const prog = worldProgress(world);
    const pct = prog.total ? (prog.completed/prog.total)*100 : 0;
    const bossD = STATE.bossDefeated.includes(world.id);
    return `
      <div class="world-progress-row">
        <div class="world-progress-icon">${world.icon}</div>
        <div class="world-progress-info">
          <div class="world-progress-name" style="color:${world.color}">${world.title}</div>
          <div class="world-progress-bar-small">
            <div class="world-progress-fill-small" style="width:${pct}%;background:${world.color}"></div>
          </div>
        </div>
        <div class="world-progress-pct">${prog.completed}/${prog.total}</div>
        <div class="world-badge-check">${bossD ? '✅' : isWorldUnlocked(world.id) ? '🔓' : '🔒'}</div>
      </div>`;
  }).join('');

  const achievementsHTML = ACHIEVEMENTS_DEF.map(a => {
    const unlocked = a.check();
    return `
      <div class="achievement-badge ${unlocked ? 'unlocked' : 'locked-ach'}">
        <span class="achievement-icon">${a.icon}</span>
        <div class="achievement-name">${a.name}</div>
        <div class="achievement-desc">${a.desc}</div>
      </div>`;
  }).join('');

  container.innerHTML = `
    <div class="profile-card">
      <span class="profile-rank-icon">${rank.icon}</span>
      <div class="profile-rank-name">${rank.name}</div>
      <div class="profile-hero-class">${classIcon(CURRENT_USER?.heroClass)} ${CURRENT_USER?.heroClass || ''} · ${CURRENT_USER?.username || ''}</div>
      <p style="color:var(--text-dim);font-size:14px;margin-top:8px">Total XP: <strong style="color:var(--gold)">${STATE.xp.toLocaleString()}</strong></p>
      <div class="profile-stats-grid">
        <div class="profile-stat"><span class="profile-stat-value">${STATE.completedLessons.length}</span><span class="profile-stat-label">Lessons Done</span></div>
        <div class="profile-stat"><span class="profile-stat-value">${STATE.bossDefeated.length}</span><span class="profile-stat-label">Bosses Slain</span></div>
        <div class="profile-stat"><span class="profile-stat-value">${STATE.xp.toLocaleString()}</span><span class="profile-stat-label">Total XP</span></div>
      </div>
    </div>

    ${nextUpHTML}

    <div class="world-progress-summary">
      <h2>📊 World Progress</h2>
      ${worldRows}
    </div>

    <div class="achievements-section">
      <h2>🏅 Achievements</h2>
      <div class="achievements-grid">${achievementsHTML}</div>
    </div>

    <div style="text-align:center;margin-top:28px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
      <button class="btn-secondary" onclick="renderWorldMap()">← World Map</button>
      <button class="block-btn block-btn-danger" onclick="confirmReset()" style="width:auto;">🗑️ Reset Progress</button>
    </div>`;

  showScreen('screen-profile');
}

function confirmReset() {
  if (confirm('⚠️ Reset ALL progress for this hero? This cannot be undone!')) {
    STATE = { xp:0, completedLessons:[], completedWorlds:[], bossDefeated:[], currentWorld:null, currentLessonId:null, currentBossWorld:null, achievements:[] };
    saveState();
    toast('🔄 Progress reset!', 'error');
    renderProfile();
  }
}

// ── Achievements ──────────────────────────────────────────────
function checkAchievements() {
  const ach = STATE.achievements;
  const totalLessons = WORLDS.reduce((a,w) => a+w.lessons.length, 0);
  const checks = [
    { id:'first_lesson', check: STATE.completedLessons.length >= 1, msg:'📖 First Step!' },
    { id:'first_boss',   check: STATE.bossDefeated.length >= 1, msg:'⚔️ Boss Slayer!' },
    { id:'xp_500',       check: STATE.xp >= 500, msg:'⭐ XP Hunter!' },
    { id:'xp_2000',      check: STATE.xp >= 2000, msg:'💫 XP Master!' },
    { id:'all_lessons',  check: STATE.completedLessons.length >= totalLessons, msg:'🎓 Scholar!' },
  ];
  checks.forEach(c => {
    if (c.check && !ach.includes(c.id)) {
      STATE.achievements.push(c.id);
      saveState();
      setTimeout(() => toast(`🏅 Achievement: ${c.msg}`, 'xp'), 800);
    }
  });
}

// ══════════════════════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  initParticles();

  // Solution modal close
  $('solution-close').addEventListener('click', closeSolutionModal);
  $('solution-done').addEventListener('click', closeSolutionModal);

  setTimeout(() => {
    $('loading-screen').classList.add('done');
    renderLogin();
  }, 2000);

  // HUD buttons
  $('hud-logo').addEventListener('click', renderWorldMap);
  $('hud-btn-map').addEventListener('click', renderWorldMap);
  $('hud-btn-profile').addEventListener('click', renderProfile);
  $('hud-btn-logout').addEventListener('click', () => {
    CURRENT_USER = null;
    STATE = { xp:0, completedLessons:[], completedWorlds:[], bossDefeated:[], currentWorld:null, currentLessonId:null, currentBossWorld:null, achievements:[] };
    renderLogin();
  });
});
