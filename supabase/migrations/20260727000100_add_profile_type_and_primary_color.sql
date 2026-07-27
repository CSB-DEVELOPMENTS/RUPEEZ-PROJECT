ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS profile_type TEXT NOT NULL CHECK (profile_type IN ('personal', 'business', 'student', 'custom')) DEFAULT 'personal',
  ADD COLUMN IF NOT EXISTS primary_color TEXT NOT NULL DEFAULT '#22C55E';
