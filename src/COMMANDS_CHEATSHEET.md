# 🚀 LoadLink Deployment - Commands Cheatsheet

Quick reference for all deployment commands.

---

## ⚡ FASTEST DEPLOYMENT (60 seconds)

### Vercel (RECOMMENDED)
```bash
npx vercel --prod
```
**Done!** Your app is live. That's literally it.

---

## 📋 ALL PLATFORM COMMANDS

### 🔷 VERCEL

#### Install & Login
```bash
npm install -g vercel
vercel login
```

#### Deploy
```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# No installation needed (recommended)
npx vercel --prod
```

#### Manage
```bash
# View deployments
vercel ls

# View logs
vercel logs

# Inspect deployment
vercel inspect <url>

# Remove deployment
vercel remove <deployment-name>
```

---

### 🔷 NETLIFY

#### Install & Login
```bash
npm install -g netlify-cli
netlify login
```

#### Deploy
```bash
# Initialize (first time)
netlify init

# Deploy to preview
netlify deploy

# Deploy to production
netlify deploy --prod

# No installation needed
npx netlify-cli deploy --prod
```

#### Manage
```bash
# View status
netlify status

# View sites
netlify sites:list

# Open dashboard
netlify open

# View logs
netlify logs
```

#### Drag & Drop (No CLI)
```
Visit: https://app.netlify.com/drop
Drag your project folder
```

---

### 🔷 FIREBASE

#### Install & Login
```bash
npm install -g firebase-tools
firebase login
```

#### Initialize (First Time)
```bash
firebase init hosting

# Answer these:
# - Public directory: dist
# - Single-page app: Yes
# - Overwrite index.html: No
```

#### Deploy
```bash
# Deploy hosting
firebase deploy --only hosting

# Deploy everything
firebase deploy

# Deploy to specific project
firebase deploy --only hosting --project <project-id>
```

#### Manage
```bash
# List projects
firebase projects:list

# View hosting sites
firebase hosting:sites:list

# View channels
firebase hosting:channel:list

# Delete old deployments
firebase hosting:clone <source>:<channel> <target>:<channel>
```

---

## 🔧 GIT COMMANDS (For Git-based deployment)

### First Time Setup
```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial LoadLink deployment"

# Add remote (replace with your URL)
git remote add origin https://github.com/yourusername/loadlink.git

# Push to GitHub
git push -u origin main
```

### Regular Updates
```bash
# Add changes
git add .

# Commit
git commit -m "Update LoadLink"

# Push (auto-deploys if connected)
git push
```

---

## 🌐 CONNECT TO GIT PLATFORMS

### Vercel with GitHub
```bash
# Via CLI
vercel --prod

# Via Web
# 1. Go to vercel.com/new
# 2. Import from GitHub
# 3. Click Deploy
```

### Netlify with GitHub
```bash
# Via CLI
netlify init

# Via Web
# 1. Go to app.netlify.com
# 2. New site from Git
# 3. Connect GitHub
# 4. Deploy
```

### Firebase with GitHub Actions
```bash
# 1. Create Firebase token
firebase login:ci

# 2. Add token to GitHub Secrets
# 3. Enable workflow in .github/workflows/deploy.yml
```

---

## 🎨 CUSTOM DOMAIN COMMANDS

### Vercel
```bash
# Add domain
vercel domains add yourdomain.com

# Inspect domain
vercel domains inspect yourdomain.com

# Remove domain
vercel domains rm yourdomain.com
```

### Netlify
```bash
# Add domain (via dashboard)
netlify open:site
# Then: Domain Management → Add custom domain
```

### Firebase
```bash
# Via dashboard only
# Firebase Console → Hosting → Add custom domain
```

---

## 📊 MONITORING COMMANDS

### Vercel
```bash
# View analytics
vercel inspect <deployment-url>

# Real-time logs
vercel logs --follow
```

### Netlify
```bash
# View logs
netlify logs

# Open analytics
netlify open:site
```

### Firebase
```bash
# View usage
firebase hosting:sites:list

# View analytics in console
# Firebase Console → Analytics
```

---

## 🔄 ROLLBACK COMMANDS

### Vercel
```bash
# Promote previous deployment
vercel --promote <previous-deployment-url>

# Or via dashboard
# Dashboard → Deployments → Promote to Production
```

### Netlify
```bash
# Rollback via dashboard
# Site → Deploys → Click previous deploy → Publish deploy
```

### Firebase
```bash
# List versions
firebase hosting:sites:list

# Rollback via console
# Firebase Console → Hosting → Rollback
```

---

## 🧹 CLEANUP COMMANDS

### Vercel
```bash
# Remove old deployments
vercel remove <deployment-name>

# Remove all previews
vercel remove --yes --safe
```

### Netlify
```bash
# Delete site
netlify sites:delete
```

### Firebase
```bash
# List and manage versions in console
# Firebase Console → Hosting → Release history
```

---

## 🔐 ENVIRONMENT VARIABLES

### Vercel
```bash
# Add via CLI
vercel env add <key>

# Pull environment variables
vercel env pull

# Or via dashboard
# Project Settings → Environment Variables
```

### Netlify
```bash
# Add via CLI
netlify env:set <key> <value>

# List variables
netlify env:list

# Or via dashboard
# Site Settings → Environment → Add variable
```

### Firebase
```bash
# Use .env files or
# Firebase Console → Functions → Configuration
```

---

## 🛠️ TROUBLESHOOTING COMMANDS

### Check Version
```bash
node --version    # Should be 18+
npm --version     # Should be 9+
git --version     # Any recent version
```

### Clear Cache
```bash
# NPM cache
npm cache clean --force

# Remove node_modules
rm -rf node_modules package-lock.json
npm install
```

### Check Deployment Status
```bash
# Vercel
vercel inspect <url>

# Netlify
netlify status

# Firebase
firebase hosting:sites:list
```

---

## 📱 PWA VERIFICATION

### Test PWA Locally
```bash
# Serve locally
npx serve dist

# Test in browser
# Open DevTools → Application → Manifest
# Check "Add to Home Screen" works
```

### Lighthouse Check
```bash
# Install Lighthouse
npm install -g @lhci/cli

# Run audit
lhci autorun --url=<your-deployed-url>
```

---

## 🎯 QUICK REFERENCE

| Task | Vercel | Netlify | Firebase |
|------|--------|---------|----------|
| **Deploy** | `vercel --prod` | `netlify deploy --prod` | `firebase deploy` |
| **Logs** | `vercel logs` | `netlify logs` | Console only |
| **Status** | `vercel ls` | `netlify status` | `firebase hosting:sites:list` |
| **Open** | `vercel --open` | `netlify open` | Console URL |

---

## 💡 PRO TIPS

### Speed Up Deployments
```bash
# Use npx to skip installation
npx vercel --prod          # No install needed!
npx netlify-cli deploy     # No install needed!
```

### Auto-Deploy on Git Push
```bash
# Connect Git repository via platform dashboard
# Then just:
git push

# Platform auto-deploys!
```

### Preview Deployments
```bash
# Every branch gets a preview URL automatically
git checkout -b feature-branch
git push

# Get preview URL in platform dashboard
```

---

## ✅ DEPLOYMENT WORKFLOW

### Recommended Flow:
```bash
# 1. Make changes locally
# Test your changes

# 2. Commit to git
git add .
git commit -m "Add dynamic drivers feature"

# 3. Deploy
npx vercel --prod

# 4. Test deployed URL
# Share with users!
```

---

## 🎉 THAT'S ALL!

**To deploy LoadLink right now:**
```bash
npx vercel --prod
```

**Configuration files ready:**
- ✅ vercel.json
- ✅ netlify.toml
- ✅ firebase.json
- ✅ manifest.json
- ✅ .gitignore

**Documentation ready:**
- ✅ DEPLOY_NOW.md
- ✅ QUICK_DEPLOY.md
- ✅ DEPLOYMENT_GUIDE.md
- ✅ This cheatsheet!

---

**Deploy in 60 seconds. Go!** 🚀🚛✨
