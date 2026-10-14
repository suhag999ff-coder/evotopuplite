/* ═══════════ USER PANEL LOGIC ═══════════ */
// NOTE: Full logic is identical to your original <script> in index.html
// (register/login, topup flow, add-money, orders, codes, ranks, chat, FAB)
// Move all functions from the user index.html <script> block here EXCEPT:
//   - firebaseConfig (moved to firebase-config.js)
//   - $, setText, fmtDate, fmtTime, escapeHtml, floatToast, lockBodyScroll,
//     unlockBodyScroll, DEFAULT_METHOD_LOGO, METHODS, DEFAULT_RANKS, INPUT_TYPES,
//     getPkgIcon, Validators, togglePass, toggleAuth, handleRegister,
//     handleLogin, handleLogout (moved to utils/validation/auth)
//
// Example skeleton:
let currentUser = null, userData = {};
let userBalance = 0, totalSpend = 0, weeklySpend = 0;
let selectedProduct = null, selectedGameId = null, selectedGameName = "";
let selectedPayOption = 'wallet', selectedPayMethod = 'bkash';
let allCategories = [], allGames = [], gamesData = {};
let paymentNumbers = {}, paymentLogos = {};
let ranksList = [], currentRank = null, nextRank = null;
let listenersStarted = false;
let globalWalletLogo = '', globalInstantLogo = '';
let addmoneyAmount = 0;
let amSelectedMethod = 'bkash';
let chatUnsub = null, chatMessages = [];
let allSupportItems = [];
let currentSiteName = 'EVO TOPUP', currentSiteLogo = '';
let chatOnlineStatus = true;
let fabMenuOpen = false;

// ... paste your existing showSec(), openTopUpPage(), selectProduct(),
// buyNowClick(), openPaymentPage(), submitInstantOrder(), goToAmountNext(),
// submitAddMoney(), loadMyOrders(), loadMyCodes(), redeemCode(),
// savePersonalInfo(), computeRank(), updateRankUI(), renderRankJourney(),
// buildFabItems(), toggleFabMenu(), openLiveChat(), sendChatMessage(),
// renderCategories(), startSlider(), loadRecentOrders(), listenUser(),
// startAppListeners(), etc.

// Then replace the auth.onAuthStateChanged block at the bottom.