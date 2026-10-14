/* ═══════════ AUTHENTICATION (SHARED) ═══════════ */
function togglePass(id, btn) {
  const inp = $(id), i = btn.querySelector('i');
  if (inp.type === 'password') { inp.type = 'text'; i.classList.replace('fa-eye', 'fa-eye-slash'); }
  else { inp.type = 'password'; i.classList.replace('fa-eye-slash', 'fa-eye'); }
}

/* ---------- USER AUTH ---------- */
function toggleAuth(v) {
  const l = $('login-form'), r = $('register-form');
  if (v === 'login') {
    l.classList.remove('hidden'); r.classList.add('hidden');
    $('btn-login-view').classList.add('on'); $('btn-reg-view').classList.remove('on');
  } else {
    l.classList.add('hidden'); r.classList.remove('hidden');
    $('btn-reg-view').classList.add('on'); $('btn-login-view').classList.remove('on');
  }
}

async function handleRegister() {
  const name = $('reg-name').value.trim();
  const email = $('reg-email').value.trim();
  const phone = $('reg-phone').value.trim();
  const pass = $('reg-pass').value;

  if (!name || !email || !phone || !pass) return Swal.fire({ icon:'error', title:'Error', text:'সব ফিল্ড পূরণ করুন', confirmButtonColor:'#c8102e' });
  if (!Validators.email(email)) return Swal.fire({ icon:'error', title:'Error', text:'সঠিক Email দিন', confirmButtonColor:'#c8102e' });
  if (!Validators.phone(phone)) return Swal.fire({ icon:'error', title:'Error', text:'সঠিক ১১ ডিজিটের Phone দিন', confirmButtonColor:'#c8102e' });
  if (!Validators.password(pass)) return Swal.fire({ icon:'error', title:'Error', text:'Password কমপক্ষে ৬ অক্ষর', confirmButtonColor:'#c8102e' });

  Swal.showLoading();
  try {
    const cred = await auth.createUserWithEmailAndPassword(email, pass);
    await db.collection('users').doc(cred.user.uid).set({
      name, email, phone, balance: 0, totalSpend: 0, weeklySpend: 0, totalOrders: 0,
      supportPin: Math.floor(10000 + Math.random() * 90000),
      role: 'user', suspended: false,
      createdAt: new Date()
    });
    Swal.fire({ icon:'success', title:'Success', text:'Account Created!', confirmButtonColor:'#c8102e' });
  } catch(e) {
    Swal.fire({ icon:'error', title:'Error', text: e.message, confirmButtonColor:'#c8102e' });
  }
}

async function handleLogin() {
  const e = $('login-email').value.trim();
  const p = $('login-pass').value;
  if (!e || !p) return Swal.fire({ icon:'warning', title:'Warning', text:'ইমেইল ও পাসওয়ার্ড দিন', confirmButtonColor:'#c8102e' });
  Swal.showLoading();
  try {
    await auth.signInWithEmailAndPassword(e, p);
  } catch(err) {
    Swal.fire({ icon:'error', title:'Login Failed', text: err.message, confirmButtonColor:'#c8102e' });
  }
}

function handleLogout() {
  Swal.fire({
    title:'Log Out?', icon:'question', showCancelButton:true,
    confirmButtonText:'Yes', confirmButtonColor:'#c8102e', cancelButtonColor:'#64748b'
  }).then(r => { if (r.isConfirmed) auth.signOut().then(() => location.reload()); });
}

/* ---------- ADMIN AUTH ---------- */
async function adminLogin() {
  const e = $('admin-email').value.trim();
  const p = $('admin-pass').value;
  if (!e || !p) return Swal.fire('Error', 'Empty credentials', 'warning');
  Swal.showLoading();
  try {
    const cred = await auth.signInWithEmailAndPassword(e, p);
    // Role check happens in onAuthStateChanged via isAdminCheck()
  } catch(err) {
    Swal.fire('Login Failed', err.message, 'error');
  }
}

function adminLogout() {
  Swal.fire({
    title:'Log Out?', icon:'question', showCancelButton:true,
    confirmButtonText:'Yes', confirmButtonColor:'#c8102e'
  }).then(r => { if (r.isConfirmed) auth.signOut().then(() => location.reload()); });
}

/* ---------- ADMIN ROLE CHECK ---------- */
async function isAdminCheck(uid) {
  try {
    const snap = await db.collection('admins').doc(uid).get();
    return snap.exists;
  } catch(e) {
    console.error('Admin check failed:', e);
    return false;
  }
}