# Ask Winthorpe

Two-part deployment:

1. Frontend (`index.html`, `style.css`, `script.js`, `config.js`) → GitHub Pages at `ask.agentwinthorpe.com`.
2. Backend (`api/chat.js`, `package.json`, `vercel.json`) → Vercel. Add `OPENAI_API_KEY` as a Vercel environment variable. Never commit the key.

After Vercel deploys, copy the backend URL (for example `https://your-project.vercel.app/api/chat`) into `config.js`, commit, and GitHub Pages will redeploy.

The backend uses OpenAI's Responses API and keeps the Winthorpe architecture reference in server-side instructions. The browser never receives the API key or system instructions.
