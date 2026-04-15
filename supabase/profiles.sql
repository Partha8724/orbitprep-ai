-- OrbitPrep AI Supabase Auth + Profiles + Razorpay subscriptions schema
-- Run this in the Supabase SQL editor for your project.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  role text not null default 'student' check (role in ('student', 'admin')),
  is_premium boolean not null default false,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  razorpay_subscription_id text not null unique,
  razorpay_payment_id text,
  status text not null default 'created' check (
    status in ('created', 'authenticated', 'active', 'pending', 'halted', 'cancelled', 'completed', 'expired')
  ),
  current_period_end timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.profiles enable row level security;
alter table public.subscriptions enable row level security;

revoke all on public.profiles from anon;
revoke update, delete on public.profiles from authenticated;
grant select, insert on public.profiles to authenticated;

revoke all on public.subscriptions from anon;
revoke insert, update, delete on public.subscriptions from authenticated;
grant select on public.subscriptions to authenticated;

create or replace function public.handle_new_user_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, role, is_premium)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.email, ''),
    'student',
    false
  )
  on conflict (id) do update
    set full_name = excluded.full_name,
        email = excluded.email;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user_profile();

drop policy if exists "profiles_select_own" on public.profiles;
drop policy if exists "profiles_insert_own" on public.profiles;
drop policy if exists "profiles_update_own_basic" on public.profiles;
drop policy if exists "subscriptions_select_own" on public.subscriptions;

create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

create policy "profiles_insert_own"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id and role = 'student' and is_premium = false);

create policy "subscriptions_select_own"
on public.subscriptions
for select
to authenticated
using (auth.uid() = user_id);

create index if not exists profiles_role_idx on public.profiles (role);
create index if not exists profiles_is_premium_idx on public.profiles (is_premium);
create index if not exists subscriptions_user_id_idx on public.subscriptions (user_id);
create index if not exists subscriptions_status_idx on public.subscriptions (status);
create index if not exists subscriptions_razorpay_subscription_id_idx on public.subscriptions (razorpay_subscription_id);

-- Promote an account manually from the Supabase SQL editor or with a service-role backend:
-- update public.profiles set role = 'admin' where email = 'founder@example.com';
-- update public.profiles set is_premium = true where email = 'student@example.com';
