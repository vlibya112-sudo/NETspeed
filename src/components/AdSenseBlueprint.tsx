import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle, 
  Sparkles, 
  Layers, 
  Target, 
  Eye, 
  MousePointer, 
  Sliders, 
  CheckCircle2 
} from 'lucide-react';
import { ADSENSE_BLUEPRINT } from '../data/mockData';

export const AdSenseBlueprint: React.FC = () => {
  const [monthlyTraffic, setMonthlyTraffic] = useState(150000); // 150k monthly pageviews
  const [gccRatio, setGccRatio] = useState(65); // 65% GCC traffic
  const [egyptRatio, setEgyptRatio] = useState(25); // 25% Egypt / North Africa
  const [globalRatio, setGlobalRatio] = useState(10); // 10% Global / US / EU

  // Average RPM calculations:
  // GCC RPM: ~$9.50 - $16.00
  // Egypt/NA RPM: ~$2.50 - $4.50
  // Global US/EU RPM: ~$12.00 - $22.00
  const effectiveGccRpm = 12.5;
  const effectiveEgyptRpm = 3.2;
  const effectiveGlobalRpm = 16.0;

  const blendedRpm = (
    (gccRatio * effectiveGccRpm + egyptRatio * effectiveEgyptRpm + globalRatio * effectiveGlobalRpm) / 100
  );

  const estimatedMonthlyRevenueUSD = Math.round((monthlyTraffic / 1000) * blendedRpm);
  const estimatedAnnualRevenueUSD = estimatedMonthlyRevenueUSD * 12;
  const estimatedSar = Math.round(estimatedMonthlyRevenueUSD * 3.75);

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>استراتيجية مضاعفة أرباح Google AdSense وخطة التوزيع الذكي</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
          توزيع الوحدات الإعلانية دون اختراق سياسات جوجل أو ضرب تجربة المستخدم
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          كيف نحول الـ 15-20 ثانية التي يقضيها الزائر في انتظار فحص السرعة إلى أعلى عائد ممكن (RPM) مع الحفاظ على سرعة تحميل البرق (PageSpeed 95+).
        </p>
      </div>

      {/* 1. Interactive ROI & Revenue Calculator */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-500/20 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              <span>حاسبة أرباح أدسنس التقديرية (AdSense Revenue Calculator)</span>
            </h3>
            <p className="text-xs text-slate-400">
              بناءً على متوسطات الـ RPM الحقيقية للمنطقة العربية ودول الخليج وأمريكا.
            </p>
          </div>

          <div className="text-right">
            <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">
              ${estimatedMonthlyRevenueUSD.toLocaleString()} <span className="text-xs text-slate-300 font-sans">شهرياً</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              (≈ {estimatedSar.toLocaleString()} ريال سعودي / شهر | ${estimatedAnnualRevenueUSD.toLocaleString()} سنوياً)
            </div>
          </div>
        </div>

        {/* Sliders Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Traffic Volume Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-200">
              <span>عدد الزيارات الشهرية (Monthly Pageviews):</span>
              <span className="font-mono text-cyan-400 text-sm">{monthlyTraffic.toLocaleString()} زيارة</span>
            </div>
            <input
              type="range"
              min={10000}
              max={1500000}
              step={10000}
              value={monthlyTraffic}
              onChange={(e) => setMonthlyTraffic(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>10,000 (البداية)</span>
              <span>500,000</span>
              <span>1.5M (ترافيك متصدر)</span>
            </div>
          </div>

          {/* Traffic Geography Mix */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-200">
              <span>توزيع الزوار الجغرافي (Traffic Geo Distribution):</span>
              <span className="font-mono text-amber-400 text-xs">متوسط الـ RPM: ${blendedRpm.toFixed(2)}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                <div className="text-[10px] text-slate-400">الخليج (KSA/UAE)</div>
                <div className="font-bold font-mono text-emerald-400">{gccRatio}%</div>
                <div className="text-[9px] text-slate-500 font-mono">RPM ~$12.5</div>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                <div className="text-[10px] text-slate-400">مصر وشمال أفريقيا</div>
                <div className="font-bold font-mono text-cyan-400">{egyptRatio}%</div>
                <div className="text-[9px] text-slate-500 font-mono">RPM ~$3.2</div>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                <div className="text-[10px] text-slate-400">عالمي (US/EU)</div>
                <div className="font-bold font-mono text-purple-400">{globalRatio}%</div>
                <div className="text-[9px] text-slate-500 font-mono">RPM ~$16.0</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Strategic Placement Blueprint Cards */}
      <div className="space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-cyan-500" />
          <span>خريطة الوحدات الإعلانية الـ 5 الأكثر ربحية (High-Yield Ad Layout)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ADSENSE_BLUEPRINT.map((unit) => (
            <div
              key={unit.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                    {unit.dimensions}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-1">
                    {unit.nameAr}
                  </h4>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                    RPM {unit.rpmEstimate}
                  </div>
                  <div className="text-[10px] text-blue-600 dark:text-blue-400 font-mono">
                    CTR {unit.ctrEstimate}
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong className="text-slate-800 dark:text-slate-200">المكان الاستراتيجي:</strong> {unit.placementAr}
              </p>

              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-[11px] text-slate-700 dark:text-slate-300 space-y-1">
                <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>توافق سياسة AdSense (Policy Safe):</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal">
                  {unit.policyNotesAr}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Golden Rules & AdSense Policy Compliance Checklist */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-500" />
          <span>القواعد الذهبية لحماية الحساب من حظر AdSense والنقرات غير الصالحة</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
          {[
            {
              title: 'تجنب النقرات غير المقصودة (Accidental Clicks)',
              desc: 'لا تضع الإعلان ملاصقاً لزر "ابدأ الفحص" إطلاقاً. يجب ترك مسافة لا تقل عن 100 بكسل لمنع الزائر من النقر بالخطأ على الإعلان أثناء محاولة الضغط على الزر.'
            },
            {
              title: 'حماية مؤشر ثبات التصميم (CLS < 0.1)',
              desc: 'حجز أبعاد الصندوق الإعلاني مسبقاً عبر CSS (مثل min-height: 280px) حتى لا تقفز الصفحة عند تحميل الإعلان، مما يحافظ على تقييم الأخضر في Core Web Vitals.'
            },
            {
              title: 'تسمية الإعلانات بشفافية كاملة',
              desc: 'وضع وسم "إعلان" أو "ADVERTISEMENT" أعلى كل وحدة إعلانية لمنع التضليل وضمان الامتثال التام لقوانين Google Publisher Policies.'
            },
            {
              title: 'التحميل الكسول الذكي (Smart Lazy Loading)',
              desc: 'عدم تحميل الإعلانات السفلية إلا عندما يقترب الزائر من التمرير إليها لتسريع تحميل الموقع الأولي واختصار زمن FCP إلى أقل من 0.8 ثانية.'
            }
          ].map((rule, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850/60 border border-slate-100 dark:border-slate-800 space-y-1">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{rule.title}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs pr-6">
                {rule.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
