'use client';

import { useState } from 'react';
import { BookOpen, Tags, Calendar, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

interface StudyFormProps {
  onPlanGenerated: (plan: string, subject: string, examDate: string) => void;
}

export default function StudyForm({ onPlanGenerated }: StudyFormProps) {
  const [subject, setSubject] = useState('');
  const [topics, setTopics] = useState('');
  const [examDate, setExamDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Get today's date for min attribute
  const today = new Date();
  today.setDate(today.getDate() + 1);
  const minDate = today.toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!subject.trim() || !topics.trim() || !examDate) {
      setError('Please fill in all fields before generating your study plan.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, topics, examDate }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate study plan');
      }

      setSuccess(true);
      onPlanGenerated(data.plan, subject, examDate);

      // Reset form
      setSubject('');
      setTopics('');
      setExamDate('');

      // Remove success indicator after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" id="study-form">
      {/* Subject */}
      <div>
        <label className="form-label" htmlFor="subject">
          <BookOpen className="inline w-4 h-4 mr-1.5 mb-0.5" />
          Subject
        </label>
        <input
          id="subject"
          type="text"
          className="input-field"
          placeholder="e.g., Mathematics, Biology, History..."
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          maxLength={100}
          required
        />
      </div>

      {/* Topics */}
      <div>
        <label className="form-label" htmlFor="topics">
          <Tags className="inline w-4 h-4 mr-1.5 mb-0.5" />
          Topics to Cover
        </label>
        <textarea
          id="topics"
          className="input-field resize-none"
          rows={4}
          placeholder="e.g., Calculus, Derivatives, Integration, Limits, Series..."
          value={topics}
          onChange={(e) => setTopics(e.target.value)}
          maxLength={500}
          required
        />
        <p className="text-xs text-slate-500 mt-1.5">
          {topics.length}/500 characters · Separate topics with commas for better results
        </p>
      </div>

      {/* Exam Date */}
      <div>
        <label className="form-label" htmlFor="examDate">
          <Calendar className="inline w-4 h-4 mr-1.5 mb-0.5" />
          Exam Date
        </label>
        <input
          id="examDate"
          type="date"
          className="input-field"
          min={minDate}
          value={examDate}
          onChange={(e) => setExamDate(e.target.value)}
          required
          style={{ colorScheme: 'dark' }}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 fade-in-up">
          <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 fade-in-up">
          <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
          <p className="text-green-300 text-sm">
            Study plan generated and saved successfully!
          </p>
        </div>
      )}

      {/* Submit Button */}
      <button
        id="generate-btn"
        type="submit"
        className="btn-glow w-full flex items-center justify-center gap-3"
        disabled={loading}
      >
        {loading ? (
          <>
            <div className="flex gap-1.5">
              <div className="dot" />
              <div className="dot" />
              <div className="dot" />
            </div>
            <span>Generating Your Plan...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            <span>Generate Study Plan</span>
          </>
        )}
      </button>

      {loading && (
        <p className="text-center text-slate-500 text-sm animate-pulse">
          🤖 AI is crafting your personalized study schedule...
        </p>
      )}
    </form>
  );
}
