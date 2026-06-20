'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, LayoutDashboard, GraduationCap } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/60 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-lg shadow-purple-900/40 group-hover:shadow-purple-700/50 transition-shadow">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="gradient-text font-bold text-lg leading-none">PrepWise</span>
            <span className="block text-[10px] text-slate-500 font-medium tracking-widest uppercase leading-none mt-0.5">AI Study Planner</span>
          </div>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            id="nav-home"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              pathname === '/'
                ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>New Plan</span>
          </Link>
          <Link
            href="/plans"
            id="nav-plans"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              pathname === '/plans'
                ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Saved Plans</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
