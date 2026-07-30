DROP POLICY IF EXISTS "User can update own user record" ON public.users;

CREATE POLICY "User can update own user record"
ON public.users
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());
