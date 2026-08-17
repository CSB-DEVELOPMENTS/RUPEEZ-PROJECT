ALTER TABLE public.transactions
  DROP CONSTRAINT IF EXISTS transactions_transaction_type_check;

ALTER TABLE public.transactions
  ADD CONSTRAINT transactions_transaction_type_check
  CHECK (transaction_type IN ('income', 'expense', 'transfer'));
