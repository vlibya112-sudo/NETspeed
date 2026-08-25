import React, { useState } from 'react';
import { Palette, Check, Sparkles, Sun, Moon, Info, Eye, Zap, Sliders, RotateCcw, X } from 'lucide-react';
import { ColorThemeId, ColorTheme } from '../types';
import { COLOR_THEMES, COLOR_PSYCHOLOGY } from '../data/themes';

interface ThemePickerModalProps {
  currentThemeId: ColorThemeId;
  onSelectTheme: (themeId: ColorThemeId) => void;
  customAccent: string | null;
  onSelectCustomAccent: (color: string | null) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export const ThemePickerModal: React.FC<ThemePickerModalProps> = ({
  currentThemeId,
  onSelectTheme,
  customAccent,
  onSelectCustomAccent,
  darkMode,
  onToggleDarkMode,
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'palettes' | 'psychology' | 'custom'>('palettes');

  if (!isOpen) return null;

  const currentTheme = COLOR_THEMES[currentThemeId];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in" dir="rtl">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-850/50">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-md transition-colors"
              style={{
                background: `linear-gradient(135deg, ${customAccent || currentTheme.gradientFrom}, ${currentTheme.gradientTo})`
              }}
            >
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                تخصيص ألوان وتصميم تطبيق الويب
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                اختر لوحة الألوان المناسبة أو خصص التدرج اللوني وعناصر الواجهة
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-slate-100 dark:border-slate-800 text-xs font-bold">
          <button
            onClick={() => setActiveTab('palettes')}
            className={`pb-3 px-3 border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'palettes'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>لوحات الألوان الجاهزة</span>
          </button>
          <button
            onClick={() => setActiveTab('psychology')}
            className={`pb-3 px-3 border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'psychology'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>سيكولوجية الألوان و AdSense</span>
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`pb-3 px-3 border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'custom'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>لون مخصص (Hex Picker)</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Quick Mode Toggle Bar */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-100/70 dark:bg-slate-805/70 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
              {darkMode ? <Moon className="w-4 h-4 text-purple-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
              <span>نمط العرض الحالي:</span>
              <span className="text-cyan-600 dark:text-cyan-400">{darkMode ? 'الوضع الليلي (Dark Mode)' : 'الوضع النهاري (Light Mode)'}</span>
            </div>
            <button
              onClick={onToggleDarkMode}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 shadow-xs hover:scale-105 transition cursor-pointer"
            >
              {darkMode ? 'التحويل للنهاري ☀️' : 'التحويل لليلي 🌙'}
            </button>
          </div>

          {/* TAB 1: CURATED PALETTES */}
          {activeTab === 'palettes' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.values(COLOR_THEMES).map((theme) => {
                  const isSelected = currentThemeId === theme.id && !customAccent;
                  return (
                    <div
                      key={theme.id}
                      onClick={() => {
                        onSelectCustomAccent(null);
                        onSelectTheme(theme.id);
                      }}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between group ${
                        isSelected
                          ? 'border-cyan-500 bg-cyan-50/40 dark:bg-cyan-950/30 shadow-md ring-2 ring-cyan-400/20'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Gradient preview circle */}
                        <div
                          className="w-9 h-9 rounded-full shadow-inner flex items-center justify-center text-white"
                          style={{
                            background: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})`
                          }}
                        >
                          {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                            {theme.nameAr}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {theme.nameEn}
                          </div>
                        </div>
                      </div>

                      {/* Mini Preview Bars */}
                      <div className="flex gap-1">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.gaugeGradient[0] }} />
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.gaugeGradient[1] }} />
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.gaugeGradient[2] }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: DESIGN & PSYCHOLOGY */}
          {activeTab === 'psychology' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2.5">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  <strong>معايير اختيار الألوان للمواقع الربحية (AdSense Optimization):</strong>
                  اختيار تباين ناعم للواجهة يرفع وقت القراءة دون إزعاج العين، بينما تدرج العداد يوجه نظر الزائر مباشرة لموقع الإعلانات المصاحبة.
                </span>
              </div>

              <div className="space-y-3">
                {COLOR_PSYCHOLOGY.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                        <span>{item.title}</span>
                      </h4>
                      <button
                        onClick={() => {
                          onSelectCustomAccent(null);
                          onSelectTheme(item.themeId as ColorThemeId);
                        }}
                        className="text-[11px] text-cyan-600 dark:text-cyan-400 font-bold hover:underline cursor-pointer"
                      >
                        تطبيق هذا النمط
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                      <strong>التأثير النفسي:</strong> {item.psychology}
                    </p>
                    <p className="text-[11px] text-emerald-700 dark:text-emerald-400 leading-relaxed font-medium">
                      <strong>تأثير AdSense:</strong> {item.adsenseImpact}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CUSTOM COLOR PICKER */}
          {activeTab === 'custom' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-xs text-slate-900 dark:text-white">
                    اختر لونك الأساسي المفضل (Custom Brand Accent):
                  </label>
                  {customAccent && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {customAccent}
                    </span>
                  )}
                </div>

                {/* Color input + presets */}
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    id="theme-custom-color-input"
                    value={customAccent || currentTheme.accent}
                    onChange={(e) => onSelectCustomAccent(e.target.value)}
                    className="w-14 h-14 rounded-2xl cursor-pointer border-2 border-slate-200 dark:border-slate-700 bg-transparent p-1"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="text-xs text-slate-700 dark:text-slate-300 font-semibold">
                      تطبيق اللون الحي على العداد والأزرار والهالات الضوئية
                    </div>
                    <div className="text-[11px] text-slate-400">
                      اضغط على المربع لاختيار أي درجة لونية أو اختر من التدرجات السريعة أدناه
                    </div>
                  </div>
                </div>

                {/* Preset Hex Swatches */}
                <div className="space-y-2 pt-2">
                  <div className="text-[11px] font-bold text-slate-500">ألوان سريعة مقترحة:</div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      '#06b6d4', '#3b82f6', '#6366f1', '#a855f7', 
                      '#ec4899', '#f43f5e', '#ef4444', '#f97316', 
                      '#f59e0b', '#10b981', '#14b8a6', '#0284c7'
                    ].map((hex) => (
                      <button
                        key={hex}
                        onClick={() => onSelectCustomAccent(hex)}
                        className="w-7 h-7 rounded-xl shadow-xs transition transform hover:scale-110 cursor-pointer border border-white/50"
                        style={{ backgroundColor: hex }}
                        title={hex}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {customAccent && (
                <div className="flex items-center justify-end">
                  <button
                    onClick={() => onSelectCustomAccent(null)}
                    className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-600 font-bold cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>إعادة ضبط للوحة الافتراضية</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>يتم حفظ اختيار اللون تلقائياً للمتصفح</span>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl text-white font-bold text-xs shadow-md transition cursor-pointer hover:opacity-90"
            style={{
              backgroundColor: customAccent || currentTheme.accent
            }}
          >
            تأكيد وإغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
