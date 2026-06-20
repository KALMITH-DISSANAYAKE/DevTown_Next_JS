import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import SetupBanner from '@/components/SetupBanner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PrepWise AI – Smart Study Planner',
  description:
    'AI-powered personalized study planner. Enter your subject, topics, and exam date to get a tailored study schedule.',
  keywords: 'study planner, AI, exam preparation, schedule, learning',
  openGraph: {
    title: 'PrepWise AI – Smart Study Planner',
    description: 'AI-powered personalized study planner for exam success.',
    type: 'website',
  },
};

function getMissingKeys(): string[] {
  const missing: string[] = [];
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const groq = process.env.GROQ_API_KEY;

  if (!url || url.includes('placeholder') || url === 'your_supabase_project_url_here')
    missing.push('NEXT_PUBLIC_SUPABASE_URL');
  if (!key || key === 'your_supabase_anon_key_here')
    missing.push('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  if (!groq || groq === 'your_groq_api_key_here')
    missing.push('GROQ_API_KEY');

  return missing;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const missingKeys = getMissingKeys();

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
          <Navbar />
          <SetupBanner missing={missingKeys} />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}

