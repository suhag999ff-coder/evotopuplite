/* ═══════════ SHARED UTILITIES ═══════════ */
const $ = (id) => document.getElementById(id);
const setText = (id, v) => { const el = $(id); if (el) el.textContent = v; };

const fmtDate = (dv) => {
  if (!dv) return 'N/A';
  const d = dv.toDate ? dv.toDate() : new Date(dv);
  return d.toLocaleString('en-GB', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit', hour12:true });
};

const fmtTime = (dv) => {
  if (!dv) return '';
  const d = dv.toDate ? dv.toDate() : new Date(dv);
  return d.toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit', hour12:true });
};

function escapeHtml(s) {
  return (s || '').replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
}

function floatToast(msg, color = '#c8102e') {
  const el = document.createElement('div');
  el.className = 'toast-float';
  el.style.background = color;
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => {
    el.style.transition = 'opacity .4s';
    el.style.opacity = '0';
    setTimeout(() => el.remove(), 400);
  }, 1400);
}

function lockBodyScroll() {
  const y = window.scrollY;
  document.body.style.top = `-${y}px`;
  document.body.classList.add('modal-open');
}
function unlockBodyScroll() {
  const y = document.body.style.top;
  document.body.classList.remove('modal-open');
  document.body.style.top = '';
  if (y) window.scrollTo(0, parseInt(y || '0') * -1);
}

const observer = new MutationObserver(() => {
  const anyOpen = document.querySelectorAll('.modal-overlay:not(.hidden)').length > 0;
  if (anyOpen && !document.body.classList.contains('modal-open')) lockBodyScroll();
  else if (!anyOpen && document.body.classList.contains('modal-open')) unlockBodyScroll();
});

// Shared helpers
const DEFAULT_METHOD_LOGO = {
  bkash: "https://i.ibb.co.com/9kCCTNsx/1656227518bkash-logo-png.png",
  nagad: "https://i.ibb.co.com/VcqJTvpn/Nagad-Logo-horizontally-og.png",
  rocket: "https://i.ibb.co.com/wFZkNM48/rocket-color-logo-mobile-banking-icon-free-png.png"
};

const METHODS = {
  bkash:  { name:"bKash",  ussd:"*247#", heroBg:"linear-gradient(135deg,#c8102e,#8b0000)", instBg:"linear-gradient(135deg,#c8102e,#8b0000)", verify:"linear-gradient(135deg,#8b0000,#c8102e)" },
  nagad:  { name:"Nagad",  ussd:"*167#", heroBg:"linear-gradient(135deg,#ec1c24,#c81010)", instBg:"linear-gradient(135deg,#c81010,#ec1c24)", verify:"linear-gradient(135deg,#8b0000,#c8102e)" },
  rocket: { name:"Rocket", ussd:"*322#", heroBg:"linear-gradient(135deg,#6638e8,#8b6df0)", instBg:"linear-gradient(135deg,#5b2cc4,#7c3aed)", verify:"linear-gradient(135deg,#4c1d95,#6638e8)" }
};

const DEFAULT_RANKS = [
  { name:"Bronze",       min:0,       max:100,       tagline:"Start your journey", color:"#b45309", icon:"fa-medal",  image:"" },
  { name:"Silver",       min:101,     max:1000,      tagline:"Keep grinding",      color:"#64748b", icon:"fa-medal",  image:"" },
  { name:"Gold",         min:1001,    max:5000,      tagline:"Shine brighter",     color:"#f59e0b", icon:"fa-crown",  image:"" },
  { name:"Platinum",     min:5001,    max:10000,     tagline:"Elite status",       color:"#0891b2", icon:"fa-gem",    image:"" },
  { name:"Diamond",      min:10001,   max:25000,     tagline:"Premium glow",       color:"#a855f7", icon:"fa-gem",    image:"" },
  { name:"Heroic",       min:25001,   max:50000,     tagline:"Legendary",          color:"#ef4444", icon:"fa-dragon", image:"" },
  { name:"Master",       min:50001,   max:100000,    tagline:"Top tier",           color:"#8b5cf6", icon:"fa-crown",  image:"" },
  { name:"Grand Master", min:100001,  max:999999999, tagline:"Ultimate",           color:"#eab308", icon:"fa-crown",  image:"" }
];

const INPUT_TYPES = {
  uid:      { label:"Player ID / UID",   placeholder:"Enter your ID",   icon:"fa-id-card",    help:"সঠিক UID দিন।" },
  freefire: { label:"Free Fire UID",     placeholder:"e.g. 2535040417", icon:"fa-fire",       help:"Free Fire এর UID দিন।" },
  pubg:     { label:"PUBG Player ID",    placeholder:"e.g. 5123456789", icon:"fa-crosshairs", help:"PUBG Player ID দিন।" },
  custom:   { label:"Your Information",  placeholder:"Enter here",      icon:"fa-keyboard",   help:"" }
};

function getPkgIcon(name) {
  if (!name) return { icon:'fa-gem', color:'#c8102e' };
  const n = name.toLowerCase();
  if (n.includes('diamond') || n.includes('dia') || n.includes('robux') || n.includes('gem')) return { icon:'fa-gem', color:'#c8102e' };
  if (n.includes('uc')) return { icon:'fa-star', color:'#f59e0b' };
  if (n.includes('coin') || n.includes('gold') || n.includes('silver')) return { icon:'fa-coins', color:'#f59e0b' };
  if (n.includes('weekly') || n.includes('week')) return { icon:'fa-calendar-week', color:'#c8102e' };
  if (n.includes('monthly') || n.includes('month')) return { icon:'fa-calendar-days', color:'#e2136e' };
  if (n.includes('pass') || n.includes('bp') || n.includes('royal')) return { icon:'fa-ticket', color:'#10b981' };
  if (n.includes('vip')) return { icon:'fa-crown', color:'#f59e0b' };
  return { icon:'fa-gem', color:'#c8102e' };
}