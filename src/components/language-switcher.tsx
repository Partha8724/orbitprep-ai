"use client";

import { useMemo, useState } from "react";

const languages = [
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

export function LanguageSwitcher() {
  const [code, setCode] = useState("en");
  const active = useMemo(() => languages.find((language) => language.code === code) || languages[0], [code]);

  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
      <label className="block text-sm font-medium text-slate-200" htmlFor="language">Study language</label>
      <select id="language" value={code} onChange={(event) => setCode(event.target.value)} className="mt-2 w-full rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none">
        {languages.map((language) => <option key={language.code} value={language.code}>{language.label}</option>)}
      </select>
      <p className="mt-3 text-sm leading-6 text-slate-300">{active.home}</p>
    </div>
  );
}
