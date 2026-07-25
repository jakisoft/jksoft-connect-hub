CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  full_name text,
  whatsapp_number text,
  company_name text,
  email_verified boolean NOT NULL DEFAULT false,
  whatsapp_verified boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT TO authenticated
USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own profile"
ON public.profiles FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own profile"
ON public.profiles FOR DELETE TO authenticated
USING (auth.uid() = user_id);
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.message_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  name text NOT NULL,
  category text NOT NULL DEFAULT 'notification',
  content text NOT NULL,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'archived')),
  variables text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.message_templates TO authenticated;
GRANT ALL ON public.message_templates TO service_role;
ALTER TABLE public.message_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own templates"
ON public.message_templates FOR SELECT TO authenticated
USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own templates"
ON public.message_templates FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own templates"
ON public.message_templates FOR UPDATE TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own templates"
ON public.message_templates FOR DELETE TO authenticated
USING (auth.uid() = user_id);
CREATE TRIGGER update_message_templates_updated_at
BEFORE UPDATE ON public.message_templates
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX message_templates_user_id_idx ON public.message_templates(user_id);
CREATE INDEX message_templates_status_idx ON public.message_templates(status);

CREATE TABLE public.message_deliveries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  template_id uuid REFERENCES public.message_templates(id) ON DELETE SET NULL,
  recipient_name text,
  recipient_phone text NOT NULL,
  message_preview text NOT NULL,
  status text NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'sent', 'delivered', 'read', 'failed')),
  provider_message_id text,
  error_message text,
  sent_at timestamptz,
  delivered_at timestamptz,
  read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.message_deliveries TO authenticated;
GRANT ALL ON public.message_deliveries TO service_role;
ALTER TABLE public.message_deliveries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own deliveries"
ON public.message_deliveries FOR SELECT TO authenticated
USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own deliveries"
ON public.message_deliveries FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own deliveries"
ON public.message_deliveries FOR UPDATE TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own deliveries"
ON public.message_deliveries FOR DELETE TO authenticated
USING (auth.uid() = user_id);
CREATE TRIGGER update_message_deliveries_updated_at
BEFORE UPDATE ON public.message_deliveries
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX message_deliveries_user_id_idx ON public.message_deliveries(user_id);
CREATE INDEX message_deliveries_status_idx ON public.message_deliveries(status);
CREATE INDEX message_deliveries_template_id_idx ON public.message_deliveries(template_id);

CREATE TABLE public.conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  contact_name text NOT NULL,
  contact_phone text NOT NULL,
  last_message text,
  last_message_at timestamptz,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'pending', 'closed')),
  unread_count integer NOT NULL DEFAULT 0 CHECK (unread_count >= 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.conversations TO authenticated;
GRANT ALL ON public.conversations TO service_role;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own conversations"
ON public.conversations FOR SELECT TO authenticated
USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own conversations"
ON public.conversations FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own conversations"
ON public.conversations FOR UPDATE TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own conversations"
ON public.conversations FOR DELETE TO authenticated
USING (auth.uid() = user_id);
CREATE TRIGGER update_conversations_updated_at
BEFORE UPDATE ON public.conversations
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX conversations_user_id_idx ON public.conversations(user_id);
CREATE INDEX conversations_last_message_at_idx ON public.conversations(last_message_at DESC);

CREATE TABLE public.conversation_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  conversation_id uuid NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  direction text NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  body text NOT NULL,
  status text NOT NULL DEFAULT 'sent' CHECK (status IN ('sent', 'delivered', 'read', 'failed')),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.conversation_messages TO authenticated;
GRANT ALL ON public.conversation_messages TO service_role;
ALTER TABLE public.conversation_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own conversation messages"
ON public.conversation_messages FOR SELECT TO authenticated
USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own conversation messages"
ON public.conversation_messages FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own conversation messages"
ON public.conversation_messages FOR UPDATE TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own conversation messages"
ON public.conversation_messages FOR DELETE TO authenticated
USING (auth.uid() = user_id);
CREATE INDEX conversation_messages_user_id_idx ON public.conversation_messages(user_id);
CREATE INDEX conversation_messages_conversation_id_idx ON public.conversation_messages(conversation_id);
CREATE INDEX conversation_messages_created_at_idx ON public.conversation_messages(created_at DESC);

ALTER PUBLICATION supabase_realtime ADD TABLE public.message_templates;
ALTER PUBLICATION supabase_realtime ADD TABLE public.message_deliveries;
ALTER PUBLICATION supabase_realtime ADD TABLE public.conversations;
ALTER PUBLICATION supabase_realtime ADD TABLE public.conversation_messages;