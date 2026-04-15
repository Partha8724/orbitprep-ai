-- OrbitPrep AI production platform upgrade
-- Run after supabase/profiles.sql and supabase/platform.sql.

alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check check (role in ('student', 'editor', 'admin'));

alter table public.pdfs add column if not exists exam_id uuid references public.exams(id) on delete set null;
alter table public.pdfs add column if not exists subject_id uuid references public.subjects(id) on delete set null;
alter table public.pdfs add column if not exists topic_id uuid references public.topics(id) on delete set null;
alter table public.pdfs add column if not exists storage_path text;
alter table public.pdfs add column if not exists tags text[] not null default '{}';

alter table public.mock_tests add column if not exists exam_id uuid references public.exams(id) on delete set null;
alter table public.mock_tests add column if not exists subject_id uuid references public.subjects(id) on delete set null;
alter table public.mock_tests add column if not exists tags text[] not null default '{}';

alter table public.current_affairs add column if not exists exam_id uuid references public.exams(id) on delete set null;
alter table public.current_affairs add column if not exists tags text[] not null default '{}';

drop policy if exists "profiles_select_admin_all" on public.profiles;
drop policy if exists "profiles_update_admin_all" on public.profiles;
create policy "profiles_select_admin_all" on public.profiles for select to authenticated using (auth.uid() = id or public.is_admin());
create policy "profiles_update_admin_all" on public.profiles for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin_insert_questions" on public.questions;
create policy "admin_insert_questions" on public.questions for insert to authenticated with check (public.is_admin());
drop policy if exists "admin_insert_pdfs" on public.pdfs;
create policy "admin_insert_pdfs" on public.pdfs for insert to authenticated with check (public.is_admin());
drop policy if exists "admin_insert_current_affairs" on public.current_affairs;
create policy "admin_insert_current_affairs" on public.current_affairs for insert to authenticated with check (public.is_admin());
drop policy if exists "admin_insert_mock_tests" on public.mock_tests;
create policy "admin_insert_mock_tests" on public.mock_tests for insert to authenticated with check (public.is_admin());

insert into storage.buckets (id, name, public)
values ('pdfs', 'pdfs', true)
on conflict (id) do update set public = true;

drop policy if exists "public_read_pdfs_bucket" on storage.objects;
drop policy if exists "admin_write_pdfs_bucket" on storage.objects;
create policy "public_read_pdfs_bucket" on storage.objects for select using (bucket_id = 'pdfs');
create policy "admin_write_pdfs_bucket" on storage.objects for all to authenticated using (bucket_id = 'pdfs' and public.is_admin()) with check (bucket_id = 'pdfs' and public.is_admin());

insert into public.exams (name, slug, description, is_active) values
('UPSC', 'upsc', 'Civil services preparation across polity, economy, history, geography, environment, ethics, and current affairs.', true),
('APSC', 'apsc', 'Assam state civil services preparation with Assam history, polity, geography, economy, and current affairs.', true),
('SSC', 'ssc', 'SSC preparation for reasoning, quantitative aptitude, English, general awareness, and computer basics.', true),
('Railway', 'railway', 'Railway recruitment preparation covering arithmetic, reasoning, general science, and current affairs.', true),
('Banking', 'banking', 'Banking exam preparation for reasoning, quantitative aptitude, English, banking awareness, and economy.', true),
('Police', 'police', 'Police recruitment preparation for general knowledge, law basics, reasoning, and state topics.', true),
('State PSC', 'state-psc', 'State public service commission preparation with state-specific GK and general studies.', true),
('Teaching', 'teaching', 'Teaching exam preparation for child development, pedagogy, language, mathematics, EVS, and GK.', true),
('Defence', 'defence', 'Defence exam preparation for NDA, CDS, AFCAT, and related recruitment exams.', true),
('Assam Govt Jobs', 'assam-govt-jobs', 'Assam government job preparation with local history, geography, culture, polity, and economy.', true)
on conflict (slug) do update set description = excluded.description, is_active = true;

with exam_rows as (select id, slug from public.exams),
subject_seed as (
  select e.id as exam_id, s.name
  from exam_rows e
  cross join (values ('Polity'), ('Economy'), ('History'), ('Geography'), ('Science'), ('Current Affairs'), ('Reasoning'), ('Quantitative Aptitude'), ('General Knowledge')) as s(name)
)
insert into public.subjects (exam_id, name)
select exam_id, name from subject_seed
on conflict (exam_id, name) do nothing;

with subject_rows as (select id, name from public.subjects),
topic_seed as (
  select id as subject_id, name || ' Basics' as name from subject_rows
  union all
  select id as subject_id, name || ' Previous Year Patterns' as name from subject_rows
)
insert into public.topics (subject_id, name)
select subject_id, name from topic_seed
on conflict (subject_id, name) do nothing;

with first_topic as (
  select t.id, lower(s.name) as subject_name
  from public.topics t
  join public.subjects s on s.id = t.subject_id
  where t.name like '%Basics'
),
seed_questions as (
  select
    (select id from first_topic where subject_name = 'polity' limit 1) as topic_id,
    'Which constitutional feature supports federalism in India?' as question_text,
    '[{"label":"A","text":"Division of powers"},{"label":"B","text":"Single-party rule"},{"label":"C","text":"Abolition of states"},{"label":"D","text":"No written constitution"}]'::jsonb as options,
    'A' as correct_answer,
    'Federalism requires distribution of powers between Union and states.' as explanation,
    array['upsc','apsc','state psc','polity','gk']::text[] as tags
  union all
  select
    (select id from first_topic where subject_name = 'economy' limit 1),
    'Which institution frames monetary policy in India?',
    '[{"label":"A","text":"RBI Monetary Policy Committee"},{"label":"B","text":"Election Commission"},{"label":"C","text":"NITI Aayog"},{"label":"D","text":"CAG"}]'::jsonb,
    'A',
    'The RBI MPC decides the policy repo rate to maintain price stability while supporting growth.',
    array['banking','upsc','economy','gk']::text[]
  union all
  select
    (select id from first_topic where subject_name = 'history' limit 1),
    'The Ahom kingdom is most directly associated with which present-day region?',
    '[{"label":"A","text":"Assam"},{"label":"B","text":"Kerala"},{"label":"C","text":"Punjab"},{"label":"D","text":"Rajasthan"}]'::jsonb,
    'A',
    'The Ahom kingdom ruled large parts of the Brahmaputra valley in Assam.',
    array['apsc','assam govt jobs','history','assam']::text[]
  union all
  select
    (select id from first_topic where subject_name = 'science' limit 1),
    'Which gas is essential for photosynthesis?',
    '[{"label":"A","text":"Carbon dioxide"},{"label":"B","text":"Helium"},{"label":"C","text":"Neon"},{"label":"D","text":"Argon"}]'::jsonb,
    'A',
    'Plants use carbon dioxide and water to produce glucose in the presence of sunlight.',
    array['ssc','railway','science','biology']::text[]
)`r`ninsert into public.questions (topic_id, question_text, options, correct_answer, explanation, difficulty, tags, source_type, status)
select topic_id, question_text, options, correct_answer, explanation, 'medium', tags, 'manual', 'approved'
from seed_questions
on conflict do nothing;

insert into public.current_affairs (title, summary, category, published_date, tags, status)
values
('Daily economy revision brief', 'Focus on inflation, monetary policy, budget terms, and welfare schemes because these topics connect current events with UPSC, banking, SSC, and state PSC questions.', 'Economy', current_date, array['economy','banking','upsc','current affairs'], 'approved'),
('Assam current affairs revision brief', 'Track state schemes, appointments, geography-linked events, culture, and public policy updates for APSC and Assam government job exams.', 'Assam', current_date, array['assam','apsc','assam govt jobs','current affairs'], 'approved')
on conflict do nothing;

insert into public.pdfs (title, description, file_url, source_type, status, tags)
values
('OrbitPrep Polity Revision Notes', 'Exam-ready notes for constitutional basics, federalism, parliament, and rights.', 'https://orbitprep-ai.vercel.app/pdfs/polity-revision-notes.pdf', 'manual', 'approved', array['polity','upsc','apsc','state psc']),
('OrbitPrep Current Affairs Digest', 'Daily current affairs structure for quick revision and MCQ practice.', 'https://orbitprep-ai.vercel.app/pdfs/current-affairs-digest.pdf', 'manual', 'approved', array['current affairs','gk','upsc','ssc'])
on conflict do nothing;

with q as (select id from public.questions where status = 'approved' order by created_at limit 4),
created_test as (
  insert into public.mock_tests (title, description, duration_minutes, status, tags)
  values ('General Studies Starter Mock', 'A free starter mock test covering polity, economy, history, and science.', 20, 'published', array['upsc','apsc','ssc','gk'])
  returning id
)
insert into public.mock_test_questions (mock_test_id, question_id, position)
select created_test.id, q.id, row_number() over () from created_test, q
on conflict do nothing;

create index if not exists pdfs_exam_id_idx on public.pdfs(exam_id);
create index if not exists pdfs_tags_idx on public.pdfs using gin(tags);
create index if not exists mock_tests_exam_id_idx on public.mock_tests(exam_id);
create index if not exists mock_tests_tags_idx on public.mock_tests using gin(tags);
create index if not exists questions_tags_idx on public.questions using gin(tags);
create index if not exists current_affairs_tags_idx on public.current_affairs using gin(tags);


