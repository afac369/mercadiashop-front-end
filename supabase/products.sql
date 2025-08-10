
create extension if not exists "pgcrypto";
create table if not exists public.productos (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price int not null check (price >= 0),
  image_url text,
  category text,
  stock int not null default 0 check (stock >= 0),
  is_active boolean not null default true,
  created_at timestamp with time zone not null default now()
);
alter table public.productos enable row level security;
create policy "Productos visibles" on public.productos for select using (is_active = true);
create policy "Solo usuarios con sesión: insertar" on public.productos for insert to authenticated with check (true);
create policy "Solo usuarios con sesión: actualizar" on public.productos for update to authenticated using (true) with check (true);
