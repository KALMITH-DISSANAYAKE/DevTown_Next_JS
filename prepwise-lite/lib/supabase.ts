import { createClient, SupabaseClient } from '@supabase/supabase-js';

export type StudyPlan = {
  id: string;
  subject: string;
  topics: string;
  exam_date: string;
  plan: string;
  created_at: string;
};

// Only create the client when real credentials exist
function getSupabaseClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (
    !url ||
    !key ||
    url.includes('placeholder') ||
    url === 'your_supabase_project_url_here'
  ) {
    return null;
  }

  try {
    return createClient(url, key);
  } catch {
    return null;
  }
}

export const supabase = getSupabaseClient();
