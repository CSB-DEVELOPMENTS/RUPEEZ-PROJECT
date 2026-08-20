ALTER TABLE public.wallets
ADD COLUMN IF NOT EXISTS wallet_type TEXT CHECK (wallet_type IN ('crypto', 'fiat')) DEFAULT 'fiat';

create index if not exists idx_wallets_wallet_type on public.wallets(wallet_type);