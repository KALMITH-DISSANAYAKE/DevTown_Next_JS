# PrepWise AI – Smart Study Planner 🎓

An AI-powered, full-stack study planner built with **Next.js**, **Tailwind CSS**, **Supabase**, and **Groq API**.

## ✨ Features

- 🤖 **AI Study Plans** – Generate personalized study schedules using Groq LLaMA
- 💾 **Persistent Storage** – All plans saved automatically to Supabase
- 📊 **Dashboard** – View all saved plans with days-left indicators
- 🎨 **Premium UI** – Dark glassmorphism design with animations

## 🚀 Quick Start

### 1. Clone & Install

```bash
cd prepwise-lite
npm install
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. In the SQL Editor, run the contents of **`supabase-setup.sql`**
3. Copy your **Project URL** and **anon/public key** from Settings → API

### 3. Get Groq API Key

1. Go to [console.groq.com](https://console.groq.com)
2. Sign in and create a free API key

### 4. Configure Environment Variables

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
GROQ_API_KEY=gsk_your_groq_api_key_here
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
prepwise-lite/
├── app/
│   ├── page.tsx              # Home page with study form
│   ├── layout.tsx            # Root layout + metadata
│   ├── globals.css           # Global styles
│   ├── plans/
│   │   └── page.tsx          # Saved plans dashboard
│   └── api/
│       └── generate/
│           └── route.ts      # Groq AI + Supabase API
│
├── components/
│   ├── StudyForm.tsx         # Form component
│   ├── PlanCard.tsx          # Plan display card
│   └── Navbar.tsx            # Navigation
│
├── lib/
│   └── supabase.ts           # Supabase client
│
├── supabase-setup.sql        # Database setup script
└── .env.local                # API keys (not committed)
```

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 14 | Framework (App Router) |
| Tailwind CSS | Styling |
| Supabase | Database & Storage |
| Groq API | AI Plan Generation |
| Lucide React | Icons |
| Vercel | Deployment |

## 🌐 Deploy to Vercel

1. Push code to GitHub
2. Connect repo at [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

## 📄 License

MIT – Build on it freely for your learning journey! 🚀
