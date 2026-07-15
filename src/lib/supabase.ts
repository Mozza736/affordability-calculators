import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface LeadSubmission {
  first_name: string;
  email: string;
  annual_salary: number;
  monthly_expenses?: number;
  deposit_size?: number;
  employment_type?: string;
  buying_timeframe?: string;
  source_url?: string;
}

export async function submitLead(data: LeadSubmission): Promise<{ error: string | null }> {
  const { error } = await supabase.from('leads').insert({
    ...data,
    source_url: window.location.pathname,
  });

  if (error) {
    return { error: error.message };
  }
  return { error: null };
}
