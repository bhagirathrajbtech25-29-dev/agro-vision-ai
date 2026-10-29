import React, { useState, useEffect } from 'react';
import { 
  CalendarClock, 
  PlusCircle, 
  Bell, 
  CheckCircle, 
  AlertCircle, 
  Camera, 
  Sparkles, 
  ChevronRight, 
  History, 
  Trash2,
  Sprout,
  ShieldAlert,
  Clock,
  ArrowRight
} from 'lucide-react';
import { CropBatch, InspectionRecord, DiagnosisReport } from '../types';

interface CropTrackerProps {
  onScanLeafForBatch: (batch: CropBatch, dayNumber: number) => void;
  lang: 'en' | 'hi';
}

const DEFAULT_BATCH: CropBatch = {
  id: 'batch_default_01',
  batchName: 'Tomato Plot A - Pusa Ruby',
  variety: 'Pusa Ruby (High-Yield Semi-Determinate)',
  plantingDate: new Date(Date.now() - 32 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 32 days ago
  location: 'Greater Noida West Farm',
  totalCycleDays: 90,
  currentDay: 32,
  nextInspectionDate: new Date(Date.now() + 13 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  daysUntilNextInspection: 13,
  inspections: [
    {
      id: 'insp_1',
      dayNumber: 15,
      date: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      imageThumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="80" height="80" fill="%231e293b"/><circle cx="40" cy="40" r="28" fill="%2322c55e"/></svg>',
      conditionName: 'Tomato Healthy (Baseline)',
      healthStatus: 'Healthy',
      confidenceScore: 98.2,
      remedyApplied: 'Seaweed extract bio-stimulant foliar spray applied (10 ml/L)',
      notes: 'Initial transplanting successful, healthy lateral root development.',
    },
    {
      id: 'insp_2',
      dayNumber: 30,
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      imageThumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="80" height="80" fill="%231e293b"/><circle cx="40" cy="40" r="28" fill="%23eab308"/></svg>',
      conditionName: 'Mild Early Blight Concentric Spots',
      healthStatus: 'Diseased',
      confidenceScore: 94.6,
      remedyApplied: 'Pruned bottom 3 infected leaves; sprayed Neem Oil (5ml/L) + Trichoderma viride',
      notes: 'Early detection at Day 30 prevented spread to canopy.',
    }
  ]
};

export const CropTracker: React.FC<CropTrackerProps> = ({
  onScanLeafForBatch,
  lang,
}) => {
  const [batches, setBatches] = useState<CropBatch[]>(() => {
    const saved = localStorage.getItem('agrovision_crop_batches');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [DEFAULT_BATCH];
      }
    }
    return [DEFAULT_BATCH];
  });

  const [activeBatchId, setActiveBatchId] = useState<string>(batches[0]?.id || 'batch_default_01');
  const [showNewBatchModal, setShowNewBatchModal] = useState<boolean>(false);
  const [notificationStatus, setNotificationStatus] = useState<string | null>(null);

  // New Batch Form State
  const [newBatchName, setNewBatchName] = useState('');
  const [newVariety, setNewVariety] = useState('Pusa Ruby (Hybrid)');
  const [newPlantingDate, setNewPlantingDate] = useState(new Date().toISOString().split('T')[0]);
  const [newLocation, setNewLocation] = useState('Uttar Pradesh, India');

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('agrovision_crop_batches', JSON.stringify(batches));
  }, [batches]);

  const activeBatch = batches.find((b) => b.id === activeBatchId) || batches[0];

  // Calculate days elapsed and growth stage
  const calculateDaysSince = (dateStr: string) => {
    const planted = new Date(dateStr).getTime();
    const now = Date.now();
    const diffDays = Math.max(0, Math.floor((now - planted) / (1000 * 60 * 60 * 24)));
    return diffDays;
  };

  const getStageInfo = (day: number) => {
    if (day <= 15) {
      return {
        stage: 'Stage 1: Seedling & Nursery Establishment',
        hindiStage: 'चरण 1: अंकुरण एवं पौधशाला',
        action: 'Water delicately; protect from heavy rain splash; 1st 15-day check due soon.',
        progressPct: Math.round((day / 90) * 100),
      };
    } else if (day <= 30) {
      return {
        stage: 'Stage 2: Field Transplanting & Vegetative Growth',
        hindiStage: 'चरण 2: खेत में रोपाई एवं प्रारंभिक वृद्धि',
        action: 'Roots establishing; stake bamboo poles; Day 30 inspection mandatory.',
        progressPct: Math.round((day / 90) * 100),
      };
    } else if (day <= 45) {
      return {
        stage: 'Stage 3: Trellising, Pruning & Side-Shoot Management',
        hindiStage: 'चरण 3: सहारा देना (Staking) एवं नीचे की पत्तियों की कटाई',
        action: 'Prune bottom leaves touching soil; inspect for early blight concentric spots.',
        progressPct: Math.round((day / 90) * 100),
      };
    } else if (day <= 60) {
      return {
        stage: 'Stage 4: First Flower Flush & Fruit Set',
        hindiStage: 'चरण 4: पुष्पन (फूल आना) एवं फल बनना',
        action: 'Apply calcium & potassium; check for blossom drop and foliar water-soaking.',
        progressPct: Math.round((day / 90) * 100),
      };
    } else if (day <= 75) {
      return {
        stage: 'Stage 5: Green Fruit Expansion & Maturation',
        hindiStage: 'चरण 5: हरे टमाटर का विकास एवं पोषण',
        action: 'Ensure steady drip irrigation; check fruit-adjacent foliage for Late Blight.',
        progressPct: Math.round((day / 90) * 100),
      };
    } else {
      return {
        stage: 'Stage 6: Breaker Stage & Harvest Flushes',
        hindiStage: 'चरण 6: फल पकना एवं तुड़ाई',
        action: 'Harvest pink/breaker stage fruits; observe 7-day chemical withholding period.',
        progressPct: Math.min(100, Math.round((day / 90) * 100)),
      };
    }
  };

  const currentDays = activeBatch ? calculateDaysSince(activeBatch.plantingDate) : 0;
  const stage = getStageInfo(currentDays);

  // Check when next 15-day checkpoint is due
  const nextCheckpointDay = (Math.floor(currentDays / 15) + 1) * 15;
  const daysRemaining = nextCheckpointDay - currentDays;

  // Browser Notification Trigger
  const handleTrigger15DayNotification = async () => {
    if ('Notification' in window) {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          new Notification('🌱 AgroVision AI: 15-Day Tomato Inspection Due!', {
            body: `${activeBatch?.batchName}: Day ${currentDays} reached. Please upload a leaf photo to diagnose health and receive fertilizer suggestions.`,
            icon: '/favicon.ico',
          });
          setNotificationStatus('Browser notification dispatched! User alerted.');
        } else {
          setNotificationStatus('Notification simulation triggered in-app.');
        }
      } catch (e) {
        setNotificationStatus('15-Day health alert generated successfully.');
      }
    } else {
      setNotificationStatus('Notification alert generated for this cycle.');
    }

    setTimeout(() => setNotificationStatus(null), 5000);
  };

  // Create new batch handler
  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBatchName.trim()) return;

    const newBatch: CropBatch = {
      id: `batch_${Date.now()}`,
      batchName: newBatchName,
      variety: newVariety,
      plantingDate: newPlantingDate,
      location: newLocation,
      totalCycleDays: 90,
      currentDay: 0,
      nextInspectionDate: new Date(new Date(newPlantingDate).getTime() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      daysUntilNextInspection: 15,
      inspections: [],
    };

    setBatches([newBatch, ...batches]);
    setActiveBatchId(newBatch.id);
    setShowNewBatchModal(false);
    setNewBatchName('');
  };

  const handleDeleteBatch = (id: string) => {
    const updated = batches.filter((b) => b.id !== id);
    setBatches(updated.length > 0 ? updated : [DEFAULT_BATCH]);
    if (activeBatchId === id) {
      setActiveBatchId(updated[0]?.id || DEFAULT_BATCH.id);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-emerald-950 p-6 sm:p-8 rounded-3xl border border-emerald-500/30 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2 border border-emerald-500/30">
            <CalendarClock className="w-3.5 h-3.5 text-emerald-400" />
            {lang === 'hi' ? 'स्वचालित 15-दिन फसल निगरानी' : 'Automated 15-Day Crop Growth & Foliar Health Cycle'}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {lang === 'hi' ? 'फसल विकास ट्रैकर एवं आवधिक जांच' : 'Crop Growth Tracker & 15-Day Autonomous Checkpoints'}
          </h1>
          <p className="mt-1 text-slate-300 text-xs sm:text-sm max-w-2xl">
            {lang === 'hi'
              ? 'टमाटर रोपने की तारीख से हर 15 दिन पर सिस्टम स्वतः पत्ती की तस्वीर मांगकर रोग जांच करता है और उचित जैविक खाद व उपचार सुझाता है।'
              : 'Automatically tracks your 90-day tomato growth cycle from planting. Every 15 days, it prompts a periodic leaf photo inspection to verify plant vigor or immediately prescribe remedies.'}
          </p>
        </div>

        <button
          onClick={() => setShowNewBatchModal(true)}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition text-xs sm:text-sm active:scale-95"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{lang === 'hi' ? 'नया बैच जोड़ें' : 'Register New Crop Batch'}</span>
        </button>
      </div>

      {notificationStatus && (
        <div className="bg-emerald-950/80 border border-emerald-500 p-3.5 rounded-2xl flex items-center gap-3 text-emerald-200 text-xs sm:text-sm animate-bounce">
          <Bell className="w-4 h-4 text-emerald-400" />
          <span>{notificationStatus}</span>
        </div>
      )}

      {/* Batches Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {batches.map((b) => (
          <button
            key={b.id}
            onClick={() => setActiveBatchId(b.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition flex items-center gap-2 ${
              activeBatch?.id === b.id
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Sprout className="w-3.5 h-3.5 text-emerald-300" />
            <span>{b.batchName}</span>
            <span className="text-[10px] opacity-75">
              (Day {calculateDaysSince(b.plantingDate)})
            </span>
          </button>
        ))}
      </div>

      {/* Active Batch Dashboard */}
      {activeBatch && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Stage Progression & 15-Day Alert (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Growth Stage Card */}
            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                    {lang === 'hi' ? 'वर्तमान फसल अवस्था' : 'Active Growth Phase'}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                    {lang === 'hi' ? stage.hindiStage : stage.stage}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Variety: <span className="text-slate-200 font-semibold">{activeBatch.variety}</span> • Planted: {activeBatch.plantingDate}
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-black text-emerald-400">
                    Day {currentDays} <span className="text-xs font-normal text-slate-400">/ 90</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {stage.progressPct}% of cycle completed
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800 p-0.5">
                <div
                  className="bg-gradient-to-r from-emerald-500 via-teal-400 to-green-300 h-full rounded-full transition-all duration-700"
                  style={{ width: `${stage.progressPct}%` }}
                ></div>
              </div>

              {/* 15-Day Milestones Timeline */}
              <div className="grid grid-cols-6 gap-1 text-center pt-2">
                {[15, 30, 45, 60, 75, 90].map((dayMark) => {
                  const isPassed = currentDays >= dayMark;
                  const isCurrent = currentDays >= dayMark - 15 && currentDays < dayMark;
                  return (
                    <div
                      key={dayMark}
                      className={`p-2 rounded-xl border text-[10px] sm:text-xs transition ${
                        isCurrent
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                          : isPassed
                          ? 'bg-slate-950/60 border-emerald-900/40 text-emerald-400'
                          : 'bg-slate-950/30 border-slate-850 text-slate-500'
                      }`}
                    >
                      <div className="font-mono">Day {dayMark}</div>
                      <div className="text-[9px] mt-0.5">
                        {isPassed ? 'Passed' : isCurrent ? 'Active' : 'Upcoming'}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Stage Specific Action Guide */}
              <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 text-xs space-y-1">
                <span className="font-bold text-emerald-300 uppercase tracking-wider text-[10px]">
                  {lang === 'hi' ? 'इस अवस्था के लिए विशेष निर्देश:' : 'Stage Recommended Agronomic Action:'}
                </span>
                <p className="text-slate-200 leading-relaxed">{stage.action}</p>
              </div>
            </div>

            {/* 15-Day Autonomous Inspection Alert Card */}
            <div className="bg-gradient-to-br from-emerald-950/50 via-slate-900 to-slate-900 rounded-3xl border border-emerald-500/40 p-6 shadow-xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Bell className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                      {lang === 'hi' ? 'स्वचालित आवधिक जांच' : '15-Day Autonomous Checkpoint'}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {daysRemaining <= 0
                        ? lang === 'hi' ? '🚨 15-दिन की जांच का समय आ गया है!' : '🚨 15-Day Inspection Due Now!'
                        : lang === 'hi' ? `अगली जांच ${daysRemaining} दिन में देय है (Day ${nextCheckpointDay})` : `Next Checkpoint Due in ${daysRemaining} Days (Day ${nextCheckpointDay})`}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={handleTrigger15DayNotification}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-1.5 cursor-pointer transition"
                >
                  <Bell className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{lang === 'hi' ? 'नोटिफिकेशन भेजें' : 'Send Alert Notification'}</span>
                </button>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'hi'
                  ? 'पौधे की नई पत्तियों की एक ताज़ा तस्वीर अपलोड करें। हमारा डीप लर्निंग मॉडल जांच करके तुरंत बताएगा कि फसल स्वस्थ है या किसी शुरुआती फफूंद/बीमारी का लक्षण है, तथा आवश्यक जैविक खाद व स्प्रे तुरंत सुझाएगा।'
                  : 'Capture and submit a fresh photograph of the newest leaf clusters. The system will diagnose plant vigor, check for subclinical blight lesions, and recommend organic fertilizers tailored to this stage.'}
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => onScanLeafForBatch(activeBatch, currentDays)}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold py-2.5 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition text-xs sm:text-sm active:scale-95"
                >
                  <Camera className="w-4 h-4" />
                  <span>{lang === 'hi' ? 'अभी पत्ती की फोटो जांचें (Day Check)' : `Submit Leaf Photo for Day ${currentDays} Checkpoint`}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Inspection History Timeline (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <History className="w-4 h-4 text-emerald-400" />
                  <span>{lang === 'hi' ? 'जांच इतिहास (15-दिन लॉग)' : '15-Day Inspection History'}</span>
                </h3>
                <span className="text-xs text-slate-400">
                  {activeBatch.inspections.length} Recorded
                </span>
              </div>

              {activeBatch.inspections.length === 0 ? (
                <div className="text-center py-10 text-slate-500 space-y-2">
                  <Sprout className="w-10 h-10 mx-auto opacity-40 text-emerald-500" />
                  <p className="text-xs">No inspections logged yet for this batch.</p>
                  <p className="text-[11px] text-slate-400">
                    Click "Submit Leaf Photo" above to log Day {currentDays} inspection.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
                  {activeBatch.inspections.map((insp) => (
                    <div
                      key={insp.id}
                      className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-850 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-200">
                            Day {insp.dayNumber}
                          </span>
                          <span className="text-[11px] text-slate-400">{insp.date}</span>
                        </div>
                        <span
                          className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                            insp.healthStatus === 'Healthy'
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                              : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          }`}
                        >
                          {insp.healthStatus}
                        </span>
                      </div>

                      <div className="flex items-start gap-3">
                        <img
                          src={insp.imageThumbnail}
                          alt="Inspection Leaf"
                          className="w-12 h-12 object-cover rounded-lg border border-slate-800 shrink-0"
                        />
                        <div className="text-xs space-y-0.5">
                          <p className="font-semibold text-slate-200">{insp.conditionName}</p>
                          <p className="text-[11px] text-emerald-400 font-mono">
                            Certainty: {insp.confidenceScore}%
                          </p>
                        </div>
                      </div>

                      {insp.remedyApplied && (
                        <div className="text-[11px] bg-slate-900 p-2 rounded-lg text-slate-300 border border-slate-800">
                          <span className="text-emerald-400 font-semibold">Treatment: </span>
                          {insp.remedyApplied}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Danger Zone: Delete Batch */}
              <div className="pt-2 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => handleDeleteBatch(activeBatch.id)}
                  className="text-slate-500 hover:text-red-400 text-xs flex items-center gap-1 cursor-pointer transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Batch</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Register New Crop Batch */}
      {showNewBatchModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sprout className="w-5 h-5 text-emerald-400" />
              <span>{lang === 'hi' ? 'नया टमाटर फसल बैच दर्ज करें' : 'Register New Crop Batch'}</span>
            </h3>

            <form onSubmit={handleCreateBatch} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Batch Name (e.g. Polyhouse Bed 2 / Terrace Pots)
                </label>
                <input
                  type="text"
                  required
                  value={newBatchName}
                  onChange={(e) => setNewBatchName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white text-xs rounded-xl px-3 py-2 focus:border-emerald-500 focus:outline-none"
                  placeholder="e.g. Field Block 1 - Pusa Ruby"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Tomato Variety
                </label>
                <select
                  value={newVariety}
                  onChange={(e) => setNewVariety(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white text-xs rounded-xl px-3 py-2 focus:border-emerald-500 focus:outline-none"
                >
                  <option value="Pusa Ruby (High-Yield Semi-Determinate)">Pusa Ruby (High-Yield Semi-Determinate)</option>
                  <option value="Arka Rakshak (Triple Disease Resistant)">Arka Rakshak (Triple Disease Resistant)</option>
                  <option value="Pusa Rohini (Heavy Fruiting)">Pusa Rohini (Heavy Fruiting)</option>
                  <option value="Himsona (Indeterminate Hybrid)">Himsona (Indeterminate Hybrid)</option>
                  <option value="Cherry Tomato (Potted/Kitchen Garden)">Cherry Tomato (Potted/Kitchen Garden)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Planting / Transplanting Date
                </label>
                <input
                  type="date"
                  required
                  value={newPlantingDate}
                  onChange={(e) => setNewPlantingDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white text-xs rounded-xl px-3 py-2 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Farm / Polyhouse Location
                </label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white text-xs rounded-xl px-3 py-2 focus:border-emerald-500 focus:outline-none"
                  placeholder="e.g. Greater Noida, Uttar Pradesh"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewBatchModal(false)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-4 py-2 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl cursor-pointer shadow"
                >
                  Save Batch & Start 15-Day Cycle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
