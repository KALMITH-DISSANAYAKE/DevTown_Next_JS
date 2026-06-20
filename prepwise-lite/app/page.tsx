'use client';

import { useState } from 'react';
import StudyForm from '@/components/StudyForm';
import { Brain, Zap, Shield, ArrowRight, BookMarked, X } from 'lucide-react';
import Link from 'next/link';

function formatPlanText(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^\* (.+)$/gm, '<li>$1</li>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/\n\n/g, '</p><p>');
}

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Planning',
    desc: 'Groq LLaMA generates smart, personalized schedules tailored to your pace.',
  },
  {
    icon: Zap,
    title: 'Instant Results',
    desc: 'Get a complete, structured study plan in seconds — not hours.',
  },
  {
    icon: Shield,
    title: 'Saved Forever',
    desc: 'Plans are stored in Supabase so you can revisit anytime.',
  },
];

export default function HomePage() {
  const [generatedPlan, setGeneratedPlan] = useState<string | null>(null);
  const [planSubject, setPlanSubject] = useState('');
  const [planExamDate, setPlanExamDate] = useState('');

  const handlePlanGenerated = (plan: string, subject: string, examDate: string) => {
    setGeneratedPlan(plan);
    setPlanSubject(subject);
    setPlanExamDate(examDate);
    // Scroll to result
    setTimeout(() => {
      document.getElementById('plan-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background Orbs */}
      <div className="glow-orb w-96 h-96 bg-purple-600 top-20 -left-32" />
      <div className="glow-orb w-80 h-80 bg-blue-600 top-40 -right-24" />

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-violet-300 text-sm font-medium">AI-Powered · Personalized · Free</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-5 leading-tight tracking-tight">
            Study Smarter with{' '}
            <span className="gradient-text">PrepWise AI</span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Enter your subject, topics, and exam date — our AI generates a personalized,
            structured study plan in seconds. No more guessing, just focused learning.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {features.map((f) => (
              <div
                key={f.title}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass-card text-sm text-slate-300 hover:text-white"
              >
                <f.icon className="w-4 h-4 text-violet-400" />
                <span className="font-medium">{f.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Form Card */}
        <div className="grid lg:grid-cols-5 gap-8 mb-16">
          {/* Form - 3 columns */}
          <div className="lg:col-span-3">
            <div className="glass-card p-8">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white mb-1">Create Your Study Plan</h2>
                <p className="text-slate-400 text-sm">
                  Fill in the details below and let AI do the planning for you.
                </p>
              </div>
              <StudyForm onPlanGenerated={handlePlanGenerated} />
            </div>
          </div>

          {/* Sidebar - 2 columns */}
          <div className="lg:col-span-2 space-y-4">
            {/* Tips Card */}
            <div className="glass-card p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-amber-500/20 flex items-center justify-center text-xs">💡</span>
                Tips for Best Results
              </h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-violet-400 mt-0.5">→</span>
                  Be specific with topics — list individual chapters or concepts
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-violet-400 mt-0.5">→</span>
                  Set realistic exam dates to get an achievable schedule
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-violet-400 mt-0.5">→</span>
                  Include weak areas as prioritized topics for better focus
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-violet-400 mt-0.5">→</span>
                  Review your saved plans regularly to track progress
                </li>
              </ul>
            </div>

            {/* Navigate to Plans */}
            <Link
              href="/plans"
              id="view-all-plans-link"
              className="glass-card p-6 flex items-center justify-between group cursor-pointer block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-600/20 flex items-center justify-center">
                  <BookMarked className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Saved Plans</p>
                  <p className="text-slate-400 text-xs">View all your study plans</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
            </Link>

            {/* Example Subjects */}
            <div className="glass-card p-6">
              <h3 className="text-white font-semibold mb-3 text-sm">Example Subjects</h3>
              <div className="flex flex-wrap gap-2">
                {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'English', 'Economics', 'Computer Science'].map(s => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded-lg bg-white/5 text-slate-400 text-xs hover:bg-violet-500/10 hover:text-violet-300 transition-colors cursor-default"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Generated Plan Output */}
        {generatedPlan && (
          <div id="plan-result" className="fade-in-up">
            <div className="glass-card p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400 text-sm font-medium">Plan Generated & Saved</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    Your Study Plan for{' '}
                    <span className="gradient-text">{planSubject}</span>
                  </h2>
                  {planExamDate && (
                    <p className="text-slate-400 text-sm mt-1">
                      Exam Date: {new Date(planExamDate + 'T00:00:00').toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  )}
                </div>
                <button
                  id="close-plan-btn"
                  onClick={() => setGeneratedPlan(null)}
                  className="p-2 rounded-lg hover:bg-white/5 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div
                className="plan-content"
                dangerouslySetInnerHTML={{ __html: formatPlanText(generatedPlan) }}
              />

              <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-slate-500 text-sm">
                  ✅ This plan has been automatically saved to your collection.
                </p>
                <Link
                  href="/plans"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600/20 border border-violet-500/30 text-violet-300 text-sm font-medium hover:bg-violet-600/30 transition-all"
                >
                  View All Plans
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
