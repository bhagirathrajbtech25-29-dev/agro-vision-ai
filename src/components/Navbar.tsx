import React from 'react';
import { 
  Sprout, 
  Stethoscope, 
  CalendarClock, 
  CloudSun, 
  BookOpen, 
  GraduationCap, 
  MapPin, 
  Thermometer, 
  Droplets,
  Languages
} from 'lucide-react';
import { WeatherData } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  weather: WeatherData | null;
  lang: 'en' | 'hi';
  setLang: (lang: 'en' | 'hi') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  weather,
  lang,
  setLang,
}) => {
  const tabs = [
    {
      id: 'scanner',
      label: lang === 'hi' ? 'पत्ती डॉक्टर (AI जांच)' : 'Leaf Doctor (AI Scan)',
      icon: Stethoscope,
      badge: 'Live AI',
    },
    {
      id: 'tracker',
      label: lang === 'hi' ? '15-दिन फसल ट्रैकर' : '15-Day Crop Tracker',
      icon: CalendarClock,
      badge: 'Auto Alerts',
    },
    {
      id: 'weather',
      label: lang === 'hi' ? 'मौसम व बुवाई समय' : 'Weather & Sowing',
      icon: CloudSun,
      badge: weather?.agronomicEvaluation?.plantingSuitability || 'Live',
    },
    {
      id: 'guide',
      label: lang === 'hi' ? 'टमाटर खेती गाइड' : 'Cultivation Guide',
      icon: BookOpen,
      badge: 'Masterclass',
    },
    {
      id: 'aktu',
      label: lang === 'hi' ? 'AKTU प्रोजेक्ट रिपोर्ट' : 'AKTU Project Dossier',
      icon: GraduationCap,
      badge: 'B.Tech AIML',
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-emerald-500/20 shadow-lg text-slate-100">
      {/* Top Banner: AKTU Student Submission & Live Weather Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 px-4 py-1.5 text-xs border-b border-emerald-900/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-emerald-300">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold tracking-wide">
              AKTU Mini Project: Bhagirath Raj (Roll: 2501721530027)
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:inline text-slate-300">
              Guide: Mr. Abhishek Suraj • Lloyd Institute of Engineering & Technology
            </span>
          </div>

          <div className="flex items-center gap-3">
            {weather && (
              <div className="flex items-center gap-2 bg-emerald-900/50 px-2.5 py-0.5 rounded-full border border-emerald-700/50 text-emerald-200">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span className="truncate max-w-[140px]">{weather.location}</span>
                <span className="text-slate-400">•</span>
                <Thermometer className="w-3.5 h-3.5 text-amber-400" />
                <span>{weather.current.temperature}°C</span>
                <Droplets className="w-3.5 h-3.5 text-blue-400 ml-0.5" />
                <span>{weather.current.humidity}%</span>
              </div>
            )}

            <button
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1 rounded-full border border-slate-700 text-xs transition cursor-pointer"
              title="Toggle Hindi/English Language Mode"
            >
              <Languages className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'en' ? 'Hindi Mode' : 'English Mode'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <div 
          onClick={() => setActiveTab('scanner')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition">
            <Sprout className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-green-200 bg-clip-text text-transparent">
                AgroVision AI
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Research Grounded
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Tomato Foliage Pathology & Dynamic Remedy Advisory System
            </p>
          </div>
        </div>

        {/* Tab Navigation Buttons */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-400'}`} />
                <span className="hidden md:inline">{tab.label}</span>
                <span className="md:hidden">
                  {tab.id === 'scanner' ? 'Doctor' : 
                   tab.id === 'tracker' ? 'Tracker' : 
                   tab.id === 'weather' ? 'Weather' : 
                   tab.id === 'guide' ? 'Guide' : 'Report'}
                </span>

                {tab.badge && (
                  <span className={`hidden lg:inline text-[9px] px-1.5 py-0.2 rounded-full font-bold ml-1 ${
                    isActive 
                      ? 'bg-emerald-900/80 text-emerald-200' 
                      : 'bg-slate-800 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
