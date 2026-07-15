/*
  # Fix leads table RLS INSERT policy

  ## Summary
  Replaces the unrestricted INSERT policy on `public.leads` with one that validates
  required fields, preventing empty or malformed submissions while still allowing
  anonymous users to submit the lead form.

  ## Security Changes
  - Dropped: "Anyone can submit a lead" — WITH CHECK (true) allowed completely
    unrestricted inserts with no validation, bypassing the intent of RLS
  - Added: "Anon users can insert valid leads" — WITH CHECK enforces that
    first_name, email, and annual_salary are non-empty/non-zero before allowing insert
*/

DROP POLICY IF EXISTS "Anyone can submit a lead" ON leads;

CREATE POLICY "Anon users can insert valid leads"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (
    first_name IS NOT NULL AND trim(first_name) <> '' AND
    email IS NOT NULL AND trim(email) <> '' AND
    annual_salary IS NOT NULL AND annual_salary > 0
  );
