import React from 'react';
import { Gauge, Circle, DollarSign, Search, BookOpen, Sun, Moon, Layers, Palette } from 'lucide-react';
import { ColorTheme } from '../types';

interface NavbarProps {
  currentView: 'test' | 'dwell' | 'adsense' | 'seo' | 'study';
  onSelectView: (view: 'test' | 'dwell' | 'adsense' | 'seo' | 'study') => void;
  blueprintMode: boolean;
  onToggleBlueprint: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  currentTheme: ColorTheme;
  customAccent: string | null;
  onOpenThemeModal: () => void;
  onOpenAIDiagnostics?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onSelectView,
  blueprintMode,
  onToggleBlueprint,
  darkMode,
  onToggleDarkMode,
  currentTheme,
  customAccent,
  onOpenThemeModal,
  onOpenAIDiagnostics
}) => {
  const accentColor = customAccent || currentTheme.accent;

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <div
          onClick={() => onSelectView('test')}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform"
            style={{
              background: `linear-gradient(135deg, ${customAccent || currentTheme.gradientFrom}, ${currentTheme.gradientTo})`
            }}
          >
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-black text-slate-900 dark:text-white text-base tracking-tight">
              <span>NetSpeed</span>
              <span style={{ color: accentColor }} className="font-extrabold">PRO</span>
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
              قياس سرعة فائق ودراسة AdSense
            </div>
          </div>
        </div>

        {/* Center Desktop Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-900/80 p-1 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 text-xs font-bold">
          <button
            id="nav-btn-speedtest"
            onClick={() => onSelectView('test')}
            className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
              currentView === 'test'
                ? 'bg-white dark:bg-slate-800 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
            style={{
              color: currentView === 'test' ? accentColor : undefined
            }}
          >
            <Gauge className="w-4 h-4" />
            <span>فحص السرعة</span>
          </button>

          <button
            id="nav-btn-dwell"
            onClick={() => onSelectView('dwell')}
            className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
              currentView === 'dwell'
                ? 'bg-white dark:bg-slate-800 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
            style={{
              color: currentView === 'dwell' ? accentColor : undefined
            }}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>أدوات الألعاب والمزودين</span>
          </button>

          <button
            id="nav-btn-adsense"
            onClick={() => onSelectView('adsense')}
            className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
              currentView === 'adsense'
                ? 'bg-white dark:bg-slate-800 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
            style={{
              color: currentView === 'adsense' ? accentColor : undefined
            }}
          >
            <DollarSign className="w-4 h-4 text-emerald-500" />
            <span>خطة أرباح AdSense</span>
          </button>

          <button
            id="nav-btn-seo"
            onClick={() => onSelectView('seo')}
            className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
              currentView === 'seo'
                ? 'bg-white dark:bg-slate-800 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
            style={{
              color: currentView === 'seo' ? accentColor : undefined
            }}
          >
            <Search className="w-4 h-4 text-blue-500" />
            <span>صفحات السيو (SEO Hub)</span>
          </button>

          <button
            id="nav-btn-study"
            onClick={() => onSelectView('study')}
            className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
              currentView === 'study'
                ? 'bg-white dark:bg-slate-800 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
            style={{
              color: currentView === 'study' ? accentColor : undefined
            }}
          >
            <BookOpen className="w-4 h-4 text-purple-500" />
            <span>دراسة الجدوى المتكاملة</span>
          </button>
        </nav>

        {/* Right Actions: AI Diagnosis + Color Theme Selector + AdSense Blueprint Toggle & Dark mode switch */}
        <div className="flex items-center gap-2">
          {/* Gemini AI Diagnostics Button */}
          {onOpenAIDiagnostics && (
            <button
              id="btn-nav-open-ai"
              onClick={onOpenAIDiagnostics}
              title="محلل الاتصال والشبكة الذكي عبر Gemini"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
              <span className="hidden sm:inline">محلل Gemini</span>
            </button>
          )}

          {/* Color Palette Picker Button */}
          <button
            id="btn-open-color-theme"
            onClick={onOpenThemeModal}
            title="تغيير ألوان وتصميم التطبيق"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
          >
            <div
              className="w-3.5 h-3.5 rounded-full border border-white/60 shadow-xs"
              style={{ backgroundColor: accentColor }}
            />
            <span className="hidden sm:inline">الألوان</span>
            <Palette className="w-3.5 h-3.5 text-slate-400 sm:hidden" />
          </button>

          {/* AdSense Blueprint Mode Toggle */}
          <button
            id="btn-toggle-blueprint-mode"
            onClick={onToggleBlueprint}
            title="تبديل وضع خريطة وتحليل إعلانات أدسنس"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              blueprintMode
                ? 'bg-amber-500 text-white shadow-sm ring-2 ring-amber-400/30 animate-pulse'
                : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900/50 hover:bg-amber-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span className="hidden md:inline">
              {blueprintMode ? 'وضع الإعلانات (نشط)' : 'خريطة AdSense'}
            </span>
          </button>

          {/* Dark / Light Toggle */}
          <button
            id="btn-toggle-dark-mode"
            onClick={onToggleDarkMode}
            aria-label="Toggle Dark Mode"
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="lg:hidden flex items-center justify-around px-2 py-2 bg-slate-50 dark:bg-slate-900 border-t border-slate-200/60 dark:border-slate-800/60 text-[11px] font-bold overflow-x-auto">
        <button
          onClick={() => onSelectView('test')}
          className={`px-2 py-1 rounded-lg ${currentView === 'test' ? 'bg-white dark:bg-slate-800' : 'text-slate-500'}`}
          style={{ color: currentView === 'test' ? accentColor : undefined }}
        >
          فحص السرعة
        </button>
        <button
          onClick={() => onSelectView('dwell')}
          className={`px-2 py-1 rounded-lg ${currentView === 'dwell' ? 'bg-white dark:bg-slate-800' : 'text-slate-500'}`}
          style={{ color: currentView === 'dwell' ? accentColor : undefined }}
        >
          الألعاب
        </button>
        <button
          onClick={() => onSelectView('adsense')}
          className={`px-2 py-1 rounded-lg ${currentView === 'adsense' ? 'bg-white dark:bg-slate-800' : 'text-slate-500'}`}
          style={{ color: currentView === 'adsense' ? accentColor : undefined }}
        >
          AdSense
        </button>
        <button
          onClick={() => onSelectView('seo')}
          className={`px-2 py-1 rounded-lg ${currentView === 'seo' ? 'bg-white dark:bg-slate-800' : 'text-slate-500'}`}
          style={{ color: currentView === 'seo' ? accentColor : undefined }}
        >
          السيو
        </button>
        <button
          onClick={() => onSelectView('study')}
          className={`px-2 py-1 rounded-lg ${currentView === 'study' ? 'bg-white dark:bg-slate-800' : 'text-slate-500'}`}
          style={{ color: currentView === 'study' ? accentColor : undefined }}
        >
          دراسة الجدوى
        </button>
      </div>
    </header>
  );
};

