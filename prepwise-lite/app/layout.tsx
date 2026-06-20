import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
          <Navbar />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
