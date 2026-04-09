# BevSpot Knowledge Base — Netlify Deployment Guide

## Quick Setup (5 minutes)

### 1. Get an Anthropic API Key
- Go to https://console.anthropic.com
- Create an account (or log in)
- Navigate to **API Keys** and create a new key
- Copy the key — you'll need it in step 4

### 2. Push to GitHub
Upload this entire `bevspot-app` folder to a new GitHub repository:
- Go to https://github.com/new
- Name it something like `bevspot-training`
- Upload all files maintaining this structure:

```
bevspot-app/
├── index.html
├── netlify.toml
├── netlify/
│   └── functions/
│       └── ask.js
└── README.md
```

### 3. Deploy on Netlify
- Go to https://app.netlify.com
- Click **"Add new site"** → **"Import an existing project"**
- Connect your GitHub account and select the repository
- Leave all build settings as default (no build command needed)
- Click **Deploy**

### 4. Add Your API Key (IMPORTANT)
This is the step that makes the Q&A actually work:
- In Netlify, go to your site → **Site configuration** → **Environment variables**
- Click **"Add a variable"**
- Key: `ANTHROPIC_API_KEY`
- Value: *(paste your Anthropic API key from step 1)*
- Click **Save**
- **Redeploy** your site (Deploys → Trigger deploy → Deploy site)

### 5. Done!
Your site is live. Visit your Netlify URL and test it by asking a question.

---

## How It Works
- The **index.html** page is the frontend users see
- When someone asks a question, it calls **/.netlify/functions/ask**
- The **ask.js** serverless function securely calls the Anthropic API with your key
- The AI answers using only the embedded BevSpot guide content
- The answer is sent back and displayed on the page

## Cost
The Anthropic API charges per usage. Each question costs roughly $0.003–$0.01 depending on answer length. At typical usage this is very affordable.
