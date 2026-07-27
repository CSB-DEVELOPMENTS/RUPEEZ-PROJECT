DROP POLICY IF EXISTS "Users can create own profiles" ON public.profiles;

CREATE POLICY "Users can create own profiles"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id );
