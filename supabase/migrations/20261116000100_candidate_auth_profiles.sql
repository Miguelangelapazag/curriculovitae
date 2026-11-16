alter table public.users
  add column if not exists auth_user_id uuid unique
  references auth.users (id) on delete set null;

update public.users as profile
set auth_user_id = profile.id
where profile.auth_user_id is null
  and exists (
    select 1
    from auth.users as auth_user
    where auth_user.id = profile.id
  );

alter table public.users enable row level security;

revoke all on table public.users from anon, authenticated;
grant select on table public.users to service_role;
