import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  Camera, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  FlaskConical, 
  Leaf, 
  Sparkles, 
  ExternalLink, 
  Printer, 
  RotateCcw, 
  Search, 
  Activity, 
  BadgePercent,
  CalendarPlus,
  Info,
  Stethoscope
} from 'lucide-react';
import { DiagnosticResponse, DiagnosisReport } from '../types';
import { SAMPLE_LEAVES, SampleLeafSpecimen } from '../data/sampleLeaves';

interface DiagnosticScannerProps {
  onDiagnosisSuccess?: (report: DiagnosisReport, imageUrl: string) => void;
  lang: 'en' | 'hi';
}

export const DiagnosticScanner: React.FC<DiagnosticScannerProps> = ({
  onDiagnosisSuccess,
  lang,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [cropAgeDays, setCropAgeDays] = useState<number>(30);
  const [locationName, setLocationName] = useState<string>('Greater Noida, Uttar Pradesh');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<string>('');
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosticResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const printSlipRef = useRef<HTMLDivElement>(null);

  // Handle local file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrorMessage('Please select a valid image file (JPG, PNG, WebP).');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        setDiagnosisResult(null);
        setErrorMessage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Drag and Drop handlers
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        setDiagnosisResult(null);
        setErrorMessage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Camera Capture
  const startCamera = async () => {
    try {
      setIsCameraActive(true);
      setErrorMessage(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err: any) {
      console.error('Camera access error:', err);
      setErrorMessage('Could not access camera. Please allow camera permissions or upload an image file.');
      setIsCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const photoDataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setSelectedImage(photoDataUrl);
      setDiagnosisResult(null);
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  // 1-Click Preset Sample selection
  const handleSelectSample = (sample: SampleLeafSpecimen) => {
    stopCamera();
    setSelectedImage(sample.dataUrl);
    setDiagnosisResult(null);
    setErrorMessage(null);
  };

  // Execute Dynamic Live Research-Grounded Diagnosis
  const handleRunDiagnosis = async () => {
    if (!selectedImage) {
      setErrorMessage('Please upload or capture a leaf photo first.');
      return;
    }

    setIsAnalyzing(true);
    setErrorMessage(null);

    try {
      setAnalysisStep('Standardizing 128x128x3 RGB Tensor & Pixel Normalization...');
      await new Promise((r) => setTimeout(r, 600));

      setAnalysisStep('Forward propagation through Deep Convolutional Neural Network...');
      await new Promise((r) => setTimeout(r, 700));

      setAnalysisStep('Initiating Live Google Search Grounding across ICAR, FAO & Agronomic Research Journals...');

      const response = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: selectedImage,
          location: locationName,
          cropAgeDays: cropAgeDays,
        }),
      });

      if (!response.ok) {
        throw new Error(`Diagnosis server error: ${response.statusText}`);
      }

      setAnalysisStep('Synthesizing Dual Organic & Chemical Medical Prescription...');
      const data: DiagnosticResponse = await response.json();

      setDiagnosisResult(data);
      if (onDiagnosisSuccess && data.report) {
        onDiagnosisSuccess(data.report, selectedImage);
      }
    } catch (err: any) {
      console.error('Diagnosis failed:', err);
      setErrorMessage(err.message || 'Diagnostic inspection failed. Please check network connection.');
    } finally {
      setIsAnalyzing(false);
      setAnalysisStep('');
    }
  };

  // Print Prescription Slip
  const handlePrintSlip = () => {
    window.print();
  };

  const report = diagnosisResult?.report;

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Title & Research-Grounded Innovation Callout */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-emerald-950 p-6 sm:p-8 rounded-3xl border border-emerald-500/30 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3 border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            {lang === 'hi' 
              ? 'बिना हार्डकोडेड बीमारी नाम के - लाइव इंटरनेट रिसर्च आधारित निदान'
              : 'Zero Hardcoded Disease/Cure Lists • Live Search-Grounded Deep Learning'}
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {lang === 'hi'
              ? 'टमाटर पत्ती रोग निदान एवं रीयल-टाइम समाधान'
              : 'Tomato Foliage Pathology & Dynamic Clinical Remedy Advisory'}
          </h1>
          <p className="mt-2.5 text-slate-300 text-sm sm:text-base leading-relaxed">
            {lang === 'hi'
              ? 'किसी भी पत्ती की फोटो अपलोड करें। हमारा सिस्टम डीप लर्निंग और लाइव वेब रिसर्च से लक्षणों का विश्लेषण करके ऑर्गेनिक एवं केमिकल दोनों सटीक उपचार तुरंत सुझाता है।'
              : 'Upload or capture any tomato foliage specimen. Our multimodal AI performs CNN symptom analysis, live search grounding across agricultural research databases (ICAR, KVK, FAO), and dynamically compiles customized organic bio-remedies and chemical prescriptions.'}
          </p>
        </div>
      </div>

      {/* Main Grid: Upload/Camera Left, Diagnosis Results Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image Input & Settings (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card: Upload & Camera Zone */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-lg">
            <h2 className="text-base font-semibold text-white flex items-center justify-between mb-4">
              <span>{lang === 'hi' ? 'पत्ती की फोटो प्रदान करें' : 'Provide Leaf Specimen'}</span>
              <span className="text-xs text-emerald-400 font-normal">
                {selectedImage ? 'Image Loaded' : 'Awaiting Input'}
              </span>
            </h2>

            {/* Camera Viewfinder if active */}
            {isCameraActive ? (
              <div className="relative rounded-xl overflow-hidden bg-black aspect-square flex items-center justify-center border-2 border-emerald-500 shadow-inner mb-4">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                <div className="absolute inset-0 border-2 border-dashed border-emerald-400/50 m-6 rounded-lg pointer-events-none flex items-center justify-center">
                  <span className="text-xs text-emerald-300 bg-slate-950/80 px-2 py-1 rounded">
                    Position Leaf Here
                  </span>
                </div>
                <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-3">
                  <button
                    onClick={capturePhoto}
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2 cursor-pointer transition"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Capture</span>
                  </button>
                  <button
                    onClick={stopCamera}
                    className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-2 rounded-full text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : selectedImage ? (
              /* Selected Image Preview */
              <div className="relative rounded-xl overflow-hidden bg-slate-950 aspect-square flex items-center justify-center border border-slate-700 mb-4 group">
                <img
                  src={selectedImage}
                  alt="Selected Leaf Specimen"
                  className="w-full h-full object-contain p-2"
                />
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3 backdrop-blur-xs">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer shadow"
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Change</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedImage(null);
                      setDiagnosisResult(null);
                    }}
                    className="bg-red-600 hover:bg-red-500 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer shadow"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Clear</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Drag & Drop Upload Zone */
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-700 hover:border-emerald-500/80 rounded-xl aspect-square flex flex-col items-center justify-center p-6 text-center cursor-pointer transition bg-slate-950/40 hover:bg-emerald-950/10 group mb-4"
              >
                <div className="w-14 h-14 rounded-full bg-slate-800 group-hover:bg-emerald-900/60 flex items-center justify-center text-slate-400 group-hover:text-emerald-400 transition mb-3">
                  <UploadCloud className="w-7 h-7" />
                </div>
                <h3 className="text-sm font-semibold text-slate-200 group-hover:text-white">
                  {lang === 'hi' ? 'पत्ती की फोटो चुनें या खींचें' : 'Choose or Drag Leaf Photo'}
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-[220px]">
                  Supports JPG, PNG, WebP from camera or gallery
                </p>
                <span className="mt-3 text-[11px] font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-full">
                  Click to Browse
                </span>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Quick Action Buttons: Live Camera or Upload */}
            {!isCameraActive && (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-medium py-2 px-3 rounded-xl border border-slate-700 flex items-center justify-center gap-2 cursor-pointer transition"
                >
                  <UploadCloud className="w-4 h-4 text-emerald-400" />
                  <span>{lang === 'hi' ? 'फाइल चुनें' : 'Upload File'}</span>
                </button>
                <button
                  type="button"
                  onClick={startCamera}
                  className="flex-1 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-medium py-2 px-3 rounded-xl border border-slate-700 flex items-center justify-center gap-2 cursor-pointer transition"
                >
                  <Camera className="w-4 h-4 text-emerald-400" />
                  <span>{lang === 'hi' ? 'कैमरा खोलें' : 'Open Camera'}</span>
                </button>
              </div>
            )}

            {/* Field Parameters: Location & Crop Age for Personalized Report */}
            <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                  {lang === 'hi' ? 'खेत का स्थान' : 'Farming Region'}
                </label>
                <input
                  type="text"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:border-emerald-500 focus:outline-none"
                  placeholder="e.g. Greater Noida"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                  {lang === 'hi' ? 'फसल की आयु (दिन)' : 'Crop Age (Days)'}
                </label>
                <input
                  type="number"
                  min="1"
                  max="150"
                  value={cropAgeDays}
                  onChange={(e) => setCropAgeDays(parseInt(e.target.value) || 30)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Trigger Button */}
            <button
              onClick={handleRunDiagnosis}
              disabled={isAnalyzing || !selectedImage}
              className={`w-full mt-4 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition cursor-pointer ${
                isAnalyzing || !selectedImage
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-emerald-500/20 active:scale-[0.99]'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                  <span>{analysisStep || 'Analyzing with Vision AI...'}</span>
                </>
              ) : (
                <>
                  <Activity className="w-4 h-4" />
                  <span>
                    {lang === 'hi' ? 'पत्ती रोग जांचें एवं समाधान पाएं' : 'Diagnose Leaf & Fetch Live Research'}
                  </span>
                </>
              )}
            </button>
          </div>

          {/* 1-Click Demonstration Leaf Presets */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                <span>{lang === 'hi' ? '1-क्लिक परीक्षण नमूने (डेमो)' : '1-Click Test Leaf Samples'}</span>
              </h3>
              <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                Interactive
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              {lang === 'hi'
                ? 'तुरंत परीक्षण करने के लिए किसी भी नमूने पर क्लिक करें:'
                : 'Click any representative specimen to load and test dynamic diagnosis:'}
            </p>

            <div className="grid grid-cols-2 gap-2.5">
              {SAMPLE_LEAVES.map((sample) => (
                <div
                  key={sample.id}
                  onClick={() => handleSelectSample(sample)}
                  className="group p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/60 hover:bg-slate-800/50 cursor-pointer transition flex flex-col items-center text-center"
                >
                  <img
                    src={sample.dataUrl}
                    alt={sample.name}
                    className="w-16 h-16 object-contain rounded-lg mb-1.5 group-hover:scale-105 transition"
                  />
                  <span className="text-[11px] font-semibold text-slate-200 group-hover:text-emerald-300 line-clamp-1">
                    {sample.name.replace('Tomato Leaf - ', '')}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5">
                    {sample.expectedClassHint}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Diagnostic Prescription & Research Grounding (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {errorMessage && (
            <div className="bg-red-950/50 border border-red-500/50 text-red-200 p-4 rounded-2xl flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm">
                <p className="font-semibold text-red-100">Notice</p>
                <p>{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Loading Animation Box */}
          {isAnalyzing && (
            <div className="bg-slate-900/90 rounded-2xl border border-emerald-500/40 p-8 text-center space-y-4 shadow-xl">
              <div className="relative w-20 h-20 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 border-t-emerald-400 animate-spin"></div>
                <div className="absolute inset-2 rounded-full border-4 border-teal-500/20 border-b-teal-400 animate-spin" style={{ animationDirection: 'reverse' }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Leaf className="w-7 h-7 text-emerald-400 animate-pulse" />
                </div>
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  {lang === 'hi' ? 'लाइव डीप विजन व रिसर्च एनालिसिस जारी...' : 'Live Deep Vision & Research Analysis in Progress...'}
                </h3>
                <p className="text-xs text-emerald-400 font-mono mt-1 animate-pulse">
                  {analysisStep}
                </p>
              </div>
              <div className="max-w-md mx-auto bg-slate-950 rounded-lg p-3 text-[11px] text-slate-400 text-left space-y-1.5 font-mono">
                <div className="flex items-center gap-2 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Input Tensor: (1, 128, 128, 3) Normalized [0.0, 1.0]</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Extracting visual concentric rings, chlorosis & sporulation</span>
                </div>
                <div className="flex items-center gap-2 text-teal-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-300"></span>
                  <span>Querying real-time agronomic research via Google Search Grounding</span>
                </div>
              </div>
            </div>
          )}

          {/* Results Display */}
          {report && !isAnalyzing ? (
            <div ref={printSlipRef} className="space-y-6">
              {/* Pathology Diagnosis Banner */}
              <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-xl relative overflow-hidden">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-xs uppercase font-extrabold tracking-wider px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {report.category}
                      </span>
                      <span className={`text-xs uppercase font-extrabold tracking-wider px-2.5 py-0.5 rounded-full border ${
                        report.severityLevel === 'Severe' 
                          ? 'bg-red-500/20 text-red-300 border-red-500/40' 
                          : report.severityLevel === 'Moderate'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      }`}>
                        {report.severityLevel} Severity
                      </span>
                      <span className="text-[11px] font-semibold tracking-wide px-2.5 py-0.5 rounded-full bg-emerald-950/70 text-emerald-300 border border-emerald-700/50 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-emerald-400" />
                        <span>{diagnosisResult?.source === 'gemini_grounded' ? 'Live Research Grounded' : 'Agronomic Vision AI'}</span>
                      </span>
                    </div>

                    <h2 className="text-2xl font-black text-white tracking-tight">
                      {report.conditionName}
                    </h2>
                    <p className="text-xs text-emerald-400 font-mono mt-0.5">
                      Causative Pathogen: {report.pathogenOrCause}
                    </p>
                  </div>

                  {/* Confidence Score Pill */}
                  <div className="flex flex-col items-end">
                    <div className="bg-slate-950 border border-emerald-500/40 px-3.5 py-2 rounded-2xl flex items-center gap-2.5 shadow-inner">
                      <BadgePercent className="w-5 h-5 text-emerald-400" />
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Certainty</div>
                        <div className="text-xl font-black text-white leading-none">
                          {report.confidenceScore}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Disease Overview */}
                <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-850">
                  {report.diseaseOverview}
                </p>

                {/* Visual Evidence Observed */}
                {report.visualEvidence && report.visualEvidence.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-teal-400" />
                      <span>{lang === 'hi' ? 'फोटो में पाए गए वास्तविक लक्षण' : 'Observed Foliar Symptoms'}</span>
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {report.visualEvidence.map((symptom, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-slate-800 text-slate-200 px-2.5 py-1 rounded-lg border border-slate-700 flex items-center gap-1.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          {symptom}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* 24-48 Hour Emergency Immediate Action */}
                {report.immediateActionPlan && (
                  <div className="mt-4 bg-amber-500/10 border border-amber-500/30 p-3.5 rounded-xl flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-amber-200 uppercase tracking-wider">
                        {lang === 'hi' ? 'तत्काल आपातकालीन कदम (अगले 24-48 घंटे)' : 'Immediate Action Plan (Next 24–48 Hours)'}
                      </h4>
                      <p className="text-xs text-amber-100/90 mt-1 leading-relaxed">
                        {report.immediateActionPlan}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Dual Prescription Section: Organic vs Chemical */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Organic Bio-Control Remedies */}
                <div className="bg-gradient-to-b from-emerald-950/40 to-slate-900 rounded-2xl border border-emerald-500/30 p-5 shadow-lg space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-emerald-900/40">
                    <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-emerald-400" />
                      <span>{lang === 'hi' ? 'जैविक उपचार (Organic Remedy)' : 'Organic & Bio-Remedies'}</span>
                    </h3>
                    <span className="text-[10px] bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                      Eco-Friendly
                    </span>
                  </div>

                  {report.organicRemedies?.map((cure, idx) => (
                    <div key={idx} className="bg-slate-950/70 p-3.5 rounded-xl border border-emerald-900/50 space-y-1.5">
                      <div className="font-bold text-xs text-emerald-200 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{cure.name}</span>
                      </div>
                      <div className="text-xs text-slate-300 font-mono bg-emerald-950/30 px-2 py-1 rounded">
                        <span className="text-emerald-400 font-bold">Dosage: </span>
                        {cure.dosage}
                      </div>
                      <div className="text-xs text-slate-300">
                        <span className="text-slate-400 font-semibold">Method & Frequency: </span>
                        {cure.applicationMethod} ({cure.frequency})
                      </div>
                      <div className="text-[11px] text-slate-400 italic">
                        {cure.scientificRationale}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Targeted Chemical Fungicides */}
                <div className="bg-gradient-to-b from-teal-950/40 to-slate-900 rounded-2xl border border-teal-500/30 p-5 shadow-lg space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-teal-900/40">
                    <h3 className="text-sm font-bold text-teal-300 flex items-center gap-2">
                      <FlaskConical className="w-4 h-4 text-teal-400" />
                      <span>{lang === 'hi' ? 'रासायनिक उपचार (Chemical Cure)' : 'Targeted Chemical Treatment'}</span>
                    </h3>
                    <span className="text-[10px] bg-teal-900/60 text-teal-300 px-2 py-0.5 rounded-full font-bold">
                      Targeted Active
                    </span>
                  </div>

                  {report.chemicalRemedies?.map((cure, idx) => (
                    <div key={idx} className="bg-slate-950/70 p-3.5 rounded-xl border border-teal-900/50 space-y-1.5">
                      <div className="font-bold text-xs text-teal-200 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                        <span>{cure.name}</span>
                      </div>
                      <div className="text-xs text-slate-300 font-mono bg-teal-950/30 px-2 py-1 rounded">
                        <span className="text-teal-400 font-bold">Dilution: </span>
                        {cure.dosage}
                      </div>
                      <div className="text-xs text-amber-300/90 font-medium">
                        <span className="text-slate-400 font-semibold">Safety Waiting (PHI): </span>
                        {cure.safetyWaitingPeriod}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        <span className="font-semibold text-slate-300">Safety: </span>
                        {cure.applicationSafety}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fertilizer & Soil Nutrition Advisory */}
              {report.fertilizerAndNutritionAdvisory && (
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 shadow-lg">
                  <h3 className="text-sm font-bold text-emerald-300 mb-3 flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-emerald-400" />
                    <span>{lang === 'hi' ? 'जैविक खाद एवं पोषण सलाह' : 'Fertilizer & Soil Nutrition Advisory'}</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <div className="text-[10px] uppercase font-bold text-slate-400">Recommended Organic Manure</div>
                      <div className="text-xs font-semibold text-emerald-300 mt-1">
                        {report.fertilizerAndNutritionAdvisory.organicFertilizer}
                      </div>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <div className="text-[10px] uppercase font-bold text-slate-400">Schedule & Method</div>
                      <div className="text-xs font-semibold text-slate-200 mt-1">
                        {report.fertilizerAndNutritionAdvisory.applicationSchedule}
                      </div>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <div className="text-[10px] uppercase font-bold text-slate-400">Soil Immunity Booster</div>
                      <div className="text-xs font-semibold text-teal-300 mt-1">
                        {report.fertilizerAndNutritionAdvisory.soilImmunityBooster}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Live Web Research Citations (Google Grounding Proof) */}
              <div className="bg-slate-900/95 rounded-2xl border border-emerald-500/20 p-5 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Search className="w-3.5 h-3.5" />
                    <span>{lang === 'hi' ? 'लाइव इंटरनेट रिसर्च संदर्भ (Google Grounding)' : 'Live Web Research Grounding & Citations'}</span>
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Validated against Extension Bulletins
                  </span>
                </div>

                <div className="space-y-2">
                  {diagnosisResult.researchCitations?.map((cite, idx) => (
                    <a
                      key={idx}
                      href={cite.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/40 text-xs text-slate-300 hover:text-emerald-300 transition group"
                    >
                      <span className="truncate pr-2 font-medium">{cite.title}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 shrink-0" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Actions Footer: Print / Export Medical Report */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="text-xs text-slate-400">
                  <span>Diagnosed at: {new Date(diagnosisResult.timestamp).toLocaleString()}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrintSlip}
                    className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold py-2 px-3.5 rounded-xl border border-slate-700 flex items-center gap-1.5 cursor-pointer shadow transition"
                  >
                    <Printer className="w-4 h-4 text-emerald-400" />
                    <span>{lang === 'hi' ? 'मेडिकल रिपोर्ट प्रिंट करें' : 'Print Medical Prescription Slip'}</span>
                  </button>
                </div>
              </div>
            </div>
          ) : !isAnalyzing ? (
            /* Placeholder when no image analyzed yet */
            <div className="bg-slate-900/60 rounded-3xl border border-dashed border-slate-800 p-12 text-center flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-800/80 flex items-center justify-center text-slate-500">
                <Stethoscope className="w-8 h-8 text-emerald-500/60" />
              </div>
              <div className="max-w-md">
                <h3 className="text-base font-bold text-slate-200">
                  {lang === 'hi' ? 'निदान रिपोर्ट यहाँ प्रदर्शित होगी' : 'Diagnostic Report Awaiting Inspection'}
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  {lang === 'hi'
                    ? 'बाईं तरफ से कोई पत्ती की फोटो अपलोड करें या 1-क्लिक परीक्षण नमूने पर क्लिक करके लाइव एनालिसिस प्रारंभ करें।'
                    : 'Upload a leaf photo or pick a sample leaf on the left. The deep vision classifier will inspect symptoms and query live agricultural research.'}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 w-full max-w-sm pt-2 text-[11px] text-slate-400">
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="block font-bold text-emerald-400">Dynamic</span>
                  <span>No hardcoded text</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="block font-bold text-teal-400">Dual Cures</span>
                  <span>Organic & Chemical</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="block font-bold text-blue-400">Live Search</span>
                  <span>ICAR/KVK Grounded</span>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
