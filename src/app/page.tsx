"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  ArrowRight,
  Atom,
  Bell,
  BookOpen,
  Brain,
  CheckCircle2,
  Clock3,
  Cpu,
  FileText,
  Globe2,
  GraduationCap,
  IndianRupee,
  Landmark,
  Newspaper,
  Orbit,
  Rocket,
  ScrollText,
  Search,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type TopicIcon =
  | typeof Orbit
  | typeof Globe2
  | typeof Landmark
  | typeof ScrollText
  | typeof Atom
  | typeof Cpu
  | typeof GraduationCap
  | typeof Rocket;

type FeatureIcon =
  | typeof Brain
  | typeof Newspaper
  | typeof FileText
  | typeof Trophy;

type OrbitTopic = {
  label: string;
  icon: TopicIcon;
  color: string;
  x: string;
  y: string;
  size: string;
};

type FeatureCard = {
  icon: FeatureIcon;
  title: string;
  text: string;
};

const examTags = [
  "UPSC",
  "APSC",
  "SSC",
  "Railway",
  "Banking",
  "Police",
  "State PSC",
  "Teaching",
  "Defence",
  "Assam Govt Jobs",
];

const featureCards: FeatureCard[] = [
  {
    icon: Brain,
    title: "AI Exam Mentor",
    text: "Ask anything about syllabus, previous questions, exam patterns, strategy, revision, and subject-wise weak areas.",
  },
  {
    icon: Newspaper,
    title: "Daily Current Affairs PDF",
    text: "Fresh current affairs, objective questions, quick revision notes, and likely exam-focused updates every day.",
  },
  {
    icon: FileText,
    title: "Previous Year Analysis",
    text: "Compare old papers, spot repeated topics, discover pattern shifts, and prepare smarter for every government exam.",
  },
  {
    icon: Trophy,
    title: "Digital Mock Tests",
    text: "Take timed tests, track score instantly, see accuracy, weak sections, and improve step by step.",
  },
];

const studentSupport = [
  "Daily predicted practice questions",
  "Section-wise MCQ practice",
  "AI doubt support",
  "Pattern comparison from previous papers",
  "Technology and trending topics coverage",
  "Exam alerts and notifications",
  "Score tracking dashboard",
  "Personalized revision flow",
];

const modules = [
  {
    title: "Exam Discovery",
    desc: "Find new government exams, notifications, eligibility, important dates, and syllabus in one place.",
  },
  {
    title: "Pattern Intelligence",
    desc: "AI reads previous papers and shows topic frequency, trend shifts, and highly repeated question styles.",
  },
  {
    title: "Student Test Lab",
    desc: "Attempt digital test series, topic tests, full mocks, and receive instant score analysis.",
  },
  {
    title: "Daily Success Engine",
    desc: "Current affairs PDFs, daily quizzes, revision targets, and exam-ready alerts to keep students consistent.",
  },
];

const stats = [
  { value: "199", suffix: "/month", label: "Full premium access" },
  { value: "24/7", suffix: "", label: "AI student support" },
  { value: "100+", suffix: "", label: "Exam categories" },
  { value: "Daily", suffix: "", label: "PDF + tests + updates" },
];

const orbitTopics: OrbitTopic[] = [
  {
    label: "Galaxy",
    icon: Orbit,
    color: "from-fuchsia-400/40 to-violet-500/40",
    x: "8%",
    y: "14%",
    size: "h-20 w-20",
  },
  {
    label: "Earth",
    icon: Globe2,
    color: "from-cyan-400/40 to-blue-500/40",
    x: "80%",
    y: "18%",
    size: "h-24 w-24",
  },
  {
    label: "Economy",
    icon: Landmark,
    color: "from-emerald-400/40 to-teal-500/40",
    x: "18%",
    y: "68%",
    size: "h-20 w-20",
  },
  {
    label: "History",
    icon: ScrollText,
    color: "from-amber-400/40 to-orange-500/40",
    x: "82%",
    y: "70%",
    size: "h-20 w-20",
  },
  {
    label: "Science",
    icon: Atom,
    color: "from-pink-400/40 to-rose-500/40",
    x: "50%",
    y: "8%",
    size: "h-16 w-16",
  },
  {
    label: "Tech",
    icon: Cpu,
    color: "from-sky-400/40 to-indigo-500/40",
    x: "6%",
    y: "42%",
    size: "h-16 w-16",
  },
  {
    label: "GK",
    icon: GraduationCap,
    color: "from-violet-400/40 to-fuchsia-500/40",
    x: "88%",
    y: "45%",
    size: "h-16 w-16",
  },
  {
    label: "Future",
    icon: Rocket,
    color: "from-cyan-400/40 to-violet-500/40",
    x: "50%",
    y: "86%",
    size: "h-16 w-16",
  },
];

function FloatingBook({
  className = "",
  delay = 0,
  rotate = 0,
}: {
  className?: string;
  delay?: number;
  rotate?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay }}
      className={`absolute ${className}`}
    >
      <motion.div
        animate={{ y: [0, -18, 0], rotate: [rotate, rotate + 3, rotate] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="relative h-28 w-20 rounded-[20px] border border-white/20 bg-gradient-to-br from-fuchsia-400/80 via-violet-500/80 to-cyan-400/80 p-[2px] shadow-[0_25px_60px_rgba(168,85,247,0.25)]"
      >
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[18px] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),rgba(15,23,42,0.88)_42%,rgba(2,6,23,0.95)_100%)] backdrop-blur-xl">
          <div className="absolute left-2 top-2 h-5 w-8 rounded-full bg-white/15 blur-md" />
          <div className="absolute inset-x-3 bottom-2 h-3 rounded-full bg-cyan-300/10 blur-md" />
          <BookOpen className="relative z-10 h-9 w-9 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.28)]" />
          <div className="absolute inset-1 rounded-[16px] border border-white/10" />
        </div>
        <div className="absolute -right-1 top-3 h-20 w-2 rounded-full bg-white/25" />
      </motion.div>
    </motion.div>
  );
}

function MovingRibbon({
  top,
  speed = 24,
  reverse = false,
  label = "",
}: {
  top: string;
  speed?: number;
  reverse?: boolean;
  label?: string;
}) {
  return (
    <div className="absolute left-0 right-0 overflow-hidden" style={{ top }}>
      <motion.div
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
        className="flex w-[200%] gap-4"
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="flex min-w-max items-center gap-2 rounded-full border border-cyan-300/20 bg-white/10 px-5 py-2 text-sm font-medium text-cyan-100 backdrop-blur-md"
          >
            <Sparkles className="h-4 w-4" />
            {label}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function OrbitSubject({
  item,
  index = 0,
  scrollYProgress,
}: {
  item: OrbitTopic;
  index?: number;
  scrollYProgress: MotionValue<number>;
}) {
  const Icon = item.icon;
  const yDrift = useTransform(
    scrollYProgress,
    [0, 1],
    [0, index % 2 === 0 ? -140 : 140]
  );
  const xDrift = useTransform(
    scrollYProgress,
    [0, 1],
    [0, index % 2 === 0 ? 60 : -60]
  );

  return (
    <motion.div
      style={{ left: item.x, top: item.y, y: yDrift, x: xDrift }}
      className="pointer-events-none absolute z-0 hidden lg:block"
    >
      <motion.div
        animate={{
          y: [0, -16, 0],
          rotate: [0, index % 2 === 0 ? 12 : -12, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{ repeat: Infinity, duration: 7 + index, ease: "easeInOut" }}
        className={`relative ${item.size} rounded-full border border-white/15 bg-gradient-to-br ${item.color} p-[1px] shadow-[0_18px_70px_rgba(59,130,246,0.18)]`}
      >
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[radial-gradient(circle_at_30%_28%,rgba(255,255,255,0.16),rgba(15,23,42,0.9)_45%,rgba(2,6,23,0.98)_100%)] backdrop-blur-2xl">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 14 + index, ease: "linear" }}
            className="absolute inset-[12%] rounded-full border border-dashed border-white/10"
          />
          <div className="absolute left-[18%] top-[18%] h-4 w-4 rounded-full bg-white/15 blur-sm" />
          <div className="absolute right-[18%] bottom-[18%] h-4 w-4 rounded-full bg-cyan-300/15 blur-sm" />
          <Icon className="relative z-10 h-8 w-8 text-white/90 drop-shadow-[0_0_10px_rgba(255,255,255,0.25)]" />
          <div className="absolute inset-2 rounded-full border border-white/10" />
          <div className="absolute -bottom-9 rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs font-medium text-slate-200 shadow-lg backdrop-blur-md">
            {item.label}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ScrollFloatingBanner({
  label,
  className = "",
  delay = 0,
  direction = 1,
}: {
  label: string;
  className?: string;
  delay?: number;
  direction?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className={`absolute ${className}`}
    >
      <motion.div
        animate={{
          x: [0, 18 * direction, 0],
          y: [0, -10, 0],
          rotate: [0, 3 * direction, 0],
        }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium tracking-wide text-white shadow-xl backdrop-blur-xl"
      >
        {label}
      </motion.div>
    </motion.div>
  );
}

function OrbitalRing({
  className = "",
  duration = 18,
}: {
  className?: string;
  duration?: number;
}) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration, ease: "linear" }}
      className={`absolute rounded-full border border-dashed border-cyan-300/15 ${className}`}
    />
  );
}

function ParallaxPlanet({
  icon: Icon,
  label,
  className = "",
  gradient = "from-cyan-400/30 to-blue-500/30",
  y,
  x,
  rotate,
}: {
  icon: TopicIcon;
  label: string;
  className?: string;
  gradient?: string;
  y: MotionValue<number>;
  x: MotionValue<number>;
  rotate: MotionValue<number>;
}) {
  return (
    <motion.div style={{ y, x, rotate }} className={`absolute ${className}`}>
      <motion.div
        animate={{ scale: [1, 1.06, 1], y: [0, -12, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className={`relative h-full w-full rounded-full border border-white/20 bg-gradient-to-br ${gradient} p-[1px] shadow-[0_25px_80px_rgba(59,130,246,0.22)]`}
      >
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[radial-gradient(circle_at_30%_28%,rgba(255,255,255,0.18),rgba(15,23,42,0.92)_45%,rgba(2,6,23,0.98)_100%)] backdrop-blur-2xl">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="absolute inset-[10%] rounded-full border border-dashed border-white/10"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
            className="absolute inset-[22%] rounded-full border border-white/10"
          />
          <div className="absolute left-[20%] top-[18%] h-6 w-6 rounded-full bg-white/20 blur-md" />
          <div className="absolute right-[18%] bottom-[20%] h-5 w-5 rounded-full bg-cyan-300/20 blur-md" />
          <div className="absolute inset-x-[18%] bottom-[16%] h-10 rounded-full bg-white/5 blur-lg" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
            className="absolute inset-0"
          >
            <div className="absolute left-1/2 top-[4%] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-white/80 shadow-[0_0_16px_rgba(255,255,255,0.85)]" />
          </motion.div>
          <div className="absolute inset-[8%] rounded-full border border-white/10" />
          <Icon className="relative z-10 h-10 w-10 text-white/90 drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(34,211,238,0.18),transparent_35%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(255,255,255,0.12),transparent_30%)]" />
          <div className="absolute -inset-4 rounded-full bg-cyan-400/10 blur-2xl" />
          <div className="absolute -inset-6 rounded-full bg-violet-500/10 blur-3xl" />
          <div className="absolute -bottom-10 rounded-full border border-white/10 bg-slate-950/75 px-3 py-1 text-xs text-slate-200 shadow-xl backdrop-blur-xl">
            {label}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ScrollStageCard({
  title,
  desc,
  className = "",
  y,
  delay = 0,
}: {
  title: string;
  desc: string;
  className?: string;
  y: MotionValue<number>;
  delay?: number;
}) {
  return (
    <motion.div
      style={{ y }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay }}
      className={`rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl ${className}`}
    >
      <div className="text-lg font-semibold text-white">{title}</div>
      <p className="mt-2 text-sm leading-7 text-slate-300">{desc}</p>
    </motion.div>
  );
}

function IntroOverlay({ show }: { show: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: show ? 1 : 0, pointerEvents: show ? "auto" : "none" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-[#040714]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(34,211,238,0.18),transparent_22%),radial-gradient(circle_at_52%_55%,rgba(168,85,247,0.16),transparent_30%),radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.12),transparent_38%)]" />
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-white/80"
          style={{ left: `${(i * 13) % 100}%`, top: `${(i * 23) % 100}%` }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.6, 1], y: [0, -18, 0] }}
          transition={{
            repeat: Infinity,
            duration: 3 + (i % 5),
            delay: i * 0.08,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        initial={{ scale: 0.86, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative flex flex-col items-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          className="absolute h-40 w-40 rounded-full border border-dashed border-cyan-300/20"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
          className="absolute h-56 w-56 rounded-full border border-white/10"
        />
        <motion.div
          animate={{
            y: [0, -8, 0],
            boxShadow: [
              "0 0 30px rgba(34,211,238,0.18)",
              "0 0 60px rgba(168,85,247,0.28)",
              "0 0 30px rgba(34,211,238,0.18)",
            ],
          }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
          className="relative z-10 flex h-28 w-28 items-center justify-center rounded-[32px] border border-white/15 bg-gradient-to-br from-cyan-400/20 via-blue-500/20 to-violet-500/20 p-[1px]"
        >
          <div className="flex h-full w-full items-center justify-center rounded-[30px] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),rgba(15,23,42,0.9)_45%,rgba(2,6,23,0.98)_100%)] backdrop-blur-2xl">
            <Brain className="h-12 w-12 text-white drop-shadow-[0_0_14px_rgba(255,255,255,0.35)]" />
          </div>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-10 text-center text-4xl font-semibold tracking-tight text-white md:text-5xl"
        >
          OrbitPrep AI
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-3 text-center text-sm uppercase tracking-[0.28em] text-cyan-200/90"
        >
          Initializing Future Learning Universe
        </motion.p>
        <div className="mt-8 h-2 w-64 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: ["-100%", "0%"] }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
            className="h-full w-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const heroTiltRef = useRef<HTMLDivElement | null>(null);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 2600);
    return () => clearTimeout(timer);
  }, []);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    mass: 0.3,
  });

  const heroY = useTransform(smoothProgress, [0, 1], [0, -180]);
  const heroRotate = useTransform(smoothProgress, [0, 1], [0, 10]);
  const heroScale = useTransform(smoothProgress, [0, 1], [1, 0.92]);

  const earthY = useTransform(smoothProgress, [0, 1], [0, -220]);
  const earthX = useTransform(smoothProgress, [0, 1], [0, -50]);
  const earthRotate = useTransform(smoothProgress, [0, 1], [0, 90]);

  const galaxyY = useTransform(smoothProgress, [0, 1], [0, 180]);
  const galaxyX = useTransform(smoothProgress, [0, 1], [0, 60]);
  const galaxyRotate = useTransform(smoothProgress, [0, 1], [0, -120]);

  const historyY = useTransform(smoothProgress, [0, 1], [0, -140]);
  const historyX = useTransform(smoothProgress, [0, 1], [0, 40]);
  const historyRotate = useTransform(smoothProgress, [0, 1], [0, 45]);

  const scienceY = useTransform(smoothProgress, [0, 1], [0, 200]);
  const scienceX = useTransform(smoothProgress, [0, 1], [0, -55]);
  const scienceRotate = useTransform(smoothProgress, [0, 1], [0, 180]);

  const stageCardOneY = useTransform(smoothProgress, [0, 1], [0, -70]);
  const stageCardTwoY = useTransform(smoothProgress, [0, 1], [0, -20]);
  const stageCardThreeY = useTransform(smoothProgress, [0, 1], [0, 60]);

  const economyBadgeY = useTransform(smoothProgress, [0, 1], [0, -90]);
  const gkBadgeY = useTransform(smoothProgress, [0, 1], [0, 90]);
  const currentAffairsBadgeY = useTransform(smoothProgress, [0, 1], [0, -60]);

  const featureBookY = useTransform(smoothProgress, [0, 1], [0, -100]);
  const featureBookRotate = useTransform(smoothProgress, [0, 1], [0, -4]);

  const featureEconomyY = useTransform(smoothProgress, [0, 1], [0, 80]);
  const featureEconomyRotate = useTransform(smoothProgress, [0, 1], [0, 6]);

  const featureCardY = useTransform(smoothProgress, [0, 1], [0, -120]);
  const featureCardX = useTransform(smoothProgress, [0, 1], [0, 20]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, {
    stiffness: 120,
    damping: 18,
    mass: 0.4,
  });
  const smoothMouseY = useSpring(mouseY, {
    stiffness: 120,
    damping: 18,
    mass: 0.4,
  });

  const heroMouseRotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-14, 14]);
  const heroMouseRotateX = useTransform(smoothMouseY, [-0.5, 0.5], [14, -14]);
  const heroMouseShiftX = useTransform(smoothMouseX, [-0.5, 0.5], [-18, 18]);
  const heroMouseShiftY = useTransform(smoothMouseY, [-0.5, 0.5], [-12, 12]);

  const layerOneX = useTransform(smoothMouseX, [-0.5, 0.5], [-30, 30]);
  const layerOneY = useTransform(smoothMouseY, [-0.5, 0.5], [-20, 20]);
  const layerTwoX = useTransform(smoothMouseX, [-0.5, 0.5], [24, -24]);
  const layerTwoY = useTransform(smoothMouseY, [-0.5, 0.5], [18, -18]);
  const layerThreeX = useTransform(smoothMouseX, [-0.5, 0.5], [-16, 16]);
  const layerThreeY = useTransform(smoothMouseY, [-0.5, 0.5], [12, -12]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const bounds = heroTiltRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const px = (event.clientX - bounds.left) / bounds.width - 0.5;
    const py = (event.clientY - bounds.top) / bounds.height - 0.5;
    mouseX.set(px);
    mouseY.set(py);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const particles = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        left: `${(i * 11) % 100}%`,
        top: `${(i * 17) % 100}%`,
        delay: i * 0.15,
        duration: 5 + (i % 5),
      })),
    []
  );

  return (
    <>
      <IntroOverlay show={showIntro} />

      <motion.div
        initial={{ opacity: 0, scale: 0.985 }}
        animate={{ opacity: showIntro ? 0 : 1, scale: showIntro ? 0.985 : 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="min-h-screen overflow-hidden bg-[#050816] text-white"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.16),transparent_22%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,0.18),transparent_24%),radial-gradient(circle_at_50%_80%,rgba(59,130,246,0.12),transparent_30%)]" />
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:70px_70px]" />

        <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/55 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 shadow-lg shadow-cyan-500/20">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-lg font-semibold tracking-wide">OrbitPrep AI</div>
                <div className="text-xs text-slate-300">
                  Future-ready government exam platform
                </div>
              </div>
            </div>

            <nav className="hidden items-center gap-6 text-sm text-slate-200 lg:flex">
              <a href="#features" className="transition hover:text-white">
                Features
              </a>
              <a href="#exams" className="transition hover:text-white">
                Exams
              </a>
              <a href="#tests" className="transition hover:text-white">
                Tests
              </a>
              <a href="#pricing" className="transition hover:text-white">
                Pricing
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <Button
                asChild
                variant="ghost"
                className="hidden rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 lg:inline-flex"
              >
                <a href="#tests">Student Login</a>
              </Button>
              <Button asChild className="rounded-xl bg-white text-slate-950 hover:bg-slate-200">
                <a href="#features">Start Learning</a>
              </Button>
            </div>
          </div>
        </header>

        <main className="relative z-10">
          <section className="relative mx-auto max-w-7xl px-6 pb-24 pt-10 lg:px-8 lg:pb-32 lg:pt-16">
            {orbitTopics.map((item, index) => (
              <OrbitSubject
                key={item.label}
                item={item}
                index={index}
                scrollYProgress={smoothProgress}
              />
            ))}

            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="pointer-events-none absolute hidden lg:block"
                style={{ left: particle.left, top: particle.top }}
                animate={{
                  y: [0, -24, 0],
                  opacity: [0.25, 0.8, 0.25],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: particle.duration,
                  delay: particle.delay,
                  ease: "easeInOut",
                }}
              >
                <div className="h-1.5 w-1.5 rounded-full bg-white/80 shadow-[0_0_18px_rgba(255,255,255,0.8)]" />
              </motion.div>
            ))}

            <ScrollFloatingBanner
              label="GALAXY LEARNING MODE"
              className="left-[10%] top-[22%] hidden lg:block"
              delay={0.2}
              direction={1}
            />
            <ScrollFloatingBanner
              label="ECONOMY • HISTORY • GK"
              className="right-[12%] top-[26%] hidden lg:block"
              delay={0.35}
              direction={-1}
            />
            <ScrollFloatingBanner
              label="SCIENCE • TECH • CURRENT AFFAIRS"
              className="left-[8%] bottom-[18%] hidden lg:block"
              delay={0.45}
              direction={1}
            />
            <ScrollFloatingBanner
              label="SMART PATTERN ANALYSIS"
              className="right-[8%] bottom-[14%] hidden lg:block"
              delay={0.55}
              direction={-1}
            />
            <MovingRibbon
              top="10%"
              label="Daily Current Affairs • AI Analysis • Exam Alerts • Mock Tests"
            />
            <MovingRibbon
              top="78%"
              speed={30}
              reverse
              label="UPSC • APSC • SSC • Banking • Railway • State Exams • Practice PDFs"
            />

            <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="relative">
                <Badge className="mb-6 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-cyan-200 hover:bg-cyan-400/10">
                  India-focused AI exam platform
                </Badge>

                <motion.h1
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight text-white md:text-6xl xl:text-7xl"
                >
                  The ultra-modern AI website that helps students crack
                  <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">
                    {" "}
                    government exams
                  </span>
                  faster.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.1 }}
                  className="mt-6 max-w-2xl text-lg leading-8 text-slate-300"
                >
                  One intelligent learning platform for UPSC, APSC, and other government exams.
                  Students get previous year paper analysis, daily current affairs PDFs, trending
                  question sets, AI study support, mock tests, digital scoring, and strong
                  preparation guidance for just ₹199 per month.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="mt-8 flex flex-wrap gap-4"
                >
                  <Button
                    asChild
                    size="lg"
                    className="rounded-2xl bg-white px-7 text-slate-950 hover:bg-slate-100"
                  >
                    <a href="#features">
                      Explore Platform <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="ghost"
                    className="rounded-2xl border border-white/15 bg-white/5 px-7 text-white hover:bg-white/10"
                  >
                    <a href="#tests">Watch Demo</a>
                  </Button>
                </motion.div>

                <div className="mt-10 flex flex-wrap gap-3">
                  {[
                    "Galaxy UI",
                    "Earth Knowledge",
                    "Economy Radar",
                    "History Vault",
                    "Science Pulse",
                    "GK Stream",
                  ].map((topic) => (
                    <motion.div
                      key={topic}
                      animate={{ y: [0, -6, 0] }}
                      transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                      className="rounded-full border border-cyan-300/15 bg-gradient-to-r from-cyan-400/10 to-violet-500/10 px-4 py-2 text-xs text-cyan-100 backdrop-blur-md"
                    >
                      {topic}
                    </motion.div>
                  ))}
                  {examTags.map((tag) => (
                    <div
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 backdrop-blur-md"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>

              <div
                ref={heroTiltRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative min-h-[620px]"
              >
                <motion.div style={{ x: layerOneX, y: layerOneY }} className="absolute inset-0 pointer-events-none">
                  <FloatingBook className="left-2 top-10" delay={0.2} rotate={-8} />
                </motion.div>
                <motion.div style={{ x: layerTwoX, y: layerTwoY }} className="absolute inset-0 pointer-events-none">
                  <FloatingBook className="right-4 top-2" delay={0.35} rotate={8} />
                </motion.div>
                <motion.div style={{ x: layerThreeX, y: layerThreeY }} className="absolute inset-0 pointer-events-none">
                  <FloatingBook className="left-10 bottom-20" delay={0.45} rotate={-12} />
                </motion.div>
                <motion.div style={{ x: layerTwoX, y: layerOneY }} className="absolute inset-0 pointer-events-none">
                  <FloatingBook className="right-12 bottom-8" delay={0.55} rotate={10} />
                </motion.div>

                <motion.div
                  style={{
                    y: heroY,
                    x: heroMouseShiftX,
                    rotate: heroRotate,
                    scale: heroScale,
                    rotateX: heroMouseRotateX,
                    rotateY: heroMouseRotateY,
                    transformStyle: "preserve-3d",
                  }}
                  animate={{ rotateY: [0, 6, 0, -6, 0], rotateX: [0, 4, 0, -4, 0], y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                  className="relative mx-auto mt-20 w-full max-w-[520px] rounded-[34px] border border-white/15 bg-white/10 p-4 shadow-[0_20px_100px_rgba(59,130,246,0.25)] backdrop-blur-2xl"
                >
                  <div
                    className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#081124]"
                    style={{ transform: "translateZ(40px)" }}
                  >
                    <motion.div style={{ x: layerThreeX, y: layerThreeY }} className="absolute inset-0 pointer-events-none">
                      <OrbitalRing className="-left-14 -top-14 h-40 w-40" duration={26} />
                    </motion.div>
                    <motion.div style={{ x: layerTwoX, y: layerOneY }} className="absolute inset-0 pointer-events-none">
                      <OrbitalRing className="right-4 top-6 h-24 w-24" duration={16} />
                    </motion.div>
                    <motion.div style={{ x: layerOneX, y: layerTwoY }} className="absolute inset-0 pointer-events-none">
                      <OrbitalRing className="bottom-10 left-10 h-20 w-20" duration={12} />
                    </motion.div>

                    <motion.div
                      style={{ x: layerOneX, y: layerOneY }}
                      animate={{ opacity: [0.25, 0.5, 0.25], scale: [1, 1.04, 1] }}
                      transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                      className="absolute -right-10 top-24 h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl"
                    />
                    <motion.div
                      style={{ x: layerTwoX, y: layerThreeY }}
                      animate={{ opacity: [0.2, 0.45, 0.2], scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                      className="absolute bottom-8 left-6 h-28 w-28 rounded-full bg-violet-500/10 blur-3xl"
                    />

                    <motion.div style={{ x: layerThreeX, y: layerThreeY }} className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                      <div>
                        <div className="text-sm text-slate-400">Student Dashboard</div>
                        <div className="text-xl font-semibold">AI Preparation Command Center</div>
                      </div>
                      <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                        Live Support Active
                      </div>
                    </motion.div>

                    <motion.div style={{ x: heroMouseShiftX, y: heroMouseShiftY }} className="grid gap-4 p-5">
                      <div className="grid gap-4 md:grid-cols-2">
                        <Card className="rounded-3xl border-white/10 bg-white/5 text-white backdrop-blur-xl">
                          <CardContent className="p-5">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-sm text-slate-400">Today’s Focus</div>
                                <div className="mt-1 text-2xl font-semibold">APSC Polity</div>
                              </div>
                              <Brain className="h-9 w-9 text-cyan-300" />
                            </div>
                            <div className="mt-4 h-2 rounded-full bg-white/10">
                              <div className="h-2 w-[76%] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
                            </div>
                            <div className="mt-2 text-sm text-slate-300">76% completion target</div>
                          </CardContent>
                        </Card>

                        <Card className="rounded-3xl border-white/10 bg-white/5 text-white backdrop-blur-xl">
                          <CardContent className="p-5">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-sm text-slate-400">Mock Test Score</div>
                                <div className="mt-1 text-2xl font-semibold">88 / 100</div>
                              </div>
                              <Trophy className="h-9 w-9 text-violet-300" />
                            </div>
                            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                              <div className="rounded-2xl bg-white/5 p-3">
                                <div className="text-slate-400">Accuracy</div>
                                <div className="mt-1 text-base font-semibold">91%</div>
                              </div>
                              <div className="rounded-2xl bg-white/5 p-3">
                                <div className="text-slate-400">Rank</div>
                                <div className="mt-1 text-base font-semibold">#42</div>
                              </div>
                              <div className="rounded-2xl bg-white/5 p-3">
                                <div className="text-slate-400">Time</div>
                                <div className="mt-1 text-base font-semibold">39m</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card className="rounded-3xl border-white/10 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 text-white">
                        <CardContent className="p-5">
                          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                              <div className="text-sm text-slate-300">AI Recommendation</div>
                              <div className="mt-1 text-xl font-semibold">
                                Highly repeated question trend found in History + Economy
                              </div>
                            </div>
                            <Button asChild className="rounded-2xl bg-white text-slate-950 hover:bg-slate-100">
                              <a href="#pricing">Open PDF</a>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="grid gap-4 md:grid-cols-[1fr_0.9fr]">
                        <Card className="rounded-3xl border-white/10 bg-white/5 text-white">
                          <CardContent className="p-5">
                            <div className="mb-4 flex items-center gap-2 text-sm text-slate-300">
                              <Search className="h-4 w-4" />
                              Ask your AI study agent
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-[#0a1731] p-4 text-slate-200">
                              Compare last 10 years of APSC papers and tell me the most repeated polity chapters.
                            </div>
                            <div className="mt-3 rounded-2xl bg-white/5 p-4 text-sm text-slate-300">
                              Found repeated weight in Constitution, Governor, Fundamental Rights,
                              Panchayati Raj, and Assam governance topics.
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="rounded-3xl border-white/10 bg-white/5 text-white">
                          <CardContent className="space-y-3 p-5">
                            <div className="flex items-center justify-between">
                              <div className="text-sm text-slate-400">Today’s live feed</div>
                              <Bell className="h-4 w-4 text-cyan-300" />
                            </div>
                            {[
                              "New Assam recruitment alert added",
                              "Current affairs PDF uploaded",
                              "Technology trend questions updated",
                              "New mock test unlocked",
                            ].map((item) => (
                              <div
                                key={item}
                                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200"
                              >
                                {item}
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="relative mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
            <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-[#08111f] via-[#09152a] to-[#0a0f1c] p-8 md:p-12">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.12),transparent_25%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.14),transparent_25%),radial-gradient(circle_at_50%_80%,rgba(59,130,246,0.10),transparent_30%)]" />
              <OrbitalRing className="left-[8%] top-[12%] h-48 w-48" duration={22} />
              <OrbitalRing className="right-[10%] top-[18%] h-56 w-56" duration={30} />
              <OrbitalRing className="left-[40%] bottom-[8%] h-36 w-36" duration={18} />

              <ParallaxPlanet
                icon={Globe2}
                label="Earth Knowledge"
                className="left-[4%] top-[18%] hidden h-36 w-36 lg:block"
                gradient="from-cyan-400/30 to-blue-500/30"
                y={earthY}
                x={earthX}
                rotate={earthRotate}
              />
              <ParallaxPlanet
                icon={Orbit}
                label="Galaxy Motion"
                className="right-[6%] top-[8%] hidden h-32 w-32 lg:block"
                gradient="from-fuchsia-400/30 to-violet-500/30"
                y={galaxyY}
                x={galaxyX}
                rotate={galaxyRotate}
              />
              <ParallaxPlanet
                icon={ScrollText}
                label="History Vault"
                className="right-[12%] bottom-[18%] hidden h-32 w-32 lg:block"
                gradient="from-amber-400/30 to-orange-500/30"
                y={historyY}
                x={historyX}
                rotate={historyRotate}
              />
              <ParallaxPlanet
                icon={Atom}
                label="Science Pulse"
                className="left-[16%] bottom-[10%] hidden h-32 w-32 lg:block"
                gradient="from-pink-400/30 to-rose-500/30"
                y={scienceY}
                x={scienceX}
                rotate={scienceRotate}
              />

              <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                <div>
                  <Badge className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-cyan-200 hover:bg-cyan-400/10">
                    Full parallax learning universe
                  </Badge>
                  <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white md:text-5xl">
                    Scroll through a 3D education universe where every subject moves in layers.
                  </h2>
                  <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                    Galaxy, Earth, History, Science, Economy, GK, and AI sections now feel alive
                    with depth. As students scroll, objects shift at different speeds for a premium
                    futuristic experience.
                  </p>
                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <ScrollStageCard
                      title="Deep subject layers"
                      desc="Foreground and background objects move differently to create a true premium parallax feel."
                      y={stageCardOneY}
                      delay={0.1}
                    />
                    <ScrollStageCard
                      title="Exam topics in motion"
                      desc="History, Economy, GK, and Science are presented like an interactive knowledge galaxy."
                      y={stageCardTwoY}
                      delay={0.2}
                    />
                    <ScrollStageCard
                      title="Scroll-reactive dashboard"
                      desc="The AI dashboard now shifts naturally as the page moves, making the hero section feel cinematic."
                      className="sm:col-span-2"
                      y={stageCardThreeY}
                      delay={0.3}
                    />
                  </div>
                </div>

                <div className="relative min-h-[420px]">
                  <motion.div
                    style={{ y: economyBadgeY }}
                    className="absolute left-[18%] top-[12%] hidden rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs text-cyan-100 backdrop-blur-xl lg:block"
                  >
                    ECONOMY INTELLIGENCE
                  </motion.div>
                  <motion.div
                    style={{ y: gkBadgeY }}
                    className="absolute right-[16%] top-[28%] hidden rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs text-violet-100 backdrop-blur-xl lg:block"
                  >
                    GK TREND RADAR
                  </motion.div>
                  <motion.div
                    style={{ y: currentAffairsBadgeY }}
                    className="absolute left-[12%] bottom-[20%] hidden rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs text-emerald-100 backdrop-blur-xl lg:block"
                  >
                    CURRENT AFFAIRS STREAM
                  </motion.div>

                  <motion.div
                    style={{ y: featureBookY, rotate: featureBookRotate }}
                    className="absolute left-[10%] top-[22%] h-44 w-36 rounded-[30px] border border-white/15 bg-gradient-to-br from-fuchsia-400/20 to-violet-500/20 p-[1px] shadow-[0_25px_80px_rgba(168,85,247,0.22)]"
                  >
                    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[30px] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.16),rgba(15,23,42,0.9)_42%,rgba(2,6,23,0.98)_100%)] backdrop-blur-2xl">
                      <div className="absolute left-3 top-3 h-6 w-10 rounded-full bg-white/15 blur-md" />
                      <div className="absolute inset-x-4 bottom-3 h-4 rounded-full bg-fuchsia-300/10 blur-md" />
                      <BookOpen className="relative z-10 h-10 w-10 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.28)]" />
                    </div>
                  </motion.div>

                  <motion.div
                    style={{ y: featureEconomyY, rotate: featureEconomyRotate }}
                    className="absolute right-[14%] top-[18%] h-36 w-36 rounded-full border border-white/15 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 p-[1px] shadow-[0_25px_80px_rgba(34,211,238,0.2)]"
                  >
                    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[radial-gradient(circle_at_30%_24%,rgba(255,255,255,0.16),rgba(15,23,42,0.9)_45%,rgba(2,6,23,0.98)_100%)] backdrop-blur-2xl">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
                        className="absolute inset-[14%] rounded-full border border-dashed border-white/10"
                      />
                      <div className="absolute left-[18%] top-[18%] h-5 w-5 rounded-full bg-white/15 blur-sm" />
                      <Landmark className="relative z-10 h-10 w-10 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.28)]" />
                    </div>
                  </motion.div>

                  <motion.div
                    style={{ y: featureCardY, x: featureCardX }}
                    className="absolute bottom-[8%] left-[28%] h-36 w-[52%] rounded-[30px] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl"
                  >
                    <div className="text-sm text-slate-400">Parallax AI Layer</div>
                    <div className="mt-2 text-2xl font-semibold text-white">
                      Students feel motion, depth, and direction.
                    </div>
                    <p className="mt-3 text-sm leading-7 text-slate-300">
                      Use this section for featured exams, live alerts, or premium student
                      onboarding highlights.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
            <div className="grid gap-4 rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:grid-cols-4">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[26px] border border-white/10 bg-slate-950/40 p-5"
                >
                  <div className="text-3xl font-semibold text-white">
                    {item.value}
                    <span className="text-base text-cyan-200">{item.suffix}</span>
                  </div>
                  <div className="mt-2 text-sm text-slate-300">{item.label}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="features" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
            <div className="max-w-2xl">
              <Badge className="rounded-full border border-violet-400/30 bg-violet-400/10 px-4 py-1 text-violet-200 hover:bg-violet-400/10">
                Platform features
              </Badge>
              <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
                Everything a serious government exam student needs in one future-first platform.
              </h2>
              <p className="mt-4 text-lg text-slate-300">
                Built to reduce confusion, save time, and increase preparation quality with
                AI-powered guidance and structured practice.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {featureCards.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card
                    key={feature.title}
                    className="rounded-[28px] border-white/10 bg-white/5 text-white backdrop-blur-xl"
                  >
                    <CardContent className="p-6">
                      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20">
                        <Icon className="h-7 w-7 text-cyan-200" />
                      </div>
                      <h3 className="text-xl font-semibold">{feature.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-300">{feature.text}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          <section id="exams" className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
              <Card className="rounded-[32px] border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 text-white">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-semibold">Core learning modules</h3>
                  <div className="mt-6 space-y-4">
                    {modules.map((item, i) => (
                      <div
                        key={item.title}
                        className="rounded-[24px] border border-white/10 bg-white/5 p-5"
                      >
                        <div className="mb-2 flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-cyan-200">
                            0{i + 1}
                          </div>
                          <div className="text-lg font-medium">{item.title}</div>
                        </div>
                        <p className="text-sm leading-7 text-slate-300">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[32px] border-white/10 bg-white/5 text-white">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-semibold">Student support promise</h3>
                  <p className="mt-3 text-slate-300">
                    The platform is designed so every student gets daily guidance, strong practice
                    material, and a feeling of constant support.
                  </p>
                  <div className="mt-6 grid gap-3 md:grid-cols-2">
                    {studentSupport.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                      >
                        <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-300" />
                        <span className="text-sm text-slate-200">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section id="tests" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
            <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <Badge className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1 text-emerald-200 hover:bg-emerald-400/10">
                  Test & score engine
                </Badge>
                <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
                  Daily tests, instant scoring, and smart feedback that keeps students improving.
                </h2>
                <p className="mt-4 text-lg leading-8 text-slate-300">
                  Students attempt topic tests, section tests, full mocks, and receive digital
                  scores, rank insights, and personalized improvement paths.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                    <Clock3 className="h-7 w-7 text-cyan-300" />
                    <div className="mt-3 text-lg font-semibold">Timed Practice</div>
                    <p className="mt-2 text-sm text-slate-300">
                      Train with real exam pressure and finish faster with better accuracy.
                    </p>
                  </div>
                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                    <Users className="h-7 w-7 text-violet-300" />
                    <div className="mt-3 text-lg font-semibold">Leaderboard Feel</div>
                    <p className="mt-2 text-sm text-slate-300">
                      See performance benchmarks and stay motivated with measurable progress.
                    </p>
                  </div>
                </div>
              </div>

              <Card className="rounded-[36px] border-white/10 bg-white/5 text-white backdrop-blur-xl">
                <CardContent className="p-6">
                  <div className="rounded-[28px] border border-white/10 bg-[#091126] p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-slate-400">Mock Exam Interface</div>
                        <div className="text-2xl font-semibold">APSC General Studies Test</div>
                      </div>
                      <div className="rounded-full bg-white/10 px-4 py-2 text-sm">
                        50 Questions
                      </div>
                    </div>
                    <div className="mt-6 space-y-4">
                      {[1, 2, 3].map((n) => (
                        <div
                          key={n}
                          className="rounded-[22px] border border-white/10 bg-white/5 p-4"
                        >
                          <div className="text-sm text-slate-300">Question {n}</div>
                          <div className="mt-2 text-base text-white">
                            Which topic has appeared most repeatedly in recent combined paper
                            trends?
                          </div>
                          <div className="mt-4 grid gap-2 sm:grid-cols-2">
                            {["Polity", "Biology", "Sports", "Cinema"].map((opt) => (
                              <div
                                key={opt}
                                className="rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-slate-200"
                              >
                                {opt}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button className="mt-5 w-full rounded-2xl bg-white text-slate-950 hover:bg-slate-100">
                      Submit Test
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section id="pricing" className="mx-auto max-w-5xl px-6 py-24 lg:px-8">
            <Card className="overflow-hidden rounded-[40px] border-white/10 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-violet-500/10 text-white backdrop-blur-xl">
              <CardContent className="grid gap-8 p-8 md:grid-cols-[1.1fr_0.9fr] md:p-10">
                <div>
                  <Badge className="rounded-full border border-white/15 bg-white/10 px-4 py-1 text-white hover:bg-white/10">
                    Premium membership
                  </Badge>
                  <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
                    Full exam support for just ₹199 per month
                  </h2>
                  <p className="mt-4 text-lg text-slate-200">
                    Affordable subscription built for students who want daily guidance, daily PDFs,
                    AI help, previous paper analysis, and practice tests without confusion.
                  </p>
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {[
                      "All premium PDFs",
                      "Daily current affairs",
                      "Mock tests + score analysis",
                      "AI exam assistant",
                      "Pattern tracking",
                      "Trending question sets",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-sm"
                      >
                        <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[30px] border border-white/15 bg-slate-950/50 p-6 shadow-2xl">
                  <div className="flex items-center gap-2 text-slate-300">
                    <IndianRupee className="h-5 w-5" />
                    Subscription plan
                  </div>
                  <div className="mt-4 flex items-end gap-2">
                    <span className="text-6xl font-semibold">199</span>
                    <span className="pb-2 text-slate-300">/ month</span>
                  </div>
                  <div className="mt-5 rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100">
                    Best for serious students preparing consistently every day.
                  </div>
                  <Button
                    asChild
                    className="mt-6 w-full rounded-2xl bg-white text-slate-950 hover:bg-slate-100"
                  >
                    <a href="#pricing">Get Full Access</a>
                  </Button>
                  <Button
                    asChild
                    variant="ghost"
                    className="mt-3 w-full rounded-2xl border border-white/10 bg-white/5 text-white hover:bg-white/10"
                  >
                    <a href="#features">Try Free Preview</a>
                  </Button>
                  <p className="mt-4 text-xs leading-6 text-slate-400">
                    Add Razorpay or Stripe for payments, auth for student login, and admin panel
                    for exam upload, PDFs, and AI-driven content management.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
            <div className="rounded-[36px] border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl md:p-12">
              <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
                A new-generation website built to help every student move closer to success.
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-300">
                Your main goal is clear: support students fully so they can pass government job
                exams with stronger preparation, better confidence, and daily guided practice. This
                design turns that mission into a premium, modern, attractive platform.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="rounded-2xl bg-white px-7 text-slate-950 hover:bg-slate-100"
                >
                  <a href="#features">Build This Website</a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="rounded-2xl border border-white/10 bg-white/5 px-7 text-white hover:bg-white/10"
                >
                  <a href="#tests">Create Admin Dashboard</a>
                </Button>
              </div>
            </div>
          </section>
        </main>
      </motion.div>
    </>
  );
}