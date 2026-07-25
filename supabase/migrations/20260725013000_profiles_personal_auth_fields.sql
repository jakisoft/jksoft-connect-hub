ALTER TABLE public.profiles DROP COLUMN IF EXISTS company_name;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS country_name text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS country_code text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone_prefix text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin'));
CREATE INDEX IF NOT EXISTS profiles_email_idx ON public.profiles(email);
CREATE INDEX IF NOT EXISTS profiles_role_idx ON public.profiles(role);
