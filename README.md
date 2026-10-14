# 🚀 EVO TOPUP — Premium Topup Platform

A production-ready topup web application with **User Panel** and **Admin Panel**, powered by Firebase & deployable on Vercel.

## ✨ Features

### User Panel
- 📝 Secure email/password registration & login
- 💰 Wallet system with balance management
- 🎮 Browse games & purchase topup packages
- 💳 Add money (bKash / Nagad / Rocket)
- 🎟️ Redeem codes
- 📦 Order history with live status
- 🏅 Rank system with progression
- 💬 Live chat support
- 📱 Fully responsive mobile-first UI

### Admin Panel
- 🔒 Role-based access (Super Admin only)
- 📊 Dashboard with revenue & stats
- 👥 User management (CRUD, balance adjustment)
- 💰 Deposit approval / rejection
- 📦 Order processing (complete / refund)
- 🎮 Product & package management
- 🖼️ Banner & category management
- 🎟️ Redeem code generator
- 🏅 Rank system editor
- ⚙️ Site settings (branding, payment, social, popup)
- 💬 Live chat with users
- 📈 Activity monitoring

## 🏗️ Tech Stack

- **Frontend:** Vanilla JS + Tailwind CSS + Font Awesome
- **Backend:** Firebase (Firestore + Auth)
- **Hosting:** Vercel
- **Security:** Firestore Security Rules (server-side RBAC)

## 🚀 Quick Start

### 1. Clone & Install

\`\`\`bash
git clone https://github.com/YOUR_USERNAME/evo-topup.git
cd evo-topup
npm install
\`\`\`

### 2. Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create project (or use existing `evo-topup-75dd1`)
3. Enable **Email/Password** authentication
4. Create **Firestore Database**
5. Update `js/firebase-config.js` with your config

### 3. Deploy Firestore Rules ⚠️ CRITICAL

\`\`\`bash
# Install Firebase CLI
npm install -g firebase-tools

# Login & init
firebase login
firebase init firestore

# Deploy rules
firebase deploy --only firestore:rules,firestore:indexes
\`\`\`

### 4. Create Super Admin

In **Firebase Console → Firestore**, manually create:

Collection: `admins`
Document ID: `<ADMIN_USER_UID>`
Fields: `{ email: "admin@evotopup.com", createdAt: <timestamp> }`

To get the UID:
1. Register normally at your site
2. Go to **Firebase Console → Authentication → Users**
3. Copy the UID of the admin user
4. Create `admins/<UID>` document in Firestore

### 5. Run Locally

\`\`\`bash
npm run dev
# Visit http://localhost:3000
# Admin: http://localhost:3000/admin.html
\`\`\`

## ☁️ Deploy to Vercel

### Step 1: Push to GitHub

\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/evo-topup.git
git push -u origin main
\`\`\`

### Step 2: Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repo
3. **Framework Preset:** Other
4. **Build Command:** (leave empty)
5. **Output Directory:** `.` (or leave default)
6. Click **Deploy**

### Step 3: Configure Firebase Auth Domain

After deploy, go to **Firebase Console → Authentication → Settings → Authorized Domains** and add:
- `your-project.vercel.app`
- `your-custom-domain.com` (if any)

## 🔐 Security Notes

- ✅ Firestore Rules enforce role-based access on the **server**
- ✅ Client config (API key) is safe to expose — real security is in Rules
- ✅ Admin check happens **after** login via `admins/{uid}` collection
- ✅ Users cannot modify their own `balance`, `totalSpend`, or `role`
- ✅ Admin-only collections (`/admin/*`, `/activity_logs/*`) are protected

## 📁 Environment Variables

**None required** for the static build. Firebase config lives in `js/firebase-config.js` (safe for public repos).

If you later add serverless functions, see `.env.example`.

## 🗂️ Project Structure

\`\`\`
evo-topup/
├── index.html              # User Panel
├── admin.html              # Admin Panel
├── firestore.rules         # ⚠️ MUST deploy
├── firestore.indexes.json
├── vercel.json
├── package.json
├── css/                    # Stylesheets
├── js/                     # JavaScript modules
└── public/                 # Static assets
\`\`\`

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Admin panel shows "Access Denied" | Create `admins/{uid}` doc in Firestore |
| Blank page after login | Check Firestore Rules deployed |
| "Missing or insufficient permissions" | Check rules + `admins` collection |
| OTP / Login fails | Add Vercel domain to Firebase Authorized Domains |

## 📝 License

MIT © EVO TOPUP