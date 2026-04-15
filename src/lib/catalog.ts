import { createSupabaseServerClient } from "@/lib/supabase/server";

export type ExamCatalogItem = {
  name: string;
  slug: string;
  overview: string;
  focus: string[];
};

export type SubjectCatalogItem = {
  title: string;
  slug: string;
  description: string;
  tags: string[];
};

export const exams: ExamCatalogItem[] = [
  {
    name: "UPSC",
    slug: "upsc",
    overview: "Civil services preparation across polity, economy, history, geography, science, environment, ethics, and current affairs.",
    focus: ["Prelims MCQ accuracy", "Mains-ready conceptual notes", "Current affairs linkage", "Previous year trend analysis"],
  },
  {
    name: "APSC",
    slug: "apsc",
    overview: "Assam state civil services preparation with Assam history, polity, geography, economy, and national current affairs.",
    focus: ["Assam-specific GK", "GS paper coverage", "State current affairs", "Topic-wise revision"],
  },
  {
    name: "SSC",
    slug: "ssc",
    overview: "Staff Selection Commission preparation for reasoning, quantitative aptitude, English, general awareness, and computer basics.",
    focus: ["Speed practice", "Section tests", "Repeated question patterns", "Accuracy tracking"],
  },
  {
    name: "Railway",
    slug: "railway",
    overview: "Railway recruitment preparation covering arithmetic, reasoning, general science, current affairs, and technical awareness.",
    focus: ["High-volume MCQs", "Science basics", "Exam-speed drills", "Previous paper practice"],
  },
  {
    name: "Banking",
    slug: "banking",
    overview: "Bank exam preparation for reasoning, quantitative aptitude, English, banking awareness, and economic current affairs.",
    focus: ["Timed sectional practice", "Banking awareness", "Data interpretation", "Vocabulary revision"],
  },
  {
    name: "Police",
    slug: "police",
    overview: "Police recruitment preparation for general knowledge, law basics, reasoning, physical-test awareness, and state topics.",
    focus: ["State GK", "Constitution basics", "Reasoning drills", "Current affairs"],
  },
  {
    name: "State PSC",
    slug: "state-psc",
    overview: "State public service commission preparation with state-specific GK, polity, geography, history, and current affairs.",
    focus: ["State syllabus mapping", "GS concepts", "Local current affairs", "Practice tests"],
  },
  {
    name: "Teaching",
    slug: "teaching",
    overview: "Teaching exam preparation for child development, pedagogy, language, mathematics, environmental studies, and GK.",
    focus: ["Pedagogy notes", "CTET/TET practice", "Concept clarity", "Topic tests"],
  },
  {
    name: "Defence",
    slug: "defence",
    overview: "Defence exam preparation for NDA, CDS, AFCAT, and related government recruitment exams.",
    focus: ["General ability", "Maths practice", "Defence awareness", "Current affairs"],
  },
  {
    name: "Assam Govt Jobs",
    slug: "assam-govt-jobs",
    overview: "Assam government job preparation with local history, geography, culture, polity, economy, and job alerts context.",
    focus: ["Assam GK", "Local schemes", "Current affairs", "Department-wise practice"],
  },
];

export const subjectSections: SubjectCatalogItem[] = [
  {
    title: "Galaxy UI",
    slug: "galaxy-ui",
    description: "Space, astronomy, environment, geography, and scientific awareness for government exams.",
    tags: ["space", "geography", "environment", "science"],
  },
  {
    title: "Earth Knowledge",
    slug: "earth-knowledge",
    description: "Physical geography, Indian geography, Assam geography, ecology, and disaster management.",
    tags: ["geography", "earth", "environment", "assam"],
  },
  {
    title: "Economy Radar",
    slug: "economy-radar",
    description: "Indian economy, budget terms, banking awareness, schemes, inflation, and financial institutions.",
    tags: ["economy", "banking", "budget", "schemes"],
  },
  {
    title: "History Vault",
    slug: "history-vault",
    description: "Ancient, medieval, modern Indian history, freedom movement, Assam history, and culture.",
    tags: ["history", "culture", "assam", "freedom movement"],
  },
  {
    title: "Science Pulse",
    slug: "science-pulse",
    description: "Physics, chemistry, biology, technology, health, and everyday science for MCQ exams.",
    tags: ["science", "technology", "biology", "health"],
  },
  {
    title: "GK Stream",
    slug: "gk-stream",
    description: "Static GK, awards, sports, books, organizations, national symbols, and important facts.",
    tags: ["gk", "awards", "sports", "organizations"],
  },
];

export const languages = [
  { code: "en", label: "English", home: "AI-powered government exam preparation" },
  { code: "as", label: "Assamese", home: "এআই চালিত চৰকাৰী পৰীক্ষাৰ প্ৰস্তুতি" },
  { code: "hi", label: "Hindi", home: "एआई आधारित सरकारी परीक्षा तैयारी" },
  { code: "bn", label: "Bengali", home: "এআই চালিত সরকারি পরীক্ষা প্রস্তুতি" },
  { code: "ta", label: "Tamil", home: "ஏஐ வழிநடத்தும் அரசு தேர்வு தயாரிப்பு" },
  { code: "te", label: "Telugu", home: "AI ఆధారిత ప్రభుత్వ పరీక్షల సిద్ధత" },
  { code: "kn", label: "Kannada", home: "AI ಆಧಾರಿತ ಸರ್ಕಾರಿ ಪರೀಕ್ಷಾ ಸಿದ್ಧತೆ" },
  { code: "ml", label: "Malayalam", home: "AI പിന്തുണയുള്ള സർക്കാർ പരീക്ഷാ തയ്യാറെടുപ്പ്" },
  { code: "mr", label: "Marathi", home: "एआय आधारित सरकारी परीक्षा तयारी" },
  { code: "gu", label: "Gujarati", home: "AI આધારિત સરકારી પરીક્ષા તૈયારી" },
  { code: "pa", label: "Punjabi", home: "AI ਅਧਾਰਿਤ ਸਰਕਾਰੀ ਪ੍ਰੀਖਿਆ ਤਿਆਰੀ" },
  { code: "or", label: "Odia", home: "AI ଆଧାରିତ ସରକାରୀ ପରୀକ୍ଷା ପ୍ରସ୍ତୁତି" },
  { code: "ur", label: "Urdu", home: "AI پر مبنی سرکاری امتحان کی تیاری" },
];

export function getExam(slug: string) {
  return exams.find((exam) => exam.slug === slug);
}

export function getSubjectSection(slug: string) {
  return subjectSections.find((subject) => subject.slug === slug);
}

export async function getExamPageData(slug: string) {
  const supabase = await createSupabaseServerClient();
  const { data: exam } = await supabase
    .from("exams")
    .select("id, name, slug, description, is_active")
    .eq("slug", slug)
    .maybeSingle();

  const examId = exam?.id as string | undefined;
  const tag = getExam(slug)?.name.toLowerCase() || slug;

  const [subjects, questions, pdfs, tests, affairs] = await Promise.all([
    examId
      ? supabase.from("subjects").select("id, name").eq("exam_id", examId).order("name")
      : Promise.resolve({ data: [], error: null }),
    supabase
      .from("questions")
      .select("id, question_text, difficulty, source_type, tags, topics(name)")
      .eq("status", "approved")
      .contains("tags", [tag])
      .order("created_at", { ascending: false })
      .limit(8),
    examId
      ? supabase.from("pdfs").select("id, title, description, file_url, source_type").eq("status", "approved").eq("exam_id", examId).order("created_at", { ascending: false }).limit(6)
      : supabase.from("pdfs").select("id, title, description, file_url, source_type").eq("status", "approved").order("created_at", { ascending: false }).limit(6),
    examId
      ? supabase.from("mock_tests").select("id, title, description, duration_minutes").eq("status", "published").eq("exam_id", examId).order("created_at", { ascending: false }).limit(6)
      : supabase.from("mock_tests").select("id, title, description, duration_minutes").eq("status", "published").order("created_at", { ascending: false }).limit(6),
    supabase
      .from("current_affairs")
      .select("id, title, summary, published_date, category, tags")
      .eq("status", "approved")
      .order("published_date", { ascending: false })
      .limit(6),
  ]);

  return {
    exam,
    subjects: subjects.data || [],
    questions: questions.data || [],
    pdfs: pdfs.data || [],
    tests: tests.data || [],
    affairs: affairs.data || [],
  };
}

export async function getSubjectSectionData(slug: string) {
  const section = getSubjectSection(slug);
  const supabase = await createSupabaseServerClient();
  const tags = section?.tags || [slug];
  const [questions, pdfs, tests] = await Promise.all([
    supabase
      .from("questions")
      .select("id, question_text, options, correct_answer, explanation, difficulty, source_type, tags, topics(name)")
      .eq("status", "approved")
      .overlaps("tags", tags)
      .order("created_at", { ascending: false })
      .limit(12),
    supabase
      .from("pdfs")
      .select("id, title, description, file_url, source_type, tags")
      .eq("status", "approved")
      .overlaps("tags", tags)
      .order("created_at", { ascending: false })
      .limit(8),
    supabase
      .from("mock_tests")
      .select("id, title, description, duration_minutes, tags")
      .eq("status", "published")
      .overlaps("tags", tags)
      .order("created_at", { ascending: false })
      .limit(6),
  ]);

  return {
    section,
    questions: questions.data || [],
    pdfs: pdfs.data || [],
    tests: tests.data || [],
  };
}
