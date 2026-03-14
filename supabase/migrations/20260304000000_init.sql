-- =============================================================================
-- Migration: 20260304000000_init.sql
-- Description: Initial schema — profiles table with auto-create trigger & RLS
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1. profiles table
--    One row per auth.users entry. Stores public-safe user data.
-- ---------------------------------------------------------------------------

create table if not exists public.profiles (
  id          uuid        not null references auth.users (id) on delete cascade,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  email       text,
  full_name   text,
  avatar_url  text,

  constraint profiles_pkey primary key (id)
);

-- Index for fast look-ups by email (e.g. admin search)
create index if not exists profiles_email_idx on public.profiles (email);

comment on table public.profiles is
  'Public user profile data. Extended from auth.users via trigger.';

-- ---------------------------------------------------------------------------
-- 2. updated_at auto-update trigger
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace trigger profiles_set_updated_at
  before update on public.profiles
  for each row
  execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- 3. Auto-create profile on new user sign-up
--    Fires after a row is inserted into auth.users (email/password or OAuth).
-- ---------------------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    -- Prefer the name supplied at sign-up; fall back to Google display name
    coalesce(
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name'
    ),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- 4. Row Level Security (RLS)
-- ---------------------------------------------------------------------------

alter table public.profiles enable row level security;

-- Users can read their own profile
create policy "Users can view own profile"
  on public.profiles
  for select
  using (auth.uid() = id);

-- Users can update their own profile
create policy "Users can update own profile"
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Prevent direct inserts from the client — the trigger handles creation
create policy "No direct inserts"
  on public.profiles
  for insert
  with check (false);

-- Prevent direct deletes — handled by cascade from auth.users
create policy "No direct deletes"
  on public.profiles
  for delete
  using (false);
