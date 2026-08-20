-- Fix infinite recursion in shared_expenes_participants RLS policy.
--
-- The original policy queried FROM shared_expenes_participants inside a policy
-- ON shared_expenes_participants, causing Postgres to recursively evaluate the
-- policy for every row it tried to fetch in the subquery.

CREATE OR REPLACE FUNCTION public.is_shared_expense_participant(expense_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM shared_expenes_participants sep
    JOIN profiles p ON p.profile_id = sep.profile_id
    WHERE sep.shared_expense_id = expense_id
      AND p.user_id = auth.uid()
  );
$$;

-- Step 2: Replace the recursive policy with one that calls the helper function.
DROP POLICY IF EXISTS "User can view shared expense participants if they are a participant" ON public.shared_expenes_participants;

CREATE POLICY "User can view shared expense participants if they are a participant"
ON public.shared_expenes_participants
FOR SELECT
TO authenticated
USING (
  public.is_shared_expense_participant(shared_expense_id)
);
