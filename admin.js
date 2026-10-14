/* ═══════════ ADMIN PANEL LOGIC ═══════════ */
// NOTE: Full logic is identical to your original <script> in admin index.html.
// Move all admin functions here EXCEPT:
//   - firebaseConfig, $, setText, fmtDate, fmtTime, escapeHtml, floatToast,
//     lockBodyScroll, unlockBodyScroll (moved to utils/auth)
//   - adminLogin, adminLogout, togglePass (moved to auth.js)

let allUsers = [], allCategories = [], allProducts = [], allBanners = [], allCodes = [];
let allSupport = [], allRanks = [], allChats = [];
let paymentNumbers = {}, settingsData = {};
let currentUserView = null, currentEditingProduct = null;
let cpSelectedCategory = '', cpSelectedType = 'uid';
let depositFilter = 'pending', orderFilter = 'pending';
let listenersStarted = false, confirmCallback = null;
let productsCache = {}, currentPackagesUnsub = null;
let newItemIds = new Set();
let editingRankIndex = -1;
let activeChatUserId = null, activeChatUnsub = null;
let currentSiteLogo = '';
let chatOnlineStatus = true;

// ... paste ALL your admin functions here: navTo, openSettingPage, renderUsers,
// renderDeposits, renderOrders, renderChats, openAdminChat, adminSendMessage,
// addCategory, renderCategories, submitCreateProduct, openPackages, addPackage,
// addBanner, saveRank, renderRanks, addRedeemCode, saveSiteInfo, savePayment,
// saveLogos, savePopup, saveGeneral, saveSocial, addSupport, renderSupport,
// startAllListeners, etc.

// ⚠️ IMPORTANT — Replace your original auth.onAuthStateChanged with the version below
auth.onAuthStateChanged(async (user) => {
  if (user) {
    // 🔒 CRITICAL: Verify admin role from server
    Swal.showLoading();
    const ok = await isAdminCheck(user.uid);
    Swal.close();
    if (!ok) {
      await auth.signOut();
      Swal.fire({
        icon: 'error',
        title: 'Access Denied',
        text: 'আপনি Admin নন। যোগাযোগ করুন Super Admin এর সাথে।',
        confirmButtonColor: '#c8102e'
      });
      return;
    }
    $('login-sec').classList.add('hidden');
    $('admin-app').classList.remove('hidden');
    startAllListeners();
    setText('more-year', new Date().getFullYear());
  } else {
    $('login-sec').classList.remove('hidden');
    $('admin-app').classList.add('hidden');
  }
});