import React, { useState, useEffect } from 'react';
import { 
  CloudSun, 
  Thermometer, 
  Droplets, 
  Wind, 
  CloudRain, 
  AlertTriangle, 
  CheckCircle2, 
  MapPin, 
  Search, 
  CalendarCheck, 
  Sprout, 
  Compass,
  ShieldAlert,
  SunMedium
} from 'lucide-react';
import { WeatherData } from '../types';

interface WeatherAdvisorProps {
  weather: WeatherData | null;
  onWeatherUpdate: (data: WeatherData) => void;
  lang: 'en' | 'hi';
}

const PRESET_LOCATIONS = [
  { name: 'Greater Noida (AKTU LIET)', lat: 28.4744, lon: 77.5040 },
  { name: 'Lucknow (AKTU Central)', lat: 26.8467, lon: 80.9462 },
  { name: 'Agra (Western UP)', lat: 27.1767, lon: 78.0081 },
  { name: 'Varanasi (Eastern UP)', lat: 25.3176, lon: 82.9739 },
  { name: 'Meerut (NCR Farming)', lat: 28.9845, lon: 77.7064 },
  { name: 'Nashik (Major Tomato Belt)', lat: 19.9975, lon: 73.7898 },
  { name: 'Bengaluru (Karnataka)', lat: 12.9716, lon: 77.5946 },
];

export const WeatherAdvisor: React.FC<WeatherAdvisorProps> = ({
  weather,
  onWeatherUpdate,
  lang,
}) => {
  const [selectedLocation, setSelectedLocation] = useState<string>(
    weather?.location || 'Greater Noida (AKTU LIET)'
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [customCity, setCustomCity] = useState<string>('');

  const fetchWeather = async (lat: number, lon: number, cityName: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}&city=${encodeURIComponent(cityName)}`);
      if (res.ok) {
        const data: WeatherData = await res.json();
        onWeatherUpdate(data);
        setSelectedLocation(cityName);
      }
    } catch (e) {
      console.error('Weather fetch error:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetchWeather(pos.coords.latitude, pos.coords.longitude, 'My Farm GPS Location');
        },
        () => {
          alert('GPS permission was denied or unavailable.');
        }
      );
    }
  };

  const handleSearchCity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customCity.trim()) return;

    // Use Open-Meteo geocoding to resolve city
    try {
      setIsLoading(true);
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(customCity)}&count=1&language=en&format=json`);
      const geoData = await geoRes.json();
      if (geoData.results && geoData.results[0]) {
        const result = geoData.results[0];
        fetchWeather(result.latitude, result.longitude, `${result.name}, ${result.country || ''}`);
        setCustomCity('');
      } else {
        alert('Could not find location. Please check spelling.');
      }
    } catch (err) {
      console.error('Geocoding error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const evalInfo = weather?.agronomicEvaluation;
  const current = weather?.current;

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-teal-950 p-6 sm:p-8 rounded-3xl border border-teal-500/30 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold mb-2 border border-teal-500/30">
            <CloudSun className="w-3.5 h-3.5 text-teal-400" />
            {lang === 'hi' ? 'रीयल-टाइम मौसम एवं रोपाई सलाहकार' : 'Real-Time Agro-Meteorology & Sowing Intelligence'}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {lang === 'hi' ? 'मौसम पूर्वानुमान व पौधा लगाने का सही समय' : 'Weather Forecast & Optimal Tomato Planting Calendar'}
          </h1>
          <p className="mt-1 text-slate-300 text-xs sm:text-sm max-w-2xl">
            {lang === 'hi'
              ? 'वर्तमान मौसम और नमी के अनुसार जानें कि आज टमाटर का पौधा लगाना कितना उचित है तथा क्या आगामी दिनों में फफूंद या ब्लाइट रोग का जोखिम है।'
              : 'Real-time microclimate analysis determining planting suitability windows, disease infection risks (Early & Late Blight), and timely preventative advisories.'}
          </p>
        </div>

        {/* GPS Button */}
        <button
          onClick={handleUseGPS}
          disabled={isLoading}
          className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-700 flex items-center gap-2 cursor-pointer transition shadow"
        >
          <Compass className="w-4 h-4 text-emerald-400" />
          <span>{lang === 'hi' ? 'मेरा GPS स्थान उपयोग करें' : 'Detect My Farm Location'}</span>
        </button>
      </div>

      {/* Location Selector Bar */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 shadow-lg">
        {/* Preset Location Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-2xl scrollbar-none">
          {PRESET_LOCATIONS.map((loc) => (
            <button
              key={loc.name}
              onClick={() => fetchWeather(loc.lat, loc.lon, loc.name)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap cursor-pointer transition ${
                selectedLocation === loc.name
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {loc.name}
            </button>
          ))}
        </div>

        {/* City Search Box */}
        <form onSubmit={handleSearchCity} className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={customCity}
              onChange={(e) => setCustomCity(e.target.value)}
              placeholder="Search district / city..."
              className="bg-slate-950 border border-slate-800 text-slate-200 text-xs pl-8 pr-3 py-1.5 rounded-xl focus:border-emerald-500 focus:outline-none w-44 sm:w-56"
            />
          </div>
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-3 py-1.5 rounded-xl cursor-pointer"
          >
            Find
          </button>
        </form>
      </div>

      {/* Current Weather Cards & Planting Evaluation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Planting Suitability & Disease Warning (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Planting Suitability Verdict Card */}
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  {lang === 'hi' ? 'टमाटर रोपाई मूल्यांकन' : 'Agronomic Planting Index'}
                </span>
                <div className="flex items-center gap-3 mt-1">
                  <h2 className="text-2xl font-black text-white">
                    {lang === 'hi' ? 'पौधा लगाने का समय:' : 'Planting Suitability:'}
                  </h2>
                  <span
                    className={`text-sm font-black px-3 py-1 rounded-full uppercase border ${
                      evalInfo?.plantingSuitability === 'Excellent'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : evalInfo?.plantingSuitability === 'Good'
                        ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                        : evalInfo?.plantingSuitability === 'Moderate'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-red-500/20 text-red-300 border-red-500/40'
                    }`}
                  >
                    {evalInfo?.plantingSuitability || 'Good'}
                  </span>
                </div>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Sprout className="w-6 h-6" />
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/70 p-4 rounded-2xl border border-slate-850">
              {evalInfo?.plantingReason || 'Ideal thermal conditions for tomato seed germination and root formation.'}
            </p>

            {/* Microclimate Disease Alert */}
            <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span>{lang === 'hi' ? 'फफूंद / रोग जोखिम चेतावनी' : 'Foliar Disease Microclimate Alert'}</span>
              </div>
              <p className="text-xs text-amber-100/90 leading-relaxed">
                {evalInfo?.diseaseVulnerabilityAlert || 'Low disease pressure under current ambient humidity.'}
              </p>
            </div>

            {/* Key Agronomic Thresholds */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-850">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Ideal Temperature</span>
                <span className="block text-xs font-semibold text-emerald-400 mt-1">18°C – 28°C</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-850">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Soil Temperature</span>
                <span className="block text-xs font-semibold text-teal-300 mt-1">
                  {evalInfo?.soilTemperatureRecommendation || '20°C – 25°C'}
                </span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 col-span-2 sm:col-span-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Season Cycle</span>
                <span className="block text-xs font-semibold text-amber-300 mt-1">Rabi & Kharif Seasons</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Meter Metrics & 7-Day Forecast (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Live Conditions Card */}
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-slate-200">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-sm truncate max-w-[200px]">
                  {weather?.location || 'Greater Noida'}
                </span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full">
                Live Data
              </span>
            </div>

            {/* Big Temperature Hero */}
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="text-5xl font-black text-white tracking-tight">
                  {current?.temperature ?? 25.4}°C
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  {current?.temperature && current.temperature > 28
                    ? 'Warm - Shade nursery trays'
                    : current?.temperature && current.temperature < 16
                    ? 'Cool - Protect from frost'
                    : 'Optimal for vegetative growth'}
                </div>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <SunMedium className="w-9 h-9" />
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-2.5 pt-2">
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-850 text-center">
                <Droplets className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Humidity</span>
                <span className="text-sm font-bold text-white">{current?.humidity ?? 62}%</span>
                <span className="text-[9px] text-slate-400 block mt-0.5">
                  {(current?.humidity ?? 62) > 75 ? '⚠️ High Blight' : 'Normal'}
                </span>
              </div>

              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-850 text-center">
                <Wind className="w-4 h-4 text-teal-400 mx-auto mb-1" />
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Wind</span>
                <span className="text-sm font-bold text-white">{current?.windSpeed ?? 9} km/h</span>
                <span className="text-[9px] text-slate-400 block mt-0.5">Safe for Spray</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-850 text-center">
                <CloudRain className="w-4 h-4 text-indigo-400 mx-auto mb-1" />
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Rainfall</span>
                <span className="text-sm font-bold text-white">{current?.precipitation ?? 0} mm</span>
                <span className="text-[9px] text-slate-400 block mt-0.5">Keep Leaves Dry</span>
              </div>
            </div>
          </div>

          {/* 7-Day Forecast Ticker */}
          {weather?.daily && weather.daily.time && (
            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-5 shadow-xl space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <CalendarCheck className="w-3.5 h-3.5 text-teal-400" />
                <span>{lang === 'hi' ? '7-दिवसीय कृषि मौसम पूर्वानुमान' : '7-Day Agronomic Forecast'}</span>
              </h3>

              <div className="space-y-2">
                {weather.daily.time.slice(0, 5).map((dayStr, idx) => {
                  const maxT = weather.daily?.temperature_2m_max?.[idx] ?? 28;
                  const minT = weather.daily?.temperature_2m_min?.[idx] ?? 18;
                  const rainProb = weather.daily?.precipitation_probability_max?.[idx] ?? 0;
                  const date = new Date(dayStr);
                  const dayName = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

                  return (
                    <div
                      key={dayStr}
                      className="bg-slate-950 p-2.5 rounded-xl border border-slate-850 flex items-center justify-between text-xs"
                    >
                      <span className="font-semibold text-slate-300 w-28">{dayName}</span>
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Droplets className="w-3 h-3 text-blue-400" />
                        <span>{rainProb}% rain</span>
                      </div>
                      <div className="font-mono text-right">
                        <span className="text-amber-400 font-bold">{Math.round(maxT)}°</span>
                        <span className="text-slate-500 mx-1">/</span>
                        <span className="text-teal-400">{Math.round(minT)}°</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
