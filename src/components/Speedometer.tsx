import React from 'react';
import { Play, RotateCcw, Activity, ArrowDown, ArrowUp, Zap, Server, ShieldCheck, MapPin, Gauge } from 'lucide-react';
import { TestPhase, SpeedResult, ServerLocation, ColorTheme } from '../types';
import { SERVERS } from '../data/mockData';

interface SpeedometerProps {
  phase: TestPhase;
  currentSpeed: number;
  progress: number;
  stats: Partial<SpeedResult>;
  selectedServer: ServerLocation;
  onSelectServer: (server: ServerLocation) => void;
  onStartTest: () => void;
  onCancelTest: () => void;
  currentTheme?: ColorTheme;
  customAccent?: string | null;
}

export const Speedometer: React.FC<SpeedometerProps> = ({
  phase,
  currentSpeed,
  stats,
  selectedServer,
  onSelectServer,
  onStartTest,
  onCancelTest,
  currentTheme,
  customAccent
}) => {
  const [showServerModal, setShowServerModal] = React.useState(false);

  // Theme colors
  const gradientStops = currentTheme?.gaugeGradient || ['#06b6d4', '#3b82f6', '#8b5cf6'];
  const accentColor = customAccent || currentTheme?.accent || '#06b6d4';

  // Maximum gauge scale (e.g. 500 Mbps)
  const maxSpeedScale = 500;
  const clampedSpeed = Math.min(currentSpeed, maxSpeedScale);
  // Angle from -120 deg to +120 deg (total 240 deg span)
  const angle = -120 + (clampedSpeed / maxSpeedScale) * 240;

  // Arc calculations for SVG
  const radius = 130;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;
  // 240 degrees represents 240/360 = 2/3 of circle
  const arcLength = circumference * (240 / 360);
  const strokeDashoffset = arcLength - (arcLength * clampedSpeed) / maxSpeedScale;

  const isTesting = phase !== 'idle' && phase !== 'complete';

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Top Network Info Bar */}
      <div className="w-full max-w-xl flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 backdrop-blur-md shadow-xs mb-6 text-xs text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="font-semibold text-slate-800 dark:text-slate-200">{stats.isp || 'جاري كشف المزود...'}</span>
          <span className="text-[11px] text-slate-400 font-mono">({stats.ip || '176.44.xxx.xxx'})</span>
        </div>

        {/* Server Selector Trigger */}
        <button
          id="btn-server-selector"
          onClick={() => setShowServerModal(true)}
          disabled={isTesting}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition text-slate-700 dark:text-slate-300 font-medium cursor-pointer disabled:opacity-50"
        >
          <MapPin className="w-3.5 h-3.5" style={{ color: accentColor }} />
          <span>{selectedServer.city}</span>
          <span className="text-[10px] text-slate-400">({selectedServer.distance})</span>
        </button>
      </div>

      {/* Main Gauge Graphic */}
      <div className="relative w-[320px] sm:w-[360px] h-[300px] flex items-center justify-center">
        {/* Glow ambient background */}
        <div
          className={`absolute inset-0 rounded-full blur-3xl transition-opacity duration-700 pointer-events-none ${
            isTesting ? 'opacity-100' : 'opacity-30'
          }`}
          style={{
            background: `radial-gradient(circle, ${accentColor}25 0%, transparent 70%)`
          }}
        />

        {/* SVG Arc Gauge */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 320 320">
          <defs>
            <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={customAccent || gradientStops[0]} />
              <stop offset="50%" stopColor={customAccent ? customAccent + 'dd' : gradientStops[1]} />
              <stop offset="100%" stopColor={customAccent ? customAccent + '99' : gradientStops[2]} />
            </linearGradient>
            <filter id="gaugeShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor={accentColor} floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Background Track Arc (240 deg) */}
          <circle
            cx="160"
            cy="160"
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
            className="text-slate-100 dark:text-slate-800"
            transform="rotate(150 160 160)"
          />

          {/* Active Speed Colored Arc */}
          <circle
            cx="160"
            cy="160"
            r={radius}
            fill="transparent"
            stroke="url(#speedGradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            filter={isTesting ? 'url(#gaugeShadow)' : undefined}
            className="transition-all duration-150 ease-out"
            transform="rotate(150 160 160)"
          />
        </svg>

        {/* Scale Ticks & Numbers */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="relative w-full h-full">
            <span className="absolute bottom-10 left-10 text-[11px] font-mono text-slate-400 font-semibold">0</span>
            <span className="absolute top-14 left-10 text-[11px] font-mono text-slate-400 font-semibold">50</span>
            <span className="absolute top-4 left-1/2 -translate-x-1/2 text-[11px] font-mono text-slate-400 font-semibold">150</span>
            <span className="absolute top-14 right-10 text-[11px] font-mono text-slate-400 font-semibold">300</span>
            <span className="absolute bottom-10 right-10 text-[11px] font-mono text-slate-400 font-semibold">500+</span>
          </div>
        </div>

        {/* Center Digital Display & Status */}
        <div className="absolute flex flex-col items-center justify-center text-center z-10">
          {/* Phase Badge */}
          <div className="mb-1">
            {phase === 'idle' && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                جاهز للاختبار الفوري
              </span>
            )}
            {phase === 'ping' && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center gap-1 animate-pulse">
                <Activity className="w-3.5 h-3.5" /> فحص زمن الاستجابة (Ping)...
              </span>
            )}
            {phase === 'download' && (
              <span 
                className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 animate-pulse"
                style={{
                  backgroundColor: `${accentColor}18`,
                  color: accentColor
                }}
              >
                <ArrowDown className="w-3.5 h-3.5" /> قياس سرعة التنزيل (Download)...
              </span>
            )}
            {phase === 'upload' && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center gap-1 animate-pulse">
                <ArrowUp className="w-3.5 h-3.5" /> قياس سرعة الرفع (Upload)...
              </span>
            )}
            {phase === 'complete' && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> اكتمل الفحص بنجاح
              </span>
            )}
          </div>

          {/* Big Number LED Counter */}
          <div className="flex items-baseline justify-center tracking-tight">
            <span className="text-5xl sm:text-6xl font-black font-mono text-slate-900 dark:text-white transition-all">
              {currentSpeed.toFixed(currentSpeed < 10 && currentSpeed > 0 ? 1 : 0)}
            </span>
          </div>

          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wider uppercase mt-0.5">
            Mbps ميجابايت / ثانية
          </span>

          {/* Dynamic Needle Pointer */}
          <div
            className="absolute w-1.5 h-28 origin-bottom rounded-full pointer-events-none transition-transform duration-100 ease-out shadow-sm"
            style={{
              background: `linear-gradient(to top, transparent, ${accentColor})`,
              transform: `translateY(-30px) rotate(${angle}deg)`,
              transformOrigin: '50% 100%'
            }}
          />
        </div>
      </div>

      {/* Action Button: Start / Cancel */}
      <div className="mt-4 mb-6 z-10">
        {!isTesting ? (
          <button
            id="btn-start-speedtest"
            onClick={onStartTest}
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 text-lg font-bold text-white transition-all duration-300 rounded-2xl shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            style={{
              background: `linear-gradient(135deg, ${customAccent || currentTheme?.gradientFrom || '#06b6d4'}, ${currentTheme?.gradientTo || '#6366f1'})`,
              boxShadow: `0 10px 25px -5px ${accentColor}40`
            }}
          >
            <Play className="w-6 h-6 fill-white group-hover:animate-pulse" />
            <span>{phase === 'complete' ? 'إعادة الفحص الآن' : 'ابدأ فحص السرعة'}</span>
            <span className="absolute -top-2 -right-2 px-2 py-0.5 text-[10px] font-bold bg-amber-400 text-slate-900 rounded-full shadow-xs">
              مجاني 100%
            </span>
          </button>
        ) : (
          <button
            id="btn-cancel-speedtest"
            onClick={onCancelTest}
            className="inline-flex items-center justify-center gap-2 px-8 py-3 text-sm font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-xl hover:bg-red-100 transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>إيقاف الفحص</span>
          </button>
        )}
      </div>


      {/* Live Metrics Grid (Ping, Jitter, Download, Upload, Bufferbloat) */}
      <div className="w-full max-w-2xl grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        {/* Download Metric */}
        <div className={`p-3 rounded-xl border transition-all ${
          phase === 'download' 
            ? 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-300 dark:border-cyan-700 ring-2 ring-cyan-400/20' 
            : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800'
        }`}>
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
            <ArrowDown className="w-4 h-4 text-cyan-500" />
            <span>التنزيل (Download)</span>
          </div>
          <div className="text-xl font-bold font-mono text-slate-800 dark:text-slate-100">
            {stats.download ? stats.download : '--'}
            <span className="text-[10px] text-slate-400 font-sans mr-1">Mbps</span>
          </div>
        </div>

        {/* Upload Metric */}
        <div className={`p-3 rounded-xl border transition-all ${
          phase === 'upload' 
            ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-300 dark:border-purple-700 ring-2 ring-purple-400/20' 
            : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800'
        }`}>
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
            <ArrowUp className="w-4 h-4 text-purple-500" />
            <span>الرفع (Upload)</span>
          </div>
          <div className="text-xl font-bold font-mono text-slate-800 dark:text-slate-100">
            {stats.upload ? stats.upload : '--'}
            <span className="text-[10px] text-slate-400 font-sans mr-1">Mbps</span>
          </div>
        </div>

        {/* Ping Metric */}
        <div className={`p-3 rounded-xl border transition-all ${
          phase === 'ping' 
            ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 ring-2 ring-amber-400/20' 
            : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800'
        }`}>
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
            <Activity className="w-4 h-4 text-amber-500" />
            <span>البينج (Ping)</span>
          </div>
          <div className="text-xl font-bold font-mono text-slate-800 dark:text-slate-100">
            {stats.ping ? stats.ping : '--'}
            <span className="text-[10px] text-slate-400 font-sans mr-1">ms</span>
          </div>
        </div>

        {/* Jitter / Bufferbloat */}
        <div className="p-3 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
            <Zap className="w-4 h-4 text-emerald-500" />
            <span>التذبذب (Jitter)</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-xl font-bold font-mono text-slate-800 dark:text-slate-100">
              {stats.jitter ? stats.jitter : '--'}
              <span className="text-[10px] text-slate-400 font-sans mr-1">ms</span>
            </span>
            {stats.bufferbloatScore && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                {stats.bufferbloatScore}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Server Selection Modal */}
      {showServerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Server className="w-5 h-5 text-cyan-500" />
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm sm:text-base">
                  اختر خادم فحص السرعة الأقرب
                </h3>
              </div>
              <button
                onClick={() => setShowServerModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              يتم اختيار أقرب خادم تلقائياً لضمان أدنى زمن استجابة (Ping) وقياس السرعة الحقيقية لخطك.
            </p>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {SERVERS.map((srv) => (
                <button
                  key={srv.id}
                  id={`btn-select-server-${srv.id}`}
                  onClick={() => {
                    onSelectServer(srv);
                    setShowServerModal(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border text-right transition cursor-pointer ${
                    selectedServer.id === srv.id
                      ? 'border-cyan-500 bg-cyan-50/70 dark:bg-cyan-950/30'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{srv.flag}</span>
                    <div>
                      <div className="font-semibold text-xs text-slate-800 dark:text-slate-200">
                        {srv.name}
                      </div>
                      <div className="text-[11px] text-slate-400">{srv.city}, {srv.country}</div>
                    </div>
                  </div>
                  <div className="text-xs font-mono font-semibold text-cyan-600 dark:text-cyan-400">
                    {srv.distance}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
