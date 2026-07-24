-- Create a matching public.users record whenever Supabase Auth creates a user.
CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  full_name TEXT;
  name_parts TEXT[];
BEGIN
  full_name := NULLIF(TRIM(NEW.raw_user_meta_data ->> 'full_name'), '');
  name_parts := CASE
    WHEN full_name IS NULL THEN NULL
    ELSE REGEXP_SPLIT_TO_ARRAY(full_name, '\s+')
  END;

  INSERT INTO public.users (
    user_id,
    email,
    first_name,
    last_name
  )
  VALUES (
    NEW.id,
    NEW.email,
    CASE
      WHEN COALESCE(CARDINALITY(name_parts), 0) > 0 THEN name_parts[1]
      ELSE NULL
    END,
    CASE
      WHEN CARDINALITY(name_parts) > 1 THEN ARRAY_TO_STRING(name_parts[2: CARDINALITY(name_parts)], ' ')
      ELSE NULL
    END
  );

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_auth_user();
