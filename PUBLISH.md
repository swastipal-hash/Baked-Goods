# 🚀 Publishing Your Baked Goods Cost Calculator

This guide will help you publish your app to GitHub Pages for **free**.

## Step 1: Create a GitHub Account (if you don't have one)

1. Go to [github.com](https://github.com)
2. Click "Sign up"
3. Create an account and verify your email

## Step 2: Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `Baked-Goods-Costs`
3. Description: "A cost calculator for baked goods pricing"
4. Choose **Public** (required for free GitHub Pages)
5. Click "Create repository"

## Step 3: Add Your Remote and Push

After creating the repository, GitHub will show you commands to run. Run these in your terminal:

```bash
cd "/Users/swastipal/Baked Goods Costs"

# Add the remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/Baked-Goods-Costs.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 4: Update the Homepage URL in package.json

The `package.json` already has a placeholder. Update it:

```json
"homepage": "https://YOUR_USERNAME.github.io/Baked-Goods-Costs",
```

Replace `YOUR_USERNAME` with your GitHub username.

## Step 5: Deploy to GitHub Pages

Run this command to build and deploy:

```bash
cd "/Users/swastipal/Baked Goods Costs"
npm run deploy
```

This will:
- Build your project
- Create a `gh-pages` branch
- Upload to GitHub Pages automatically

## Step 6: Enable GitHub Pages (if needed)

1. Go to your repository on GitHub
2. Click "Settings" (gear icon)
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select `gh-pages` branch
5. Click "Save"

## Step 7: Access Your App

Your app will be live at:
```
https://YOUR_USERNAME.github.io/Baked-Goods-Costs
```

Wait about 1-2 minutes for GitHub to publish. Then visit the URL!

---

## 📝 Future Updates

Whenever you make changes:

```bash
cd "/Users/swastipal/Baked Goods Costs"

# Commit your changes
git add .
git commit -m "Description of changes"
git push

# Deploy new version
npm run deploy
```

---

## ✨ Your App Features

Your published app includes:
- ✅ 📦 Ingredient management with Bangkok market prices
- ✅ 🍰 Recipe creation with cost calculations
- ✅ ⭐ Saved recipes library
- ✅ 💾 Data persists in browser (no server needed!)
- ✅ 🔍 Ingredient search functionality

---

## 🆘 Troubleshooting

### App shows blank page
- Wait 2-3 minutes for GitHub to publish
- Check that your `homepage` URL matches your repository name

### Changes not appearing
- Clear your browser cache (Cmd+Shift+R on Mac)
- Verify `npm run deploy` completed without errors

### Black screen or 404 error
- Ensure `homepage` in package.json uses your actual username
- Check that `gh-pages` branch exists in repository settings

---

## 🎉 You're Published!

Share your app URL with friends and family. Your baked goods calculator is now live on the internet!

Want a custom domain? [Follow GitHub's guide on custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
