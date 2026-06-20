'use client';

import { useState } from 'react';
import { Calendar, BookOpen, ChevronDown, ChevronUp, Clock, Tags } from 'lucide-react';
import type { StudyPlan } from '@/lib/supabase';

interface PlanCardProps {
  plan: StudyPlan;
}

function formatPlanText(text: string): string {
  // Convert markdown-style text to HTML
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^\* (.+)$/gm, '<li>$1</li>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hul])/gm, '<p>')
    .replace(/<p><\/p>/g, '');
}

export default function PlanCard({ plan }: PlanCardProps) {
  const [expanded, setExpanded] = useState(false);

  const examDate = new Date(plan.exam_date + 'T00:00:00');
  const createdAt = new Date(plan.created_at);
  const today = new Date();
  const daysLeft = Math.ceil(
    (examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  const getDaysLeftColor = () => {
    if (daysLeft < 0) return 'text-red-400';
    if (daysLeft <= 7) return 'text-orange-400';
    if (daysLeft <= 14) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getDaysLeftText = () => {
    if (daysLeft < 0) return `${Math.abs(daysLeft)}d ago`;
    if (daysLeft === 0) return 'Today!';
    return `${daysLeft}d left`;
  };

  const previewText = plan.plan.substring(0, 200).trim() + '...';

  return (
    <article className="glass-card p-6 fade-in-up" id={`plan-${plan.id}`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="badge badge-purple">
              <BookOpen className="w-3 h-3" />
              {plan.subject}
            </span>
            <span className={`badge ${daysLeft < 0 ? 'bg-red-500/10 border-red-500/20 text-red-400' : daysLeft <= 7 ? 'bg-orange-500/10 border-orange-500/20 text-orange-400' : 'badge-green'}`}>
              <Clock className="w-3 h-3" />
              {getDaysLeftText()}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-slate-400">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-violet-400" />
              <span>
                Exam:{' '}
                <span className={`font-medium ${getDaysLeftColor()}`}>
                  {examDate.toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </span>
            </div>
            <span className="hidden sm:block text-slate-700">·</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>
                Created {createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Topics */}
      <div className="mb-4 p-3 rounded-lg bg-white/3 border border-white/5">
        <div className="flex items-center gap-1.5 mb-1">
          <Tags className="w-3.5 h-3.5 text-violet-400" />
          <span className="text-xs font-medium text-violet-300 uppercase tracking-wider">Topics</span>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed">{plan.topics}</p>
      </div>

      {/* Plan Content */}
      <div>
        {!expanded ? (
          <div className="relative">
            <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">{previewText}</p>
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-900/80 to-transparent" />
          </div>
        ) : (
          <div
            className="plan-content text-sm leading-relaxed fade-in-up"
            dangerouslySetInnerHTML={{ __html: formatPlanText(plan.plan) }}
          />
        )}

        <button
          id={`toggle-plan-${plan.id}`}
          onClick={() => setExpanded(!expanded)}
          className="mt-4 flex items-center gap-1.5 text-violet-400 hover:text-violet-300 text-sm font-medium transition-colors group"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              Read Full Plan
            </>
          )}
        </button>
      </div>
    </article>
  );
}
