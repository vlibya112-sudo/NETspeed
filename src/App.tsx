import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Gauge,
  Circle,
  DollarSign,
  Search,
  BookOpen,
  Award,
  Layers,
  ShieldCheck,
  X,
  TrendingUp,
  ArrowDown,
  ArrowUp,
  Activity,
  Zap,
  History,
  Trash2,
  Share2,
  Gamepad2
} from 'lucide-react';


import { TestPhase, SpeedResult, ServerLocation, ColorThemeId } from './types';
import { SERVERS, ADSENSE_BLUEPRINT } from './data/mockData';
import { COLOR_THEMES } from './data/themes';
import { SpeedEngine } from './utils/speedEngine';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Speedometer } from './components/Speedometer';
import { AdSenseBanner } from './components/AdSenseBanner';
import { DwellTimeTools } from './components/DwellTimeTools';
import { AdSenseBlueprint } from './components/AdSenseBlueprint';
import { SEOLandingPages } from './components/SEOLandingPages';
import { TechnicalFeasibilityStudy } from './components/TechnicalFeasibilityStudy';
import { SpeedCertificate } from './components/SpeedCertificate';
import { ThemePickerModal } from './components/ThemePickerModal';
import { AIDiagnosticModal } from './components/AIDiagnosticModal';
import { Palette, Check, Bot } from 'lucide-react';


export default function App() {
  const [currentView, setCurrentView] = useState<'test' | 'dwell' | 'adsense' | 'seo' | 'study'>('test');
  const [blueprintMode, setBlueprintMode] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  
  // Theme state
  const [themeId, setThemeId] = useState<ColorThemeId>('cyan');
  const [customAccent, setCustomAccent] = useState<string | null>(null);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState<boolean>(false);
  const [isAIDiagnosticsOpen, setIsAIDiagnosticsOpen] = useState<boolean>(false);

  // Speed test engine state
  const [phase, setPhase] = useState<TestPhase>('idle');
  const [currentSpeed, setCurrentSpeed] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [stats, setStats] = useState<Partial<SpeedResult>>({
    download: 0,
    upload: 0,
    ping: 0,
    jitter: 0,
    isp: 'الاتصالات المتنقلة (5G Edge)',
    ip: '176.44.82.119',
    bufferbloatScore: 'A+'
  });
  const [selectedServer, setSelectedServer] = useState<ServerLocation>(SERVERS[0]);
  const [lastResult, setLastResult] = useState<SpeedResult | null>(null);
  const [showCertificate, setShowCertificate] = useState<boolean>(false);
  const [testHistory, setTestHistory] = useState<SpeedResult[]>([]);
  const [stickyAdVisible, setStickyAdVisible] = useState<boolean>(true);

  const engineRef = useRef<SpeedEngine | null>(null);

  useEffect(() => {
    engineRef.current = new SpeedEngine();
    // Load local history if available
    try {
      const saved = localStorage.getItem('speed_test_history');
      if (saved) {
        setTestHistory(JSON.parse(saved));
      }
      const savedTheme = localStorage.getItem('netspeed_theme_id') as ColorThemeId;
      if (savedTheme && COLOR_THEMES[savedTheme]) {
        setThemeId(savedTheme);
      }
      const savedCustom = localStorage.getItem('netspeed_custom_accent');
      if (savedCustom) {
        setCustomAccent(savedCustom);
      }
    } catch {}

    // Apply dark mode class to html
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSelectTheme = (newThemeId: ColorThemeId) => {
    setThemeId(newThemeId);
    try {
      localStorage.setItem('netspeed_theme_id', newThemeId);
    } catch {}
  };

  const handleSelectCustomAccent = (accent: string | null) => {
    setCustomAccent(accent);
    try {
      if (accent) {
        localStorage.setItem('netspeed_custom_accent', accent);
      } else {
        localStorage.removeItem('netspeed_custom_accent');
      }
    } catch {}
  };

  const handleStartTest = async () => {
    if (!engineRef.current) return;
    setPhase('ping');
    setCurrentSpeed(0);
    setProgress(0);

    const result = await engineRef.current.runFullTest(
      selectedServer,
      (newPhase, speed, currentProg, currentStats) => {
        setPhase(newPhase);
        setCurrentSpeed(speed);
        setProgress(currentProg);
        setStats(currentStats);
      }
    );

    setLastResult(result);
    setTestHistory(prev => {
      const updated = [result, ...prev].slice(0, 10);
      try {
        localStorage.setItem('speed_test_history', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    // Trigger celebratory confetti on high speed results
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  const handleCancelTest = () => {
    if (engineRef.current) {
      engineRef.current.cancelTest();
    }
    setPhase('idle');
    setCurrentSpeed(0);
    setProgress(0);
  };

  const clearHistory = () => {
    setTestHistory([]);
    try {
      localStorage.removeItem('speed_test_history');
    } catch {}
  };

  // Find specific Ad configs
  const topAdUnit = ADSENSE_BLUEPRINT.find(a => a.id === 'top-leaderboard') || ADSENSE_BLUEPRINT[0];
  const underGaugeAdUnit = ADSENSE_BLUEPRINT.find(a => a.id === 'under-speedometer') || ADSENSE_BLUEPRINT[1];
  const nativeInFeedAdUnit = ADSENSE_BLUEPRINT.find(a => a.id === 'post-result-native') || ADSENSE_BLUEPRINT[2];
  const stickyAnchorAdUnit = ADSENSE_BLUEPRINT.find(a => a.id === 'sticky-footer-anchor') || ADSENSE_BLUEPRINT[3];
  const sidebarAdUnit = ADSENSE_BLUEPRINT.find(a => a.id === 'sidebar-halfpage') || ADSENSE_BLUEPRINT[4];

  const currentTheme = COLOR_THEMES[themeId] || COLOR_THEMES.cyan;
  const accentColor = customAccent || currentTheme.accent;

  return (
    <div className={`min-h-screen font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors ${darkMode ? 'dark' : ''} pb-20`} dir="rtl">
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onSelectView={setCurrentView}
        blueprintMode={blueprintMode}
        onToggleBlueprint={() => setBlueprintMode(!blueprintMode)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        currentTheme={currentTheme}
        customAccent={customAccent}
        onOpenThemeModal={() => setIsThemeModalOpen(true)}
        onOpenAIDiagnostics={() => setIsAIDiagnosticsOpen(true)}
      />

      {/* Blueprint Mode Active Banner notification */}
      {blueprintMode && (
        <div className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white px-4 py-2 text-xs font-bold shadow-md flex items-center justify-between">
          <div className="max-w-7xl mx-auto flex items-center gap-2">
            <Layers className="w-4 h-4 animate-bounce" />
            <span>
              <strong>وضع دراسة وتوزيع إعلانات Google AdSense نشط:</strong> تظهر الآن جميع الوحدات الإعلانية مع حساب الـ RPM المتوقع، معدلات النقر (CTR)، وشروط الأمان وتوافق السياسات.
            </span>
          </div>
          <button
            onClick={() => setBlueprintMode(false)}
            className="text-white hover:text-amber-200 cursor-pointer font-bold mr-4"
          >
            ✕ إغلاق
          </button>
        </div>
      )}

      {/* Floating / Inline Quick Theme Palette Switcher */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-2xl shadow-xs">
          <Palette className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-bold text-slate-600 dark:text-slate-300 text-[11px]">لون السمة (Theme):</span>
          <div className="flex items-center gap-1.5 mr-1">
            {(Object.keys(COLOR_THEMES) as ColorThemeId[]).map((tId) => {
              const th = COLOR_THEMES[tId];
              const isActive = themeId === tId && !customAccent;
              return (
                <button
                  key={tId}
                  onClick={() => {
                    handleSelectCustomAccent(null);
                    handleSelectTheme(tId);
                  }}
                  title={th.nameAr}
                  className={`w-5 h-5 rounded-full transition-transform cursor-pointer border flex items-center justify-center ${
                    isActive ? 'scale-125 ring-2 ring-slate-400 dark:ring-slate-500 border-white' : 'hover:scale-110 border-transparent opacity-80'
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${th.gradientFrom}, ${th.gradientTo})`
                  }}
                >
                  {isActive && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => setIsThemeModalOpen(true)}
            className="text-[11px] font-bold text-cyan-600 dark:text-cyan-400 hover:underline mr-2 cursor-pointer"
            style={{ color: accentColor }}
          >
            المزيد +
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>السمة المطبقة: <strong>{customAccent ? `مخصص (${customAccent})` : currentTheme.nameAr}</strong></span>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-3 space-y-8">
        
        {/* VIEW 1: SPEED TEST MAIN VIEW */}
        {currentView === 'test' && (
          <div className="space-y-8">
            {/* Top Responsive Ad Unit (728x90) */}
            <div className="w-full max-w-4xl mx-auto">
              <AdSenseBanner
                unit={topAdUnit}
                blueprintMode={blueprintMode}
              />
            </div>

            {/* Main Speedometer Section */}
            <section id="speedometer-section" className="w-full max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
              <Speedometer
                phase={phase}
                currentSpeed={currentSpeed}
                progress={progress}
                stats={stats}
                selectedServer={selectedServer}
                onSelectServer={setSelectedServer}
                onStartTest={handleStartTest}
                onCancelTest={handleCancelTest}
                onOpenAIDiagnostics={() => setIsAIDiagnosticsOpen(true)}
                currentTheme={currentTheme}
                customAccent={customAccent}
              />

              {/* High Viewability Under-Speedometer Ad Slot (336x280) */}
              <div className="w-full max-w-lg mx-auto mt-6 pt-6 border-t border-slate-100 dark:border-slate-800/80">
                <AdSenseBanner
                  unit={underGaugeAdUnit}
                  blueprintMode={blueprintMode}
                />
              </div>

              {/* Action Bar when test completes: Certificate & Details & Gemini AI */}
              {phase === 'complete' && lastResult && (
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3 animate-fade-in">
                  <button
                    id="btn-open-ai-analysis-completed"
                    onClick={() => setIsAIDiagnosticsOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs shadow-md hover:scale-105 transition cursor-pointer"
                  >
                    <Circle className="w-4 h-4 text-amber-300 animate-pulse" />
                    <span>تحليل الخط بالذكاء الاصطناعي (Gemini)</span>
                  </button>

                  <button
                    id="btn-open-certificate"
                    onClick={() => setShowCertificate(true)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-xs shadow-md hover:scale-105 transition cursor-pointer"
                  >
                    <Award className="w-4 h-4" />
                    <span>عرض ومشاركة بطاقة السرعة (Speed Certificate)</span>
                  </button>

                  <button
                    id="btn-jump-to-dwell"
                    onClick={() => setCurrentView('dwell')}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-bold text-xs hover:bg-black transition cursor-pointer"
                  >
                    <Gamepad2 className="w-4 h-4 text-cyan-400" />
                    <span>فحص توافق خطك لألعاب ببجي وفيفا و 4K</span>
                  </button>
                </div>
              )}
            </section>

            {/* Native In-Feed Recommendation Ad (Between Speedometer & Dwell Tools) */}
            <div className="w-full max-w-4xl mx-auto">
              <AdSenseBanner
                unit={nativeInFeedAdUnit}
                blueprintMode={blueprintMode}
              />
            </div>

            {/* Quick Engagement Dwell Time Section */}
            <section className="w-full max-w-4xl mx-auto space-y-4">
              <DwellTimeTools stats={stats} />
            </section>

            {/* Test History Drawer / Table */}
            {testHistory.length > 0 && (
              <section className="w-full max-w-4xl mx-auto p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-800 dark:text-slate-200">
                    <History className="w-4 h-4 text-cyan-500" />
                    <span>سجل القياسات السابقة (Speed History)</span>
                  </div>
                  <button
                    onClick={clearHistory}
                    className="flex items-center gap-1 text-[11px] text-red-500 hover:text-red-700 cursor-pointer font-semibold"
                  >
                    <Trash2 className="w-3 h-3" /> مسح السجل
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead>
                      <tr className="text-slate-400 border-b border-slate-100 dark:border-slate-800">
                        <th className="py-2 pr-2 font-medium">الوقت</th>
                        <th className="py-2 font-medium">التنزيل</th>
                        <th className="py-2 font-medium">الرفع</th>
                        <th className="py-2 font-medium">البينج</th>
                        <th className="py-2 font-medium">التقييم</th>
                        <th className="py-2 font-medium">المزود</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                      {testHistory.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-850/50">
                          <td className="py-2.5 pr-2 font-sans text-slate-500">{item.timestamp}</td>
                          <td className="py-2.5 font-bold text-cyan-600 dark:text-cyan-400">{item.download} Mbps</td>
                          <td className="py-2.5 font-bold text-purple-600 dark:text-purple-400">{item.upload} Mbps</td>
                          <td className="py-2.5 font-bold text-amber-600 dark:text-amber-400">{item.ping} ms</td>
                          <td className="py-2.5 font-sans font-bold text-emerald-600">{item.bufferbloatScore}</td>
                          <td className="py-2.5 font-sans text-[11px] text-slate-400 truncate max-w-[150px]">{item.isp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
          </div>
        )}

        {/* VIEW 2: DWELL TIME & ENGAGEMENT TOOLS */}
        {currentView === 'dwell' && (
          <div className="max-w-5xl mx-auto space-y-6">
            <DwellTimeTools stats={stats} />
          </div>
        )}

        {/* VIEW 3: ADSENSE STRATEGY & BLUEPRINT */}
        {currentView === 'adsense' && (
          <div className="max-w-5xl mx-auto space-y-6">
            <AdSenseBlueprint />
          </div>
        )}

        {/* VIEW 4: SEO LANDING PAGES */}
        {currentView === 'seo' && (
          <div className="max-w-5xl mx-auto space-y-6">
            <SEOLandingPages />
          </div>
        )}

        {/* VIEW 5: TECHNICAL & COMMERCIAL FEASIBILITY STUDY */}
        {currentView === 'study' && (
          <div className="max-w-5xl mx-auto space-y-6">
            <TechnicalFeasibilityStudy />
          </div>
        )}

      </main>

      {/* Speed Certificate Modal */}
      {showCertificate && lastResult && (
        <SpeedCertificate
          result={lastResult}
          onClose={() => setShowCertificate(false)}
        />
      )}

      {/* Theme Picker Modal */}
      <ThemePickerModal
        currentThemeId={themeId}
        onSelectTheme={handleSelectTheme}
        customAccent={customAccent}
        onSelectCustomAccent={handleSelectCustomAccent}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
      />

      {/* AI Network Diagnostics Modal (Gemini 3.7) */}
      <AIDiagnosticModal
        isOpen={isAIDiagnosticsOpen}
        onClose={() => setIsAIDiagnosticsOpen(false)}
        result={lastResult}
        server={selectedServer}
        accentColor={accentColor}
      />

      {/* Compliant Sticky Anchor Ad Container */}
      {stickyAdVisible && (
        <aside
          id="sticky-adsense-anchor"
          aria-label="Sponsored advertisement banner"
          className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-slate-900/95 border-t border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-md px-4 py-2 flex items-center justify-between gap-4 max-w-4xl mx-auto rounded-t-2xl"
        >
          <div className="flex-1 overflow-hidden">
            <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
              <span>إعلان مثبت متوافق • STICKY AD</span>
              <span className="text-emerald-600 font-bold">RPM ~$8.50</span>
            </div>
            <div className="flex items-center justify-center h-10 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-500 ml-1.5" />
              <span>مساحة إعلانات جوجل أدسنس السفلية المتجاوبة (Anchor Unit)</span>
            </div>
          </div>
          <button
            onClick={() => setStickyAdVisible(false)}
            aria-label="إغلاق الإعلان"
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold p-1 cursor-pointer"
          >
            ✕
          </button>
        </aside>
      )}

      {/* Global Footer */}
      <Footer onSelectView={setCurrentView} />
    </div>
  );
}
