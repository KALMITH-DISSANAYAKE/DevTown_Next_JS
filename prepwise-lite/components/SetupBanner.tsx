'use client';

import { AlertTriangle, ExternalLink } from 'lucide-react';

interface SetupBannerProps {
  missing: string[];
}

export default function SetupBanner({ missing }: SetupBannerProps) {
  if (missing.length === 0) return null;

  return (
    <div className="max-w-5xl mx-auto px-6 pt-6">
      <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/25">
        <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-amber-300 font-medium text-sm mb-1">
            ⚙️ Setup Required — Missing API Credentials
          </p>
          <p className="text-amber-200/70 text-xs leading-relaxed">
            The following keys are missing from{' '}
            <code className="bg-amber-500/10 px-1 py-0.5 rounded text-amber-300 font-mono">
              .env.local
            </code>
            :{' '}
            <span className="font-semibold text-amber-300">
              {missing.join(', ')}
            </span>
            . The UI works, but AI generation and plan saving require real credentials.
          </p>
          <div className="flex flex-wrap gap-3 mt-2">
            <a
              href="https://console.groq.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-amber-300 hover:text-amber-200 underline underline-offset-2"
            >
              Get Groq API Key <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://supabase.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-amber-300 hover:text-amber-200 underline underline-offset-2"
            >
              Get Supabase Credentials <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
