-- EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE SCHEMA IF NOT EXISTS private;

-- USERS
CREATE TABLE IF NOT EXISTS public.users (
  user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  status TEXT CHECK (status IN ('active', 'deactivated', 'deleted')) DEFAULT 'active',
  subscription_token TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
  profile_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  profile_name TEXT,
  base_currency TEXT NOT NULL DEFAULT 'LKR',
  role TEXT CHECK (role IN ('user', 'admin')) DEFAULT 'user',
  status TEXT CHECK (status IN ('active', 'deactivated', 'deleted')) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- SUBSCRIPTION PLANS
CREATE TABLE IF NOT EXISTS public.subscription_plans (
  plan_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  limits jsonb NOT NULL DEFAULT '{}'::jsonb,
  permissions jsonb NOT NULL DEFAULT '{}'::jsonb,
  billing_period_months INT NOT NULL DEFAULT 1,
  price NUMERIC(12,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'LKR',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- USER SUBSCRIPTIONS
CREATE TABLE IF NOT EXISTS public.user_subscriptions (
  subscription_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  plan_id UUID REFERENCES subscription_plans(plan_id) ON DELETE CASCADE,
  current_period_start TIMESTAMPTZ DEFAULT NOW(),
  current_period_end TIMESTAMPTZ,
  next_billing_date TIMESTAMPTZ,
  gateway_subscription_id TEXT,
  status TEXT CHECK (status IN ('active', 'past_due', 'cancelled')) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- PAYMENTS
CREATE TABLE IF NOT EXISTS public.payments (
  payment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id UUID REFERENCES user_subscriptions(subscription_id) ON DELETE CASCADE,
  amount NUMERIC(12,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'LKR',
  status TEXT CHECK (status IN ('pending', 'paid', 'failed')) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- BATCH ARCHIVEMENTS
CREATE TABLE IF NOT EXISTS public.batch_archivements (
  archivment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(profile_id) ON DELETE CASCADE,
  badge_type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- WALLETS
CREATE TABLE IF NOT EXISTS public.wallets (
  wallet_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(profile_id) ON DELETE CASCADE,
  wallet_name TEXT NOT NULL,
  current_balance NUMERIC(12,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- TRANSACTIONS
CREATE TABLE IF NOT EXISTS public.transactions (
  transaction_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(profile_id) ON DELETE CASCADE,
  wallet_id UUID REFERENCES wallets(wallet_id) ON DELETE SET NULL,
  amount NUMERIC(12,2) NOT NULL,
  transaction_type TEXT CHECK (transaction_type IN ('income', 'expense')),
  category TEXT CHECK (category IN ('food', 'transportation', 'entertainment', 'utilities', 'health', 'education', 'shopping', 'other')),
  description TEXT,
  transaction_date TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- TRANSACTION REFERENCE
CREATE TABLE IF NOT EXISTS public.transaction_reference (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id UUID REFERENCES transactions(transaction_id) ON DELETE CASCADE,
  reference_key TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- SHARED GOALS
CREATE TABLE IF NOT EXISTS public.shared_goals (
  goal_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  goal_name TEXT NOT NULL,
  target_amount NUMERIC(12,2) NOT NULL,
  current_amount NUMERIC(12,2) DEFAULT 0,
  deadline TIMESTAMPTZ,
  status TEXT CHECK (status IN ('in_progress', 'completed')) DEFAULT 'in_progress',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- GOAL PARTICIPANTS
CREATE TABLE IF NOT EXISTS public.goal_participants (
  participant_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  goal_id UUID REFERENCES shared_goals(goal_id) ON DELETE CASCADE,
  profile_id UUID REFERENCES profiles(profile_id) ON DELETE CASCADE,
  role TEXT CHECK (role IN ('creator', 'contributor')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(goal_id, profile_id)
);

-- GOAL CONTRIBUTIONS
CREATE TABLE IF NOT EXISTS public.goal_contributions (
  contribution_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  goal_id UUID REFERENCES shared_goals(goal_id) ON DELETE CASCADE,
  profile_id UUID REFERENCES profiles(profile_id) ON DELETE CASCADE,
  transaction_id UUID REFERENCES transactions(transaction_id) ON DELETE SET NULL,
  amount NUMERIC(12,2) NOT NULL,
  contribution_date TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- SHARED EXPENSES
CREATE TABLE IF NOT EXISTS public.shared_expeneses (
  shared_expense_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  amount NUMERIC(12,2) NOT NULL,
  percentage NUMERIC(5,2),
  frequency TEXT CHECK (frequency IN ('weekly', 'monthly', 'yearly')),
  next_billing_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- SHARED EXPENSE PARTICIPANTS
CREATE TABLE IF NOT EXISTS public.shared_expenes_participants (
  participant_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shared_expense_id UUID REFERENCES shared_expeneses(shared_expense_id) ON DELETE CASCADE,
  profile_id UUID REFERENCES profiles(profile_id) ON DELETE CASCADE,
  role TEXT CHECK (role IN ('creator', 'contributor')),
  percentage NUMERIC(5,2),
  paid_amount NUMERIC(5,2),
  auto_deduct BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(shared_expense_id, profile_id)
);

-- SHARED EXPENSE CONTRIBUTIONS
CREATE TABLE IF NOT EXISTS public.shared_expences_contributions (
  contribution_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shared_expense_id UUID REFERENCES shared_expeneses(shared_expense_id) ON DELETE CASCADE,
  from_profile_id UUID REFERENCES profiles(profile_id) ON DELETE CASCADE,
  to_profile_id UUID REFERENCES profiles(profile_id) ON DELETE CASCADE,
  from_transaction_id UUID REFERENCES transactions(transaction_id) ON DELETE SET NULL,
  to_transaction_id UUID REFERENCES transactions(transaction_id) ON DELETE SET NULL,
  amount NUMERIC(12,2),
  status TEXT CHECK (status IN ('pending', 'inprogress', 'completed', 'merge')),
  merge_reference UUID REFERENCES shared_expences_contributions(contribution_id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- CONTRIBUTION TRANSACTIONS
CREATE TABLE IF NOT EXISTS public.contribution_transacions (
  contribution_transacion_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contribution_id UUID REFERENCES shared_expences_contributions(contribution_id) ON DELETE CASCADE,
  transaction_id UUID REFERENCES transactions(transaction_id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- MILIONAIRE BOX
CREATE TABLE IF NOT EXISTS public.milionaire_box (
  mlionaire_box_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(profile_id) ON DELETE CASCADE,
  name TEXT,
  description TEXT,
  target_amount NUMERIC(12,2),
  current_amount NUMERIC(12,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- MILIONAIRE BOX TRANSACTIONS
CREATE TABLE IF NOT EXISTS public.milionaire_box_transacions (
  milionaire_box_transacion_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mlionaire_box_id UUID REFERENCES milionaire_box(mlionaire_box_id) ON DELETE CASCADE,
  transaction_id UUID REFERENCES transactions(transaction_id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- LOANS
CREATE TABLE IF NOT EXISTS public.loans (
  loan_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(profile_id) ON DELETE CASCADE,
  name TEXT,
  description TEXT,
  total_amount NUMERIC(12,2),
  current_amount NUMERIC(12,2) DEFAULT 0,
  interest NUMERIC(5,2),
  deadline TIMESTAMPTZ,
  month_period INT,
  status TEXT CHECK (status IN ('in_progress', 'completed')) DEFAULT 'in_progress',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- LOAN TRANSACTIONS
CREATE TABLE IF NOT EXISTS public.loan_transacions (
  loan_transacion_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  loan_id UUID REFERENCES loans(loan_id) ON DELETE CASCADE,
  transaction_id UUID REFERENCES transactions(transaction_id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- LOGS
CREATE TABLE IF NOT EXISTS public.logs (
  log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(profile_id) ON DELETE CASCADE,
  action_type TEXT,
  meta_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES (IMPORTANT 🚀)

-- COMBINED PRIMARY KEYS
CREATE INDEX IF NOT EXISTS idx_profiles_user_profile ON profiles(user_id, profile_id);

-- Subscriptions and payments
CREATE INDEX IF NOT EXISTS idx_subscription_plans_active
ON subscription_plans(is_active)
WHERE is_active = TRUE;

CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user_id
ON user_subscriptions(user_id);

CREATE INDEX IF NOT EXISTS idx_user_subscriptions_plan_id
ON user_subscriptions(plan_id);

CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user_status
ON user_subscriptions(user_id, status);

CREATE UNIQUE INDEX IF NOT EXISTS idx_user_subscriptions_gateway_id
ON user_subscriptions(gateway_subscription_id)
WHERE gateway_subscription_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_payments_subscription_created_at
ON payments(subscription_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_payments_status
ON payments(status);

-- Foreign keys
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_batch_archivements_profile_id ON batch_archivements(profile_id);
CREATE INDEX IF NOT EXISTS idx_wallets_profile_id ON wallets(profile_id);
CREATE INDEX IF NOT EXISTS idx_transactions_profile_id ON transactions(profile_id);
CREATE INDEX IF NOT EXISTS idx_transactions_wallet_id ON transactions(wallet_id);

-- Goal related
CREATE INDEX IF NOT EXISTS idx_goal_participants_goal_id ON goal_participants(goal_id);
CREATE INDEX IF NOT EXISTS idx_goal_contributions_goal_id ON goal_contributions(goal_id);

-- Shared expenses
CREATE INDEX IF NOT EXISTS idx_shared_expense_participants_expense_id ON shared_expenes_participants(shared_expense_id);
CREATE INDEX IF NOT EXISTS idx_shared_expense_contributions_expense_id ON shared_expences_contributions(shared_expense_id);

-- Financial modules
CREATE INDEX IF NOT EXISTS idx_milionaire_box_profile_id ON milionaire_box(profile_id);
CREATE INDEX IF NOT EXISTS idx_loans_profile_id ON loans(profile_id);

-- Logs
CREATE INDEX IF NOT EXISTS idx_logs_profile_id ON logs(profile_id);


-- UPDATED_AT TRIGGER FUNCTION
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- AUTH CHECK FUNCTION
CREATE OR REPLACE FUNCTION is_profile_owner(p_profile_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM profiles
    WHERE profile_id = p_profile_id
      AND user_id = auth.uid()
  );
$$;

CREATE OR REPLACE FUNCTION is_user_owner(u_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
AS $$
  SELECT u_user_id = auth.uid();
$$;

-- UPDATED_AT TRIGGERS

CREATE TRIGGER set_updated_at_users
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_updated_at_profiles
BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_updated_at_wallets
BEFORE UPDATE ON wallets
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_updated_at_transactions
BEFORE UPDATE ON transactions
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_updated_at_transaction_reference
BEFORE UPDATE ON transaction_reference
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_updated_at_shared_goals
BEFORE UPDATE ON shared_goals
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_updated_at_goal_participants
BEFORE UPDATE ON goal_participants
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_updated_at_goal_contributions
BEFORE UPDATE ON goal_contributions
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_updated_at_shared_expeneses
BEFORE UPDATE ON shared_expeneses
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_updated_at_shared_expense_participants
BEFORE UPDATE ON shared_expenes_participants
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_updated_at_shared_expense_contributions
BEFORE UPDATE ON shared_expences_contributions
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_updated_at_contribution_transactions
BEFORE UPDATE ON contribution_transacions
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_updated_at_milionaire_box
BEFORE UPDATE ON milionaire_box
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_updated_at_milionaire_box_transactions
BEFORE UPDATE ON milionaire_box_transacions
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_updated_at_loans
BEFORE UPDATE ON loans
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_updated_at_loan_transactions
BEFORE UPDATE ON loan_transacions
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS POLICIES

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transaction_reference ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.batch_archivements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shared_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goal_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goal_contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shared_expeneses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shared_expenes_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shared_expences_contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contribution_transacions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.milionaire_box ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.milionaire_box_transacions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loan_transacions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "User can view own user record" ON public.users;
CREATE POLICY "User can view own user record"
ON public.users
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can view own profiles" ON public.profiles;
CREATE POLICY "Users can view own profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (is_profile_owner(profile_id));

DROP POLICY IF EXISTS "User can modify own profile" ON public.profiles;
CREATE POLICY "Users can modify own profiles"
ON public.profiles
FOR UPDATE
TO authenticated
USING (is_profile_owner(profile_id));


DROP POLICY IF EXISTS "User can view own subscriptions" ON public.user_subscriptions;
CREATE POLICY "User can view own subscriptions"
ON public.user_subscriptions
FOR SELECT
TO authenticated
USING (is_user_owner(user_id));

DROP POLICY IF EXISTS "Anyone can view active subscription plans" ON public.subscription_plans;
CREATE POLICY "Anyone can view active subscription plans"
ON public.subscription_plans
FOR SELECT
TO anon, authenticated
USING (is_active = TRUE);

DROP POLICY IF EXISTS "User can view own payments" ON public.payments;
CREATE POLICY "User can view own payments"
ON public.payments
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.user_subscriptions AS us
    WHERE us.subscription_id = payments.subscription_id
      AND us.user_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "User can view own wallets" ON public.wallets;
CREATE POLICY "Users can view own wallets"
ON public.wallets
FOR SELECT
TO authenticated
USING (is_profile_owner(profile_id));

DROP POLICY IF EXISTS "User can modify own wallets" ON public.wallets;
CREATE POLICY "Users can modify own wallets"
ON public.wallets
FOR UPDATE
TO authenticated
USING (is_profile_owner(profile_id));

DROP POLICY IF EXISTS "Users can view own archivements" ON public.batch_archivements;
CREATE POLICY "Users can view own archivements"
ON public.batch_archivements
FOR SELECT
TO authenticated
USING (is_profile_owner(profile_id));

DROP POLICY IF EXISTS "Users can view own transactions" ON public.transactions;
CREATE POLICY "User cant view own transactions"
ON public.transactions
FOR SELECT
TO authenticated
USING (is_profile_owner(profile_id));

DROP POLICY IF EXISTS "User can see a goal if they are a participant" ON public.shared_goals;
CREATE POLICY "User can see a goal if they are a participant"
ON shared_goals
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM goal_participants gp
    JOIN profiles p ON p.profile_id = gp.profile_id
    WHERE gp.goal_id = shared_goals.goal_id
      AND p.user_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "User can modify a goal if they are a creator" ON public.shared_goals;
CREATE POLICY "User can modify a goal if they are a creator"
ON shared_goals
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM goal_participants gp
    JOIN profiles p ON p.profile_id = gp.profile_id
    WHERE gp.goal_id = shared_goals.goal_id
      AND p.user_id = auth.uid()
      AND gp.role = 'creator'
  )
);

DROP POLICY IF EXISTS "User can view goal participants if they are a participant" ON public.goal_participants;
CREATE POLICY "User can view goal participants if they are a participant"
ON goal_participants
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM goal_participants gp
    JOIN profiles p ON p.profile_id = gp.profile_id
    WHERE gp.goal_id = goal_participants.goal_id
      AND p.user_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "User can create goal participants when creating a goal" ON public.goal_participants;
CREATE POLICY "User can create goal participants when creating a goal"
ON goal_participants
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM goal_participants gp
    JOIN profiles p ON p.profile_id = gp.profile_id
    WHERE gp.goal_id = goal_participants.goal_id
      AND p.user_id = auth.uid()
      AND gp.role = 'creator'
  )
);

DROP POLICY IF EXISTS "User can create goal contributions" ON public.goal_contributions;
CREATE POLICY "User can create goal contributions"
ON goal_contributions
FOR INSERT
TO authenticated
WITH CHECK (is_profile_owner(profile_id));

DROP POLICY IF EXISTS "User can see own goal contributions" ON public.goal_contributions;
CREATE POLICY "User can see own goal contributions"
ON goal_contributions
FOR SELECT
TO authenticated
USING (is_profile_owner(profile_id));

DROP POLICY IF EXISTS "User can see a shared expense if they are a participant" ON public.shared_expeneses;
CREATE POLICY "User can see a shared expense if they are a participant"
ON shared_expeneses
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM shared_expenes_participants sep
    JOIN profiles p ON p.profile_id = sep.profile_id
    WHERE sep.shared_expense_id = shared_expeneses.shared_expense_id
      AND p.user_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "User can modify a shared expense if they are a creator" ON public.shared_expeneses;
CREATE POLICY "User can modify a shared expense if they are a creator"
ON shared_expeneses
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM shared_expenes_participants sep
    JOIN profiles p ON p.profile_id = sep.profile_id
    WHERE sep.shared_expense_id = shared_expeneses.shared_expense_id
      AND p.user_id = auth.uid()
      AND sep.role = 'creator'
  )
);

DROP POLICY IF EXISTS "User can view shared expense participants if they are a participant" ON public.shared_expenes_participants;
CREATE POLICY "User can view shared expense participants if they are a participant"
ON shared_expenes_participants
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM shared_expenes_participants sep
    JOIN profiles p ON p.profile_id = sep.profile_id
    WHERE sep.shared_expense_id = shared_expenes_participants.shared_expense_id
      AND p.user_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "User can see own shared expense contributions" ON public.shared_expences_contributions;
CREATE POLICY "User can see own shared expense contributions"
ON shared_expences_contributions
FOR SELECT
TO authenticated
USING (is_profile_owner(from_profile_id) OR is_profile_owner(to_profile_id));

DROP POLICY IF EXISTS "User can create shared expense contributions" ON public.shared_expences_contributions;
CREATE POLICY "User can create shared expense contributions"
ON shared_expences_contributions
FOR INSERT
TO authenticated
WITH CHECK (is_profile_owner(from_profile_id));

DROP POLICY IF EXISTS "User can create milionaire box" ON public.milionaire_box;
CREATE POLICY "User can create milionaire box"
ON public.milionaire_box
FOR INSERT
TO authenticated
WITH CHECK (is_profile_owner(profile_id));

DROP POLICY IF EXISTS "User can view own milionaire box" ON public.milionaire_box;
CREATE POLICY "User can view own milionaire box"
ON public.milionaire_box
FOR SELECT
TO authenticated
USING (is_profile_owner(profile_id));

DROP POLICY IF EXISTS "User can modify own milionaire box" ON public.milionaire_box;
CREATE POLICY "User can modify own milionaire box"
ON public.milionaire_box
FOR UPDATE
TO authenticated
USING (is_profile_owner(profile_id));

DROP POLICY IF EXISTS "User can view own milionaire box transactions" ON public.milionaire_box_transacions;
CREATE POLICY "User can view own milionaire box transactions"
ON public.milionaire_box_transacions
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM milionaire_box mb
    JOIN profiles p ON p.profile_id = mb.profile_id
    JOIN milionaire_box_transacions mbt ON mbt.mlionaire_box_id = mb.mlionaire_box_id
    WHERE mbt.milionaire_box_transacion_id = milionaire_box_transacions.milionaire_box_transacion_id
      AND p.user_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "User can create loans" ON public.loans;
CREATE POLICY "User can create loans"
ON public.loans
FOR INSERT
TO authenticated
WITH CHECK (is_profile_owner(profile_id));

DROP POLICY IF EXISTS "User can view own loans" ON public.loans;
CREATE POLICY "User can view own loans"
ON public.loans
FOR SELECT
TO authenticated
USING (is_profile_owner(profile_id));

DROP POLICY IF EXISTS "User can modify own loans" ON public.loans;
CREATE POLICY "User can modify own loans"
ON public.loans
FOR UPDATE
TO authenticated
USING (is_profile_owner(profile_id));

DROP POLICY IF EXISTS "User can view own loan transactions" ON public.loan_transacions;
CREATE POLICY "User can view own loan transactions"
ON public.loan_transacions
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM loans l
    JOIN profiles p ON p.profile_id = l.profile_id
    JOIN loan_transacions lt ON lt.loan_id = l.loan_id
    WHERE lt.loan_transacion_id = loan_transacions.loan_transacion_id
      AND p.user_id = auth.uid()
  )
);
