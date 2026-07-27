DROP POLICY IF EXISTS "Users can create own profiles" ON public.profiles;
CREATE POLICY "Users can create own profiles"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id );

DROP POLICY IF EXISTS "Users can view own profiles" ON public.profiles;
CREATE POLICY "Users can view own profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id );

DROP POLICY IF EXISTS "Users can modify own profiles" ON public.profiles;
CREATE POLICY "Users can modify own profiles"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id );
