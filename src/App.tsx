/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { DiagnosticScanner } from './components/DiagnosticScanner';
import { CropTracker } from './components/CropTracker';
import { WeatherAdvisor } from './components/WeatherAdvisor';
import { CultivationGuide } from './components/CultivationGuide';
import { AcademicDossier } from './components/AcademicDossier';
import { WeatherData, CropBatch, DiagnosisReport, InspectionRecord } from './types';
import { Sprout, Heart, GraduationCap, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('scanner');
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [weather, setWeather] = useState<WeatherData | null>(null);

  // Load initial weather data for Greater Noida (College Location) on start
  useEffect(() => {
    async function loadInitialWeather() {
      try {
        const res = await fetch('/api/weather?city=Greater%20Noida%2C%20Uttar%20Pradesh');
        if (res.ok) {
          const data: WeatherData = await res.json();
          setWeather(data);
        }
      } catch (e) {
        console.error('Initial weather fetch error:', e);
      }
    }
    loadInitialWeather();
  }, []);

  // Handler when user triggers scan from 15-day batch tracker
  const handleScanLeafForBatch = (batch: CropBatch, dayNumber: number) => {
    setActiveTab('scanner');
    // Scroll smoothly to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler when diagnosis finishes: auto-log into active crop batch
  const handleDiagnosisSuccess = (report: DiagnosisReport, imageUrl: string) => {
    try {
      const saved = localStorage.getItem('agrovision_crop_batches');
      if (saved) {
        const batches: CropBatch[] = JSON.parse(saved);
        if (batches.length > 0) {
          const active = batches[0];
          const newRecord: InspectionRecord = {
            id: `insp_${Date.now()}`,
            dayNumber: active.currentDay || 30,
            date: new Date().toISOString().split('T')[0],
            imageThumbnail: imageUrl,
            conditionName: report.conditionName,
            healthStatus: report.severityLevel === 'Healthy Baseline' ? 'Healthy' : 'Diseased',
            confidenceScore: report.confidenceScore,
            remedyApplied: report.organicRemedies?.[0]?.name 
              ? `${report.organicRemedies[0].name} (${report.organicRemedies[0].dosage})`
              : 'Routine preventative foliar care',
            notes: report.diseaseOverview?.slice(0, 90) || 'Automated 15-day vision inspection checkpoint.'
          };

          active.inspections.unshift(newRecord);
          localStorage.setItem('agrovision_crop_batches', JSON.stringify(batches));
        }
      }
    } catch (e) {
      console.error('Error auto-logging inspection:', e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Sticky Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        weather={weather}
        lang={lang}
        setLang={setLang}
      />

      {/* Main Dynamic Viewport */}
      <main className="flex-1 pb-16">
        {activeTab === 'scanner' && (
          <DiagnosticScanner
            onDiagnosisSuccess={handleDiagnosisSuccess}
            lang={lang}
          />
        )}

        {activeTab === 'tracker' && (
          <CropTracker
            onScanLeafForBatch={handleScanLeafForBatch}
            lang={lang}
          />
        )}

        {activeTab === 'weather' && (
          <WeatherAdvisor
            weather={weather}
            onWeatherUpdate={setWeather}
            lang={lang}
          />
        )}

        {activeTab === 'guide' && (
          <CultivationGuide lang={lang} />
        )}

        {activeTab === 'aktu' && (
          <AcademicDossier lang={lang} />
        )}
      </main>

      {/* University Submission Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-6 px-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Sprout className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-bold text-slate-200">AgroVision AI</span> — Tomato Leaf Pathology & Cure Advisory
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>B.Tech CSE-AIML Mini Project</span>
            <span>•</span>
            <span>Bhagirath Raj (2501721530027)</span>
            <span>•</span>
            <span>AKTU Lucknow & LIET Greater Noida</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
