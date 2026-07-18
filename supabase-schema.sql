-- ============================================================
--  ACE Books — Supabase database schema
--  Run this ONCE in your Supabase project:
--  Supabase Dashboard  ->  SQL Editor  ->  New query  ->  paste  ->  Run
-- ============================================================

-- 1) Sales / repairs / expenses
create table if not exists transactions (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  type        text not null check (type in ('sale','expense')),
  tdate       date not null default current_date,
  description text,
  model       text,
  service     text,
  amount      numeric not null default 0,
  cost        numeric not null default 0
);

-- 2) Supplier invoices (sparepart orders)
create table if not exists supplier_invoices (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  supplier    text,
  inv_no      text,
  inv_date    date not null default current_date,
  items       text,
  amount      numeric not null default 0,
  status      text not null default 'unpaid' check (status in ('paid','unpaid'))
);

-- ------------------------------------------------------------
-- Row Level Security
-- ------------------------------------------------------------
-- This is an INTERNAL team tool. The policies below let anyone
-- using your app (with the anon key) read + write records.
-- That is fine for a private team link. If you later want proper
-- logins per staff member, turn on Supabase Auth and replace
-- `to anon` with `to authenticated`. (Ask about this at the
-- consultation — it is the right next step.)
-- ------------------------------------------------------------

alter table transactions       enable row level security;
alter table supplier_invoices  enable row level security;

drop policy if exists "team access tx"  on transactions;
drop policy if exists "team access inv" on supplier_invoices;

create policy "team access tx"  on transactions
  for all to anon using (true) with check (true);

create policy "team access inv" on supplier_invoices
  for all to anon using (true) with check (true);

-- Enable live sync so your team sees updates in real time
alter publication supabase_realtime add table transactions;
alter publication supabase_realtime add table supplier_invoices;
