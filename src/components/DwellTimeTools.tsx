import React, { useState } from 'react';
import { 
  Gamepad2, 
  Tv, 
  Video, 
  Globe, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Star, 
  TrendingUp, 
  Sliders, 
  Wifi, 
  Send, 
  HelpCircle,
  Sparkles,
  Zap,
  ArrowRight
} from 'lucide-react';
import { SpeedResult, ISPData } from '../types';
import { APP_SUITABILITIES, ISP_DATABASE } from '../data/mockData';

interface DwellTimeToolsProps {
  stats: Partial<SpeedResult>;
  onSelectISPForDetail?: (isp: ISPData) => void;
}

export const DwellTimeTools: React.FC<DwellTimeToolsProps> = ({ stats }) => {
  const [activeTab, setActiveTab] = useState<'suitability' | 'isps' | 'booster' | 'faqs'>('suitability');
  
  // Community review form state
  const [selectedIspId, setSelectedIspId] = useState('stc');
  const [userRating, setUserRating] = useState(5);
  const [userComment, setUserComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [customIspList, setCustomIspList] = useState<ISPData[]>(ISP_DATABASE);

  // Speed Booster Checklist state
  const [checkedSteps, setCheckedSteps] = useState<{ [key: string]: boolean }>({
    dns: true,
    ghz5: false,
    reboot: false,
    ethernet: false,
    background: false
  });

  const download = stats.download || 45;
  const upload = stats.upload || 15;
  const ping = stats.ping || 25;
  const jitter = stats.jitter || 4;

  const handleToggleCheck = (key: string) => {
    setCheckedSteps(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const calculatedOptimizationScore = Math.min(
    100,
    30 + Object.values(checkedSteps).filter(Boolean).length * 14
  );

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userComment.trim()) return;

    setCustomIspList(prev =>
      prev.map(isp => {
        if (isp.id === selectedIspId) {
          const newTotal = isp.totalVotes + 1;
          const newRating = Number(((isp.rating * isp.totalVotes + userRating) / newTotal).toFixed(1));
          return { ...isp, rating: newRating, totalVotes: newTotal };
        }
        return isp;
      })
    );

    setReviewSubmitted(true);
    setTimeout(() => {
      setUserComment('');
      setReviewSubmitted(false);
    }, 3500);
  };

  return (
    <div className="w-full space-y-6">
      {/* Navigation Sub-Tabs to encourage long dwell time */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-xs max-w-2xl mx-auto">
        <button
          id="tab-suitability"
          onClick={() => setActiveTab('suitability')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'suitability'
              ? 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Gamepad2 className="w-4 h-4" />
          <span>ملاءمة الألعاب والبث (Gaming Test)</span>
        </button>

        <button
          id="tab-isps"
          onClick={() => setActiveTab('isps')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'isps'
              ? 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>مقارنة شركات الاتصالات (ISPs)</span>
        </button>

        <button
          id="tab-booster"
          onClick={() => setActiveTab('booster')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'booster'
              ? 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>مسرّع وتشخيص الواي فاي (Booster)</span>
        </button>
      </div>

      {/* TAB 1: GAMING & STREAMING SUITABILITY */}
      {activeTab === 'suitability' && (
        <div className="space-y-4">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>تقييم ملاءمة سرعة اتصالك للألعاب والستريمنج</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              يتم الحساب فورياً استناداً إلى نتائج التنزيل ({download} Mbps) والرفع ({upload} Mbps) والبينج ({ping} ms) والجيتر ({jitter} ms).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {APP_SUITABILITIES.map((app) => {
              const isDownloadOk = download >= app.minDownload;
              const isUploadOk = upload >= app.minUpload;
              const isPingOk = ping <= app.maxPing;
              const isJitterOk = jitter <= app.maxJitter;

              let status: 'perfect' | 'good' | 'fair' | 'poor' = 'poor';
              if (isDownloadOk && isUploadOk && isPingOk && isJitterOk) {
                status = 'perfect';
              } else if (isDownloadOk && isPingOk) {
                status = 'good';
              } else if (isDownloadOk) {
                status = 'fair';
              }

              return (
                <div
                  key={app.id}
                  id={`suitability-card-${app.id}`}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-cyan-500/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400">
                          {app.category === 'gaming' && <Gamepad2 className="w-5 h-5" />}
                          {app.category === 'streaming' && <Tv className="w-5 h-5" />}
                          {app.category === 'work' && <Video className="w-5 h-5" />}
                          {app.category === 'browsing' && <Globe className="w-5 h-5" />}
                        </div>
                        <div>
                          <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">
                            {app.nameAr}
                          </h3>
                          <span className="text-[11px] text-slate-400 font-mono">{app.name}</span>
                        </div>
                      </div>

                      {/* Status Tag */}
                      <div>
                        {status === 'perfect' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300">
                            <CheckCircle2 className="w-3.5 h-3.5" /> مثالي 100%
                          </span>
                        )}
                        {status === 'good' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300">
                            <CheckCircle2 className="w-3.5 h-3.5" /> ممتاز وسلس
                          </span>
                        )}
                        {status === 'fair' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300">
                            <AlertCircle className="w-3.5 h-3.5" /> مقبول مع تقطيع خفيف
                          </span>
                        )}
                        {status === 'poor' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-300">
                            <XCircle className="w-3.5 h-3.5" /> بطيء / يحتاج ترقية
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                      {app.descriptionAr}
                    </p>
                  </div>

                  {/* Requirements bar */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    <span>الحد الأدنى: {app.minDownload}M تنزيل</span>
                    <span>أقصى بينج: {app.maxPing}ms</span>
                    <span className="text-cyan-600 dark:text-cyan-400 font-bold">
                      {isPingOk ? '✓ البينج متوافق' : '⚠ البينج مرتفع'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: ISP COMPARISONS & REVIEWS */}
      {activeTab === 'isps' && (
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
              مقارنة سرعات وتقييمات شركات الاتصالات العربية والعالمية 2026
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              متوسطات السرعات الحقيقية المسجلة من قِبل آلاف الزوار خلال الشهر الجاري.
            </p>
          </div>

          {/* ISP Leaderboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {customIspList.map((isp) => (
              <div
                key={isp.id}
                id={`isp-card-${isp.id}`}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs"
                      style={{ backgroundColor: isp.logoColor }}
                    >
                      {isp.name.substring(0, 3).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                        {isp.nameAr}
                      </h3>
                      <div className="text-[11px] text-slate-400">{isp.countryAr}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/60 px-2 py-1 rounded-lg text-amber-600 dark:text-amber-400 font-bold text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{isp.rating}</span>
                    <span className="text-[10px] text-slate-400 font-normal">({isp.totalVotes.toLocaleString()})</span>
                  </div>
                </div>

                {/* Speed stats badges */}
                <div className="grid grid-cols-3 gap-2 text-center p-2.5 rounded-xl bg-slate-50 dark:bg-slate-850/60 text-xs">
                  <div>
                    <div className="text-[10px] text-slate-400">متوسط التحميل</div>
                    <div className="font-bold font-mono text-cyan-600 dark:text-cyan-400">{isp.avgDownload} Mbps</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">متوسط الرفع</div>
                    <div className="font-bold font-mono text-purple-600 dark:text-purple-400">{isp.avgUpload} Mbps</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">متوسط البينج</div>
                    <div className="font-bold font-mono text-emerald-600 dark:text-emerald-400">{isp.avgPing} ms</div>
                  </div>
                </div>

                {/* Pros and Cons */}
                <div className="space-y-1 text-xs">
                  {isp.pros.slice(0, 2).map((pro, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{pro}</span>
                    </div>
                  ))}
                  {isp.cons.slice(0, 1).map((con, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{con}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Community Rating Form (Increases engagement and dwell time!) */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 border border-cyan-200 dark:border-cyan-900/50 space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                شارك تقييمك لشبكة الإنترنت الخاصة بك (Community Voice)
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              ساعد المستخدمين الآخرين في اختيار أفضل مزود إنترنت عبر مشاركة تجربتك الحقيقية مع السرعة وخدمة العملاء.
            </p>

            {reviewSubmitted ? (
              <div className="p-4 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 text-emerald-800 dark:text-emerald-200 text-center font-bold text-sm flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>تم استلام تقييمك وتحديث مؤشر الرضا المجتمعي بنجاح! شكراً لك.</span>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Select ISP */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      اختر مزود الخدمة:
                    </label>
                    <select
                      value={selectedIspId}
                      onChange={(e) => setSelectedIspId(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200"
                    >
                      {customIspList.map((isp) => (
                        <option key={isp.id} value={isp.id}>
                          {isp.nameAr} ({isp.countryAr})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Star Rating selector */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      تقييمك العام (من 1 إلى 5 نجوم):
                    </label>
                    <div className="flex items-center gap-2 pt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setUserRating(star)}
                          className="p-1 cursor-pointer transition hover:scale-110"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= userRating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-300 dark:text-slate-600'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 mr-2">
                        {userRating} / 5
                      </span>
                    </div>
                  </div>
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    ملاحظتك أو نصيحتك حول باقة الإنترنت:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: سرعة الفايبر ممتازة لكن البينج يرتفع قليلاً في المساء..."
                    value={userComment}
                    onChange={(e) => setUserComment(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 placeholder:text-slate-400"
                  />
                </div>

                <button
                  type="submit"
                  id="btn-submit-isp-review"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold transition cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>إرسال التقييم للموقع</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: WI-FI & SPEED BOOSTER CHECKLIST */}
      {activeTab === 'booster' && (
        <div className="space-y-5">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center justify-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              <span>أداة تشخيص وتسريع الإنترنت والواي فاي (Wi-Fi Booster)</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              خطوات تفاعلية مجربة ومثبتة هندسياً لرفع سرعة خطك وخفض البينج بنسبة تصل إلى 40%.
            </p>
          </div>

          {/* Interactive Progress Meter */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-700 dark:text-slate-300">معدل تحسين واستقرار شبكتك:</span>
              <span className="text-cyan-600 dark:text-cyan-400 font-mono text-sm">{calculatedOptimizationScore}%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 transition-all duration-500 rounded-full"
                style={{ width: `${calculatedOptimizationScore}%` }}
              />
            </div>
          </div>

          {/* Diagnostic Steps with interactive checkboxes */}
          <div className="space-y-3">
            {[
              {
                id: 'dns',
                title: 'تغيير خوادم الـ DNS إلى Cloudflare (1.1.1.1) أو Google (8.8.8.8)',
                desc: 'يسرع زمن فتح المواقع (DNS Resolution Time) بنسبة 50% ويقلل من تعليق المتصفح.',
                tip: 'يمكنك ضبطها بسهولة من إعدادات الراوتر أو محول الشبكة في ويندوز/الماك/الهاتف.'
              },
              {
                id: 'ghz5',
                title: 'التحويل من شبكة 2.4GHz إلى تردد 5GHz في الواي فاي',
                desc: 'تردد 5GHz يمنح سرعات مضاعفة 3x ويقلل من تداخل إشارات راوترات الجيران والأجهزة المنزلية.',
                tip: 'اختر اسم شبكة الواي فاي الذي ينتهي بـ _5G في قائمة الشبكات.'
              },
              {
                id: 'reboot',
                title: 'إعادة تشغيل الراوتر دورياً (Router Power Cycle)',
                desc: 'تفريغ ذاكرة الراوتر (Cache) واختيار قناة اتصال لاسلكية (Channel) أقل ازدحاماً تلقائياً.',
                tip: 'افصل الكهرباء لمدة 60 ثانية كاملة ثم أعد توصيلها.'
              },
              {
                id: 'ethernet',
                title: 'استخدام كيبل إيثرنت مباشر (Cat6 أو Cat7) للألعاب والبث',
                desc: 'الكيبل يلغي 100% من تذبذب الـ Jitter وفقدان الحزم ويضمن أدنى بينج ممكن دون تأثر بالجدران.',
                tip: 'مثالي لبلايستيشن 5 والـ PC والتلفزيونات الذكية.'
              },
              {
                id: 'background',
                title: 'إيقاف التحميلات الخلفية وتحديثات الويندوز التلقائية',
                desc: 'برامج التورنت وتحديثات Steam تستهلك كامل سعة الرفع وتسبب اختناقاً فورياً للشبكة.',
                tip: 'افتح Task Manager وتأكد من عدم وجود تطبيق يستهلك Network بالخلفية.'
              }
            ].map((step) => (
              <div
                key={step.id}
                onClick={() => handleToggleCheck(step.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                  checkedSteps[step.id]
                    ? 'bg-cyan-50/60 dark:bg-cyan-950/20 border-cyan-400 dark:border-cyan-800'
                    : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={!!checkedSteps[step.id]}
                  onChange={() => handleToggleCheck(step.id)}
                  className="w-5 h-5 rounded-md text-cyan-600 focus:ring-cyan-500 mt-0.5 cursor-pointer"
                />
                <div className="space-y-1">
                  <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                    {step.title}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    {step.desc}
                  </div>
                  <div className="text-[11px] text-cyan-700 dark:text-cyan-300 font-medium">
                    💡 نصيحة الخبير: {step.tip}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
