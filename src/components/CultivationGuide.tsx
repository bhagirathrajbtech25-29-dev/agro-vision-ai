import React, { useState } from 'react';
import { 
  BookOpen, 
  Sprout, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  HelpCircle, 
  Search, 
  Send, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Droplets,
  Layers
} from 'lucide-react';
import { TOMATO_CULTIVATION_GUIDE, CultivationPhase } from '../data/cultivationGuide';
import { ResearchCitation } from '../types';

interface CultivationGuideProps {
  lang: 'en' | 'hi';
}

export const CultivationGuide: React.FC<CultivationGuideProps> = ({ lang }) => {
  const [activePhaseId, setActivePhaseId] = useState<string>(TOMATO_CULTIVATION_GUIDE[0].id);
  
  // Interactive Agronomic Expert Query State
  const [query, setQuery] = useState('');
  const [isQuerying, setIsQuerying] = useState(false);
  const [expertAnswer, setExpertAnswer] = useState<string | null>(null);
  const [answerCitations, setAnswerCitations] = useState<ResearchCitation[]>([]);

  const activePhase = TOMATO_CULTIVATION_GUIDE.find((p) => p.id === activePhaseId) || TOMATO_CULTIVATION_GUIDE[0];

  const handleAskExpert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsQuerying(true);
    setExpertAnswer(null);

    try {
      const res = await fetch('/api/expert-advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, topic: activePhase.stageTitle }),
      });
      const data = await res.json();
      setExpertAnswer(data.answer);
      setAnswerCitations(data.citations || []);
    } catch (err) {
      console.error('Expert advisory error:', err);
      setExpertAnswer('Unable to fetch live research advice at this moment. Please check network connection.');
    } finally {
      setIsQuerying(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-green-950 p-6 sm:p-8 rounded-3xl border border-green-500/30 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-xs font-semibold mb-2 border border-green-500/30">
          <BookOpen className="w-3.5 h-3.5 text-green-400" />
          {lang === 'hi' ? 'वैज्ञानिक टमाटर कृषि मार्गदर्शिका' : 'ICAR & University Validated Tomato Cultivation Masterclass'}
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {lang === 'hi' ? 'पौधा कैसे लगाएं एवं सम्पूर्ण कृषि प्रक्रिया' : 'Step-by-Step Tomato Planting & Agronomic Guide'}
        </h1>
        <p className="mt-1 text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
          {lang === 'hi'
            ? 'बीज उपचार से लेकर ड्रिप सिंचाई, स्टेकिंग, जैविक खाद और तुड़ाई तक हर चरण की जानकारी स्पष्ट और अलग-अलग वर्गों में व्यवस्थित है ताकि उपयोग में कोई भ्रम न रहे।'
            : 'Structured into 6 modular chronological phases—from soil preparation and seed disinfection to trellising, fertigation, and post-harvest care—curated without visual clutter.'}
        </p>
      </div>

      {/* Phase Navigator Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {TOMATO_CULTIVATION_GUIDE.map((phase, idx) => (
          <button
            key={phase.id}
            onClick={() => setActivePhaseId(phase.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition flex items-center gap-2 ${
              activePhaseId === phase.id
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-slate-950/60 flex items-center justify-center text-[10px]">
              {idx + 1}
            </span>
            <span>{lang === 'hi' ? phase.hindiTitle.split('(')[0] : phase.stageTitle.split('.')[1]}</span>
          </button>
        ))}
      </div>

      {/* Active Phase Content Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Phase Details & Protocols (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-6">
            <div>
              <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                {activePhase.timelineDays}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                {lang === 'hi' ? activePhase.hindiTitle : activePhase.stageTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 bg-slate-950/80 p-3.5 rounded-xl border border-slate-850">
                {activePhase.keyActionSummary}
              </p>
            </div>

            {/* Critical Field Parameters Table */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                <span>{lang === 'hi' ? 'मुख्य तकनीकी मापदंड' : 'Critical Agronomic Parameters'}</span>
              </h3>
              <div className="grid grid-cols-2 gap-2.5">
                {activePhase.criticalParameters.map((param, idx) => (
                  <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-850">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">{param.label}</span>
                    <span className="text-xs font-semibold text-emerald-300 mt-0.5 block">{param.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Step-by-Step Instructions */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sprout className="w-3.5 h-3.5 text-emerald-400" />
                <span>{lang === 'hi' ? 'चरणबद्ध कार्यप्रणाली' : 'Step-by-Step Operational Instructions'}</span>
              </h3>
              <div className="space-y-2">
                {activePhase.detailedGuide.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-850 text-xs text-slate-200">
                    <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Organic Farmer Tips */}
            <div className="bg-gradient-to-r from-emerald-950/50 to-slate-950 p-4 rounded-2xl border border-emerald-500/30 space-y-2">
              <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>{lang === 'hi' ? 'विशेष जैविक नुस्खे (Organic Secrets)' : 'Organic Farmer Best Practices'}</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-emerald-100/90">
                {activePhase.organicTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Expert Dos & Don'ts and Live Research Query (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Dos & Don'ts Checklist */}
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 pb-2 border-b border-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'hi' ? 'विशेष सावधानियां (क्या करें / क्या न करें)' : "Agronomist's Dos & Don'ts"}</span>
            </h3>

            {/* Dos */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Recommended Practices (Do's)</span>
              </span>
              {activePhase.expertDosAndDonts.dos.map((item, idx) => (
                <div key={idx} className="bg-slate-950/80 p-2.5 rounded-xl border border-emerald-900/40 text-xs text-slate-300 flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Don'ts */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold text-red-400 uppercase tracking-wider flex items-center gap-1">
                <XCircle className="w-3.5 h-3.5" />
                <span>Avoid These Mistakes (Don'ts)</span>
              </span>
              {activePhase.expertDosAndDonts.donts.map((item, idx) => (
                <div key={idx} className="bg-slate-950/80 p-2.5 rounded-xl border border-red-900/40 text-xs text-slate-300 flex items-start gap-2">
                  <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Live Research Query Box */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-teal-950 rounded-3xl border border-teal-500/30 p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-teal-400" />
              <h3 className="text-sm font-bold text-white">
                {lang === 'hi' ? 'कृषि वैज्ञानिक से पूछें (लाइव रिसर्च खोज)' : 'Ask Agricultural Scientist (Live Research)'}
              </h3>
            </div>
            <p className="text-xs text-slate-300">
              {lang === 'hi'
                ? 'टमाटर की खेती से जुड़ा कोई भी सवाल पूछें, सिस्टम सीधे इंटरनेट और रिसर्च जर्नल्स से उत्तर खोजकर लाएगा।'
                : 'Have a specific question about fertilizer dosages, transplanting, or pest controls? Queries are grounded with live web search.'}
            </p>

            <form onSubmit={handleAskExpert} className="space-y-3">
              <textarea
                rows={2}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. What is the best organic fungicide for tomato seedlings before rain?"
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl p-3 focus:border-teal-500 focus:outline-none resize-none"
              />

              <button
                type="submit"
                disabled={isQuerying || !query.trim()}
                className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                  isQuerying || !query.trim()
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-md active:scale-95'
                }`}
              >
                {isQuerying ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                    <span>Searching Research Databases...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Search Research Advice</span>
                  </>
                )}
              </button>
            </form>

            {expertAnswer && (
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs space-y-3">
                <div className="text-slate-200 leading-relaxed whitespace-pre-line">
                  {expertAnswer}
                </div>

                {answerCitations.length > 0 && (
                  <div className="pt-2 border-t border-slate-850 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Validated Sources:</span>
                    {answerCitations.map((c, i) => (
                      <a
                        key={i}
                        href={c.uri}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between text-[11px] text-teal-400 hover:underline"
                      >
                        <span className="truncate pr-1">{c.title}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
