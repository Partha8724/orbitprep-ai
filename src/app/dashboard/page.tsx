import Link from "next/link";
import { FileText, Newspaper, Trophy } from "lucide-react";

import { logoutAction } from "@/app/auth-actions";
import { requireProfile } from "@/lib/auth";
import { getStudentLearningData } from "@/lib/platform";

export const dynamic = "force-dynamic";
export const metadata = { title: "Dashboard" };

const studentSections = [
  { href: "/daily-questions", title: "Daily questions", copy: "Practice approved AI and admin-reviewed MCQs every day." },
  { href: "/test-series", title: "Mock tests", copy: "Attempt published tests with timer, scoring, and accuracy history." },
  { href: "/pdfs", title: "PDF library", copy: "Download approved revision PDFs, current affairs digests, and study notes." },
  { href: "/ai-mentor", title: "AI mentor", copy: "Ask for strategy, weak-topic help, explanations, and daily study planning." },
  { href: "/current-affairs", title: "Current affairs", copy: "Read exam-ready summaries from the approved content workflow." },
  { href: "/exams", title: "Exam hubs", copy: "Open UPSC, APSC, SSC, Railway, Banking, Police, Teaching, Defence, and Assam job sections." },
];

export default async function DashboardPage() {
  const profile = await requireProfile();
  const learning = await getStudentLearningData(profile);

  return (
    <main className="min-h-screen bg-[#050816] px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-5 border-b border-white/10 pb-8 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/" className="text-sm text-cyan-200 hover:text-cyan-100">OrbitPrep AI</Link>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Welcome, {profile.full_name}</h1>
            <p className="mt-3 max-w-2xl text-slate-300">All student services are open: AI mentor, tests, PDFs, daily questions, current affairs, and exam-specific study hubs.</p>
          </div>
          <form action={logoutAction}><button className="rounded-md border border-white/10 bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-slate-100">Log out</button></form>
        </header>

        <section className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-lg border border-white/10 bg-white/5 p-6"><div className="text-sm text-slate-400">Profile</div><div className="mt-3 font-semibold">{profile.email}</div></div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-6"><div className="text-sm text-slate-400">Access</div><div className="mt-3 font-semibold text-emerald-100">Free launch access</div></div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-6"><div className="text-sm text-slate-400">Role</div><div className="mt-3 capitalize font-semibold">{profile.role}</div>{profile.role === "admin" ? <Link href="/admin" className="mt-3 inline-flex text-sm text-cyan-200">Open admin</Link> : null}</div>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {studentSections.map((section) => (
            <Link key={section.href} href={section.href} className="rounded-lg border border-white/10 bg-white/5 p-6 transition hover:border-cyan-300/40 hover:bg-white/10">
              <h2 className="text-xl font-semibold">{section.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">{section.copy}</p>
            </Link>
          ))}
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-3">
          <div className="rounded-lg border border-white/10 bg-white/5 p-6"><FileText className="h-7 w-7 text-cyan-200" /><h2 className="mt-4 text-xl font-semibold">Latest PDFs</h2><div className="mt-5 space-y-3">{learning.pdfs.map((pdf) => <a key={pdf.id} href={pdf.file_url} className="block rounded-md border border-white/10 bg-slate-950/60 p-4"><div className="font-semibold">{pdf.title}</div><div className="mt-1 text-sm text-slate-400">Free download · {pdf.source_type}</div></a>)}{learning.pdfs.length === 0 ? <p className="text-sm text-slate-400">No approved PDFs available yet.</p> : null}</div></div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-6"><Trophy className="h-7 w-7 text-violet-200" /><h2 className="mt-4 text-xl font-semibold">Published mock tests</h2><div className="mt-5 space-y-3">{learning.tests.map((test) => <Link key={test.id} href={`/test-series/${test.id}`} className="block rounded-md border border-white/10 bg-slate-950/60 p-4"><div className="font-semibold">{test.title}</div><div className="mt-1 text-sm text-slate-400">{test.duration_minutes} min · Free access</div></Link>)}{learning.tests.length === 0 ? <p className="text-sm text-slate-400">No published tests available yet.</p> : null}</div></div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-6"><Newspaper className="h-7 w-7 text-emerald-200" /><h2 className="mt-4 text-xl font-semibold">Current affairs</h2><div className="mt-5 space-y-3">{learning.currentAffairs.map((entry) => <Link key={entry.id} href="/current-affairs" className="block rounded-md border border-white/10 bg-slate-950/60 p-4"><div className="font-semibold">{entry.title}</div><p className="mt-1 line-clamp-2 text-sm text-slate-400">{entry.summary}</p></Link>)}{learning.currentAffairs.length === 0 ? <p className="text-sm text-slate-400">No approved current affairs available yet.</p> : null}</div></div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold">Recent performance</h2>
            <div className="mt-5 space-y-3">{learning.attempts.map((attempt) => <Link key={attempt.id} href={`/test-series/results/${attempt.id}`} className="block rounded-md border border-white/10 bg-slate-950/60 p-4"><div className="font-semibold">{(Array.isArray(attempt.mock_tests) ? attempt.mock_tests[0]?.title : attempt.mock_tests?.title) || "Mock test"}</div><div className="mt-1 text-sm text-slate-400">{attempt.correct_answers}/{attempt.total_questions} correct · {attempt.score_percent}% accuracy</div></Link>)}{learning.attempts.length === 0 ? <p className="text-sm text-slate-400">Attempts will appear after your first mock test.</p> : null}</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold">Weak topic detection</h2>
            <div className="mt-5 space-y-3">{learning.weakTopics.map((topic) => <div key={topic.topicId} className="rounded-md border border-white/10 bg-slate-950/60 p-4"><div className="font-semibold">{topic.topicId === "unmapped" ? "Unmapped topic" : topic.topicId}</div><div className="mt-1 text-sm text-slate-400">{topic.accuracy}% accuracy across {topic.total} questions</div></div>)}{learning.weakTopics.length === 0 ? <p className="text-sm text-slate-400">Weak topics are calculated from saved mock-test answers.</p> : null}</div>
          </div>
        </section>
      </div>
    </main>
  );
}
