import React, { useState } from 'react';
import { Eye, Info, Sparkles, TrendingUp, AlertTriangle } from 'lucide-react';
import { AdUnitConfig } from '../types';

interface AdSenseBannerProps {
  unit: AdUnitConfig;
  blueprintMode: boolean;
  className?: string;
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({ unit, blueprintMode, className = '' }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div
      id={`ad-slot-${unit.id}`}
      className={`relative w-full transition-all duration-300 rounded-xl overflow-hidden ${
        blueprintMode
          ? 'border-2 border-dashed border-amber-500 bg-amber-500/5 p-3 shadow-md'
          : 'border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 p-2'
      } ${className}`}
    >
      {/* Label and Mode indicator */}
      <div className="flex items-center justify-between text-[11px] font-medium text-slate-400 dark:text-slate-500 mb-1.5 px-1">
        <span className="flex items-center gap-1">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600"></span>
          إعلان • ADVERTISEMENT
        </span>
        {blueprintMode && (
          <button
            id={`btn-inspect-ad-${unit.id}`}
            onClick={() => setShowInfo(!showInfo)}
            className="flex items-center gap-1 text-amber-600 dark:text-amber-400 hover:underline cursor-pointer bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded text-[10px]"
          >
            <Info className="w-3 h-3" />
            <span>تحليل العائد وسياسة AdSense</span>
          </button>
        )}
      </div>

      {/* Actual or Simulated Ad Box */}
      <div className="flex flex-col items-center justify-center min-h-[90px] w-full rounded-lg bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 dark:from-slate-800/80 dark:via-slate-850 dark:to-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 p-3 text-center">
        {blueprintMode ? (
          <div className="space-y-1.5 max-w-md">
            <div className="flex items-center justify-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500 text-white">
                {unit.dimensions}
              </span>
              <span className="font-semibold text-xs text-slate-800 dark:text-slate-200">
                {unit.nameAr}
              </span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              {unit.placementAr}
            </p>
            <div className="flex items-center justify-center gap-3 pt-1 text-[11px]">
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                <TrendingUp className="w-3.5 h-3.5" /> RPM: {unit.rpmEstimate}
              </span>
              <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-semibold">
                <Eye className="w-3.5 h-3.5" /> CTR: {unit.ctrEstimate}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-2 space-y-1">
            <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
              <Sparkles className="w-4 h-4 text-cyan-500 animate-pulse" />
              <span className="text-xs font-medium">مساحة إعلانية محسّنة متوافقة مع Google AdSense ({unit.dimensions})</span>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 max-w-sm">
              يتم تحميل إعلانات جوجل أدسنس تلقائياً ومطابقة لسياق اهتمامات الزائر وسرعة الاتصال.
            </p>
          </div>
        )}
      </div>

      {/* Blueprint Detailed Policy Overlay */}
      {blueprintMode && showInfo && (
        <div className="mt-2.5 p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-[11px] text-slate-700 dark:text-slate-300 space-y-1.5">
          <div className="flex items-start gap-1.5 text-amber-800 dark:text-amber-300 font-medium">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>معيار الأمان لسياسة أدسنس (AdSense Compliance):</span>
          </div>
          <p className="pr-5 text-slate-600 dark:text-slate-300 leading-normal">
            {unit.policyNotesAr}
          </p>
          <div className="flex items-center gap-2 pr-5 text-[10px] text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-slate-200">حماية تجربة المستخدم (CLS):</span>
            <code>{unit.clsProtection}</code>
          </div>
        </div>
      )}
    </div>
  );
};
