#!/bin/bash

# 🚀 LoadLink Deployment Commands Cheatsheet
# Choose your deployment platform and run the appropriate commands

echo "╔══════════════════════════════════════════════════════════╗"
echo "║         LoadLink - Deployment Commands                  ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# Color codes for terminal
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}Choose your deployment platform:${NC}"
echo "1) Vercel (Recommended - Easiest)"
echo "2) Netlify"
echo "3) Firebase"
echo "4) Show all commands"
echo ""
read -p "Enter your choice (1-4): " choice

case $choice in
  1)
    echo -e "${GREEN}═══════════════════════════════════${NC}"
    echo -e "${GREEN}    VERCEL DEPLOYMENT${NC}"
    echo -e "${GREEN}═══════════════════════════════════${NC}"
    echo ""
    echo -e "${YELLOW}Step 1: Install Vercel CLI${NC}"
    echo "npm install -g vercel"
    echo ""
    echo -e "${YELLOW}Step 2: Login to Vercel${NC}"
    echo "vercel login"
    echo ""
    echo -e "${YELLOW}Step 3: Deploy to Production${NC}"
    echo "vercel --prod"
    echo ""
    echo -e "${BLUE}Or use NPX (no installation):${NC}"
    echo "npx vercel --prod"
    echo ""
    read -p "Do you want to deploy now? (y/n): " deploy
    if [ "$deploy" = "y" ]; then
      npx vercel --prod
    fi
    ;;
    
  2)
    echo -e "${GREEN}═══════════════════════════════════${NC}"
    echo -e "${GREEN}    NETLIFY DEPLOYMENT${NC}"
    echo -e "${GREEN}═══════════════════════════════════${NC}"
    echo ""
    echo -e "${YELLOW}Step 1: Install Netlify CLI${NC}"
    echo "npm install -g netlify-cli"
    echo ""
    echo -e "${YELLOW}Step 2: Login to Netlify${NC}"
    echo "netlify login"
    echo ""
    echo -e "${YELLOW}Step 3: Initialize (first time only)${NC}"
    echo "netlify init"
    echo ""
    echo -e "${YELLOW}Step 4: Deploy to Production${NC}"
    echo "netlify deploy --prod"
    echo ""
    echo -e "${BLUE}Or use drag & drop:${NC}"
    echo "Visit: https://app.netlify.com/drop"
    echo ""
    read -p "Do you want to deploy now? (y/n): " deploy
    if [ "$deploy" = "y" ]; then
      npx netlify-cli deploy --prod
    fi
    ;;
    
  3)
    echo -e "${GREEN}═══════════════════════════════════${NC}"
    echo -e "${GREEN}    FIREBASE DEPLOYMENT${NC}"
    echo -e "${GREEN}═══════════════════════════════════${NC}"
    echo ""
    echo -e "${YELLOW}Step 1: Install Firebase CLI${NC}"
    echo "npm install -g firebase-tools"
    echo ""
    echo -e "${YELLOW}Step 2: Login to Firebase${NC}"
    echo "firebase login"
    echo ""
    echo -e "${YELLOW}Step 3: Initialize (first time only)${NC}"
    echo "firebase init hosting"
    echo "  - Select 'dist' as public directory"
    echo "  - Configure as single-page app: Yes"
    echo ""
    echo -e "${YELLOW}Step 4: Deploy${NC}"
    echo "firebase deploy --only hosting"
    echo ""
    read -p "Do you want to deploy now? (y/n): " deploy
    if [ "$deploy" = "y" ]; then
      firebase deploy --only hosting
    fi
    ;;
    
  4)
    echo -e "${GREEN}═══════════════════════════════════${NC}"
    echo -e "${GREEN}    ALL DEPLOYMENT COMMANDS${NC}"
    echo -e "${GREEN}═══════════════════════════════════${NC}"
    echo ""
    
    echo -e "${BLUE}━━━ VERCEL ━━━${NC}"
    echo "npm install -g vercel"
    echo "vercel login"
    echo "vercel --prod"
    echo ""
    
    echo -e "${BLUE}━━━ NETLIFY ━━━${NC}"
    echo "npm install -g netlify-cli"
    echo "netlify login"
    echo "netlify init"
    echo "netlify deploy --prod"
    echo ""
    
    echo -e "${BLUE}━━━ FIREBASE ━━━${NC}"
    echo "npm install -g firebase-tools"
    echo "firebase login"
    echo "firebase init hosting"
    echo "firebase deploy --only hosting"
    echo ""
    
    echo -e "${BLUE}━━━ QUICK DEPLOY (NO INSTALL) ━━━${NC}"
    echo "npx vercel --prod          # Vercel"
    echo "npx netlify-cli deploy     # Netlify"
    echo ""
    ;;
    
  *)
    echo -e "${YELLOW}Invalid choice. Please run the script again.${NC}"
    exit 1
    ;;
esac

echo ""
echo -e "${GREEN}═══════════════════════════════════${NC}"
echo -e "${GREEN}    USEFUL COMMANDS${NC}"
echo -e "${GREEN}═══════════════════════════════════${NC}"
echo ""
echo -e "${BLUE}Git Commands (if pushing to repository):${NC}"
echo "git add ."
echo "git commit -m 'Ready for deployment'"
echo "git push origin main"
echo ""
echo -e "${BLUE}View deployment status:${NC}"
echo "Vercel:   vercel inspect <deployment-url>"
echo "Netlify:  netlify status"
echo "Firebase: firebase hosting:sites:list"
echo ""
echo -e "${BLUE}View logs:${NC}"
echo "Vercel:   vercel logs"
echo "Netlify:  netlify logs"
echo "Firebase: firebase hosting:channel:list"
echo ""
echo -e "${GREEN}✅ Configuration files are ready!${NC}"
echo "   - vercel.json"
echo "   - netlify.toml"
echo "   - firebase.json"
echo "   - manifest.json (PWA)"
echo ""
echo -e "${YELLOW}📖 For detailed instructions, see:${NC}"
echo "   - QUICK_DEPLOY.md (quick start)"
echo "   - DEPLOYMENT_GUIDE.md (comprehensive)"
echo "   - README_DEPLOYMENT.md (overview)"
echo ""
echo -e "${GREEN}🚀 Happy deploying!${NC}"
