-- Used by the /verify-email page to learn when a signup has been confirmed.
--
-- The user is NOT signed in while waiting for the confirmation email, so the
-- table must be readable by the `anon` role. Therefore it must contain nothing
-- private: only the user's UUID and the confirmation timestamp.
-- Do NOT add email, name or any other PII columns here; if you need a real
-- profile table, create a separate one with owner-only RLS.

CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  email_confirmed_at timestamptz
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_select_confirmation_status" ON public.profiles;
CREATE POLICY "profiles_select_confirmation_status"
  ON public.profiles FOR SELECT
  TO anon, authenticated
  USING (true);

-- Keep the row in sync with auth.users.
CREATE OR REPLACE FUNCTION public.sync_profile_confirmation()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email_confirmed_at)
  VALUES (new.id, new.email_confirmed_at)
  ON CONFLICT (id) DO UPDATE
    SET email_confirmed_at = excluded.email_confirmed_at;
  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_sync_profile ON auth.users;
CREATE TRIGGER on_auth_user_sync_profile
  AFTER INSERT OR UPDATE OF email_confirmed_at ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.sync_profile_confirmation();

-- Backfill existing users.
INSERT INTO public.profiles (id, email_confirmed_at)
SELECT id, email_confirmed_at FROM auth.users
ON CONFLICT (id) DO NOTHING;

-- Realtime (ignore the error if the table is already published).
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;