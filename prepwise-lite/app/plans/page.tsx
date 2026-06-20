import { Suspense } from 'react';
import { supabase } from '@/lib/supabase';
import PlanCard from '@/components/PlanCard';
import type { StudyPlan } from '@/lib/supabase';
import { BookMarked, Plus, Inbox } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Saved Plans – PrepWise AI',
  description: 'View all your saved AI-generated study plans in one place.',
};

// Force dynamic rendering so Supabase data is always fresh
export const dynamic = 'force-dynamic';

async function getPlans(): Promise<StudyPlan[]> {
  const { data, error } = await supabase
    .from('study_plans')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching plans:', error);
    return [];
  }
  return data || [];
}

function PlansContent({ plans }: { plans: StudyPlan[] }) {
  if (plans.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-20 h-20 rounded-2xl bg-violet-500/10 flex items-center justify-center mb-6">
          <Inbox className="w-10 h-10 text-violet-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">No Study Plans Yet</h2>
        <p className="text-slate-400 max-w-md mb-8">
          You have not generated any study plans yet. Head back to the home page to create your first AI-powered study plan!
        </p>
        <Link
          href="/"
          id="create-first-plan-btn"
          className="btn-glow flex items-center gap-2 px-6 py-3"
        >
          <Plus className="w-5 h-5" />
          Create Your First Plan
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
      {plans.map((plan) => (
        <PlanCard key={plan.id} plan={plan} />
      ))}
    </div>
  );
}

export default async function PlansPage() {
  const plans = await getPlans();

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-lg shadow-purple-900/40">
              <BookMarked className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-extrabold text-white">Saved Plans</h1>
          </div>
          <p className="text-slate-400 text-sm">
            {plans.length > 0
              ? `You have ${plans.length} study plan${plans.length !== 1 ? 's' : ''} saved. Keep up the great work! 🚀`
              : 'Your AI-generated study plans will appear here.'}
          </p>
        </div>

        <Link
          href="/"
          id="new-plan-btn"
          className="btn-glow flex items-center gap-2 shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-5 h-5" />
          New Plan
        </Link>
      </div>

      {/* Stats Bar */}
      {plans.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            {
              label: 'Total Plans',
              value: plans.length,
              emoji: '📚',
            },
            {
              label: 'Subjects',
              value: new Set(plans.map((p) => p.subject.toLowerCase())).size,
              emoji: '🎯',
            },
            {
              label: 'Upcoming Exams',
              value: plans.filter((p) => new Date(p.exam_date) >= new Date()).length,
              emoji: '📅',
            },
            {
              label: 'Completed',
              value: plans.filter((p) => new Date(p.exam_date) < new Date()).length,
              emoji: '✅',
            },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-5 text-center">
              <div className="text-2xl mb-1">{stat.emoji}</div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-slate-400 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Plans Grid */}
      <Suspense
        fallback={
          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="glass-card p-6 h-48 shimmer"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        }
      >
        <PlansContent plans={plans} />
      </Suspense>
    </div>
  );
}
