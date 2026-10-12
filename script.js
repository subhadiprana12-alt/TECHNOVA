'use strict';

/* ==========================================================================
   TECHNOVA ’26 — site logic
   --------------------------------------------------------------------------
   EVENT ARTWORK
   Each event gets a custom generated SVG illustration (see ART below).
   To use real AI-generated photos instead, save the image next to this file
   (e.g. images/neon-hack.jpg) and set the event's `image` field. Every event
   also has an `aiPrompt` you can paste into an image generator.
   If `image` is empty or fails to load, the SVG artwork is shown.
   ========================================================================== */

const EVENTS = [
  {
    id: '01', name: 'NEON HACK//', category: 'Tech', art: 'code', day: 1,
    description: 'A high-energy build sprint for curious minds. Prototype something useful, weird or wonderfully unnecessary.',
    date: '14 Nov 2026', time: '10:00 AM – 1:00 PM', start: '10:00', end: '13:00',
    venue: 'Innovation Lab', seats: 42,
    bg: '#0a1636', glow: '#2f6bff', color: '#7fe7ff',
    image: '', aiPrompt: 'Students coding on glowing laptops in a dark hackathon hall, cyan and blue neon light, cinematic, shallow depth of field, 16:10'
  },
  {
    id: '02', name: 'BASSLINE RIOT', category: 'Music', art: 'beats', day: 1,
    description: 'Campus bands, live loops, unexpected collabs and a room that refuses to stand still.',
    date: '14 Nov 2026', time: '4:00 PM – 6:00 PM', start: '16:00', end: '18:00',
    venue: 'Open-Air Stage', seats: 75,
    bg: '#2a0d2c', glow: '#ff3fa4', color: '#ff93d3',
    image: '', aiPrompt: 'Live student band on an open-air stage at dusk, magenta and pink stage lights, crowd silhouettes, cinematic concert photo, 16:10'
  },
  {
    id: '03', name: 'PIXEL / PLAY', category: 'Art', art: 'pixels', day: 1,
    description: 'A creative arena for posters, digital art, motion experiments and ideas with a visual pulse.',
    date: '14 Nov 2026', time: '11:30 AM – 1:00 PM', start: '11:30', end: '13:00',
    venue: 'Design Studio', seats: 30,
    bg: '#1a1040', glow: '#8b5cff', color: '#cbb8ff',
    image: '', aiPrompt: 'Digital art studio with pixel-art projections on the wall, violet and purple light, designers at drawing tablets, 16:10'
  },
  {
    id: '04', name: 'MIC CHECK', category: 'Music', art: 'mic', day: 1,
    description: 'Poetry, comedy, acoustic sets, spoken word and the courage to take the mic.',
    date: '14 Nov 2026', time: '6:30 PM – 8:00 PM', start: '18:30', end: '20:00',
    venue: 'Black Box Hall', seats: 55,
    bg: '#2b1608', glow: '#ff7a2e', color: '#ffc08a',
    image: '', aiPrompt: 'Performer at a vintage microphone in a small dark theatre, warm orange spotlight, intimate open mic night, 16:10'
  },
  {
    id: '05', name: 'ROBO RUSH', category: 'Tech', art: 'robot', day: 2,
    description: 'A hands-on robotics challenge where fast thinking and clever engineering meet.',
    date: '15 Nov 2026', time: '10:00 AM – 12:30 PM', start: '10:00', end: '12:30',
    venue: 'Engineering Block', seats: 24,
    bg: '#0b1d36', glow: '#3d8bff', color: '#a5c8ff',
    image: '', aiPrompt: 'Student-built robots racing on an arena track, blue accent lighting, engineers watching, sharp modern tech photography, 16:10'
  },
  {
    id: '06', name: 'CAMPUS QUEST', category: 'Community', art: 'quest', day: 2,
    description: 'Clues, checkpoints, team missions and a campus-wide hunt for the sharpest crew.',
    date: '15 Nov 2026', time: '1:00 PM – 2:30 PM', start: '13:00', end: '14:30',
    venue: 'Starting at Main Quad', seats: 60,
    bg: '#0e2616', glow: '#4cc65d', color: '#b6f59a',
    image: '', aiPrompt: 'Teams of students running across a university quad with maps and clue cards, golden afternoon light, lively candid photo, 16:10'
  },
  {
    id: '07', name: 'DESIGN DUEL', category: 'Art', art: 'duel', day: 2,
    description: 'A timed creative face-off. Take a prompt, trust your instinct and make the unexpected work.',
    date: '15 Nov 2026', time: '11:00 AM – 12:30 PM', start: '11:00', end: '12:30',
    venue: 'Design Studio', seats: 28,
    bg: '#2a0d24', glow: '#e04bd6', color: '#f6aeef',
    image: '', aiPrompt: 'Two designers working head-to-head on tablets with a countdown timer, magenta and pink studio lighting, 16:10'
  },
  {
    id: '08', name: 'GREEN SIGNAL', category: 'Community', art: 'green', day: 2,
    description: 'A mini-lab for practical sustainability ideas, upcycling and small changes with real potential.',
    date: '15 Nov 2026', time: '3:00 PM – 4:30 PM', start: '15:00', end: '16:30',
    venue: 'Central Lawn', seats: 35,
    bg: '#06291f', glow: '#1fd1a0', color: '#90f5d8',
    image: '', aiPrompt: 'Students building upcycled projects on a campus lawn, seedlings and recycled materials, teal green tones, bright airy photo, 16:10'
  }
];


/* ==========================================================================
   PHOTOS FOR EVENTS — paste an image link (or a file path) between the quotes.
   Google Images: right-click an image > "Copy image address".
   Leave empty to use the built-in artwork.
   ========================================================================== */
const EVENT_IMAGES = { '01': '', '02': '', '03': '', '04': '', '05': '', '06': '', '07': '', '08': '' };

EVENTS.forEach(e => { if (EVENT_IMAGES[e.id]) e.image = EVENT_IMAGES[e.id]; });

const SCHEDULE = {
  1: [
    { time: '10:00 AM', name: 'NEON HACK//', desc: 'Build sprint · Check-in opens at 9:30 AM', place: 'Innovation Lab', type: 'Tech', eventId: '01' },
    { time: '11:30 AM', name: 'PIXEL / PLAY', desc: 'Design jam · Bring your imagination', place: 'Design Studio', type: 'Art', eventId: '03' },
    { time: '2:00 PM', name: 'Opening ceremony', desc: 'Welcome, kickoff and festival map', place: 'Main Quad', type: 'All access', eventId: null },
    { time: '4:00 PM', name: 'BASSLINE RIOT', desc: 'Live bands and collaborative sets', place: 'Open-Air Stage', type: 'Music', eventId: '02' },
    { time: '6:30 PM', name: 'MIC CHECK', desc: 'Open mic · Sign-ups at the door', place: 'Black Box Hall', type: 'Music', eventId: '04' }
  ],
  2: [
    { time: '10:00 AM', name: 'ROBO RUSH', desc: 'Robotics challenge · Team check-in', place: 'Engineering Block', type: 'Tech', eventId: '05' },
    { time: '11:00 AM', name: 'DESIGN DUEL', desc: 'Timed creative face-off', place: 'Design Studio', type: 'Art', eventId: '07' },
    { time: '1:00 PM', name: 'CAMPUS QUEST', desc: 'Team missions · Meet at the starting point', place: 'Main Quad', type: 'Community', eventId: '06' },
    { time: '3:00 PM', name: 'GREEN SIGNAL', desc: 'Sustainability mini-lab', place: 'Central Lawn', type: 'Community', eventId: '08' },
    { time: '5:00 PM', name: 'Closing set', desc: 'Community shout-outs and final performance', place: 'Open-Air Stage', type: 'All access', eventId: null }
  ]
};

const FESTIVAL_START = new Date('2026-11-14T10:00:00+05:30');
const STORAGE_KEY = 'technova26_registrations_v1';
const CATEGORIES = ['All', 'Tech', 'Music', 'Art', 'Community'];

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Helpers ---------- */
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const pad = (n, l = 2) => String(n).padStart(l, '0');

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

function rng(seed) {
  let s = (seed >>> 0) || 1;
  return () => (s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296;
}

function hash32(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

const icon = (id, cls = '') => `<svg class="ic ${cls}" aria-hidden="true"><use href="#${id}"/></svg>`;

/* ---------- Storage ---------- */
function readRegistrations() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) { return []; }
}
function saveRegistrations(items) { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }

function signupCounts() {
  const counts = {};
  readRegistrations().forEach((r) => { counts[r.eventId] = (counts[r.eventId] || 0) + 1; });
  return counts;
}
const seatsLeft = (ev, counts = signupCounts()) => Math.max(0, ev.seats - (counts[ev.id] || 0));
const getEvent = (id) => EVENTS.find((e) => e.id === id);

/* ==========================================================================
   Generated event artwork (inline SVG, one custom piece per event)
   ========================================================================== */
const ART = {
  code() {
    const lines = [[90, 102, 92], [110, 118, 60], [110, 134, 112], [90, 150, 44], [110, 166, 84], [90, 182, 70]];
    return `
      <path class="a-trace" d="M330 128H372V74H398"/><circle cx="398" cy="74" r="4" fill="var(--c)"/>
      <path class="a-trace" d="M70 172H30V214H2"/><circle cx="2" cy="214" r="4" fill="var(--c)"/>
      <rect x="70" y="46" width="260" height="170" rx="12" fill="rgba(4,8,24,.6)" stroke="var(--c)" stroke-opacity=".6" stroke-width="1.5"/>
      <circle cx="88" cy="64" r="4" fill="var(--c)"/><circle cx="102" cy="64" r="4" fill="var(--c)" opacity=".55"/><circle cx="116" cy="64" r="4" fill="var(--c)" opacity=".3"/>
      <line x1="70" y1="80" x2="330" y2="80" stroke="var(--c)" stroke-opacity=".25"/>
      ${lines.map(([x, y, w], i) => `<rect class="a-type" style="--i:${i}" x="${x}" y="${y}" width="${w}" height="6" rx="3" fill="var(--c)" opacity="${i % 2 ? .55 : .95}"/>`).join('')}
      <rect class="a-cursor" x="170" y="178" width="8" height="14" fill="var(--c)"/>`;
  },

  beats() {
    const r = rng(7); let bars = '';
    for (let i = 0; i < 25; i++) {
      const h = 34 + Math.round(r() * 120);
      bars += `<rect class="a-bar" style="--d:${(r() * 1.2).toFixed(2)}s" x="${30 + i * 14}" y="${222 - h}" width="8" height="${h}" rx="4" fill="var(--c)" opacity="${(.45 + r() * .55).toFixed(2)}"/>`;
    }
    return `<path d="M0 62 C40 14 80 14 120 62 S200 110 240 62 S320 14 360 62 S400 84 400 62" fill="none" stroke="var(--c)" stroke-opacity=".55" stroke-width="2"/>
      ${bars}<line x1="20" y1="226" x2="380" y2="226" stroke="var(--c)" stroke-opacity=".3"/>`;
  },

  pixels() {
    const r = rng(21); const pal = ['var(--c)', '#ffffff', 'var(--g)']; let cells = '';
    for (let y = 0; y < 8; y++) for (let x = 0; x < 14; x++) {
      if (r() < .4) continue;
      cells += `<rect class="a-px" style="--d:${(r() * 3).toFixed(2)}s" x="${24 + x * 26}" y="${20 + y * 28}" width="20" height="20" rx="3" fill="${pal[Math.floor(r() * 3)]}" opacity="${(.28 + r() * .62).toFixed(2)}"/>`;
    }
    return `${cells}<path d="M246 134 L246 184 L259 172 L268 194 L277 190 L268 169 L285 169 Z" fill="#fff" stroke="rgba(0,0,0,.45)" stroke-width="1.5" stroke-linejoin="round"/>`;
  },

  mic() {
    const rings = [0, 1, 2].map((i) => `<circle class="a-ring" style="--i:${i};--k:${1 + i * .8};opacity:${(.5 - i * .15).toFixed(2)}" cx="200" cy="108" r="40"/>`).join('');
    return `${rings}
      <rect x="178" y="56" width="44" height="86" rx="22" fill="rgba(4,8,24,.65)" stroke="var(--c)" stroke-width="2.5"/>
      <path d="M187 78h26M187 92h26M187 106h26M187 120h26" stroke="var(--c)" stroke-opacity=".55" stroke-width="2" stroke-linecap="round"/>
      <path d="M154 118 a46 46 0 0 0 92 0" fill="none" stroke="var(--c)" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M200 164 v40 M168 206 h64" fill="none" stroke="var(--c)" stroke-width="2.5" stroke-linecap="round"/>`;
  },

  robot() {
    return `<circle class="a-gear" cx="200" cy="128" r="92" fill="none" stroke="var(--c)" stroke-opacity=".35" stroke-width="14" stroke-dasharray="8 8.057"/>
      <circle cx="200" cy="128" r="68" fill="none" stroke="var(--c)" stroke-opacity=".2"/>
      <path d="M200 74V52" stroke="var(--c)" stroke-width="3" stroke-linecap="round"/><circle class="a-blink" cx="200" cy="46" r="5" fill="var(--c)"/>
      <rect x="138" y="106" width="10" height="28" rx="4" fill="var(--c)" opacity=".8"/><rect x="252" y="106" width="10" height="28" rx="4" fill="var(--c)" opacity=".8"/>
      <rect x="150" y="74" width="100" height="84" rx="18" fill="rgba(4,8,24,.78)" stroke="var(--c)" stroke-width="2.5"/>
      <circle class="a-eye" cx="177" cy="110" r="9" fill="var(--c)"/><circle class="a-eye" cx="223" cy="110" r="9" fill="var(--c)"/>
      <path d="M178 138h44" stroke="var(--c)" stroke-opacity=".7" stroke-width="3" stroke-linecap="round"/>
      <rect x="168" y="162" width="64" height="30" rx="8" fill="rgba(4,8,24,.78)" stroke="var(--c)" stroke-width="2"/>
      <circle cx="182" cy="208" r="11" fill="none" stroke="var(--c)" stroke-width="2.5"/><circle cx="218" cy="208" r="11" fill="none" stroke="var(--c)" stroke-width="2.5"/>`;
  },

  quest() {
    return `<g fill="none" stroke="var(--c)" stroke-opacity=".2"><circle cx="200" cy="130" r="44"/><circle cx="200" cy="130" r="88"/><circle cx="200" cy="130" r="132"/></g>
      <path class="a-route" d="M40 206 C110 130 150 232 220 160 S330 96 366 50" fill="none" stroke="var(--c)" stroke-width="3" stroke-linecap="round"/>
      <g transform="translate(40 206)"><circle r="8" fill="var(--c)" opacity=".7"/></g>
      <g transform="translate(220 160)"><circle r="14" fill="var(--c)" opacity=".25"/><circle r="8" fill="var(--c)"/><circle r="3" fill="var(--bg)"/></g>
      <g transform="translate(366 50)"><path d="M0 0 V-26 L18 -19 L0 -12" fill="var(--c)" stroke="var(--c)" stroke-width="2" stroke-linejoin="round"/><circle r="4" fill="var(--c)"/></g>
      <g transform="translate(74 76)"><circle r="28" fill="rgba(4,8,24,.6)" stroke="var(--c)" stroke-width="2"/><g class="a-needle"><path d="M0 -20 L6 0 L0 20 L-6 0 Z" fill="var(--c)"/></g></g>`;
  },

  duel() {
    return `<circle cx="150" cy="130" r="62" fill="var(--c)" fill-opacity=".14" stroke="var(--c)" stroke-width="2"/>
      <g transform="rotate(12 230 130)"><rect x="170" y="70" width="120" height="120" rx="16" fill="var(--g)" fill-opacity=".3" stroke="var(--c)" stroke-width="2"/></g>
      <path d="M110 40 L50 200 M230 40 L270 150" stroke="var(--c)" stroke-opacity=".5" stroke-dasharray="4 4" fill="none"/>
      <path class="a-draw" pathLength="1" d="M50 200 C110 40 230 40 270 150 S350 210 360 80" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <g fill="#fff" stroke="var(--c)" stroke-width="2"><rect x="44" y="194" width="12" height="12"/><rect x="264" y="144" width="12" height="12"/><rect x="354" y="74" width="12" height="12"/></g>
      <g fill="var(--c)"><circle cx="110" cy="40" r="5"/><circle cx="230" cy="40" r="5"/></g>`;
  },

  green() {
    let rays = '';
    for (let i = 0; i < 14; i++) {
      const a = (-170 + i * (160 / 13)) * Math.PI / 180;
      rays += `<line x1="${(200 + Math.cos(a) * 96).toFixed(1)}" y1="${(188 + Math.sin(a) * 96).toFixed(1)}" x2="${(200 + Math.cos(a) * 112).toFixed(1)}" y2="${(188 + Math.sin(a) * 112).toFixed(1)}" stroke="var(--c)" stroke-opacity=".5" stroke-width="2" stroke-linecap="round"/>`;
    }
    const rings = [0, 1, 2].map((i) => `<circle class="a-ring" style="--i:${i};--k:${1 + i * .9};opacity:${(.5 - i * .15).toFixed(2)}" cx="200" cy="188" r="30"/>`).join('');
    return `${rings}${rays}
      <path class="a-draw" pathLength="1" d="M200 214 C200 176 200 150 200 116" fill="none" stroke="var(--c)" stroke-width="4" stroke-linecap="round"/>
      <path d="M200 152 C160 152 138 126 138 100 C176 100 200 120 200 152 Z" fill="var(--c)" fill-opacity=".35" stroke="var(--c)" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M200 130 C236 130 258 106 258 82 C222 82 200 102 200 130 Z" fill="var(--c)" fill-opacity=".35" stroke="var(--c)" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M120 216 H280" stroke="var(--c)" stroke-width="2.5" stroke-linecap="round" stroke-opacity=".7"/>`;
  }
};

function artBlock(ev, extra = '') {
  const img = ev.image ? `<img class="art-img" src="${escapeHTML(ev.image)}" alt="${escapeHTML(ev.name)} artwork" loading="lazy" onerror="this.remove()">` : '';
  return `<div class="art ${extra}" style="--bg:${ev.bg};--g:${ev.glow};--c:${ev.color}"><svg class="art-svg" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">${ART[ev.art]()}</svg>${img}<i class="art-orb"></i></div>`;
}

/* ==========================================================================
   Modals
   ========================================================================== */
let lastFocus = null;
let activeModal = null;

function openModal(el) {
  lastFocus = document.activeElement;
  activeModal = el;
  el.hidden = false;
  document.body.classList.add('no-scroll');
  requestAnimationFrame(() => el.classList.add('open'));
  setTimeout(() => (el.querySelector('[data-autofocus]') || el.querySelector('button'))?.focus({ preventScroll: true }), 60);
}
function closeModal(el, restoreFocus = true) {
  if (!el || el.hidden) return;
  el.classList.remove('open');
  document.body.classList.remove('no-scroll');
  activeModal = null;
  setTimeout(() => { el.hidden = true; }, reduceMotion ? 0 : 320);
  if (restoreFocus && lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
}
function trapFocus(e) {
  if (e.key !== 'Tab' || !activeModal) return;
  const f = $$('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])', activeModal).filter((x) => !x.disabled && x.offsetParent !== null);
  if (!f.length) return;
  const first = f[0], last = f[f.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}

/* ---------- Toast ---------- */
let toastTimer;
function showToast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}

/* ==========================================================================
   Events section
   ========================================================================== */
let activeFilter = 'All';

function renderFilters() {
  $('#filters').innerHTML = CATEGORIES.map((c) => {
    const n = c === 'All' ? EVENTS.length : EVENTS.filter((e) => e.category === c).length;
    return `<button class="filter${c === activeFilter ? ' active' : ''}" data-filter="${c}" aria-pressed="${c === activeFilter}">${c}<span>${n}</span></button>`;
  }).join('');
}

function renderEvents() {
  const q = $('#eventSearch').value.trim().toLowerCase();
  const counts = signupCounts();
  const visible = EVENTS.filter((e) => {
    const inCat = activeFilter === 'All' || e.category === activeFilter;
    return inCat && `${e.name} ${e.category} ${e.description} ${e.venue}`.toLowerCase().includes(q);
  });

  $('#eventsGrid').innerHTML = visible.length ? visible.map((ev, i) => {
    const left = seatsLeft(ev, counts);
    const pct = Math.round((left / ev.seats) * 100);
    return `
      <article class="event-card" tabindex="0" role="button" data-event-id="${ev.id}"
        aria-label="${escapeHTML(ev.name)}, ${escapeHTML(ev.category)}. View details"
        style="--bg:${ev.bg};--g:${ev.glow};--c:${ev.color};animation-delay:${i * 60}ms">
        ${artBlock(ev)}
        <span class="chip">${escapeHTML(ev.category)}</span>
        <div class="event-body">
          <div class="event-day">Day ${ev.day} · ${escapeHTML(ev.time.split(' – ')[0])}</div>
          <h3>${escapeHTML(ev.name)}</h3>
          <p>${escapeHTML(ev.description)}</p>
          <div class="event-meta">${icon('i-pin')}${escapeHTML(ev.venue)}</div>
          <div class="seats${left <= 10 ? ' low' : ''}">
            <div class="seats-bar"><i style="--w:${pct}%"></i></div>
            <span>${left === 0 ? 'Full' : `${left} of ${ev.seats} seats left`}</span>
          </div>
        </div>
      </article>`;
  }).join('') : `<div class="empty-state"><strong>No events match that search.</strong>Try a different keyword or switch the category back to All.</div>`;

  $('#resultsCount').textContent = `Showing ${visible.length} of ${EVENTS.length} events`;
}

function openEvent(id) {
  const ev = getEvent(id);
  if (!ev) return;
  selectedEventId = ev.id;
  $('#modalArt').innerHTML = artBlock(ev, 'is-live');
  $('#modalCategory').textContent = `${ev.category} · Day ${ev.day}`;
  $('#modalTitle').textContent = ev.name;
  $('#modalDescription').textContent = ev.description;
  $('#modalTime').textContent = `${ev.date}, ${ev.time}`;
  $('#modalVenue').textContent = ev.venue;
  const left = seatsLeft(ev);
  $('#modalSeats').textContent = left === 0 ? 'Full' : `${left} of ${ev.seats}`;
  $('#modalRegister').disabled = left === 0;
  openModal($('#eventModal'));
}
let selectedEventId = null;

/* ==========================================================================
   Schedule
   ========================================================================== */
let activeDay = '1';

function renderSchedule() {
  $('#scheduleList').innerHTML = (SCHEDULE[activeDay] || []).map((item, i) => `
    <div class="schedule-row" style="--i:${i}" ${item.eventId ? `data-event-id="${item.eventId}" tabindex="0" role="button" aria-label="${escapeHTML(item.name)} details"` : ''}>
      <div class="schedule-time">${escapeHTML(item.time)}</div>
      <span class="schedule-dot"></span>
      <div class="schedule-title">${escapeHTML(item.name)}<small>${escapeHTML(item.desc)}</small></div>
      <div class="schedule-place">${icon('i-pin')}${escapeHTML(item.place)}</div>
      <span class="schedule-type">${escapeHTML(item.type)}</span>
    </div>`).join('');
}

function moveTabIndicator() {
  const tab = $('.day-tab.active');
  const ind = $('#tabIndicator');
  if (!tab || !ind) return;
  ind.style.left = `${tab.offsetLeft}px`;
  ind.style.width = `${tab.offsetWidth}px`;
}

/* ==========================================================================
   Registration (multi-step)
   ========================================================================== */
const RULES = {
  name: (v) => !v.trim() ? 'Enter your full name.' : v.trim().length < 2 ? 'That name looks too short.' : !/^[A-Za-z][A-Za-z .'\-]+$/.test(v.trim()) ? 'Use letters only. Numbers and symbols are not allowed.' : '',
  roll: (v) => !v.trim() ? 'Enter your student ID or roll number.' : !/^[A-Za-z0-9\-/ ]{3,20}$/.test(v.trim()) ? 'Use 3 to 20 letters or numbers.' : '',
  email: (v) => !v.trim() ? 'Enter your college email.' : !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? 'Enter a valid email, like you@college.edu.' : '',
  phone: (v) => { const d = v.replace(/\D/g, ''); return !d ? 'Enter your phone number.' : !/^[6-9]\d{9}$/.test(d) ? 'Enter a 10-digit mobile number starting with 6, 7, 8 or 9.' : ''; },
  department: (v) => v ? '' : 'Select your department.',
  event: (v) => v ? '' : 'Choose an event to attend.',
  consent: (v) => v ? '' : 'Confirm your details to continue.'
};
const STEP_FIELDS = { 1: ['name', 'roll', 'phone', 'email'], 2: ['department', 'event'], 3: ['consent'] };
const LABELS = { name: 'Name', roll: 'Student ID', phone: 'Phone', email: 'Email', department: 'Department', event: 'Event' };

let step = 1;
let lastRecord = null;
const touched = new Set();

const fieldEl = (n) => $(`[data-field="${n}"]`);

function getValue(n) {
  if (n === 'event') return ($('input[name="event"]:checked') || {}).value || '';
  if (n === 'consent') return $('#regConsent').checked;
  const el = $(`[name="${n}"]`);
  return el ? el.value : '';
}

function showState(n) {
  const err = RULES[n](getValue(n));
  const el = fieldEl(n);
  const hint = $('.hint', el);
  el.classList.toggle('is-invalid', !!err);
  el.classList.toggle('is-valid', !err && touched.has(n));
  if (hint) hint.textContent = err;
  const input = $('input:not([type=radio]), select', el);
  if (input) input.setAttribute('aria-invalid', err ? 'true' : 'false');
  return err;
}

function validateStep(n) {
  let firstBad = null;
  STEP_FIELDS[n].forEach((f) => {
    touched.add(f);
    if (showState(f) && !firstBad) firstBad = f;
  });
  if (firstBad) {
    const el = fieldEl(firstBad);
    el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake');
    const focusTarget = $('input:not([type=radio]), select', el) || $('input[type=radio]', el);
    focusTarget?.focus({ preventScroll: false });
  }
  return !firstBad;
}

function goTo(n, dir = 'forward') {
  const prev = step;
  step = n;
  $$('.step').forEach((s) => {
    const on = Number(s.dataset.step) === n;
    s.classList.toggle('active', on);
    s.classList.toggle('back', on && dir === 'back');
  });
  $$('#stepper li').forEach((li) => {
    const i = Number(li.dataset.stepInd);
    li.classList.toggle('is-active', i === n);
    li.classList.toggle('done', i < n);
    if (i === n) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
  });
  $('#progressBar').style.width = `${(n / 3) * 100}%`;
  $('#btnBack').hidden = n === 1;
  $('#btnNext').hidden = n === 3;
  $('#btnSubmit').hidden = n !== 3;
  $('#formAlert').hidden = true;
  if (n === 3) renderReview();

  if (prev !== n) {
    const card = $('.reg-card');
    const top = card.getBoundingClientRect().top;
    if (top < 0 || top > window.innerHeight * .5) card.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    setTimeout(() => $('input:not([type=radio]):not([type=checkbox]), select', $(`.step[data-step="${n}"]`))?.focus({ preventScroll: true }), 120);
  }
}

function renderReview() {
  const ev = getEvent(getValue('event'));
  const rows = [
    ['Full name', getValue('name').trim(), 1],
    ['Student ID', getValue('roll').trim(), 1],
    ['Email', getValue('email').trim(), 1],
    ['Phone', getValue('phone').trim(), 1],
    ['Department', getValue('department'), 2],
    ['Event', ev ? `${ev.name} · ${ev.date}` : '', 2]
  ];
  $('#reviewList').innerHTML = rows.map(([k, v, s]) => `<div><dt>${k}</dt><dd>${escapeHTML(v)}<button type="button" class="edit" data-edit="${s}">Edit</button></dd></div>`).join('');
}

/* Live pass preview */
function patternSVG(seed) {
  const n = 21, r = rng(seed); let d = '';
  const finder = (x, y) => (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7);
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    let on;
    if (finder(x, y)) {
      const lx = x >= n - 7 ? x - (n - 7) : x, ly = y >= n - 7 ? y - (n - 7) : y;
      on = lx === 0 || lx === 6 || ly === 0 || ly === 6 || (lx >= 2 && lx <= 4 && ly >= 2 && ly <= 4);
    } else on = r() > .52;
    if (on) d += `M${x} ${y}h1v1h-1z`;
  }
  return `<svg viewBox="0 0 ${n} ${n}" shape-rendering="crispEdges" aria-hidden="true"><path d="${d}" fill="currentColor"/></svg>`;
}

function setText(el, text, empty) {
  if (el.textContent === text) return;
  el.textContent = text;
  el.classList.toggle('is-empty', !!empty);
  el.classList.remove('swap'); void el.offsetWidth; el.classList.add('swap');
}

function updatePass() {
  const name = getValue('name').trim();
  const dept = getValue('department');
  const ev = getEvent(getValue('event'));
  setText($('#passName'), name || 'Your name', !name);
  setText($('#passEvent'), ev ? ev.name : 'Select an event', !ev);
  $('#passDept').textContent = dept || '—';
  const email = getValue('email').trim().toLowerCase();
  const id = ev && email ? makePassId(email, ev.id) : '';
  $('#passId').textContent = id || 'TNV26-······';
  $('#passPattern').innerHTML = patternSVG(hash32(id || 'technova26'));
}

function makePassId(email, eventId) {
  return 'TNV26-' + hash32(`${email}|${eventId}`).toString(36).toUpperCase().padStart(6, '0').slice(0, 6);
}

function renderPicker() {
  const counts = signupCounts();
  const current = getValue('event');
  $('#eventPicker').innerHTML = EVENTS.map((ev) => {
    const left = seatsLeft(ev, counts);
    return `<label class="opt${left === 0 ? ' is-full' : ''}" style="--bg:${ev.bg};--g:${ev.glow};--c:${ev.color}">
      <input type="radio" name="event" value="${ev.id}" ${left === 0 ? 'disabled' : ''} ${current === ev.id ? 'checked' : ''}>
      ${artBlock(ev)}
      <span class="opt-seats">${left === 0 ? 'Full' : `${left} left`}</span>
      <span class="opt-check">${icon('i-check')}</span>
      <span class="opt-body"><strong>${escapeHTML(ev.name)}</strong><small>Day ${ev.day} · ${escapeHTML(ev.time.split(' – ')[0])} · ${escapeHTML(ev.venue)}</small></span>
    </label>`;
  }).join('');
}

function updateRegistrationCount() {
  const n = readRegistrations().length;
  $('#registrationCount').textContent = `${n} registration${n === 1 ? '' : 's'} saved`;
}

function selectEvent(id) {
  const ev = getEvent(id);
  if (!ev) return;
  const radio = $(`input[name="event"][value="${id}"]`);
  if (radio && !radio.disabled) radio.checked = true;
  touched.add('event');
  updatePass();
  if (!$('#successPanel').hidden) resetForm();
  $('#register').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  const step1Ok = STEP_FIELDS[1].every((f) => !RULES[f](getValue(f)));
  setTimeout(() => {
    if (step1Ok) goTo(2); else goTo(1);
    showToast(`${ev.name} selected`);
  }, reduceMotion ? 0 : 500);
}

function resetForm() {
  $('#registrationForm').reset();
  $('#registrationForm').hidden = false;
  $('#successPanel').hidden = true;
  $('.progress').hidden = false;
  touched.clear();
  $$('.field, .consent, .picker-wrap').forEach((f) => f.classList.remove('is-valid', 'is-invalid'));
  $$('.hint').forEach((h) => { h.textContent = ''; });
  renderPicker();
  updatePass();
  goTo(1, 'back');
}

function setFormAlert(msg) {
  const a = $('#formAlert');
  a.textContent = msg;
  a.hidden = !msg;
}

function submitRegistration() {
  if (!validateStep(3)) return;
  const ev = getEvent(getValue('event'));
  if (!ev) { goTo(2, 'back'); return; }

  const email = getValue('email').trim().toLowerCase();
  const regs = readRegistrations();

  if (regs.some((r) => r.email.toLowerCase() === email && r.eventId === ev.id)) {
    setFormAlert(`${email} is already registered for ${ev.name} in this browser. Choose a different event or email.`);
    return;
  }
  if (regs.filter((r) => r.eventId === ev.id).length >= ev.seats) {
    setFormAlert(`${ev.name} is now full. Go back and choose another event.`);
    return;
  }

  const btn = $('#btnSubmit');
  btn.classList.add('loading'); btn.disabled = true;

  setTimeout(() => {
    const record = {
      name: getValue('name').trim(), roll: getValue('roll').trim(), department: getValue('department'),
      email, phone: getValue('phone').replace(/\D/g, ''),
      eventId: ev.id, eventName: ev.name, eventDate: ev.date,
      passId: makePassId(email, ev.id), savedAt: new Date().toLocaleString()
    };
    try {
      regs.push(record);
      saveRegistrations(regs);
    } catch (err) {
      btn.classList.remove('loading'); btn.disabled = false;
      setFormAlert('Could not save your registration. Browser storage may be unavailable or full.');
      return;
    }
    btn.classList.remove('loading'); btn.disabled = false;
    lastRecord = record;
    showSuccess(record, ev);
    updateRegistrationCount();
    renderEvents();
    renderPicker();
  }, reduceMotion ? 0 : 900);
}

function showSuccess(rec, ev) {
  $('#ticketName').textContent = rec.name;
  $('#ticketEvent').textContent = ev.name;
  $('#ticketWhen').textContent = `${ev.date} · ${ev.time.split(' – ')[0]}`;
  $('#ticketVenue').textContent = ev.venue;
  $('#ticketId').textContent = rec.passId;
  $('#ticketPattern').innerHTML = patternSVG(hash32(rec.passId));
  $('#passId').textContent = rec.passId;

  $('#registrationForm').hidden = true;
  $('.progress').hidden = true;
  const panel = $('#successPanel');
  panel.hidden = false;
  panel.focus({ preventScroll: true });
  $$('#stepper li').forEach((li) => { li.classList.add('done'); li.classList.remove('is-active'); });
  setFormAlert('');
  showToast('Registration confirmed');
  const card = $('.reg-card');
  if (card.getBoundingClientRect().top < 0) card.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
}

function downloadCalendar() {
  if (!lastRecord) return;
  const ev = getEvent(lastRecord.eventId);
  const toUTC = (day, hm) => new Date(`2026-11-${pad(day)}T${hm}:00+05:30`).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const esc = (s) => String(s).replace(/([,;])/g, '\\$1');
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//TECHNOVA//2026//EN', 'BEGIN:VEVENT',
    `UID:${lastRecord.passId}@technova26`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTSTART:${toUTC(14 + (ev.day - 1), ev.start)}`,
    `DTEND:${toUTC(14 + (ev.day - 1), ev.end)}`,
    `SUMMARY:${esc(ev.name)} · TECHNOVA ’26`,
    `LOCATION:${esc(ev.venue)}`,
    `DESCRIPTION:Pass ID ${lastRecord.passId}`,
    'END:VEVENT', 'END:VCALENDAR'
  ].join('\r\n');
  downloadBlob(new Blob([ics], { type: 'text/calendar;charset=utf-8' }), `${ev.name.replace(/[^A-Za-z0-9]+/g, '-')}.ics`);
  showToast('Calendar file downloaded');
}

function downloadBlob(blob, name) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
}

async function copyPassId() {
  if (!lastRecord) return;
  try {
    await navigator.clipboard.writeText(lastRecord.passId);
    showToast('Pass ID copied');
  } catch (e) {
    showToast(`Your pass ID: ${lastRecord.passId}`);
  }
}

/* ==========================================================================
   Organizer desk
   ========================================================================== */
function renderOrganizer() {
  const regs = readRegistrations();
  const counts = signupCounts();
  $('#adminTotal').textContent = regs.length;
  $('#adminEvents').textContent = Object.keys(counts).length;
  $('#adminBreakdown').innerHTML = EVENTS.map((ev) => {
    const n = counts[ev.id] || 0;
    return `<div class="bd-row" style="--c:${ev.color};--w:${Math.round((n / ev.seats) * 100)}%"><span>${escapeHTML(ev.name)}</span><div class="bd-bar"><i></i></div><b>${n}</b></div>`;
  }).join('');
  $('#adminRows').innerHTML = regs.map((r) => `<tr><td>${escapeHTML(r.name)}</td><td>${escapeHTML(r.eventName)}</td><td>${escapeHTML(r.email)}</td><td>${escapeHTML(r.roll)}</td><td>${escapeHTML(r.passId || '')}</td></tr>`).join('');
  $('#adminEmpty').hidden = regs.length > 0;
  updateRegistrationCount();
}

function exportCSV() {
  const rows = readRegistrations();
  if (!rows.length) { showToast('There are no registrations to export yet.'); return; }
  const cols = ['name', 'roll', 'department', 'email', 'phone', 'eventName', 'eventDate', 'passId', 'savedAt'];
  const cell = (v) => {
    let s = String(v ?? '');
    if (/^[=+\-@]/.test(s)) s = `'${s}`;   // neutralise spreadsheet formulas
    return `"${s.replace(/"/g, '""')}"`;
  };
  const csv = [cols.join(','), ...rows.map((r) => cols.map((c) => cell(r[c])).join(','))].join('\r\n');
  downloadBlob(new Blob([csv], { type: 'text/csv;charset=utf-8;' }), 'technova-registrations.csv');
  showToast('CSV exported');
}

/* ==========================================================================
   Page effects
   ========================================================================== */
function initCountdown() {
  const cells = { d: $('#cdDays'), h: $('#cdHours'), m: $('#cdMins'), s: $('#cdSecs') };
  const tick = () => {
    let diff = Math.max(0, FESTIVAL_START - Date.now());
    if (diff === 0) {
      $('.countdown-label').textContent = 'The festival is live';
      Object.values(cells).forEach((c) => (c.textContent = '00'));
      return false;
    }
    const d = Math.floor(diff / 864e5); diff -= d * 864e5;
    const h = Math.floor(diff / 36e5); diff -= h * 36e5;
    const m = Math.floor(diff / 6e4); diff -= m * 6e4;
    cells.d.textContent = pad(d); cells.h.textContent = pad(h); cells.m.textContent = pad(m); cells.s.textContent = pad(Math.floor(diff / 1000));
    return true;
  };
  if (tick()) { const t = setInterval(() => { if (!tick()) clearInterval(t); }, 1000); }
}

function initCounters() {
  const set = (key, val) => { const el = $(`[data-stat="${key}"]`); if (el) el.dataset.count = val; };
  set('events', EVENTS.length);
  set('venues', new Set(EVENTS.map((e) => e.venue.replace('Starting at ', ''))).size);
  set('seats', EVENTS.reduce((a, e) => a + e.seats, 0));

  const run = (el) => {
    const target = Number(el.dataset.count);
    if (reduceMotion) { el.textContent = target; return; }
    const t0 = performance.now(), dur = 1400;
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 4)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
  }, { threshold: .6 });
  $$('.num').forEach((el) => io.observe(el));
}

function initReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .12, rootMargin: '0px 0px -6% 0px' });
  $$('[data-reveal]').forEach((el) => io.observe(el));
}

function initScrollUI() {
  const header = $('#header'), bar = $('#scrollProgress');
  let ticking = false;
  const update = () => {
    const y = window.scrollY, max = document.documentElement.scrollHeight - window.innerHeight;
    header.classList.toggle('scrolled', y > 8);
    bar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();

  const links = $$('#navLinks a[href^="#"]');
  const map = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting && map.has(e.target.id)) {
        links.forEach((l) => l.classList.remove('active'));
        map.get(e.target.id).classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  ['about', 'events', 'schedule', 'register', 'faq'].forEach((id) => { const s = document.getElementById(id); if (s) io.observe(s); });
}

function initHeroParallax() {
  if (reduceMotion || !window.matchMedia('(hover: hover)').matches) return;
  const hero = $('#home'), vis = $('#heroVisual');
  let raf;
  hero.addEventListener('mousemove', (e) => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const r = hero.getBoundingClientRect();
      vis.style.setProperty('--px', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
      vis.style.setProperty('--py', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
    });
  });
  hero.addEventListener('mouseleave', () => { vis.style.setProperty('--px', 0); vis.style.setProperty('--py', 0); });
}

function initPassTilt() {
  if (reduceMotion || !window.matchMedia('(hover: hover)').matches) return;
  const pass = $('#livePass');
  pass.addEventListener('mousemove', (e) => {
    const r = pass.getBoundingClientRect();
    pass.style.setProperty('--ry', `${(((e.clientX - r.left) / r.width) - .5) * 10}deg`);
    pass.style.setProperty('--rx', `${-(((e.clientY - r.top) / r.height) - .5) * 10}deg`);
  });
  pass.addEventListener('mouseleave', () => { pass.style.setProperty('--rx', '0deg'); pass.style.setProperty('--ry', '0deg'); });
}

/* ==========================================================================
   Wiring
   ========================================================================== */
function bind() {
  /* Filters + search */
  $('#filters').addEventListener('click', (e) => {
    const b = e.target.closest('[data-filter]');
    if (!b) return;
    activeFilter = b.dataset.filter;
    renderFilters();
    renderEvents();
  });
  $('#eventSearch').addEventListener('input', renderEvents);

  /* Event cards + schedule rows → modal */
  const openFrom = (e) => { const el = e.target.closest('[data-event-id]'); if (el) openEvent(el.dataset.eventId); };
  const keyOpen = (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[data-event-id]')) { e.preventDefault(); openEvent(e.target.dataset.eventId); }
  };
  $('#eventsGrid').addEventListener('click', openFrom);
  $('#eventsGrid').addEventListener('keydown', keyOpen);
  $('#scheduleList').addEventListener('click', openFrom);
  $('#scheduleList').addEventListener('keydown', keyOpen);

  /* Spotlight on event cards */
  $('#eventsGrid').addEventListener('mousemove', (e) => {
    const card = e.target.closest('.event-card');
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  });

  /* Schedule tabs */
  $$('.day-tab').forEach((tab) => tab.addEventListener('click', () => {
    activeDay = tab.dataset.day;
    $$('.day-tab').forEach((t) => { const on = t === tab; t.classList.toggle('active', on); t.setAttribute('aria-selected', String(on)); });
    $('#scheduleList').setAttribute('aria-labelledby', tab.id);
    moveTabIndicator();
    renderSchedule();
  }));
  window.addEventListener('resize', moveTabIndicator);

  /* Event modal */
  $('#modalClose').addEventListener('click', () => closeModal($('#eventModal')));
  $('#eventModal').addEventListener('click', (e) => { if (e.target === $('#eventModal')) closeModal($('#eventModal')); });
  $('#modalRegister').addEventListener('click', () => {
    const id = selectedEventId;
    closeModal($('#eventModal'), false);
    setTimeout(() => selectEvent(id), 120);
  });

  /* Organizer */
  $('#organizerButton').addEventListener('click', () => { renderOrganizer(); openModal($('#organizerModal')); });
  $('#organizerClose').addEventListener('click', () => closeModal($('#organizerModal')));
  $('#organizerModal').addEventListener('click', (e) => { if (e.target === $('#organizerModal')) closeModal($('#organizerModal')); });
  $('#exportCsv').addEventListener('click', exportCSV);
  $('#clearRegistrations').addEventListener('click', () => {
    if (!readRegistrations().length) { showToast('There is no local data to clear.'); return; }
    if (!window.confirm('Clear all TECHNOVA demo registrations saved in this browser?')) return;
    localStorage.removeItem(STORAGE_KEY);
    renderOrganizer(); renderEvents(); renderPicker(); updatePass();
    showToast('Local registrations cleared');
  });

  /* Registration form */
  const form = $('#registrationForm');
  const liveFields = ['name', 'roll', 'phone', 'email', 'department'];

  liveFields.forEach((n) => {
    const el = $(`[name="${n}"]`);
    el.addEventListener('input', () => {
      if (n === 'phone') el.value = el.value.replace(/\D/g, '').slice(0, 10);
      if (touched.has(n) || fieldEl(n).classList.contains('is-invalid')) showState(n);
      updatePass();
    });
    el.addEventListener('change', () => { touched.add(n); showState(n); updatePass(); });
    el.addEventListener('blur', () => { touched.add(n); showState(n); });
  });

  $('#eventPicker').addEventListener('change', () => { touched.add('event'); showState('event'); updatePass(); });
  $('#regConsent').addEventListener('change', () => { touched.add('consent'); showState('consent'); });

  $('#btnNext').addEventListener('click', () => { if (validateStep(step)) goTo(step + 1); });
  $('#btnBack').addEventListener('click', () => goTo(step - 1, 'back'));
  $('#reviewList').addEventListener('click', (e) => { const b = e.target.closest('[data-edit]'); if (b) goTo(Number(b.dataset.edit), 'back'); });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (step < 3) { if (validateStep(step)) goTo(step + 1); return; }
    submitRegistration();
  });

  $('#btnCalendar').addEventListener('click', downloadCalendar);
  $('#btnCopy').addEventListener('click', copyPassId);
  $('#btnAnother').addEventListener('click', resetForm);

  /* FAQ accordion */
  $$('.faq-q').forEach((q) => q.addEventListener('click', () => {
    q.setAttribute('aria-expanded', String(q.getAttribute('aria-expanded') !== 'true'));
  }));

  /* Mobile nav */
  const toggle = $('#menuToggle'), nav = $('#navLinks');
  const setNav = (open) => {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    toggle.innerHTML = `<svg class="ic"><use href="#${open ? 'i-close' : 'i-menu'}"/></svg>`;
  };
  toggle.addEventListener('click', () => setNav(!nav.classList.contains('open')));
  $$('#navLinks a').forEach((a) => a.addEventListener('click', () => setNav(false)));

  /* Global keys */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (activeModal) closeModal(activeModal);
      setNav(false);
    }
    trapFocus(e);
    if (e.key === '/' && !e.metaKey && !e.ctrlKey && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      $('#eventSearch').focus();
    }
  });
}

/* ==========================================================================
   SECTION IMAGES
   Every big picture on the page (hero, about gallery, schedule, registration,
   FAQ, call-to-action) is a generated scene by default. To use a real photo
   (Google image address, AI-generated image, or a file next to this page),
   paste its link between the quotes below. Empty = built-in scene.
   ========================================================================== */
const SECTION_IMAGES = {
  hero: '',
  about1: '',
  about2: '',
  about3: '',
  schedule: '',
  register: '',
  faq: '',
  cta: ''
};

/* ---------- Generated scene illustrations ---------- */
let sceneId = 0;
const svgWrap = (inner) => `<svg class="scene-svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">${inner}</svg>`;

function sceneStars(r, n, maxY) {
  let s = '';
  for (let i = 0; i < n; i++) {
    s += `<circle class="twk" style="--d:${(r() * 4).toFixed(1)}s" cx="${(r() * 800).toFixed(0)}" cy="${(r() * maxY).toFixed(0)}" r="${(.6 + r() * 1.4).toFixed(1)}" fill="#fff" opacity="${(.3 + r() * .6).toFixed(2)}"/>`;
  }
  return s;
}

function sceneCrowd(r, baseY, count, fill, k) {
  let s = '';
  for (let i = 0; i < count; i++) {
    const x = (i + .5) * (800 / count) + (r() - .5) * 20;
    const y = baseY + (r() - .5) * 12;
    const hy = y - 26 * k;
    s += `<g fill="${fill}"><circle cx="${x.toFixed(1)}" cy="${hy.toFixed(1)}" r="${(11 * k).toFixed(1)}"/>` +
      `<path d="M${(x - 17 * k).toFixed(1)} ${y + 70} Q${(x - 17 * k).toFixed(1)} ${(hy + 14).toFixed(1)} ${x.toFixed(1)} ${(hy + 13).toFixed(1)} Q${(x + 17 * k).toFixed(1)} ${(hy + 14).toFixed(1)} ${(x + 17 * k).toFixed(1)} ${y + 70}Z"/>`;
    if (r() > .55) {
      const side = r() > .5 ? 1 : -1;
      s += `<path d="M${(x + side * 12 * k).toFixed(1)} ${(hy + 22).toFixed(1)} L${(x + side * 26 * k).toFixed(1)} ${(hy - 26 * k).toFixed(1)}" stroke="${fill}" stroke-width="${(6 * k).toFixed(1)}" stroke-linecap="round" fill="none"/>`;
    }
    s += '</g>';
  }
  return s;
}

const gradStop = (id, c, a = .85) => `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c}" stop-opacity="${a}"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></linearGradient>`;
const skyGrad = (id, stops) => `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>`;

function windows(r, x, y, w, h, density) {
  let s = '';
  for (let wy = y + 12; wy < y + h - 10; wy += 20) {
    for (let wx = x + 10; wx < x + w - 12; wx += 18) {
      if (r() > density) continue;
      s += `<rect ${r() > .8 ? 'class="twk" ' : ''}style="--d:${(r() * 5).toFixed(1)}s" x="${wx}" y="${wy}" width="8" height="10" rx="1.5" fill="#ffd58a" opacity="${(.45 + r() * .5).toFixed(2)}"/>`;
    }
  }
  return s;
}

const SCENES = {
  stage(seed = 3) {
    const r = rng(seed), u = 'g' + (++sceneId);
    const beam = (x2, c, d) => `<polygon class="beam" style="--d:${d}s" points="400,34 ${x2 - 54},470 ${x2 + 54},470" fill="url(#${u}${c})"/>`;
    return svgWrap(`<defs>${skyGrad(u + 's', [[0, '#070b1f'], [.6, '#1b1850'], [1, '#3a1c5e']])}${gradStop(u + 'b', '#5b8cff')}${gradStop(u + 'o', '#ff6a3d')}${gradStop(u + 'v', '#b08cff')}
        <radialGradient id="${u}f" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ff8a5c" stop-opacity=".55"/><stop offset="1" stop-color="#ff6a3d" stop-opacity="0"/></radialGradient></defs>
      <rect width="800" height="500" fill="url(#${u}s)"/>${sceneStars(r, 55, 220)}
      ${beam(90, 'b', 0)}${beam(240, 'o', .8)}${beam(400, 'v', .4)}${beam(560, 'o', 1.2)}${beam(710, 'b', .2)}
      <ellipse cx="400" cy="380" rx="420" ry="90" fill="url(#${u}f)"/>
      <rect x="0" y="18" width="800" height="26" fill="#0a0f2a"/>
      <g fill="#fff">${[60, 160, 260, 360, 440, 540, 640, 740].map((x) => `<circle cx="${x}" cy="31" r="5" opacity=".9"/>`).join('')}</g>
      <rect x="130" y="338" width="540" height="42" rx="4" fill="#0c1233"/><rect x="130" y="338" width="540" height="3" fill="#ff6a3d" opacity=".8"/>
      ${sceneCrowd(r, 425, 26, '#0f1740', .9)}${sceneCrowd(r, 480, 15, '#050818', 1.3)}`);
  },

  campus(seed = 5) {
    const r = rng(seed), u = 'g' + (++sceneId);
    let far = '', near = '', trees = '', lamps = '';
    for (let x = -10; x < 820; x += 62) { const w = 48 + r() * 30, h = 70 + r() * 100; far += `<rect x="${x}" y="${380 - h}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" fill="#1a2158" opacity=".9"/>`; }
    for (let x = 6; x < 800; x += 112) {
      if (x > 290 && x < 440) continue;
      const w = 78 + r() * 26, h = 110 + r() * 110, y = 400 - h;
      near += `<rect x="${x}" y="${y.toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" fill="#0b1130"/>${windows(r, x, y, w, h, .6)}`;
    }
    for (let i = 0; i < 9; i++) { const x = 40 + i * 92 + r() * 30; trees += `<rect x="${x.toFixed(0)}" y="392" width="6" height="22" fill="#060a1c"/><circle cx="${(x + 3).toFixed(0)}" cy="384" r="${(20 + r() * 10).toFixed(0)}" fill="#0a1a36"/>`; }
    for (let i = 0; i < 5; i++) { const x = 90 + i * 155; lamps += `<rect x="${x}" y="380" width="4" height="48" fill="#060a1c"/><circle cx="${x + 2}" cy="378" r="22" fill="#ffd58a" opacity=".22"/><circle cx="${x + 2}" cy="378" r="5" fill="#ffe7b0"/>`; }
    return svgWrap(`<defs>${skyGrad(u + 's', [[0, '#0a1030'], [.55, '#2c2a6e'], [1, '#ff9a6b']])}</defs>
      <rect width="800" height="500" fill="url(#${u}s)"/>${sceneStars(r, 40, 200)}
      <circle cx="650" cy="110" r="64" fill="#fff3d6" opacity=".14"/><circle cx="650" cy="110" r="34" fill="#fff3d6"/>
      ${far}${near}
      <rect x="320" y="170" width="76" height="232" fill="#0b1130"/><polygon points="312,172 358,110 404,172" fill="#0b1130"/>
      <circle cx="358" cy="214" r="20" fill="#ffd58a"/><path d="M358 214V202M358 214L367 218" stroke="#0b1130" stroke-width="3" stroke-linecap="round"/>
      ${windows(r, 320, 250, 76, 140, .55)}
      <rect y="400" width="800" height="100" fill="#070b1c"/><ellipse cx="400" cy="470" rx="420" ry="26" fill="#121a45"/>
      ${trees}${lamps}`);
  },

  lab(seed = 9) {
    const r = rng(seed), u = 'g' + (++sceneId);
    let code = '', code2 = '', hex = '';
    for (let i = 0; i < 9; i++) code += `<rect class="typ" style="--d:${(i * .3).toFixed(1)}s" x="${196 + (i % 3) * 20}" y="${176 + i * 15}" width="${40 + Math.floor(r() * 150)}" height="6" rx="3" fill="${i % 3 ? '#5bd6ff' : '#ff6a3d'}" opacity=".85"/>`;
    for (let i = 0; i < 6; i++) code2 += `<rect x="${506}" y="${196 + i * 16}" width="${30 + Math.floor(r() * 90)}" height="5" rx="2.5" fill="#8fb0ff" opacity=".75"/>`;
    for (let i = 0; i < 7; i++) { const x = 60 + r() * 680, y = 60 + r() * 110, s = 8 + r() * 12; hex += `<polygon class="flt" style="--d:${(r() * 4).toFixed(1)}s" points="${x},${y - s} ${x + s * .87},${y - s / 2} ${x + s * .87},${y + s / 2} ${x},${y + s} ${x - s * .87},${y + s / 2} ${x - s * .87},${y - s / 2}" fill="none" stroke="#5bd6ff" stroke-opacity=".6" stroke-width="1.5"/>`; }
    return svgWrap(`<defs>${skyGrad(u + 's', [[0, '#050c20'], [1, '#0b2a4a']])}<linearGradient id="${u}m" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0d2b57"/><stop offset="1" stop-color="#06122b"/></linearGradient></defs>
      <rect width="800" height="500" fill="url(#${u}s)"/>
      <g stroke="#5bd6ff" stroke-opacity=".08">${Array.from({ length: 14 }, (_, i) => `<line x1="${i * 60}" y1="0" x2="${i * 60}" y2="500"/>`).join('')}${Array.from({ length: 9 }, (_, i) => `<line x1="0" y1="${i * 60}" x2="800" y2="${i * 60}"/>`).join('')}</g>
      <g fill="none" stroke="#5bd6ff" stroke-opacity=".5" stroke-width="2"><path d="M0 120H90V70H200"/><path d="M800 150H700V90H610"/><path d="M0 300H60V360"/></g>
      <g fill="#5bd6ff"><circle cx="200" cy="70" r="4"/><circle cx="610" cy="90" r="4"/><circle cx="60" cy="360" r="4"/></g>${hex}
      <rect x="170" y="140" width="290" height="190" rx="14" fill="#050a1c" stroke="#5bd6ff" stroke-width="2"/><rect x="184" y="154" width="262" height="162" rx="6" fill="url(#${u}m)"/>${code}
      <rect x="296" y="330" width="38" height="30" fill="#0a1430"/><rect x="260" y="358" width="110" height="10" rx="5" fill="#0a1430"/>
      <rect x="480" y="170" width="170" height="130" rx="12" fill="#050a1c" stroke="#8fb0ff" stroke-opacity=".7" stroke-width="2"/><rect x="492" y="182" width="146" height="106" rx="5" fill="url(#${u}m)"/>${code2}
      <rect x="548" y="300" width="30" height="30" fill="#0a1430"/><rect x="520" y="328" width="86" height="8" rx="4" fill="#0a1430"/>
      <path d="M740 410 L722 340 L672 300" fill="none" stroke="#ff6a3d" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
      <g fill="#ffa27d"><circle cx="740" cy="410" r="12"/><circle cx="722" cy="340" r="9"/><circle cx="672" cy="300" r="7"/></g>
      <rect y="400" width="800" height="100" fill="#040816"/><rect y="400" width="800" height="3" fill="#5bd6ff" opacity=".5"/>
      <rect x="190" y="418" width="250" height="26" rx="6" fill="#0b1536" stroke="#5bd6ff" stroke-opacity=".4"/>`);
  },

  gate(seed = 11) {
    const r = rng(seed), u = 'g' + (++sceneId);
    let bokeh = '';
    const cols = ['#ff6a3d', '#5b8cff', '#b08cff'];
    for (let i = 0; i < 22; i++) bokeh += `<circle class="bk" style="--d:${(r() * 6).toFixed(1)}s" cx="${(r() * 800).toFixed(0)}" cy="${(r() * 460).toFixed(0)}" r="${(10 + r() * 34).toFixed(0)}" fill="${cols[Math.floor(r() * 3)]}" opacity="${(.12 + r() * .2).toFixed(2)}"/>`;
    return svgWrap(`<defs>${skyGrad(u + 's', [[0, '#1b0f3a'], [1, '#050818']])}<radialGradient id="${u}a" cx="50%" cy="55%" r="50%"><stop offset="0" stop-color="#ffb58f" stop-opacity=".7"/><stop offset="1" stop-color="#ff6a3d" stop-opacity="0"/></radialGradient></defs>
      <rect width="800" height="500" fill="url(#${u}s)"/>${bokeh}
      <path d="M170 450V220A230 230 0 0 1 630 220V450Z" fill="url(#${u}a)"/>
      <path d="M170 450V220A230 230 0 0 1 630 220V450" fill="none" stroke="#ff6a3d" stroke-opacity=".3" stroke-width="30"/>
      <path d="M170 450V220A230 230 0 0 1 630 220V450" fill="none" stroke="#ffb58f" stroke-width="8" stroke-linecap="round"/>
      <g class="flt" style="--d:0s"><rect x="330" y="150" width="140" height="80" rx="12" fill="#f4f6ff" transform="rotate(-8 400 190)"/><circle cx="330" cy="190" r="10" fill="#1b0f3a" transform="rotate(-8 400 190)"/><path d="M360 170H440M360 190H420M360 210H400" stroke="#1b0f3a" stroke-width="6" stroke-linecap="round" transform="rotate(-8 400 190)"/></g>
      <rect y="440" width="800" height="60" fill="#070a1e"/><ellipse cx="400" cy="450" rx="260" ry="14" fill="#ff6a3d" opacity=".35"/>
      ${sceneCrowd(r, 430, 13, '#04061a', 1.35)}`);
  },

  skyline(seed = 13) {
    const r = rng(seed), u = 'g' + (++sceneId);
    let b1 = '', b2 = '';
    for (let x = -10; x < 820; x += 56) { const w = 44 + r() * 34, h = 90 + r() * 150; b1 += `<rect x="${x}" y="${410 - h}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" fill="#2a1f58" opacity=".85"/>`; }
    for (let x = 0; x < 800; x += 80) { const w = 62 + r() * 30, h = 70 + r() * 150, y = 440 - h; b2 += `<rect x="${x}" y="${y.toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" fill="#0a0f2b"/>${windows(r, x, y, w, h, .5)}`; }
    return svgWrap(`<defs>${skyGrad(u + 's', [[0, '#0b1030'], [.5, '#4b2a7a'], [1, '#ff7a45']])}<radialGradient id="${u}u" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff0d0"/><stop offset=".45" stop-color="#ffb070"/><stop offset="1" stop-color="#ff6a3d" stop-opacity="0"/></radialGradient></defs>
      <rect width="800" height="500" fill="url(#${u}s)"/>${sceneStars(r, 35, 170)}
      <circle cx="560" cy="330" r="180" fill="url(#${u}u)" opacity=".85"/>${b1}${b2}<rect y="440" width="800" height="60" fill="#060917"/>`);
  }
};

function hydratePhotos() {
  $$('.photo[data-scene]').forEach((el, i) => {
    const make = SCENES[el.dataset.scene];
    if (!make) return;
    const seed = Number(el.dataset.seed) || (3 + i * 7);
    el.insertAdjacentHTML('afterbegin', make(seed));
    const url = SECTION_IMAGES[el.dataset.imgKey];
    if (url) el.insertAdjacentHTML('afterbegin', `<img class="photo-img" src="${escapeHTML(url)}" alt="" loading="lazy" onerror="this.remove()">`);
  });
}


/* ---------- Init ---------- */
function init() {
  $$('[data-art-event]').forEach((el) => {
    const ev = getEvent(el.dataset.artEvent);
    if (ev) el.outerHTML = artBlock(ev, `bento-art is-live`);
  });

  hydratePhotos();
  renderFilters();
  renderEvents();
  renderSchedule();
  renderPicker();
  updateRegistrationCount();
  updatePass();
  goTo(1);
  bind();

  requestAnimationFrame(moveTabIndicator);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveTabIndicator);

  initCountdown();
  initCounters();
  initReveal();
  initScrollUI();
  initHeroParallax();
  initPassTilt();
}

init();