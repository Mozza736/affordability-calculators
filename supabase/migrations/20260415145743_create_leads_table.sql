/*
  # Create leads table for affordability plan submissions

  ## Summary
  Creates a table to store lead capture form submissions from the /get-your-plan page.

  ## New Tables
  - `leads`
    - `id` (uuid, primary key) — unique identifier
    - `first_name` (text) — submitted first name
    - `email` (text) — submitted email address
    - `annual_salary` (numeric) — gross annual salary in GBP
    - `monthly_expenses` (numeric, nullable) — optional monthly expenses
    - `deposit_size` (numeric, nullable) — reserved for future field
    - `employment_type` (text, nullable) — reserved for future field
    - `buying_timeframe` (text, nullable) — reserved for future field
    - `created_at` (timestamptz) — submission timestamp
    - `source_url` (text, nullable) — page the form was submitted from

  ## Security
  - RLS enabled
  - INSERT allowed for anonymous users (public lead form)
  - SELECT restricted to authenticated users only (admin export)
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  email text NOT NULL,
  annual_salary numeric NOT NULL,
  monthly_expenses numeric DEFAULT 0,
  deposit_size numeric,
  employment_type text,
  buying_timeframe text,
  source_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a lead"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);
